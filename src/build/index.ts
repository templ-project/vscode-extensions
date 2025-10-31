/**
 * Build system module exports
 *
 * Provides template generation and extension pack building functionality.
 */

export { TemplateGenerator } from './TemplateGenerator.js';
export { readExistingVersion, isValidVersion } from './version-utils.js';
export { ExtensionPackBuilder } from './ExtensionPackBuilder.js';
export type { BuildOptions, BuildResult } from './ExtensionPackBuilder.js';
