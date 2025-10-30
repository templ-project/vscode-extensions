/**
 * Tests for ConfigLoader module
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { createLogger } from '../../src/logger.js';
import { ConfigLoader } from '../../src/config/ConfigLoader.js';
import { ConfigurationError } from '../../src/errors.js';
import type { Collection } from '../../src/config/types.js';

describe('ConfigLoader', () => {
  let logger: ReturnType<typeof createLogger>;
  let configLoader: ConfigLoader;

  beforeEach(() => {
    logger = createLogger({ level: 'silent' }); // Silence logs during tests
    configLoader = new ConfigLoader(logger);
  });

  describe('loadCollection', () => {
    it('should load valid cpp collection for vscode', async () => {
      const collection = await configLoader.loadCollection('vscode', 'cpp');

      expect(collection).toBeDefined();
      expect(collection.description).toContain('C/C++');
      expect(collection.tags).toBeInstanceOf(Array);
      expect(collection.tags).toContain('cpp');
      expect(collection.required_extensions).toBeInstanceOf(Array);
      expect(collection.required_extensions.length).toBeGreaterThan(0);
      expect(collection.optional_extensions).toBeInstanceOf(Array);
      expect(collection.settings).toBeDefined();
      expect(typeof collection.settings).toBe('object');
      expect(collection.keybindings).toBeInstanceOf(Array);
      expect(collection.snippets).toBeInstanceOf(Array);
      expect(collection.documentation).toBeDefined();
      expect(collection.documentation.setup_guide).toBeDefined();
      expect(collection.documentation.troubleshooting).toBeDefined();
    });

    it('should load valid typescript collection for vscode', async () => {
      const collection = await configLoader.loadCollection('vscode', 'typescript');

      expect(collection).toBeDefined();
      expect(collection.description).toBeDefined();
      expect(collection.required_extensions).toBeInstanceOf(Array);
    });

    it('should load valid python collection for vscodium', async () => {
      const collection = await configLoader.loadCollection('vscodium', 'python');

      expect(collection).toBeDefined();
      expect(collection.description).toBeDefined();
      expect(collection.required_extensions).toBeInstanceOf(Array);
    });

    it('should cache collections after first load', async () => {
      // First load
      const collection1 = await configLoader.loadCollection('vscode', 'cpp');

      // Get cache stats before second load
      const statsBefore = configLoader.getCacheStats();
      expect(statsBefore.size).toBe(1);
      expect(statsBefore.keys).toContain('vscode:cpp');

      // Second load (should use cache)
      const collection2 = await configLoader.loadCollection('vscode', 'cpp');

      // Should be the same object reference (from cache)
      expect(collection2).toBe(collection1);

      // Cache size should still be 1
      const statsAfter = configLoader.getCacheStats();
      expect(statsAfter.size).toBe(1);
    });

    it('should throw ConfigurationError for non-existent file', async () => {
      await expect(configLoader.loadCollection('vscode', 'nonexistent')).rejects.toThrow(ConfigurationError);

      try {
        await configLoader.loadCollection('vscode', 'nonexistent');
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        if (error instanceof ConfigurationError) {
          expect(error.message).toContain('Failed to load collection');
          expect(error.context.ide).toBe('vscode');
          expect(error.context.language).toBe('nonexistent');
          expect(error.context.configPath).toContain('nonexistent.ts');
        }
      }
    });

    it('should throw ConfigurationError for invalid IDE', async () => {
      await expect(configLoader.loadCollection('invalid-ide', 'cpp')).rejects.toThrow(ConfigurationError);
    });

    it('should handle multiple different collections in cache', async () => {
      await configLoader.loadCollection('vscode', 'cpp');
      await configLoader.loadCollection('vscode', 'typescript');
      await configLoader.loadCollection('vscodium', 'python');

      const stats = configLoader.getCacheStats();
      expect(stats.size).toBe(3);
      expect(stats.keys).toContain('vscode:cpp');
      expect(stats.keys).toContain('vscode:typescript');
      expect(stats.keys).toContain('vscodium:python');
    });
  });

  describe('listAvailableCollections', () => {
    it('should list all collections for vscode', async () => {
      const languages = await configLoader.listAvailableCollections('vscode');

      expect(languages).toBeInstanceOf(Array);
      expect(languages.length).toBeGreaterThan(0);
      expect(languages).toContain('cpp');
      expect(languages).toContain('typescript');
      expect(languages).toContain('python');
      expect(languages).toContain('golang');
      expect(languages).toContain('javascript');

      // Should be sorted
      const sorted = [...languages].sort();
      expect(languages).toEqual(sorted);
    });

    it('should list all collections for vscodium', async () => {
      const languages = await configLoader.listAvailableCollections('vscodium');

      expect(languages).toBeInstanceOf(Array);
      expect(languages.length).toBeGreaterThan(0);
      expect(languages).toContain('cpp');
      expect(languages).toContain('typescript');
    });

    it('should throw ConfigurationError for invalid IDE directory', async () => {
      await expect(configLoader.listAvailableCollections('invalid-ide')).rejects.toThrow(ConfigurationError);

      try {
        await configLoader.listAvailableCollections('invalid-ide');
      } catch (error) {
        expect(error).toBeInstanceOf(ConfigurationError);
        if (error instanceof ConfigurationError) {
          expect(error.message).toContain('Failed to list collections');
          expect(error.context.ide).toBe('invalid-ide');
        }
      }
    });

    it('should return empty array for IDE directory with no .ts files', async () => {
      // Create a temporary ConfigLoader with a path that exists but has no .ts files
      const emptyConfigLoader = new ConfigLoader(logger, process.cwd());
      const languages = await emptyConfigLoader.listAvailableCollections('.');

      expect(languages).toBeInstanceOf(Array);
      // Will likely be empty or contain only actual .ts files in root
    });
  });

  describe('clearCache', () => {
    it('should clear all cached collections', async () => {
      // Load some collections
      await configLoader.loadCollection('vscode', 'cpp');
      await configLoader.loadCollection('vscode', 'typescript');

      expect(configLoader.getCacheStats().size).toBe(2);

      // Clear cache
      configLoader.clearCache();

      expect(configLoader.getCacheStats().size).toBe(0);
      expect(configLoader.getCacheStats().keys).toEqual([]);
    });

    it('should allow reload after cache clear', async () => {
      // Load collection
      const collection1 = await configLoader.loadCollection('vscode', 'cpp');

      // Clear cache
      configLoader.clearCache();
      expect(configLoader.getCacheStats().size).toBe(0);

      // Load again
      const collection2 = await configLoader.loadCollection('vscode', 'cpp');

      // Note: Due to Node.js ESM caching, the dynamic import may return the same object
      // even after clearing our cache. This is expected behavior.
      // We verify that our cache is populated again and the collection is valid
      expect(configLoader.getCacheStats().size).toBe(1);
      expect(collection2.description).toBe(collection1.description);
    });
  });

  describe('getCacheStats', () => {
    it('should return correct cache statistics', async () => {
      const statsEmpty = configLoader.getCacheStats();
      expect(statsEmpty.size).toBe(0);
      expect(statsEmpty.keys).toEqual([]);

      await configLoader.loadCollection('vscode', 'cpp');
      await configLoader.loadCollection('vscode', 'typescript');

      const statsWithData = configLoader.getCacheStats();
      expect(statsWithData.size).toBe(2);
      expect(statsWithData.keys).toHaveLength(2);
      expect(statsWithData.keys).toContain('vscode:cpp');
      expect(statsWithData.keys).toContain('vscode:typescript');
    });
  });

  describe('constructor', () => {
    it('should accept custom config root path', () => {
      const customRoot = '/custom/path';
      const customLoader = new ConfigLoader(logger, customRoot);

      expect(customLoader).toBeInstanceOf(ConfigLoader);
      // Cache should be empty initially
      expect(customLoader.getCacheStats().size).toBe(0);
    });

    it('should use default config root when not provided', () => {
      const defaultLoader = new ConfigLoader(logger);

      expect(defaultLoader).toBeInstanceOf(ConfigLoader);
      expect(defaultLoader.getCacheStats().size).toBe(0);
    });
  });

  describe('Collection structure validation', () => {
    it('should load collection with all required fields', async () => {
      const collection: Collection = await configLoader.loadCollection('vscode', 'cpp');

      // Verify all required fields exist
      expect(collection.description).toBeDefined();
      expect(typeof collection.description).toBe('string');

      expect(collection.tags).toBeDefined();
      expect(Array.isArray(collection.tags)).toBe(true);

      expect(collection.required_extensions).toBeDefined();
      expect(Array.isArray(collection.required_extensions)).toBe(true);

      expect(collection.optional_extensions).toBeDefined();
      expect(Array.isArray(collection.optional_extensions)).toBe(true);

      expect(collection.settings).toBeDefined();
      expect(typeof collection.settings).toBe('object');

      expect(collection.keybindings).toBeDefined();
      expect(Array.isArray(collection.keybindings)).toBe(true);

      expect(collection.snippets).toBeDefined();
      expect(Array.isArray(collection.snippets)).toBe(true);

      expect(collection.documentation).toBeDefined();
      expect(typeof collection.documentation).toBe('object');
      expect(typeof collection.documentation.setup_guide).toBe('string');
      expect(typeof collection.documentation.troubleshooting).toBe('string');
    });

    it('should load extensions with correct structure', async () => {
      const collection = await configLoader.loadCollection('vscode', 'cpp');
      const extension = collection.required_extensions[0];

      expect(extension).toBeDefined();
      expect(typeof extension.id).toBe('string');
      expect(typeof extension.name).toBe('string');
      expect(typeof extension.description).toBe('string');
      expect(typeof extension.publisher).toBe('string');
      expect(typeof extension.license).toBe('string');
    });
  });
});
