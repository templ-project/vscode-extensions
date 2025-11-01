/**
 * ExtensionPackBuilder - Orchestrates extension pack file generation
 *
 * Coordinates ConfigLoader, TemplateGenerator, and version-utils to build
 * complete extension pack directories with all required files.
 */

import { createHash } from 'node:crypto';
import { mkdir, copyFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { createVSIX } from '@vscode/vsce';
import type pino from 'pino';
import type { Collection } from '../config/types.js';
import { BuildError } from '../errors.js';
import type { TemplateGenerator } from './TemplateGenerator.js';
import { readExistingVersion } from './version-utils.js';

/**
 * Build options for extension pack generation
 */
export interface BuildOptions {
  /**
   * IDE type ('vscode' or 'vscodium')
   */
  ide: 'vscode' | 'vscodium';

  /**
   * Language/extension name (e.g., 'cpp', 'typescript')
   */
  language: string;

  /**
   * Organization name for extension publisher
   * @default 'templ-project'
   */
  organization?: string;

  /**
   * Publisher name for marketplace
   * @default 'templ-project'
   */
  publisher?: string;

  /**
   * Repository URL base
   * @default 'https://github.com/templ-project/vscode-extensions'
   */
  repositoryUrl?: string;

  /**
   * Output directory base (packages/ will be created inside)
   * @default process.cwd()
   */
  outputDir?: string;

  /**
   * Logos directory path
   * @default 'logos'
   */
  logosDir?: string;

  /**
   * Whether to package the extension into a .vsix file
   * @default false
   */
  packageVSIX?: boolean;
}

/**
 * Build result containing paths to generated files
 */
export interface BuildResult {
  /**
   * Path to the generated extension pack directory
   */
  packageDir: string;

  /**
   * List of files generated
   */
  files: string[];

  /**
   * Path to generated .vsix file (if packaging was enabled)
   */
  vsixPath?: string;

  /**
   * Extension pack metadata
   */
  metadata: {
    ide: string;
    language: string;
    version: string;
    displayName: string;
  };
}

/**
 * Template context for rendering
 */
interface TemplateContext extends Record<string, unknown> {
  // Basic identifiers
  ide: string;
  language: string;
  organization: string;
  publisher: string;
  repositoryUrl: string;

  // Display names
  displayName: string;
  capitalizedIde: string;

  // CLI command based on IDE
  cliCommand: string;

  // Version
  version: string;

  // Collection data
  description: string;
  tags: string[];
  keywords: string[];

  // Extensions
  allExtensions: Array<{
    id: string;
    name: string;
    description: string;
    publisher: string;
    license: string;
    marketplace_url?: string;
  }>;
  requiredExtensions: Array<{
    id: string;
    name: string;
    description: string;
    publisher: string;
    license: string;
    marketplace_url?: string;
  }>;
  optionalExtensions: Array<{
    id: string;
    name: string;
    description: string;
    publisher: string;
    license: string;
    marketplace_url?: string;
  }>;
  totalExtensions: number;

  // Settings
  settings: Record<string, { value: unknown; description: string; scope: string }>;

  // Keybindings
  keybindings: Array<{
    key: string;
    command: string;
    description: string;
    when?: string;
  }>;

  // Snippets
  snippets: Record<string, { prefix: string; description: string; body: string | string[] }>;

  // Documentation
  setupGuide: string;
  troubleshooting: string;

  // Flags
  hasCommands: boolean;
}

/**
 * ExtensionPackBuilder orchestrates the complete build pipeline
 */
export class ExtensionPackBuilder {
  private readonly logger: pino.Logger;
  private readonly templateGenerator: TemplateGenerator;

  /**
   * Create a new ExtensionPackBuilder instance
   *
   * @param logger - Parent pino logger instance
   * @param templateGenerator - TemplateGenerator instance for rendering
   *
   * @example
   * ```typescript
   * const logger = createLogger();
   * const templateGen = new TemplateGenerator(logger);
   * const builder = new ExtensionPackBuilder(logger, templateGen);
   * ```
   */
  constructor(logger: pino.Logger, templateGenerator: TemplateGenerator) {
    this.logger = logger.child({ module: 'ExtensionPackBuilder' });
    this.templateGenerator = templateGenerator;
    this.logger.debug('ExtensionPackBuilder initialized');
  }

  /**
   * Build extension pack from Collection data
   *
   * @param collection - Validated Collection object
   * @param options - Build options (ide, language, organization, etc.)
   * @returns Promise resolving to BuildResult with generated file paths
   * @throws {BuildError} If file generation fails
   *
   * @example
   * ```typescript
   * const result = await builder.build(cppCollection, {
   *   ide: 'vscode',
   *   language: 'cpp',
   * });
   * console.log('Generated files:', result.files);
   * ```
   */
  async build(collection: Collection, options: BuildOptions): Promise<BuildResult> {
    const {
      ide,
      language,
      organization = 'templ-project',
      publisher = 'templ-project',
      repositoryUrl = 'https://github.com/templ-project/vscode-extensions',
      outputDir = process.cwd(),
      logosDir = 'logos',
    } = options;

    this.logger.info({ ide, language, organization }, 'Starting extension pack build');

    try {
      // Step 1: Determine output directory
      const packageDir = join(outputDir, ide, language);
      this.logger.debug({ packageDir }, 'Output directory determined');

      // Step 2: Read existing version (or default to 0.0.1)
      const existingPackagePath = join(packageDir, 'package.json');
      const version = await readExistingVersion(existingPackagePath, this.logger);
      this.logger.info({ version, preserved: version !== '0.0.1' }, 'Version determined');

      // Step 3: Transform Collection to template context
      const context = this.buildTemplateContext(collection, {
        ide,
        language,
        organization,
        publisher,
        repositoryUrl,
        version,
      });
      this.logger.debug({ contextKeys: Object.keys(context) }, 'Template context created');

      // Step 4: Create output directory structure
      await this.createDirectoryStructure(packageDir);

      // Step 5: Generate all extension pack files
      const files = await this.generateFiles(packageDir, context, language);

      // Step 6: Copy logo file
      await this.copyLogo(logosDir, packageDir, language);
      files.push('logo.png');

      // Step 7: Package to .vsix (optional)
      let vsixPath: string | undefined;
      if (options.packageVSIX) {
        vsixPath = await this.package(packageDir, options);
      }

      this.logger.info(
        {
          ide,
          language,
          packageDir,
          fileCount: files.length,
          vsixPath,
        },
        'Extension pack build completed',
      );

      return {
        packageDir,
        files,
        vsixPath,
        metadata: {
          ide,
          language,
          version,
          displayName: context.displayName,
        },
      };
    } catch (error) {
      // Re-throw BuildError as-is
      if (error instanceof BuildError) {
        this.logger.error({ err: error, ide, language }, 'Build failed');
        throw error;
      }

      // Wrap other errors in BuildError
      const errorMessage = error instanceof Error ? error.message : String(error);
      const buildError = new BuildError(`Extension pack build failed: ${errorMessage}`, {
        ide,
        language,
        organization,
        originalError: errorMessage,
      });

      this.logger.error({ err: buildError, ide, language }, 'Build failed with unexpected error');
      throw buildError;
    }
  }

  /**
   * Build template context from Collection data
   */
  private buildTemplateContext(
    collection: Collection,
    metadata: {
      ide: string;
      language: string;
      organization: string;
      publisher: string;
      repositoryUrl: string;
      version: string;
    },
  ): TemplateContext {
    const { ide, language, organization, publisher, repositoryUrl, version } = metadata;

    // Calculate config hash for version tracking
    const configHash = this.calculateConfigHash(collection);

    // Generate display name (capitalize first letter of each word)
    const displayName = this.generateDisplayName(language, ide);
    const capitalizedIde = ide.charAt(0).toUpperCase() + ide.slice(1);

    // Determine CLI command based on IDE
    const cliCommand = ide === 'vscode' ? 'code' : 'codium';

    // Generate current date for CHANGELOG
    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // Generate current year for LICENSE
    const year = new Date().getFullYear().toString();

    // Add marketplace_url to extensions if not present
    const addMarketplaceUrl = (ext: Collection['required_extensions'][0]) => ({
      ...ext,
      marketplace_url: ext.marketplace_url || `https://marketplace.visualstudio.com/items?itemName=${ext.id}`,
    });

    // Combine required and optional extensions with marketplace URLs
    const requiredExtensions = collection.required_extensions.map(addMarketplaceUrl);
    const optionalExtensions = collection.optional_extensions.map(addMarketplaceUrl);
    const allExtensions = [...requiredExtensions, ...optionalExtensions];

    // Keywords: combine tags with common extension pack keywords
    const keywords = [...collection.tags, 'extension-pack', 'development', ide, language];

    // Convert snippets array to object for template
    const snippetsObject: Record<string, { prefix: string; description: string; body: string | string[] }> = {};
    for (const snippet of collection.snippets) {
      snippetsObject[snippet.name] = {
        prefix: snippet.prefix,
        description: snippet.description,
        body: snippet.body,
      };
    }

    // Check if extension has commands (for package.json contributes)
    const hasCommands = Object.keys(collection.settings).length > 0;

    return {
      // Basic identifiers
      ide,
      language,
      organization,
      publisher,
      repositoryUrl,

      // Display names
      displayName,
      capitalizedIde,
      cliCommand,

      // Version, date, and year
      version,
      date,
      year,

      // Config hash for version tracking
      configHash,

      // Collection data
      description: collection.description,
      tags: collection.tags,
      keywords,

      // Extensions
      allExtensions,
      requiredExtensions,
      optionalExtensions,
      totalExtensions: allExtensions.length,

      // Settings
      settings: collection.settings,

      // Keybindings
      keybindings: collection.keybindings,

      // Snippets
      snippets: snippetsObject,

      // Documentation
      setupGuide: collection.documentation.setup_guide,
      troubleshooting: collection.documentation.troubleshooting,

      // Flags
      hasCommands,
    };
  }

  /**
   * Calculate SHA256 hash of collection configuration
   * This creates a deterministic hash based on the extension's configuration,
   * allowing version detection based on config changes
   */
  private calculateConfigHash(collection: Collection): string {
    // Create a stable, deterministic representation of the collection
    // Sort keys and arrays to ensure consistent hashing
    const stableConfig = {
      description: collection.description,
      tags: [...collection.tags].sort(),
      required_extensions: [...collection.required_extensions]
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((ext) => ({
          id: ext.id,
          name: ext.name,
          why_required: ext.why_required,
        })),
      optional_extensions: [...collection.optional_extensions]
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((ext) => ({
          id: ext.id,
          name: ext.name,
          why_recommended: ext.why_recommended,
        })),
      settings: collection.settings,
      keybindings: [...collection.keybindings].sort((a, b) => a.key.localeCompare(b.key)),
      snippets: [...collection.snippets].sort((a, b) => a.name.localeCompare(b.name)),
    };

    // Convert to stable JSON string and hash
    const configString = JSON.stringify(stableConfig, null, 0);
    const hash = createHash('sha256').update(configString).digest('hex');

    this.logger.debug({ hash, configLength: configString.length }, 'Calculated config hash');

    return hash;
  }

  /**
   * Generate display name from language and IDE
   */
  private generateDisplayName(language: string, ide: string): string {
    // Special cases for language names
    const languageMap: Record<string, string> = {
      cpp: 'C++',
      csharp: 'C#',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      golang: 'Go',
      python: 'Python',
    };

    // Use mapped name if available, otherwise convert kebab-case to Title Case
    const languageTitle =
      languageMap[language] ||
      language
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const ideTitle = ide.charAt(0).toUpperCase() + ide.slice(1);

    return `${languageTitle} Extension Pack for ${ideTitle}`;
  }

  /**
   * Create directory structure for extension pack
   */
  private async createDirectoryStructure(packageDir: string): Promise<void> {
    this.logger.debug({ packageDir }, 'Creating directory structure');

    try {
      // Create base package directory
      await mkdir(packageDir, { recursive: true });

      // Create subdirectories
      const subdirs = ['src', 'snippets', 'out'];
      for (const subdir of subdirs) {
        await mkdir(join(packageDir, subdir), { recursive: true });
      }

      this.logger.debug({ packageDir, subdirs }, 'Directory structure created');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new BuildError(`Failed to create directory structure: ${errorMessage}`, {
        packageDir,
        originalError: errorMessage,
      });
    }
  }

  /**
   * Generate all extension pack files
   */
  private async generateFiles(packageDir: string, context: TemplateContext, language: string): Promise<string[]> {
    this.logger.debug({ packageDir }, 'Generating extension pack files');

    const files: string[] = [];

    try {
      // 1. Generate package.json
      await this.templateGenerator.renderToFile('package.json.handlebars', context, join(packageDir, 'package.json'));
      files.push('package.json');

      // 2. Generate README.md
      await this.templateGenerator.renderToFile('README.md.handlebars', context, join(packageDir, 'README.md'));
      files.push('README.md');

      // 3. Generate CHANGELOG.md
      await this.templateGenerator.renderToFile('CHANGELOG.md.handlebars', context, join(packageDir, 'CHANGELOG.md'));
      files.push('CHANGELOG.md');

      // 4. Generate LICENSE.md
      await this.templateGenerator.renderToFile('LICENSE.md.handlebars', context, join(packageDir, 'LICENSE.md'));
      files.push('LICENSE.md');

      // 5. Generate extension.ts
      await this.templateGenerator.renderToFile(
        'extension.ts.handlebars',
        context,
        join(packageDir, 'src', 'extension.ts'),
      );
      files.push('src/extension.ts');

      // 6. Generate tsconfig.json
      await this.templateGenerator.renderToFile('tsconfig.json.handlebars', context, join(packageDir, 'tsconfig.json'));
      files.push('tsconfig.json');

      // 7. Generate .vscodeignore
      await this.templateGenerator.renderToFile('.vscodeignore.handlebars', context, join(packageDir, '.vscodeignore'));
      files.push('.vscodeignore');

      // 8. Generate settings.json (if settings exist)
      if (Object.keys(context.settings).length > 0) {
        await this.templateGenerator.renderToFile(
          'settings.json.handlebars',
          context,
          join(packageDir, 'settings.json'),
        );
        files.push('settings.json');
      }

      // 9. Generate keybindings.json (if keybindings exist)
      if (context.keybindings.length > 0) {
        await this.templateGenerator.renderToFile(
          'keybindings.json.handlebars',
          context,
          join(packageDir, 'keybindings.json'),
        );
        files.push('keybindings.json');
      }

      // 10. Generate snippets file (if snippets exist)
      if (Object.keys(context.snippets).length > 0) {
        await this.templateGenerator.renderToFile(
          'snippets.json.handlebars',
          context,
          join(packageDir, 'snippets', `${language}.json`),
        );
        files.push(`snippets/${language}.json`);
      }

      this.logger.info({ fileCount: files.length, files }, 'All files generated successfully');

      return files;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new BuildError(`Failed to generate extension pack files: ${errorMessage}`, {
        packageDir,
        filesGenerated: files,
        originalError: errorMessage,
      });
    }
  }

  /**
   * Copy logo file to extension pack directory
   */
  private async copyLogo(logosDir: string, packageDir: string, language: string): Promise<void> {
    this.logger.debug({ logosDir, packageDir, language }, 'Copying logo file');

    try {
      // Try language-specific logo first, then generic
      const logoFilenames = [`${language}-128.png`, 'generic-128.png'];

      let copied = false;
      for (const logoFilename of logoFilenames) {
        const sourcePath = join(logosDir, logoFilename);
        const destPath = join(packageDir, 'logo.png');

        try {
          await copyFile(sourcePath, destPath);
          this.logger.info({ sourcePath, destPath }, 'Logo copied successfully');
          copied = true;
          break;
        } catch {
          // Try next logo
          this.logger.debug({ sourcePath }, 'Logo file not found, trying next option');
        }
      }

      if (!copied) {
        throw new BuildError(`No logo found for language '${language}'`, {
          logosDir,
          language,
          triedFiles: logoFilenames,
          hint: 'Ensure logo file exists in logos/ directory',
        });
      }
    } catch (error) {
      if (error instanceof BuildError) {
        throw error;
      }

      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new BuildError(`Failed to copy logo: ${errorMessage}`, {
        logosDir,
        packageDir,
        language,
        originalError: errorMessage,
      });
    }
  }

  /**
   * Package extension pack into a .vsix file
   *
   * @param packageDir - Path to the extension pack directory
   * @param options - Build options containing IDE information
   * @returns Path to the generated .vsix file
   * @throws {BuildError} If packaging fails
   */
  async package(packageDir: string, options: BuildOptions): Promise<string> {
    const { ide } = options;
    const distDir = resolve(process.cwd(), 'dist', ide);

    this.logger.info({ packageDir, distDir }, 'Starting VSIX packaging');

    try {
      // Create dist/{ide} directory if it doesn't exist
      await mkdir(distDir, { recursive: true });
      this.logger.debug({ distDir }, 'Distribution directory created');

      // Package extension using @vscode/vsce
      // Extension packs don't need dependencies or pre-publish steps
      const vsixPath = await createVSIX({
        cwd: packageDir,
        packagePath: distDir,
        useYarn: false,
        dependencies: false, // Skip dependency installation
        preRelease: false,
        ignoreFile: undefined, // Use default .vscodeignore
        skipLicense: false,
        allowUnusedFilesPattern: false,
        allowMissingRepository: false,
      });

      this.logger.info({ vsixPath, packageDir, distDir }, 'VSIX packaging completed successfully');

      return vsixPath;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new BuildError(`Failed to package extension to .vsix: ${errorMessage}`, {
        packageDir,
        distDir,
        originalError: errorMessage,
        hint: 'Ensure package.json is valid and all required files exist',
      });
    }
  }
}
