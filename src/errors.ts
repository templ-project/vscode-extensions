/**
 * Custom error classes for the VSCode Extension Pack Builder
 *
 * Provides 7 error categories with structured context for actionable error reporting.
 */

/**
 * Base interface for error context that can be attached to errors
 */
export interface ErrorContext {
  [key: string]: unknown;
}

/**
 * 1. ConfigurationError - Missing or invalid TypeScript config file
 *
 * @example
 * ```typescript
 * throw new ConfigurationError(
 *   'Configuration file not found',
 *   { configPath: 'scripts/configs/collections/vscode/cpp.ts' }
 * );
 * ```
 */
export class ConfigurationError extends Error {
  public readonly context: ErrorContext;

  constructor(message: string, context: ErrorContext = {}) {
    super(message);
    this.name = 'ConfigurationError';
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 2. ValidationError - Invalid extension format or missing required fields
 *
 * @example
 * ```typescript
 * throw new ValidationError(
 *   'Invalid extension ID format',
 *   { extensionId: 'invalid-id', expected: 'publisher.extension-name' }
 * );
 * ```
 */
export class ValidationError extends Error {
  public readonly context: ErrorContext;

  constructor(message: string, context: ErrorContext = {}) {
    super(message);
    this.name = 'ValidationError';
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 3. BuildError - File system, template rendering, or packaging failures
 *
 * @example
 * ```typescript
 * throw new BuildError(
 *   'Failed to generate package.json',
 *   { outputPath: 'packages/vscode/cpp/package.json' }
 * );
 * ```
 */
export class BuildError extends Error {
  public readonly context: ErrorContext;

  constructor(message: string, context: ErrorContext = {}) {
    super(message);
    this.name = 'BuildError';
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 4. AssetError - Missing or invalid logo/asset files
 *
 * @example
 * ```typescript
 * throw new AssetError(
 *   'Logo not found',
 *   { assetPath: 'logos/cpp-logo.png' }
 * );
 * ```
 */
export class AssetError extends Error {
  public readonly context: ErrorContext;

  constructor(message: string, context: ErrorContext = {}) {
    super(message);
    this.name = 'AssetError';
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 5. PublishError - Authentication, network, or marketplace API errors
 *
 * @example
 * ```typescript
 * throw new PublishError(
 *   'Authentication failed: Invalid token',
 *   { marketplace: 'vscode', tokenUrl: 'https://marketplace.visualstudio.com/manage' }
 * );
 * ```
 */
export class PublishError extends Error {
  public readonly context: ErrorContext;

  constructor(message: string, context: ErrorContext = {}) {
    super(message);
    this.name = 'PublishError';
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 6. NetworkError - Connection timeouts, DNS failures
 *
 * @example
 * ```typescript
 * throw new NetworkError(
 *   'Connection timeout',
 *   { url: 'https://marketplace.visualstudio.com', timeout: 30000 }
 * );
 * ```
 */
export class NetworkError extends Error {
  public readonly context: ErrorContext;

  constructor(message: string, context: ErrorContext = {}) {
    super(message);
    this.name = 'NetworkError';
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 7. VersionConflictError - Version already published
 *
 * @example
 * ```typescript
 * throw new VersionConflictError(
 *   'Version already exists',
 *   { version: '1.0.0', marketplace: 'vscode' }
 * );
 * ```
 */
export class VersionConflictError extends Error {
  public readonly context: ErrorContext;

  constructor(message: string, context: ErrorContext = {}) {
    super(message);
    this.name = 'VersionConflictError';
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Type guard to check if an error is one of our custom error types
 */
export function isCustomError(
  error: unknown,
): error is
  | ConfigurationError
  | ValidationError
  | BuildError
  | AssetError
  | PublishError
  | NetworkError
  | VersionConflictError {
  return (
    error instanceof ConfigurationError ||
    error instanceof ValidationError ||
    error instanceof BuildError ||
    error instanceof AssetError ||
    error instanceof PublishError ||
    error instanceof NetworkError ||
    error instanceof VersionConflictError
  );
}
