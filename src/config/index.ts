/**
 * Configuration module exports
 */

export { ConfigLoader } from './ConfigLoader.js';
export type { ValidationResult } from './ConfigLoader.js';
export type {
  Collection,
  Extension,
  Setting,
  Keybinding,
  Snippet,
  Documentation,
  Metadata,
  ConfigurationFile,
} from './types.js';
export {
  CollectionSchema,
  ExtensionSchema,
  SettingSchema,
  KeybindingSchema,
  SnippetSchema,
  DocumentationSchema,
} from './schemas.js';
export type {
  ValidatedCollection,
  ValidatedExtension,
  ValidatedSetting,
  ValidatedKeybinding,
  ValidatedSnippet,
  ValidatedDocumentation,
} from './schemas.js';
