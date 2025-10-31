#!/usr/bin/env node
/**
 * Main entry point for the VSCode Extension Pack Builder
 *
 * This module provides a CLI for building and publishing VSCode/VSCodium extension packs.
 */

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createLogger, createChildLogger } from './logger.js';
import { ConfigLoader } from './config/index.js';
import { TemplateGenerator, readExistingVersion, isValidVersion, ExtensionPackBuilder } from './build/index.js';
import type { BuildOptions, BuildResult } from './build/index.js';
import { BuildError } from './errors.js';

// Get package.json for version
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

// Create root logger
const logger = createLogger();

// Initialize modules
const configLoader = new ConfigLoader(logger);
const templateGenerator = new TemplateGenerator(logger);
const extensionPackBuilder = new ExtensionPackBuilder(logger, templateGenerator);

/**
 * Build command handler
 */
async function buildCommand(
  ide: string,
  language: string,
  options: { output?: string; logosDir?: string; package?: boolean }
): Promise<void> {
  try {
    logger.info({ ide, language, options }, 'Starting build command');

    // Validate IDE
    if (ide !== 'vscode' && ide !== 'vscodium') {
      logger.error({ ide }, 'Invalid IDE specified');
      console.error(`Error: IDE must be 'vscode' or 'vscodium', got '${ide}'`);
      process.exit(1);
    }

    // Load collection
    logger.debug({ ide, language }, 'Loading collection');
    const collection = await configLoader.loadCollection(ide, language);

    // Build extension pack
    const buildOptions: BuildOptions = {
      ide: ide as 'vscode' | 'vscodium',
      language,
      outputDir: options.output || process.cwd(),
      logosDir: options.logosDir || 'logos',
      packageVSIX: options.package || false,
    };

    logger.info({ buildOptions }, 'Building extension pack');
    const result = await extensionPackBuilder.build(collection, buildOptions);

    // Log success
    logger.info(
      {
        packageDir: result.packageDir,
        fileCount: result.files.length,
        vsixPath: result.vsixPath,
      },
      'Build completed successfully'
    );

    console.log(`✅ Build successful!`);
    console.log(`   Package directory: ${result.packageDir}`);
    console.log(`   Files generated: ${result.files.length}`);
    if (result.vsixPath) {
      console.log(`   VSIX file: ${result.vsixPath}`);
    }

    process.exit(0);
  } catch (error) {
    logger.error({ err: error, ide, language }, 'Build command failed');

    if (error instanceof BuildError) {
      console.error(`❌ Build failed: ${error.message}`);
      if (error.context) {
        console.error('   Context:', JSON.stringify(error.context, null, 2));
      }
    } else {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`❌ Build failed: ${errorMessage}`);
    }

    process.exit(1);
  }
}

/**
 * Publish command handler (stub for S-012/S-013)
 */
async function publishCommand(
  vsixPattern: string,
  options: { marketplace?: string }
): Promise<void> {
  logger.info({ vsixPattern, marketplace: options.marketplace }, 'Publish command called (not yet implemented)');

  console.log('📦 Publish command');
  console.log(`   Pattern: ${vsixPattern}`);
  console.log(`   Marketplace: ${options.marketplace || 'both'}`);
  console.log('\n⚠️  Publishing not yet implemented (will be completed in S-012/S-013)');

  process.exit(0);
}

/**
 * Main CLI setup
 */
function main(): void {
  const program = new Command();

  program
    .name('vscode-ext-builder')
    .description('Build and publish VSCode/VSCodium extension packs')
    .version(packageJson.version)
    .showHelpAfterError(true);

  // Build command
  program
    .command('build')
    .description('Build an extension pack for a specific IDE and language')
    .argument('<ide>', 'Target IDE (vscode or vscodium)')
    .argument('<language>', 'Programming language (cpp, typescript, python, etc.)')
    .option('-o, --output <dir>', 'Output directory for generated files', process.cwd())
    .option('-l, --logos-dir <dir>', 'Directory containing logo files', 'logos')
    .option('-p, --package', 'Package extension into .vsix file', false)
    .action(buildCommand);

  // Publish command
  program
    .command('publish')
    .description('Publish extension packs to marketplaces (stub)')
    .argument('<vsix-pattern>', 'Glob pattern for .vsix files (e.g., dist/vscode/*.vsix)')
    .option('-m, --marketplace <name>', 'Target marketplace (vscode, openvsx, or both)', 'both')
    .action(publishCommand);

  // Parse arguments
  program.parse();
}

// Run CLI if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// Export for library usage
export { createLogger, createChildLogger, ConfigLoader, TemplateGenerator, readExistingVersion, isValidVersion, ExtensionPackBuilder };
export type { BuildOptions, BuildResult };
