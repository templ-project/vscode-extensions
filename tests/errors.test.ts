/**
 * Tests for custom error classes
 */

import { describe, it, expect } from 'vitest';
import {
  ConfigurationError,
  ValidationError,
  BuildError,
  AssetError,
  PublishError,
  NetworkError,
  VersionConflictError,
  isCustomError,
} from '../src/errors.js';

describe('Error Classes', () => {
  describe('ConfigurationError', () => {
    it('should create error with message and context', () => {
      const error = new ConfigurationError('Config not found', {
        configPath: 'scripts/configs/collections/vscode/cpp.ts',
      });

      expect(error.name).toBe('ConfigurationError');
      expect(error.message).toBe('Config not found');
      expect(error.context).toEqual({
        configPath: 'scripts/configs/collections/vscode/cpp.ts',
      });
      expect(error.stack).toBeDefined();
    });

    it('should create error without context', () => {
      const error = new ConfigurationError('Config not found');

      expect(error.context).toEqual({});
    });
  });

  describe('ValidationError', () => {
    it('should create error with extension ID context', () => {
      const error = new ValidationError('Invalid extension ID format', {
        extensionId: 'invalid-id',
        expected: 'publisher.extension-name',
      });

      expect(error.name).toBe('ValidationError');
      expect(error.message).toBe('Invalid extension ID format');
      expect(error.context.extensionId).toBe('invalid-id');
    });
  });

  describe('BuildError', () => {
    it('should create error with output path context', () => {
      const error = new BuildError('Failed to generate package.json', {
        outputPath: 'packages/vscode/cpp/package.json',
      });

      expect(error.name).toBe('BuildError');
      expect(error.context.outputPath).toBe('packages/vscode/cpp/package.json');
    });
  });

  describe('AssetError', () => {
    it('should create error with asset path context', () => {
      const error = new AssetError('Logo not found', {
        assetPath: 'logos/cpp-logo.png',
      });

      expect(error.name).toBe('AssetError');
      expect(error.context.assetPath).toBe('logos/cpp-logo.png');
    });
  });

  describe('PublishError', () => {
    it('should create error with marketplace context', () => {
      const error = new PublishError('Authentication failed', {
        marketplace: 'vscode',
        tokenUrl: 'https://marketplace.visualstudio.com/manage',
      });

      expect(error.name).toBe('PublishError');
      expect(error.context.marketplace).toBe('vscode');
    });
  });

  describe('NetworkError', () => {
    it('should create error with URL and timeout context', () => {
      const error = new NetworkError('Connection timeout', {
        url: 'https://marketplace.visualstudio.com',
        timeout: 30000,
      });

      expect(error.name).toBe('NetworkError');
      expect(error.context.url).toBe('https://marketplace.visualstudio.com');
      expect(error.context.timeout).toBe(30000);
    });
  });

  describe('VersionConflictError', () => {
    it('should create error with version and marketplace context', () => {
      const error = new VersionConflictError('Version already exists', {
        version: '1.0.0',
        marketplace: 'vscode',
      });

      expect(error.name).toBe('VersionConflictError');
      expect(error.context.version).toBe('1.0.0');
      expect(error.context.marketplace).toBe('vscode');
    });
  });

  describe('isCustomError', () => {
    it('should return true for custom error instances', () => {
      const errors = [
        new ConfigurationError('test'),
        new ValidationError('test'),
        new BuildError('test'),
        new AssetError('test'),
        new PublishError('test'),
        new NetworkError('test'),
        new VersionConflictError('test'),
      ];

      errors.forEach((error) => {
        expect(isCustomError(error)).toBe(true);
      });
    });

    it('should return false for non-custom errors', () => {
      const errors = [new Error('test'), new TypeError('test'), null, undefined, 'string error'];

      errors.forEach((error) => {
        expect(isCustomError(error)).toBe(false);
      });
    });
  });

  describe('Error inheritance', () => {
    it('should be instances of Error', () => {
      const errors = [
        new ConfigurationError('test'),
        new ValidationError('test'),
        new BuildError('test'),
        new AssetError('test'),
        new PublishError('test'),
        new NetworkError('test'),
        new VersionConflictError('test'),
      ];

      errors.forEach((error) => {
        expect(error).toBeInstanceOf(Error);
      });
    });
  });
});
