/**
 * ErrorReporter - Formats errors with actionable guidance
 *
 * Provides transparent error reporting with problem/cause/fix/docs sections.
 */

import type * as pino from 'pino';
import {
  ConfigurationError,
  ValidationError,
  BuildError,
  AssetError,
  PublishError,
  NetworkError,
  VersionConflictError,
  isCustomError,
  type ErrorContext,
} from './errors.js';

/**
 * Formatted error output structure
 */
export interface FormattedError {
  problem: string;
  cause: string;
  fix: string;
  docs?: string;
  context?: ErrorContext;
}

/**
 * ErrorReporter formats errors with actionable guidance
 */
export class ErrorReporter {
  private logger: pino.Logger;

  constructor(logger: pino.Logger) {
    this.logger = logger.child({ component: 'ErrorReporter' });
  }

  /**
   * Format an error into a user-friendly structure with actionable guidance
   *
   * @param error - The error to format
   * @returns Formatted error with problem/cause/fix/docs sections
   *
   * @example
   * ```typescript
   * const reporter = new ErrorReporter(logger);
   * const formatted = reporter.format(error);
   * console.error(reporter.toString(formatted));
   * ```
   */
  public format(error: unknown): FormattedError {
    if (!isCustomError(error)) {
      // Handle generic errors
      return this.formatGenericError(error);
    }

    // Log structured error data
    this.logger.error(
      {
        err: error,
        errorType: error.name,
        context: error.context,
      },
      'Error occurred',
    );

    // Format based on error type
    if (error instanceof ConfigurationError) {
      return this.formatConfigurationError(error);
    } else if (error instanceof ValidationError) {
      return this.formatValidationError(error);
    } else if (error instanceof BuildError) {
      return this.formatBuildError(error);
    } else if (error instanceof AssetError) {
      return this.formatAssetError(error);
    } else if (error instanceof PublishError) {
      return this.formatPublishError(error);
    } else if (error instanceof NetworkError) {
      return this.formatNetworkError(error);
    } else if (error instanceof VersionConflictError) {
      return this.formatVersionConflictError(error);
    }

    return this.formatGenericError(error);
  }

  /**
   * Convert formatted error to a user-friendly string
   *
   * @param formatted - Formatted error structure
   * @returns Human-readable error message
   */
  public toString(formatted: FormattedError): string {
    let output = `❌ Error: ${formatted.problem}\n`;
    output += `   Cause: ${formatted.cause}\n`;
    output += `   Fix: ${formatted.fix}`;

    if (formatted.docs) {
      output += `\n   Docs: ${formatted.docs}`;
    }

    return output;
  }

  /**
   * Format and log an error, returning the formatted structure
   *
   * @param error - The error to format and log
   * @returns Formatted error structure
   */
  public report(error: unknown): FormattedError {
    const formatted = this.format(error);
    const message = this.toString(formatted);

    // Log as error level
    this.logger.error({ formatted }, message);

    return formatted;
  }

  private formatConfigurationError(error: ConfigurationError): FormattedError {
    const configPath = error.context.configPath as string | undefined;

    return {
      problem: error.message,
      cause: configPath
        ? `Configuration file not accessible: ${configPath}`
        : 'Configuration file is missing or invalid',
      fix: 'Check that the file exists and is properly exported. Verify the file path and TypeScript configuration.',
      docs: 'https://github.com/templ-project/vscode-extensions#configuration',
      context: error.context,
    };
  }

  private formatValidationError(error: ValidationError): FormattedError {
    const extensionId = error.context.extensionId as string | undefined;

    return {
      problem: error.message,
      cause: extensionId
        ? `Invalid format for extension ID: ${extensionId}`
        : 'Extension data does not meet validation requirements',
      fix: 'Extension IDs must be in format: publisher.extension-name. Check all required fields are present and correctly formatted.',
      docs: 'https://code.visualstudio.com/api/references/extension-manifest',
      context: error.context,
    };
  }

  private formatBuildError(error: BuildError): FormattedError {
    const outputPath = error.context.outputPath as string | undefined;

    return {
      problem: error.message,
      cause: outputPath
        ? `Failed to write to: ${outputPath}`
        : 'Build operation failed during file generation or packaging',
      fix: 'Check write permissions in output directory. Verify disk space and that no files are locked by other processes.',
      docs: 'https://github.com/templ-project/vscode-extensions#troubleshooting',
      context: error.context,
    };
  }

  private formatAssetError(error: AssetError): FormattedError {
    const assetPath = error.context.assetPath as string | undefined;

    return {
      problem: error.message,
      cause: assetPath ? `Asset file not found: ${assetPath}` : 'Required asset file is missing or inaccessible',
      fix: 'Ensure logo file exists in logos/ directory. Check file permissions and path correctness.',
      docs: 'https://github.com/templ-project/vscode-extensions#assets',
      context: error.context,
    };
  }

  private formatPublishError(error: PublishError): FormattedError {
    const marketplace = error.context.marketplace as string | undefined;
    const isAuthError = error.message.toLowerCase().includes('auth');

    let docsUrl: string;
    if (marketplace === 'openvsx') {
      docsUrl = 'https://github.com/eclipse/openvsx/wiki/Publishing-Extensions';
    } else {
      docsUrl =
        'https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token';
    }

    return {
      problem: error.message,
      cause: isAuthError
        ? 'Authentication token is invalid or expired'
        : `Publishing to ${marketplace || 'marketplace'} failed`,
      fix: isAuthError
        ? `Get a new token from the marketplace: ${docsUrl}`
        : 'Check marketplace status, network connection, and that the extension meets all requirements.',
      docs: docsUrl,
      context: error.context,
    };
  }

  private formatNetworkError(error: NetworkError): FormattedError {
    const url = error.context.url as string | undefined;

    return {
      problem: error.message,
      cause: url ? `Cannot reach: ${url}` : 'Network request failed or timed out',
      fix: 'Check internet connection and verify the service is available. Try again later if the service is down.',
      docs: 'https://github.com/templ-project/vscode-extensions#network-issues',
      context: error.context,
    };
  }

  private formatVersionConflictError(error: VersionConflictError): FormattedError {
    const version = error.context.version as string | undefined;
    const marketplace = error.context.marketplace as string | undefined;

    return {
      problem: error.message,
      cause: version
        ? `Version ${version} already exists on ${marketplace || 'marketplace'}`
        : 'Attempted to publish a version that already exists',
      fix: 'Version is managed by dragoscops/version-update@v3 GitHub Action. This error should not occur in normal CI/CD workflow. If manual publishing, increment version number.',
      docs: 'https://github.com/dragoscops/version-update',
      context: error.context,
    };
  }

  private formatGenericError(error: unknown): FormattedError {
    const message = error instanceof Error ? error.message : String(error || 'Unknown error');

    this.logger.error({ err: error, errorType: 'UnknownError' }, message);

    return {
      problem: message,
      cause: 'An unexpected error occurred',
      fix: 'Check the logs for more details. If the issue persists, report it as a bug.',
      docs: 'https://github.com/templ-project/vscode-extensions/issues',
    };
  }
}
