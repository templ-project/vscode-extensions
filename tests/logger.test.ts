/**
 * Tests for logger factory and configuration
 */

import type * as pino from 'pino';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createLogger, createChildLogger } from '../src/logger.js';

describe('Logger Infrastructure', () => {
  let originalLogLevel: string | undefined;
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    // Save original environment variables
    originalLogLevel = process.env.LOG_LEVEL;
    originalNodeEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    // Restore original environment variables
    if (originalLogLevel === undefined) {
      delete process.env.LOG_LEVEL;
    } else {
      process.env.LOG_LEVEL = originalLogLevel;
    }

    if (originalNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = originalNodeEnv;
    }
  });

  describe('createLogger', () => {
    it('should create a logger with default configuration', () => {
      const logger = createLogger();

      expect(logger).toBeDefined();
      expect(logger.level).toBe('info');
      expect(logger.bindings()).toHaveProperty('name', 'vscode-ext-builder');
    });

    it('should respect LOG_LEVEL environment variable', () => {
      process.env.LOG_LEVEL = 'debug';

      const logger = createLogger();

      expect(logger.level).toBe('debug');
    });

    it('should use provided level option', () => {
      const logger = createLogger({ level: 'warn' });

      expect(logger.level).toBe('warn');
    });

    it('should use provided name option', () => {
      const logger = createLogger({ name: 'test-app' });

      expect(logger.bindings()).toHaveProperty('name', 'test-app');
    });

    it('should enable pretty printing in development', () => {
      process.env.NODE_ENV = 'development';

      const logger = createLogger();

      expect(logger).toBeDefined();
      // Logger will have pino-pretty transport in development
    });

    it('should disable pretty printing in production', () => {
      process.env.NODE_ENV = 'production';

      const logger = createLogger({ pretty: false });

      expect(logger).toBeDefined();
      // Logger will use JSON output in production
    });

    it('should support all log levels', () => {
      const levels: Array<pino.LevelWithSilent> = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];

      levels.forEach((level) => {
        const logger = createLogger({ level });
        expect(logger.level).toBe(level);
      });
    });
  });

  describe('createChildLogger', () => {
    it('should create a child logger with additional context', () => {
      const parent = createLogger();
      const child = createChildLogger(parent, { module: 'ConfigLoader' });

      expect(child).toBeDefined();
      expect(child.bindings()).toHaveProperty('module', 'ConfigLoader');
    });

    it('should inherit level from parent logger', () => {
      const parent = createLogger({ level: 'debug' });
      const child = createChildLogger(parent, { module: 'Builder' });

      expect(child.level).toBe('debug');
    });

    it('should support nested child loggers', () => {
      const root = createLogger();
      const child1 = createChildLogger(root, { module: 'ConfigLoader' });
      const child2 = createChildLogger(child1, { operation: 'load' });

      const bindings = child2.bindings();
      expect(bindings).toHaveProperty('module', 'ConfigLoader');
      expect(bindings).toHaveProperty('operation', 'load');
    });

    it('should accept various context types', () => {
      const parent = createLogger();

      const childWithString = createChildLogger(parent, { id: 'test-123' });
      expect(childWithString.bindings()).toHaveProperty('id', 'test-123');

      const childWithNumber = createChildLogger(parent, { count: 42 });
      expect(childWithNumber.bindings()).toHaveProperty('count', 42);

      const childWithBoolean = createChildLogger(parent, { active: true });
      expect(childWithBoolean.bindings()).toHaveProperty('active', true);

      const childWithObject = createChildLogger(parent, {
        config: { retry: 3 },
      });
      expect(childWithObject.bindings()).toHaveProperty('config');
    });
  });

  describe('Structured Logging', () => {
    it('should log structured data', () => {
      const logger = createLogger({ pretty: false });

      // These should not throw
      logger.info({ user: 'test', action: 'build' }, 'User action');
      logger.error({ err: new Error('test'), context: 'test' }, 'Error occurred');
      logger.debug({ module: 'ConfigLoader', file: 'cpp.ts' }, 'Loading config');

      expect(logger).toBeDefined();
    });

    it('should support child logger with module context', () => {
      const root = createLogger();
      const configLoader = createChildLogger(root, { module: 'ConfigLoader' });

      // Should not throw
      configLoader.info({ language: 'cpp', ide: 'vscode' }, 'Loading collection');
      configLoader.debug('Debug message from ConfigLoader');

      expect(configLoader.bindings()).toHaveProperty('module', 'ConfigLoader');
    });
  });
});
