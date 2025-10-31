/**
 * Tests for Collection validation with Zod schemas
 */

import { describe, expect, it, beforeEach } from 'vitest';
import { ConfigLoader } from '../../src/config/ConfigLoader.js';
import type { Collection } from '../../src/config/types.js';
import { ValidationError } from '../../src/errors.js';
import { createLogger } from '../../src/logger.js';

describe('ConfigLoader Validation', () => {
  let logger: ReturnType<typeof createLogger>;
  let configLoader: ConfigLoader;

  beforeEach(() => {
    logger = createLogger({ level: 'silent' }); // Silence logs during tests
    configLoader = new ConfigLoader(logger);
  });

  describe('validateCollection', () => {
    it('should validate collection with valid data', async () => {
      // Load a real collection from the filesystem
      const collection = await configLoader.loadCollection('vscode', 'cpp');

      // Validate it
      const result = configLoader.validateCollection(collection, {
        ide: 'vscode',
        language: 'cpp',
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should validate all existing collections', async () => {
      // Get all available collections
      const languages = await configLoader.listAvailableCollections('vscode');

      // Validate each one
      for (const language of languages.slice(0, 3)) {
        // Test first 3 to keep tests fast
        const collection = await configLoader.loadCollection('vscode', language);
        const result = configLoader.validateCollection(collection, {
          ide: 'vscode',
          language,
        });

        expect(result.isValid).toBe(true);
        expect(result.errors).toEqual([]);
      }
    });

    it('should reject collection with invalid extension ID', () => {
      const invalidCollection = {
        description: 'Test collection',
        tags: ['test'],
        required_extensions: [
          {
            id: 'invalid', // Missing publisher.extension format
            name: 'Invalid Extension',
            description: 'Test',
            publisher: 'Test',
            license: 'MIT',
          },
        ],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: 'Test guide',
          troubleshooting: 'Test troubleshooting',
        },
      };

      const result = configLoader.validateCollection(invalidCollection);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.includes('Extension ID must be in format'))).toBe(true);
    });

    it('should reject collection with empty required_extensions', () => {
      const invalidCollection = {
        description: 'Test collection',
        tags: ['test'],
        required_extensions: [], // Empty array - should fail
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: 'Test guide',
          troubleshooting: 'Test troubleshooting',
        },
      };

      const result = configLoader.validateCollection(invalidCollection);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.includes('at least one required extension'))).toBe(true);
    });

    it('should reject collection with invalid setting scope', () => {
      const invalidCollection = {
        description: 'Test collection',
        tags: ['test'],
        required_extensions: [
          {
            id: 'test.extension',
            name: 'Test Extension',
            description: 'Test',
            publisher: 'Test',
            license: 'MIT',
          },
        ],
        optional_extensions: [],
        settings: {
          'test.setting': {
            value: 'test',
            description: 'Test setting',
            scope: 'invalid', // Invalid scope - should be 'user' or 'workspace'
          },
        },
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: 'Test guide',
          troubleshooting: 'Test troubleshooting',
        },
      };

      const result = configLoader.validateCollection(invalidCollection);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.includes("scope must be 'user' or 'workspace'"))).toBe(true);
    });

    it('should reject collection with empty documentation fields', () => {
      const invalidCollection = {
        description: 'Test collection',
        tags: ['test'],
        required_extensions: [
          {
            id: 'test.extension',
            name: 'Test Extension',
            description: 'Test',
            publisher: 'Test',
            license: 'MIT',
          },
        ],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: '', // Empty - should fail
          troubleshooting: '', // Empty - should fail
        },
      };

      const result = configLoader.validateCollection(invalidCollection);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.includes('setup_guide'))).toBe(true);
      expect(result.errors.some((e) => e.includes('troubleshooting'))).toBe(true);
    });

    it('should reject collection with missing required fields', () => {
      const invalidCollection = {
        description: 'Test collection',
        // Missing tags, required_extensions, etc.
      };

      const result = configLoader.validateCollection(invalidCollection);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject collection with invalid marketplace_url', () => {
      const invalidCollection = {
        description: 'Test collection',
        tags: ['test'],
        required_extensions: [
          {
            id: 'test.extension',
            name: 'Test Extension',
            description: 'Test',
            publisher: 'Test',
            license: 'MIT',
            marketplace_url: 'not-a-url', // Invalid URL
          },
        ],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: 'Test guide',
          troubleshooting: 'Test troubleshooting',
        },
      };

      const result = configLoader.validateCollection(invalidCollection);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some((e) => e.includes('URL'))).toBe(true);
    });

    it('should accept collection with valid optional fields', () => {
      const validCollection: Collection = {
        description: 'Test collection',
        tags: ['test', 'demo'],
        required_extensions: [
          {
            id: 'test.extension',
            name: 'Test Extension',
            description: 'Test extension description',
            publisher: 'Test Publisher',
            license: 'MIT',
            marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=test.extension',
            why_required: 'This is required for testing',
          },
        ],
        optional_extensions: [
          {
            id: 'optional.extension',
            name: 'Optional Extension',
            description: 'Optional extension description',
            publisher: 'Optional Publisher',
            license: 'Apache-2.0',
            why_recommended: 'This is recommended for better testing',
          },
        ],
        settings: {
          'test.setting': {
            value: true,
            description: 'Test boolean setting',
            scope: 'workspace',
          },
          'test.stringSetting': {
            value: 'test value',
            description: 'Test string setting',
            scope: 'user',
          },
        },
        keybindings: [
          {
            key: 'ctrl+shift+t',
            command: 'test.command',
            description: 'Test keybinding',
            when: "editorTextFocus && editorLangId == 'test'",
          },
        ],
        snippets: [
          {
            name: 'test-snippet',
            prefix: 'test',
            description: 'Test snippet',
            body: 'console.log("test");',
          },
          {
            name: 'multi-line-snippet',
            prefix: 'multi',
            description: 'Multi-line snippet',
            body: ['line 1', 'line 2', 'line 3'],
          },
        ],
        documentation: {
          setup_guide: '# Setup\nFollow these steps...',
          troubleshooting: '# Troubleshooting\nIf you encounter issues...',
        },
      };

      const result = configLoader.validateCollection(validCollection);

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should handle non-object input gracefully', () => {
      const result1 = configLoader.validateCollection(null);
      expect(result1.isValid).toBe(false);

      const result2 = configLoader.validateCollection(undefined);
      expect(result2.isValid).toBe(false);

      const result3 = configLoader.validateCollection('not an object');
      expect(result3.isValid).toBe(false);

      const result4 = configLoader.validateCollection(42);
      expect(result4.isValid).toBe(false);
    });
  });

  describe('validateAndThrow', () => {
    it('should not throw for valid collection', async () => {
      const collection = await configLoader.loadCollection('vscode', 'cpp');

      expect(() => {
        configLoader.validateAndThrow(collection, {
          ide: 'vscode',
          language: 'cpp',
        });
      }).not.toThrow();
    });

    it('should throw ValidationError for invalid collection', () => {
      const invalidCollection = {
        description: 'Test collection',
        tags: ['test'],
        required_extensions: [], // Empty - should fail
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: 'Test guide',
          troubleshooting: 'Test troubleshooting',
        },
      };

      expect(() => {
        configLoader.validateAndThrow(invalidCollection, {
          ide: 'vscode',
          language: 'test',
        });
      }).toThrow(ValidationError);
    });

    it('should include context in ValidationError', () => {
      const invalidCollection = {
        description: 'Test collection',
        tags: ['test'],
        required_extensions: [],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [],
        documentation: {
          setup_guide: 'Test guide',
          troubleshooting: 'Test troubleshooting',
        },
      };

      try {
        configLoader.validateAndThrow(invalidCollection, {
          ide: 'vscode',
          language: 'test',
        });
        // Should not reach here
        expect.fail('Expected ValidationError to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        if (error instanceof ValidationError) {
          expect(error.message).toContain('vscode/test');
          expect(error.context.ide).toBe('vscode');
          expect(error.context.language).toBe('test');
          expect(error.context.errors).toBeDefined();
          expect(Array.isArray(error.context.errors)).toBe(true);
        }
      }
    });
  });

  describe('Extension ID validation', () => {
    it('should accept valid extension IDs', () => {
      const validIds = [
        'ms-vscode.cpptools',
        'llvm-vs-code-extensions.vscode-clangd',
        'publisher.extension',
        'my-publisher.my-extension',
        'test123.extension456',
      ];

      for (const id of validIds) {
        const collection = {
          description: 'Test',
          tags: ['test'],
          required_extensions: [
            {
              id,
              name: 'Test',
              description: 'Test',
              publisher: 'Test',
              license: 'MIT',
            },
          ],
          optional_extensions: [],
          settings: {},
          keybindings: [],
          snippets: [],
          documentation: {
            setup_guide: 'Test',
            troubleshooting: 'Test',
          },
        };

        const result = configLoader.validateCollection(collection);
        expect(result.isValid).toBe(true);
      }
    });

    it('should reject invalid extension IDs', () => {
      const invalidIds = [
        'invalid', // No publisher
        'no.dots.allowed.here', // Too many dots
        '.extension', // No publisher
        'publisher.', // No extension name
        'publisher..extension', // Empty part
        '', // Empty
      ];

      for (const id of invalidIds) {
        const collection = {
          description: 'Test',
          tags: ['test'],
          required_extensions: [
            {
              id,
              name: 'Test',
              description: 'Test',
              publisher: 'Test',
              license: 'MIT',
            },
          ],
          optional_extensions: [],
          settings: {},
          keybindings: [],
          snippets: [],
          documentation: {
            setup_guide: 'Test',
            troubleshooting: 'Test',
          },
        };

        const result = configLoader.validateCollection(collection);
        expect(result.isValid).toBe(false);
      }
    });
  });

  describe('Snippet body validation', () => {
    it('should accept string snippet body', () => {
      const collection = {
        description: 'Test',
        tags: ['test'],
        required_extensions: [
          {
            id: 'test.extension',
            name: 'Test',
            description: 'Test',
            publisher: 'Test',
            license: 'MIT',
          },
        ],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [
          {
            name: 'test',
            prefix: 'test',
            description: 'Test snippet',
            body: 'console.log("test");',
          },
        ],
        documentation: {
          setup_guide: 'Test',
          troubleshooting: 'Test',
        },
      };

      const result = configLoader.validateCollection(collection);
      expect(result.isValid).toBe(true);
    });

    it('should accept array snippet body', () => {
      const collection = {
        description: 'Test',
        tags: ['test'],
        required_extensions: [
          {
            id: 'test.extension',
            name: 'Test',
            description: 'Test',
            publisher: 'Test',
            license: 'MIT',
          },
        ],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [
          {
            name: 'test',
            prefix: 'test',
            description: 'Test snippet',
            body: ['line 1', 'line 2', 'line 3'],
          },
        ],
        documentation: {
          setup_guide: 'Test',
          troubleshooting: 'Test',
        },
      };

      const result = configLoader.validateCollection(collection);
      expect(result.isValid).toBe(true);
    });

    it('should reject empty string snippet body', () => {
      const collection = {
        description: 'Test',
        tags: ['test'],
        required_extensions: [
          {
            id: 'test.extension',
            name: 'Test',
            description: 'Test',
            publisher: 'Test',
            license: 'MIT',
          },
        ],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [
          {
            name: 'test',
            prefix: 'test',
            description: 'Test snippet',
            body: '', // Empty string - should fail
          },
        ],
        documentation: {
          setup_guide: 'Test',
          troubleshooting: 'Test',
        },
      };

      const result = configLoader.validateCollection(collection);
      expect(result.isValid).toBe(false);
    });

    it('should reject empty array snippet body', () => {
      const collection = {
        description: 'Test',
        tags: ['test'],
        required_extensions: [
          {
            id: 'test.extension',
            name: 'Test',
            description: 'Test',
            publisher: 'Test',
            license: 'MIT',
          },
        ],
        optional_extensions: [],
        settings: {},
        keybindings: [],
        snippets: [
          {
            name: 'test',
            prefix: 'test',
            description: 'Test snippet',
            body: [], // Empty array - should fail
          },
        ],
        documentation: {
          setup_guide: 'Test',
          troubleshooting: 'Test',
        },
      };

      const result = configLoader.validateCollection(collection);
      expect(result.isValid).toBe(false);
    });
  });
});
