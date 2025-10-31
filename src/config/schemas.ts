/**
 * Zod validation schemas for Collection configuration
 *
 * Provides runtime validation for Collection objects loaded from TypeScript config files
 */

import { z } from 'zod';

/**
 * Extension ID format validation
 * Must be in format: publisher.extension-name
 * Examples: 'ms-vscode.cpptools', 'llvm-vs-code-extensions.vscode-clangd'
 */
const EXTENSION_ID_REGEX = /^[a-z0-9-]+\.[a-z0-9-]+$/i;

/**
 * Zod schema for Extension interface
 */
export const ExtensionSchema = z.object({
  id: z
    .string()
    .min(1, 'Extension ID cannot be empty')
    .regex(EXTENSION_ID_REGEX, 'Extension ID must be in format: publisher.extension-name'),
  name: z.string().min(1, 'Extension name cannot be empty'),
  description: z.string().min(1, 'Extension description cannot be empty'),
  publisher: z.string().min(1, 'Extension publisher cannot be empty'),
  license: z.string().min(1, 'Extension license cannot be empty'),
  marketplace_url: z.url('Marketplace URL must be a valid URL').optional(),
  why_required: z.string().optional(),
  why_recommended: z.string().optional(),
});

/**
 * Zod schema for Setting interface
 */
export const SettingSchema = z.object({
  value: z.unknown(),
  description: z.string().min(1, 'Setting description cannot be empty'),
  scope: z.enum(['user', 'workspace'], {
    message: "Setting scope must be 'user' or 'workspace'",
  }),
});

/**
 * Zod schema for Keybinding interface
 */
export const KeybindingSchema = z.object({
  key: z.string().min(1, 'Keybinding key cannot be empty'),
  command: z.string().min(1, 'Keybinding command cannot be empty'),
  description: z.string().min(1, 'Keybinding description cannot be empty'),
  when: z.string().optional(),
});

/**
 * Zod schema for Snippet interface
 */
export const SnippetSchema = z.object({
  name: z.string().min(1, 'Snippet name cannot be empty'),
  prefix: z.string().min(1, 'Snippet prefix cannot be empty'),
  description: z.string().min(1, 'Snippet description cannot be empty'),
  body: z.union([z.string().min(1, 'Snippet body cannot be empty'), z.array(z.string()).min(1)]),
});

/**
 * Zod schema for Documentation interface
 */
export const DocumentationSchema = z.object({
  setup_guide: z.string().min(1, 'Documentation setup_guide cannot be empty'),
  troubleshooting: z.string().min(1, 'Documentation troubleshooting cannot be empty'),
});

/**
 * Zod schema for Collection interface
 */
export const CollectionSchema = z.object({
  description: z.string().min(1, 'Collection description cannot be empty'),
  tags: z.array(z.string()).min(1, 'Collection must have at least one tag'),
  required_extensions: z.array(ExtensionSchema).min(1, 'Collection must have at least one required extension'),
  optional_extensions: z.array(ExtensionSchema),
  settings: z.record(z.string(), SettingSchema),
  keybindings: z.array(KeybindingSchema),
  snippets: z.array(SnippetSchema),
  documentation: DocumentationSchema,
});

/**
 * Type inference from Zod schema
 */
export type ValidatedCollection = z.infer<typeof CollectionSchema>;
export type ValidatedExtension = z.infer<typeof ExtensionSchema>;
export type ValidatedSetting = z.infer<typeof SettingSchema>;
export type ValidatedKeybinding = z.infer<typeof KeybindingSchema>;
export type ValidatedSnippet = z.infer<typeof SnippetSchema>;
export type ValidatedDocumentation = z.infer<typeof DocumentationSchema>;
