/**
 * Tests for ExtensionPackBuilder
 *
 * Tests the complete build pipeline for generating extension pack files
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtemp, rm, readFile, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createLogger } from '../../src/logger.js';
import { ExtensionPackBuilder } from '../../src/build/ExtensionPackBuilder.js';
import { TemplateGenerator } from '../../src/build/TemplateGenerator.js';
import type { Collection } from '../../src/config/types.js';
import { BuildError } from '../../src/errors.js';

describe('ExtensionPackBuilder', () => {
  let tempDir: string;
  let logger: ReturnType<typeof createLogger>;
  let templateGenerator: TemplateGenerator;
  let builder: ExtensionPackBuilder;

  beforeEach(async () => {
    // Create temp directory for test outputs
    tempDir = await mkdtemp(join(tmpdir(), 'ext-builder-test-'));

    // Create logger with silent mode for tests
    logger = createLogger();

    // Create template generator with actual templates
    const templatesDir = resolve(process.cwd(), 'templates');
    templateGenerator = new TemplateGenerator(logger, templatesDir);

    // Create builder instance
    builder = new ExtensionPackBuilder(logger, templateGenerator);
  });

  afterEach(async () => {
    // Clean up temp directory
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('build()', () => {
    it('should build complete extension pack for cpp', async () => {
      // Create minimal collection
      const collection: Collection = {
        description: 'Test C++ development pack',
        tags: ['cpp', 'c++', 'native'],
        required_extensions: [
          {
            id: 'llvm-vs-code-extensions.vscode-clangd',
            name: 'clangd',
            description: 'C/C++ language server',
            publisher: 'llvm-vs-code-extensions',
            license: 'MIT',
          },
        ],
        optional_extensions: [],
        settings: {
          'clangd.path': {
            value: 'clangd',
            description: 'Path to clangd',
            scope: 'workspace',
          },
        },
        keybindings: [
          {
            key: 'ctrl+shift+f',
            command: 'clang-format.format',
            description: 'Format with clang-format',
          },
        ],
        snippets: [
          {
            name: 'main',
            prefix: 'main',
            description: 'Main function',
            body: ['int main() {', '    return 0;', '}'],
          },
        ],
        documentation: {
          setup_guide: '# Setup Guide\nInstall clangd',
          troubleshooting: '# Troubleshooting\nCheck clangd path',
        },
      };

      const result = await builder.build(collection, {
        ide: 'vscode',
        language: 'cpp',
        outputDir: tempDir,
        logosDir: resolve(process.cwd(), 'logos'),
      });

      // Verify result structure
      expect(result.packageDir).toBe(join(tempDir, 'packages', 'vscode', 'cpp'));
      expect(result.files).toContain('package.json');
      expect(result.files).toContain('README.md');
      expect(result.files).toContain('src/extension.ts');
      expect(result.files).toContain('logo.png');
      expect(result.metadata.ide).toBe('vscode');
      expect(result.metadata.language).toBe('cpp');
      expect(result.metadata.version).toBe('0.0.1'); // default version

      // Verify files exist
      const packageJsonPath = join(result.packageDir, 'package.json');
      await expect(access(packageJsonPath)).resolves.toBeUndefined();

      // Verify package.json content
      const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
      expect(packageJson.name).toBe('tpl-vscode-cpp');
      expect(packageJson.description).toBe('Test C++ development pack');
      expect(packageJson.version).toBe('0.0.1');
      expect(packageJson.extensionPack).toEqual(['llvm-vs-code-extensions.vscode-clangd']);
    });

    it('should preserve existing version when rebuilding', async () => {
      // Create minimal collection
      const collection: Collection = {
        description: 'Test extension pack',
        tags: ['test'],
        required_extensions: [
          {
            id: 'test.extension',
            name: 'Test Extension',
            description: 'A test extension',
            publisher: 'test',
            license: 'MIT',
          },
        ],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: '# Setup',
          troubleshooting: '# Troubleshooting',
        },
      };

      // First build with default version
      const firstResult = await builder.build(collection, {
        ide: 'vscode',
        language: 'typescript',
        outputDir: tempDir,
        logosDir: resolve(process.cwd(), 'logos'),
      });

      // Manually update version in package.json
      const packageJsonPath = join(firstResult.packageDir, 'package.json');
      const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
      packageJson.version = '1.2.3';
      await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

      // Rebuild - should preserve version
      const secondResult = await builder.build(collection, {
        ide: 'vscode',
        language: 'typescript',
        outputDir: tempDir,
        logosDir: resolve(process.cwd(), 'logos'),
      });

      expect(secondResult.metadata.version).toBe('1.2.3');

      // Verify package.json still has preserved version
      const updatedPackageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'));
      expect(updatedPackageJson.version).toBe('1.2.3');
    });

    it('should generate all required files', async () => {
      const collection: Collection = {
        description: 'Complete extension pack',
        tags: ['complete'],
        required_extensions: [
          {
            id: 'test.ext',
            name: 'Test',
            description: 'Test extension',
            publisher: 'test',
            license: 'MIT',
          },
        ],
        optional_extensions: [],
        settings: { 'test.setting': { value: true, description: 'Test', scope: 'workspace' } },
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: '# Setup',
          troubleshooting: '# Troubleshooting',
        },
      };

      const result = await builder.build(collection, {
        ide: 'vscode',
        language: 'test',
        outputDir: tempDir,
        logosDir: resolve(process.cwd(), 'logos'),
      });

      // Check all expected files are in the result
      const expectedFiles = [
        'package.json',
        'README.md',
        'CHANGELOG.md',
        'LICENSE.md',
        'src/extension.ts',
        'tsconfig.json',
        '.vscodeignore',
        'settings.json', // Should be present because we have settings
        'logo.png',
      ];

      for (const file of expectedFiles) {
        expect(result.files).toContain(file);
        const filePath = join(result.packageDir, file);
        await expect(access(filePath)).resolves.toBeUndefined();
      }
    });

    it('should generate snippets file when snippets exist', async () => {
      const collection: Collection = {
        description: 'Extension with snippets',
        tags: ['snippets'],
        required_extensions: [],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [
          {
            name: 'test',
            prefix: 'test',
            description: 'Test snippet',
            body: 'test body',
          },
        ],
        documentation: {
          setup_guide: '# Setup',
          troubleshooting: '# Troubleshooting',
        },
      };

      const result = await builder.build(collection, {
        ide: 'vscode',
        language: 'javascript',
        outputDir: tempDir,
        logosDir: resolve(process.cwd(), 'logos'),
      });

      expect(result.files).toContain('snippets/javascript.json');

      const snippetsPath = join(result.packageDir, 'snippets', 'javascript.json');
      await expect(access(snippetsPath)).resolves.toBeUndefined();

      const snippets = JSON.parse(await readFile(snippetsPath, 'utf-8'));
      expect(snippets.test).toBeDefined();
      expect(snippets.test.prefix).toBe('test');
    });

    it('should generate keybindings file when keybindings exist', async () => {
      const collection: Collection = {
        description: 'Extension with keybindings',
        tags: ['keybindings'],
        required_extensions: [],
        optional_extensions: [],
        settings: {},
        keybindings: [
          {
            key: 'ctrl+k',
            command: 'test.command',
            description: 'Test command',
          },
        ],
        snippets: [],
        documentation: {
          setup_guide: '# Setup',
          troubleshooting: '# Troubleshooting',
        },
      };

      const result = await builder.build(collection, {
        ide: 'vscode',
        language: 'test',
        outputDir: tempDir,
        logosDir: resolve(process.cwd(), 'logos'),
      });

      expect(result.files).toContain('keybindings.json');

      const keybindingsPath = join(result.packageDir, 'keybindings.json');
      await expect(access(keybindingsPath)).resolves.toBeUndefined();
    });

    it('should handle kebab-case language names', async () => {
      const collection: Collection = {
        description: 'Generic essential pack',
        tags: ['generic'],
        required_extensions: [],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: '# Setup',
          troubleshooting: '# Troubleshooting',
        },
      };

      const result = await builder.build(collection, {
        ide: 'vscode',
        language: 'generic-essential',
        outputDir: tempDir,
        logosDir: resolve(process.cwd(), 'logos'),
      });

      expect(result.metadata.displayName).toBe('Generic Essential Extension Pack for Vscode');
      expect(result.packageDir).toContain('generic-essential');
    });

    it('should use custom organization and publisher', async () => {
      const collection: Collection = {
        description: 'Custom org pack',
        tags: ['custom'],
        required_extensions: [],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: '# Setup',
          troubleshooting: '# Troubleshooting',
        },
      };

      const result = await builder.build(collection, {
        ide: 'vscode',
        language: 'test',
        organization: 'my-org',
        publisher: '@my-org',
        outputDir: tempDir,
        logosDir: resolve(process.cwd(), 'logos'),
      });

      const packageJson = JSON.parse(
        await readFile(join(result.packageDir, 'package.json'), 'utf-8'),
      );
      expect(packageJson.publisher).toBe('@my-org');
    });

    it('should handle vscodium IDE', async () => {
      const collection: Collection = {
        description: 'VSCodium pack',
        tags: ['vscodium'],
        required_extensions: [],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: '# Setup',
          troubleshooting: '# Troubleshooting',
        },
      };

      const result = await builder.build(collection, {
        ide: 'vscodium',
        language: 'test',
        outputDir: tempDir,
        logosDir: resolve(process.cwd(), 'logos'),
      });

      expect(result.metadata.ide).toBe('vscodium');
      expect(result.metadata.displayName).toContain('Vscodium');
    });

    it('should throw BuildError for missing logo', async () => {
      const collection: Collection = {
        description: 'Test pack',
        tags: ['test'],
        required_extensions: [],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: '# Setup',
          troubleshooting: '# Troubleshooting',
        },
      };

      // Use a non-existent logos directory to ensure no fallback
      const nonExistentLogosDir = join(tempDir, 'nonexistent-logos');

      await expect(
        builder.build(collection, {
          ide: 'vscode',
          language: 'nonexistent-language',
          outputDir: tempDir,
          logosDir: nonExistentLogosDir,
        }),
      ).rejects.toThrow(BuildError);
    });
  });

  describe('Integration with real configuration', () => {
    it('should build cpp extension from actual config file', async () => {
      // Import real cpp collection
      const cppConfigPath = resolve(
        process.cwd(),
        'scripts/configs/collections/vscode/cpp.ts',
      );
      const cppModule = await import(`file://${cppConfigPath}`);
      const cppCollection: Collection = cppModule.cpp;

      const result = await builder.build(cppCollection, {
        ide: 'vscode',
        language: 'cpp',
        outputDir: tempDir,
        logosDir: resolve(process.cwd(), 'logos'),
      });

      // Verify comprehensive build
      expect(result.files.length).toBeGreaterThan(8);
      expect(result.files).toContain('package.json');
      expect(result.files).toContain('README.md');
      expect(result.files).toContain('snippets/cpp.json');
      expect(result.files).toContain('keybindings.json');
      expect(result.files).toContain('settings.json');

      // Verify package.json has all required fields
      const packageJson = JSON.parse(
        await readFile(join(result.packageDir, 'package.json'), 'utf-8'),
      );
      expect(packageJson.name).toBe('tpl-vscode-cpp');
      expect(packageJson.extensionPack).toBeInstanceOf(Array);
      expect(packageJson.extensionPack.length).toBeGreaterThan(0);

      // Verify README is comprehensive
      const readme = await readFile(join(result.packageDir, 'README.md'), 'utf-8');
      expect(readme).toContain('C++ Extension Pack');
      expect(readme).toContain('clangd');
      expect(readme).toContain('Installation');
    });
  });
});

// Helper to write files (needed for version preservation test)
import { writeFile } from 'node:fs/promises';
