/**
 * Logger factory and configuration for the VSCode Extension Pack Builder
 *
 * Provides structured logging with pino and pino-pretty formatting.
 * Supports child loggers for module-specific context.
 */

import pino from 'pino';

/**
 * Logger options for configuring pino
 */
export interface LoggerOptions {
  /**
   * Log level: 'fatal', 'error', 'warn', 'info', 'debug', 'trace'
   * Default: 'info'
   */
  level?: pino.LevelWithSilent;

  /**
   * Enable pretty printing for development
   * Default: true when not in production
   */
  pretty?: boolean;

  /**
   * Base logger name/context
   */
  name?: string;
}

/**
 * Create a root logger instance
 *
 * @param options - Logger configuration options
 * @returns Configured pino logger instance
 *
 * @example
 * ```typescript
 * const logger = createLogger({ level: 'debug' });
 * logger.info('Application started');
 * ```
 */
export function createLogger(options: LoggerOptions = {}): pino.Logger {
  const {
    level = (process.env.LOG_LEVEL as pino.LevelWithSilent) || 'info',
    pretty = process.env.NODE_ENV !== 'production',
    name = 'vscode-ext-builder',
  } = options;

  const baseConfig: pino.LoggerOptions = {
    level,
    name,
  };

  // Use pino-pretty for human-readable output in development
  if (pretty) {
    return pino({
      ...baseConfig,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss.l',
          ignore: 'pid,hostname',
          singleLine: false,
        },
      },
    });
  }

  // Use JSON output for production/CI
  return pino(baseConfig);
}

/**
 * Create a child logger with additional context
 *
 * @param parent - Parent logger instance
 * @param context - Additional context to include in logs
 * @returns Child logger with context
 *
 * @example
 * ```typescript
 * const rootLogger = createLogger();
 * const configLoader = createChildLogger(rootLogger, { module: 'ConfigLoader' });
 * configLoader.debug('Loading configuration...');
 * ```
 */
export function createChildLogger(parent: pino.Logger, context: Record<string, unknown>): pino.Logger {
  return parent.child(context);
}

// Create root logger
export const parentLogger = createLogger();

// TODO: since this was not part of the LLD, treat it later, when code is matured enough
export class Loggable {
    protected log: pino.Logger;

    constructor() {
        this.log = parentLogger.child({ module: this.constructor.name });
    }
}
