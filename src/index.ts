/**
 * Main entry point for the VSCode Extension Pack Builder
 *
 * This module orchestrates the build and publish workflows for VSCode/VSCodium extension packs.
 */

import { createLogger, createChildLogger } from './logger.js';

// Create root logger
const logger = createLogger();

// Log startup message
logger.info('VSCode Extension Pack Builder initialized');

// Example of creating child loggers for modules (to be used in future stories)
// const configLoader = createChildLogger(logger, { module: 'ConfigLoader' });
// const builder = createChildLogger(logger, { module: 'ExtensionPackBuilder' });
// const publisher = createChildLogger(logger, { module: 'MarketplacePublisher' });

export { createLogger, createChildLogger };
