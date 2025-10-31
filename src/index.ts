#!/usr/bin/env node
/**
 * Main entry point for the VSCode Extension Pack Builder
 *
 * This module provides a CLI for building and publishing VSCode/VSCodium extension packs.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import { TemplateGenerator, readExistingVersion, isValidVersion, ExtensionPackBuilder } from './build/index.js';
import type { BuildOptions, BuildResult } from './build/index.js';
import { ConfigLoader } from './config/index.js';
import { BuildError, PublishError, NetworkError, VersionConflictError } from './errors.js';
import { createLogger, createChildLogger } from './logger.js';
import { MarketplacePublisher } from './publish/index.js';
import type { Marketplace } from './publish/index.js';

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
const marketplacePublisher = new MarketplacePublisher(logger);

/**
 * Build command handler
 */
async function buildCommand(
  ide: string,
  language: string,
  options: { output?: string; logosDir?: string; package?: boolean },
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
      'Build completed successfully',
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
 * Publish command handler
 */
async function publishCommand(vsixPattern: string, options: { marketplace?: string }): Promise<void> {
  try {
    const marketplace = (options.marketplace || 'both') as Marketplace;

    logger.info({ vsixPattern, marketplace }, 'Starting publish command');

    // Validate marketplace option
    if (!['vscode', 'openvsx', 'both'].includes(marketplace)) {
      logger.error({ marketplace }, 'Invalid marketplace specified');
      console.error(`Error: Marketplace must be 'vscode', 'openvsx', or 'both', got '${marketplace}'`);
      process.exit(1);
    }

    // Get PAT from environment based on marketplace
    let pat: string | undefined;
    if (marketplace === 'vscode' || marketplace === 'both') {
      pat = process.env.VSCODE_TOKEN;
      if (!pat) {
        console.error('❌ Error: VSCODE_TOKEN environment variable is required for VSCode Marketplace publishing');
        console.error('   Generate a token at: https://marketplace.visualstudio.com/manage');
        console.error('   Required scopes: Marketplace: Acquire, Marketplace: Publish');
        process.exit(1);
      }
    }

    if (marketplace === 'openvsx' || marketplace === 'both') {
      const openvsxPat = process.env.OPENVSX_TOKEN;
      if (!openvsxPat) {
        console.error('❌ Error: OPENVSX_TOKEN environment variable is required for Open VSX publishing');
        console.error('   Generate a token at: https://open-vsx.org/user-settings/tokens');
        process.exit(1);
      }
      // For 'openvsx' only, use OPENVSX_TOKEN
      if (marketplace === 'openvsx') {
        pat = openvsxPat;
      }
    }

    // TODO: Implement glob pattern resolution in S-014
    // For now, assume vsixPattern is a direct file path
    const vsixPath = vsixPattern;

    // Publish based on marketplace
    if (marketplace === 'both') {
      console.log('⚠️  Publishing to both marketplaces not yet implemented (will be completed in S-014)');
      console.log('   Please publish to vscode and openvsx separately for now.');
      process.exit(1);
    }

    // Publish to single marketplace
    const result = await marketplacePublisher.publish({
      pat: pat!,
      vsixPath,
      marketplace,
    });

    logger.info(
      {
        marketplace: result.marketplace,
        extensionId: result.extensionId,
        version: result.version,
        url: result.url,
      },
      'Publish completed successfully',
    );

    console.log(`✅ Publish successful!`);
    console.log(`   Extension: ${result.extensionId}`);
    console.log(`   Version: ${result.version}`);
    console.log(`   Marketplace: ${result.marketplace}`);
    console.log(`   URL: ${result.url}`);

    process.exit(0);
  } catch (error) {
    logger.error({ err: error, vsixPattern }, 'Publish command failed');

    if (error instanceof PublishError) {
      console.error(`❌ Publish failed: ${error.message}`);
      if (error.context) {
        console.error('   Details:');
        for (const [key, value] of Object.entries(error.context)) {
          if (key !== 'cause') {
            console.error(`   - ${key}: ${value}`);
          }
        }
      }
    } else if (error instanceof NetworkError) {
      console.error(`❌ Network error: ${error.message}`);
      if (error.context.hint) {
        console.error(`   ${error.context.hint}`);
      }
    } else if (error instanceof VersionConflictError) {
      console.error(`❌ Version conflict: ${error.message}`);
      if (error.context.hint) {
        console.error(`   ${error.context.hint}`);
      }
    } else {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`❌ Publish failed: ${errorMessage}`);
    }

    process.exit(1);
  }
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
    .description('Publish extension pack to marketplace')
    .argument('<vsix-path>', 'Path to .vsix file (e.g., dist/vscode/tpl-vscode-cpp-1.0.0.vsix)')
    .option('-m, --marketplace <name>', 'Target marketplace (vscode, openvsx, or both)', 'vscode')
    .action(publishCommand);

  // Parse arguments
  program.parse();
}

// Run CLI if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// Export for library usage
export {
  createLogger,
  createChildLogger,
  ConfigLoader,
  TemplateGenerator,
  readExistingVersion,
  isValidVersion,
  ExtensionPackBuilder,
  MarketplacePublisher,
};
export type { BuildOptions, BuildResult };
export type { Marketplace, PublishOptions, PublishResult } from './publish/index.js';
