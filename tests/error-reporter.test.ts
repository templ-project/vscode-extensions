/**
 * Tests for ErrorReporter
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ErrorReporter } from '../src/error-reporter.js';
import {
  ConfigurationError,
  ValidationError,
  BuildError,
  AssetError,
  PublishError,
  NetworkError,
  VersionConflictError,
} from '../src/errors.js';
import { createLogger } from '../src/logger.js';

describe('ErrorReporter', () => {
  let reporter: ErrorReporter;

  beforeEach(() => {
    // Create logger in non-pretty mode for testing
    const logger = createLogger({ pretty: false, level: 'silent' });
    reporter = new ErrorReporter(logger);
  });

  describe('format()', () => {
    it('should format ConfigurationError with problem/cause/fix/docs', () => {
      const error = new ConfigurationError('Configuration file not found', {
        configPath: 'scripts/configs/collections/vscode/cpp.ts',
      });

      const formatted = reporter.format(error);

      expect(formatted.problem).toBe('Configuration file not found');
      expect(formatted.cause).toContain('Configuration file not accessible');
      expect(formatted.cause).toContain('scripts/configs/collections/vscode/cpp.ts');
      expect(formatted.fix).toContain('Check that the file exists');
      expect(formatted.docs).toBeDefined();
      expect(formatted.context).toEqual(error.context);
    });

    it('should format ValidationError with extension ID guidance', () => {
      const error = new ValidationError('Invalid extension ID format', {
        extensionId: 'invalid-id',
      });

      const formatted = reporter.format(error);

      expect(formatted.problem).toBe('Invalid extension ID format');
      expect(formatted.cause).toContain('invalid-id');
      expect(formatted.fix).toContain('publisher.extension-name');
      expect(formatted.docs).toContain('extension-manifest');
    });

    it('should format BuildError with output path', () => {
      const error = new BuildError('Failed to generate package.json', {
        outputPath: 'packages/vscode/cpp/package.json',
      });

      const formatted = reporter.format(error);

      expect(formatted.problem).toBe('Failed to generate package.json');
      expect(formatted.cause).toContain('packages/vscode/cpp/package.json');
      expect(formatted.fix).toContain('write permissions');
    });

    it('should format AssetError with asset path', () => {
      const error = new AssetError('Logo not found', {
        assetPath: 'logos/cpp-logo.png',
      });

      const formatted = reporter.format(error);

      expect(formatted.problem).toBe('Logo not found');
      expect(formatted.cause).toContain('logos/cpp-logo.png');
      expect(formatted.fix).toContain('logos/ directory');
    });

    it('should format PublishError with authentication guidance', () => {
      const error = new PublishError('Authentication failed: Invalid token', {
        marketplace: 'vscode',
      });

      const formatted = reporter.format(error);

      expect(formatted.problem).toBe('Authentication failed: Invalid token');
      expect(formatted.cause).toContain('Authentication token');
      expect(formatted.fix).toContain('Get a new token');
      expect(formatted.docs).toContain('code.visualstudio.com');
    });

    it('should format PublishError with Open VSX URL for openvsx marketplace', () => {
      const error = new PublishError('Authentication failed', {
        marketplace: 'openvsx',
      });

      const formatted = reporter.format(error);

      expect(formatted.docs).toContain('openvsx');
    });

    it('should format NetworkError with URL', () => {
      const error = new NetworkError('Connection timeout', {
        url: 'https://marketplace.visualstudio.com',
        timeout: 30000,
      });

      const formatted = reporter.format(error);

      expect(formatted.problem).toBe('Connection timeout');
      expect(formatted.cause).toContain('marketplace.visualstudio.com');
      expect(formatted.fix).toContain('internet connection');
    });

    it('should format VersionConflictError with version management guidance', () => {
      const error = new VersionConflictError('Version 1.0.0 already exists', {
        version: '1.0.0',
        marketplace: 'vscode',
      });

      const formatted = reporter.format(error);

      expect(formatted.problem).toBe('Version 1.0.0 already exists');
      expect(formatted.cause).toContain('1.0.0');
      expect(formatted.fix).toContain('dragoscops/version-update@v3');
      expect(formatted.fix).toContain('CI/CD workflow');
    });

    it('should format generic Error instances', () => {
      const error = new Error('Unexpected error occurred');

      const formatted = reporter.format(error);

      expect(formatted.problem).toBe('Unexpected error occurred');
      expect(formatted.cause).toBe('An unexpected error occurred');
      expect(formatted.fix).toContain('Check the logs');
    });

    it('should handle non-Error values', () => {
      const formatted = reporter.format('string error');

      expect(formatted.problem).toBe('string error');
      expect(formatted.cause).toBe('An unexpected error occurred');
    });

    it('should handle null/undefined', () => {
      const formatted = reporter.format(null);

      expect(formatted.problem).toBe('Unknown error');
      expect(formatted.cause).toBe('An unexpected error occurred');
    });
  });

  describe('toString()', () => {
    it('should convert formatted error to user-friendly string', () => {
      const formatted = {
        problem: 'Configuration file not found',
        cause: 'File does not exist',
        fix: 'Create the file',
        docs: 'https://example.com/docs',
      };

      const output = reporter.toString(formatted);

      expect(output).toContain('❌ Error: Configuration file not found');
      expect(output).toContain('Cause: File does not exist');
      expect(output).toContain('Fix: Create the file');
      expect(output).toContain('Docs: https://example.com/docs');
    });

    it('should handle formatted error without docs', () => {
      const formatted = {
        problem: 'Test error',
        cause: 'Test cause',
        fix: 'Test fix',
      };

      const output = reporter.toString(formatted);

      expect(output).not.toContain('Docs:');
    });
  });

  describe('report()', () => {
    it('should format and return the formatted error', () => {
      const error = new ConfigurationError('Config not found', {
        configPath: 'test.ts',
      });

      const formatted = reporter.report(error);

      expect(formatted.problem).toBe('Config not found');
      expect(formatted.cause).toBeDefined();
      expect(formatted.fix).toBeDefined();
      expect(formatted.docs).toBeDefined();
    });
  });

  describe('Integration', () => {
    it('should handle complete error flow', () => {
      const error = new PublishError('Authentication failed: Invalid token', {
        marketplace: 'vscode',
        tokenUrl: 'https://marketplace.visualstudio.com/manage',
      });

      const formatted = reporter.format(error);
      const output = reporter.toString(formatted);

      expect(output).toContain('❌ Error: Authentication failed');
      expect(output).toContain('Cause:');
      expect(output).toContain('Fix:');
      expect(output).toContain('Docs:');
      expect(output).toContain('code.visualstudio.com');
    });
  });
});
