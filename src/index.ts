/**
 * Main entry point for the VSCode Extension Pack Builder
 *
 * This module orchestrates the build and publish workflows for VSCode/VSCodium extension packs.
 */

import { createLogger, createChildLogger } from './logger.js';
import { ConfigLoader } from './config/index.js';
import { TemplateGenerator } from './build/index.js';

// Create root logger
const logger = createLogger();

// Log startup message
logger.info('VSCode Extension Pack Builder initialized');

// Initialize ConfigLoader (example)
const configLoader = new ConfigLoader(logger);

// Initialize TemplateGenerator (example)
const templateGenerator = new TemplateGenerator(logger);

// Example of creating child loggers for modules (to be used in future stories)
// const builder = createChildLogger(logger, { module: 'ExtensionPackBuilder' });
// const publisher = createChildLogger(logger, { module: 'MarketplacePublisher' });

export { createLogger, createChildLogger, ConfigLoader, TemplateGenerator };
