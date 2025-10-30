/**
 * Type definitions for configuration module
 *
 * These types match the interfaces defined in scripts/configs/shared/types.ts
 * Duplicated here to avoid importing from outside TypeScript rootDir
 */

export interface Extension {
  id: string;
  name: string;
  description: string;
  publisher: string;
  license: string;
  marketplace_url?: string;
  why_required?: string;
  why_recommended?: string;
}

export interface Setting {
  value: unknown;
  description: string;
  scope: 'user' | 'workspace';
}

export interface Keybinding {
  key: string;
  command: string;
  description: string;
  when?: string;
}

export interface Snippet {
  name: string;
  prefix: string;
  description: string;
  body: string | string[];
}

export interface Documentation {
  setup_guide: string;
  troubleshooting: string;
}

export interface Collection {
  description: string;
  tags: string[];
  required_extensions: Extension[];
  optional_extensions: Extension[];
  settings: Record<string, Setting>;
  keybindings: Keybinding[];
  snippets: Snippet[];
  documentation: Documentation;
}

export interface Metadata {
  name: string;
  description: string;
  version: string;
  maintainer: string;
  organization: string;
  publisher: string;
  repositoryUrl: string;
  ide: string;
  created: string;
  updated: string;
}

export interface ConfigurationFile {
  metadata: Metadata;
  collections: Record<string, Collection>;
}
