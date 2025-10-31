/**
 * ConfigLoader - Dynamically loads TypeScript collection files
 *
 * Loads and caches Collection configurations from config/collections/{ide}/{language}.ts
 */

import { readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import type pino from 'pino';
import type { ZodError } from 'zod';
import { ConfigurationError, ValidationError } from '../errors.js';
import { CollectionSchema } from './schemas.js';
import type { Collection } from './types.js';

/**
 * Cache for loaded collections to avoid redundant imports
 */
type CollectionCache = Map<string, Collection>;

/**
 * ConfigLoader class for loading and caching TypeScript collection files
 */
export class ConfigLoader {
  private readonly logger: pino.Logger;
  private readonly cache: CollectionCache;
  private readonly configRoot: string;

  /**
   * Create a new ConfigLoader instance
   *
   * @param logger - Parent pino logger instance
   * @param configRoot - Root directory for config files (default: config/collections)
   *
   * @example
   * ```typescript
   * const logger = createLogger();
   * const configLoader = new ConfigLoader(logger);
   * const collection = await configLoader.loadCollection('vscode', 'cpp');
   * ```
   */
  constructor(logger: pino.Logger, configRoot?: string) {
    this.logger = logger.child({ module: 'ConfigLoader' });
    this.cache = new Map();
    this.configRoot = configRoot || join(process.cwd(), 'config/collections');
    this.logger.debug({ configRoot: this.configRoot }, 'ConfigLoader initialized');
  }

  /**
   * Load a collection configuration file
   *
   * @param ide - IDE type ('vscode' or 'vscodium')
   * @param language - Language name (e.g., 'cpp', 'typescript', 'python')
   * @returns Promise resolving to Collection object
   * @throws {ConfigurationError} If file not found or import fails
   *
   * @example
   * ```typescript
   * const collection = await configLoader.loadCollection('vscode', 'cpp');
   * console.log(collection.description);
   * ```
   */
  async loadCollection(ide: string, language: string): Promise<Collection> {
    const cacheKey = `${ide}:${language}`;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      this.logger.debug({ ide, language, cached: true }, 'Collection loaded from cache');
      return this.cache.get(cacheKey)!;
    }

    // Build file path
    const configPath = resolve(this.configRoot, ide, `${language}.ts`);
    this.logger.debug({ ide, language, configPath }, 'Loading collection from file');

    try {
      // Dynamic import with file:// protocol for proper ESM resolution
      const fileUrl = `file://${configPath}`;
      const module = await import(fileUrl);

      // Extract collection from module (support both default and named exports)
      // Try: default export, kebab-case name, camelCase name
      const camelCaseName = language.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      const collection: Collection | undefined = module.default || module[language] || module[camelCaseName];

      if (!collection) {
        throw new ConfigurationError(`Collection not found in module: ${configPath}`, {
          configPath,
          ide,
          language,
          availableExports: Object.keys(module),
          hint: `Expected default export or named export '${language}' or '${camelCaseName}'`,
        });
      }

      // Cache the loaded collection
      this.cache.set(cacheKey, collection);

      this.logger.info({ ide, language, configPath }, 'Collection loaded successfully');
      return collection;
    } catch (error) {
      // Re-throw ConfigurationError as-is
      if (error instanceof ConfigurationError) {
        this.logger.error({ err: error, ide, language, configPath }, 'Configuration error');
        throw error;
      }

      // Wrap other errors in ConfigurationError
      const errorMessage = error instanceof Error ? error.message : String(error);
      const configError = new ConfigurationError(`Failed to load collection: ${errorMessage}`, {
        configPath,
        ide,
        language,
        originalError: errorMessage,
        cause: error,
      });

      this.logger.error({ err: configError, ide, language, configPath }, 'Failed to load collection');
      throw configError;
    }
  }

  /**
   * List all available collections for a given IDE
   *
   * @param ide - IDE type ('vscode' or 'vscodium')
   * @returns Promise resolving to array of language names
   * @throws {ConfigurationError} If IDE directory not found or not readable
   *
   * @example
   * ```typescript
   * const languages = await configLoader.listAvailableCollections('vscode');
   * // ['cpp', 'typescript', 'python', 'golang', ...]
   * ```
   */
  async listAvailableCollections(ide: string): Promise<string[]> {
    const idePath = resolve(this.configRoot, ide);
    this.logger.debug({ ide, idePath }, 'Listing available collections');

    try {
      const files = await readdir(idePath);

      // Filter for .ts files and extract language names
      const languages = files.filter((file) => file.endsWith('.ts')).map((file) => file.slice(0, -3));

      this.logger.debug({ ide, languages, count: languages.length }, 'Collections found');
      return languages.sort();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const configError = new ConfigurationError(`Failed to list collections for IDE '${ide}': ${errorMessage}`, {
        idePath,
        ide,
        originalError: errorMessage,
        cause: error,
      });

      this.logger.error({ err: configError, ide, idePath }, 'Failed to list collections');
      throw configError;
    }
  }

  /**
   * Clear the collection cache
   *
   * Useful for testing or forcing a reload of collections
   *
   * @example
   * ```typescript
   * configLoader.clearCache();
   * ```
   */
  clearCache(): void {
    const size = this.cache.size;
    this.cache.clear();
    this.logger.debug({ clearedEntries: size }, 'Cache cleared');
  }

  /**
   * Get cache statistics
   *
   * @returns Object containing cache size and keys
   *
   * @example
   * ```typescript
   * const stats = configLoader.getCacheStats();
   * console.log(`Cache contains ${stats.size} entries`);
   * ```
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  /**
   * Validate a collection object against the Zod schema
   *
   * @param collection - Collection object to validate
   * @param context - Optional context for error messages (ide, language)
   * @returns ValidationResult with isValid flag and errors array
   *
   * @example
   * ```typescript
   * const collection = await configLoader.loadCollection('vscode', 'cpp');
   * const result = configLoader.validateCollection(collection, { ide: 'vscode', language: 'cpp' });
   * if (!result.isValid) {
   *   console.error('Validation errors:', result.errors);
   * }
   * ```
   */
  validateCollection(collection: unknown, context?: { ide?: string; language?: string }): ValidationResult {
    try {
      // Validate using Zod schema
      CollectionSchema.parse(collection);

      this.logger.debug({ context }, 'Collection validation passed');
      return {
        isValid: true,
        errors: [],
      };
    } catch (error) {
      // Handle Zod validation errors
      if (this.isZodError(error)) {
        const errors = error.issues.map((issue) => {
          const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
          return `${path}: ${issue.message}`;
        });

        this.logger.warn(
          {
            context,
            errors,
            issueCount: error.issues.length,
          },
          'Collection validation failed',
        );

        return {
          isValid: false,
          errors,
        };
      }

      // Handle unexpected errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error({ err: error, context }, 'Unexpected validation error');

      return {
        isValid: false,
        errors: [`Unexpected validation error: ${errorMessage}`],
      };
    }
  }

  /**
   * Validate and throw if collection is invalid
   *
   * Convenience method that validates and throws ValidationError if invalid
   *
   * @param collection - Collection object to validate
   * @param context - Context for error messages (ide, language)
   * @throws {ValidationError} If validation fails
   *
   * @example
   * ```typescript
   * const collection = await configLoader.loadCollection('vscode', 'cpp');
   * configLoader.validateAndThrow(collection, { ide: 'vscode', language: 'cpp' });
   * // If we reach here, collection is valid
   * ```
   */
  validateAndThrow(collection: unknown, context: { ide: string; language: string }): void {
    const result = this.validateCollection(collection, context);

    if (!result.isValid) {
      const validationError = new ValidationError(
        `Collection validation failed for ${context.ide}/${context.language}`,
        {
          ide: context.ide,
          language: context.language,
          errors: result.errors,
          errorCount: result.errors.length,
        },
      );

      this.logger.error(
        {
          err: validationError,
          context,
          errors: result.errors,
        },
        'Collection validation failed',
      );

      throw validationError;
    }
  }

  /**
   * Type guard for Zod errors
   */
  private isZodError(error: unknown): error is ZodError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'issues' in error &&
      Array.isArray((error as { issues: unknown }).issues)
    );
  }
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
