#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

/**
 * Convert TypeScript configuration to VSCode Extension Pack package.json using Handlebars templates
 * Usage: ts-node generate-extension.ts <ide> <language>
 * Example: ts-node generate-extension.ts vscode javascript
 */

// Register Handlebars helpers
Handlebars.registerHelper('json', function (context) {
  return JSON.stringify(context, null, 2);
});

Handlebars.registerHelper('capitalize', function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

Handlebars.registerHelper('isString', function (value) {
  return typeof value === 'string';
});

Handlebars.registerHelper('hasCommands', function (options) {
  return true; // Always include commands for active extensions
});

Handlebars.registerHelper('split', function (str, delimiter) {
  if (typeof str !== 'string') return [str];
  return str.split(delimiter).filter(line => line.trim() !== '').map(line => line.trimEnd());
});

Handlebars.registerHelper('trim', function (str) {
  if (typeof str !== 'string') return str;
  return str.trim();
});

Handlebars.registerHelper('escapeJson', function (str) {
  if (typeof str !== 'string') return str;
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
});

Handlebars.registerHelper('year', function () {
  return new Date().getFullYear();
});

Handlebars.registerHelper('getPublisher', function (extensionId) {
  if (typeof extensionId !== 'string') return 'Unknown';
  const parts = extensionId.split('.');
  return parts.length > 1 ? parts[0] : 'Unknown';
});

async function loadTypeScriptConfig(ide: string, language: string): Promise<any> {
  const configPath = path.join(__dirname, 'configs', 'collections', ide, `${language}.ts`);

  if (!fs.existsSync(configPath)) {
    throw new Error(`Configuration file not found: ${configPath}`);
  }

  try {
    // Import the TypeScript configuration
    const configModule = await import(configPath);
    const config = configModule.default || configModule[language] || configModule;

    if (!config) {
      throw new Error(`No configuration found in ${configPath}`);
    }

    return config;
  } catch (error) {
    throw new Error(`Failed to load TypeScript configuration: ${error}`);
  }
}

function loadTemplate(templateName: string): HandlebarsTemplateDelegate {
  const templatePath = path.join(__dirname, '..', 'templates', templateName);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template file not found: ${templatePath}`);
  }

  const templateContent = fs.readFileSync(templatePath, 'utf8');
  return Handlebars.compile(templateContent);
}

function prepareTemplateContext(config: any, ide: string, language: string): any {
  // Get the collection from the config - it might be exported as default, named export, or direct object
  // Convert language to camelCase for export name (e.g., 'generic-extended' -> 'genericExtended')
  const exportName = language.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  const collection = config[exportName] || config.default || config;

  if (!collection) {
    throw new Error(`Language '${language}' not found in ${ide} configuration. Looking for export '${exportName}'`);
  }

  const requiredExtensions = collection.required_extensions || [];
  const optionalExtensions = collection.optional_extensions || [];
  const allExtensions = [...requiredExtensions, ...optionalExtensions];

  // Create context for template
  const context = {
    // Basic info
    language,
    ide,
    organization: 'templ-project',

    // Package metadata
    displayName: `[templ-project] ${language.split('-').map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(' ')} Extension Pack`,
    description: collection.description,
    version: "1.0.0",
    publisher: "templ-project",
    repositoryUrl: "https://github.com/templ-project/vscode-extensions",

    // Extensions
    requiredExtensions,
    optionalExtensions,
    allExtensions,
    totalExtensions: allExtensions.length,

    // Keywords
    keywords: [
      ...collection.tags || [],
      ide,
      language,
      "extension-pack"
    ],

    // Settings and other config
    settings: collection.settings || {},
    keybindings: collection.keybindings || [],
    snippets: collection.snippets || {},

    // Computed values
    capitalizedIde: ide.charAt(0).toUpperCase() + ide.slice(1),
    cliCommand: ide === 'vscode' ? 'code' : 'codium',
    date: new Date().toISOString().split('T')[0],
    hasCommands: true
  };

  return context;
}

function generateFromTemplate(templateName: string, context: any, outputPath: string): void {
  const template = loadTemplate(templateName);
  const content = template(context);

  // Ensure directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, content, 'utf8');

  const fileName = path.basename(outputPath);
  console.log(`✅ Generated ${fileName} from template`);
}

async function writeExtensionPackFiles(config: any, ide: string, language: string): Promise<void> {
  const packageDir = path.join(__dirname, '..', 'packages', ide, language);
  const context = prepareTemplateContext(config, ide, language);

  // Create necessary directories
  fs.mkdirSync(path.join(packageDir, 'src'), { recursive: true });
  fs.mkdirSync(path.join(packageDir, 'out'), { recursive: true });
  fs.mkdirSync(path.join(packageDir, 'snippets'), { recursive: true });

  // Generate package.json
  generateFromTemplate(
    'package.json.handlebars',
    context,
    path.join(packageDir, 'package.json')
  );

  // Generate .vscodeignore
  generateFromTemplate(
    '.vscodeignore.handlebars',
    context,
    path.join(packageDir, '.vscodeignore')
  );

  // Generate CHANGELOG.md
  generateFromTemplate(
    'CHANGELOG.md.handlebars',
    context,
    path.join(packageDir, 'CHANGELOG.md')
  );

  // Generate LICENSE.md
  generateFromTemplate(
    'LICENSE.md.handlebars',
    context,
    path.join(packageDir, 'LICENSE.md')
  );

  // Generate TypeScript config
  generateFromTemplate(
    'tsconfig.json.handlebars',
    context,
    path.join(packageDir, 'tsconfig.json')
  );

  // Generate extension source code
  generateFromTemplate(
    'extension.ts.handlebars',
    context,
    path.join(packageDir, 'src', 'extension.ts')
  );

  // Generate README.md
  generateFromTemplate(
    'README.md.handlebars',
    context,
    path.join(packageDir, 'README.md')
  );

  // Generate config files if they have content
  if (context.settings && Object.keys(context.settings).length > 0) {
    generateFromTemplate(
      'settings.json.handlebars',
      context,
      path.join(packageDir, 'settings.json')
    );
  }

  if (context.keybindings && context.keybindings.length > 0) {
    generateFromTemplate(
      'keybindings.json.handlebars',
      context,
      path.join(packageDir, 'keybindings.json')
    );
  }

  if (context.snippets && Object.keys(context.snippets).length > 0) {
    generateFromTemplate(
      'snippets.json.handlebars',
      context,
      path.join(packageDir, 'snippets', `${language}.json`)
    );
  }

  // Copy logo to extension directory
  const logoPath = path.join(packageDir, 'logo.png');
  const languageLogoPath = path.join(__dirname, '..', 'logos', `${language}-128.png`);
  const genericLogoPath = path.join(__dirname, '..', 'logos', 'generic-128.png');

  try {
    if (fs.existsSync(languageLogoPath)) {
      fs.copyFileSync(languageLogoPath, logoPath);
      console.log(`✅ Copied language-specific logo: ${language}-128.png`);
    } else if (fs.existsSync(genericLogoPath)) {
      fs.copyFileSync(genericLogoPath, logoPath);
      console.log(`✅ Copied generic logo: generic-128.png`);
    } else {
      // Create a simple placeholder logo if neither exists
      generateFromTemplate(
        'logo-placeholder.md.handlebars',
        context,
        path.join(packageDir, 'logo-placeholder.md')
      );
      console.log(`💡 No logo files found. Logo placeholder created. Add logo.png (128x128) to ${packageDir}/`);
    }
  } catch (error) {
    console.warn(`⚠️  Failed to copy logo: ${error}`);
    generateFromTemplate(
      'logo-placeholder.md.handlebars',
      context,
      path.join(packageDir, 'logo-placeholder.md')
    );
    console.log(`💡 Logo placeholder created. Add logo.png (128x128) to ${packageDir}/`);
  }

  console.log(`📁 Extension pack location: ${path.join(packageDir, 'package.json')}`);
}

// Main execution
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: ts-node generate-extension.ts <ide> <language>');
    console.error('Example: ts-node generate-extension.ts vscode javascript');
    process.exit(1);
  }

  const [ide, language] = args;

  // Check for version store file
  const versionStorePath = path.join(__dirname, '..', '.version-store.json');
  if (!fs.existsSync(versionStorePath)) {
    console.error('❌ Error: No version store found!');
    console.error('');
    console.error('The generation process requires a version store to manage package versions.');
    console.error('Please run the version store command first:');
    console.error('');
    console.error('  npm run version:store');
    console.error('');
    console.error('This will create a .version-store.json file with current package versions.');
    console.error('Then you can run the generation process again.');
    process.exit(1);
  }

  try {
    console.log(`🔄 Generating VSCode Extension Pack for ${ide}/${language}...`);

    // Load TypeScript configuration
    const config = await loadTypeScriptConfig(ide, language);

    // Generate extension pack files
    await writeExtensionPackFiles(config, ide, language);

    console.log(`\n🎉 Extension pack generation complete for ${ide}/${language}!`);
    console.log(`\n📋 Next steps:`);
    console.log(`   cd packages/${ide}/${language}`);
    console.log(`   # Add logo.png (128x128 px)`);
    console.log(`   # Update publisher in package.json`);
    console.log(`   # Install vsce: npm install -g vsce`);
    console.log(`   # Package: vsce package`);
    console.log(`   # Publish: vsce publish`);

  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export {
  loadTypeScriptConfig,
  loadTemplate,
  prepareTemplateContext,
  writeExtensionPackFiles
};
