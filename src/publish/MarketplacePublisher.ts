/**
 * MarketplacePublisher - Publishes .vsix files to VSCode Marketplace and Open VSX
 *
 * Handles authentication, error reporting, and marketplace-specific publishing logic.
 */

import { basename } from 'node:path';
import { publishVSIX } from '@vscode/vsce';
import type pino from 'pino';
import { PublishError, NetworkError, VersionConflictError } from '../errors.js';
import type { PublishOptions, PublishResult, Marketplace } from './types.js';

/**
 * MarketplacePublisher class for publishing extension packs
 */
export class MarketplacePublisher {
  private readonly logger: pino.Logger;

  /**
   * Create a new MarketplacePublisher instance
   *
   * @param logger - Parent pino logger instance
   *
   * @example
   * ```typescript
   * const logger = createLogger();
   * const publisher = new MarketplacePublisher(logger);
   * await publisher.publish({
   *   pat: process.env.VSCODE_TOKEN!,
   *   vsixPath: 'dist/vscode/tpl-vscode-cpp-1.0.0.vsix',
   *   marketplace: 'vscode'
   * });
   * ```
   */
  constructor(logger: pino.Logger) {
    this.logger = logger.child({ module: 'MarketplacePublisher' });
    this.logger.debug('MarketplacePublisher initialized');
  }

  /**
   * Publish a .vsix file to the specified marketplace
   *
   * @param options - Publishing options including PAT, vsix path, and marketplace
   * @returns Promise resolving to PublishResult with details about the published extension
   * @throws {PublishError} If authentication fails or marketplace API returns error
   * @throws {NetworkError} If network connection fails or times out
   * @throws {VersionConflictError} If version already exists on marketplace
   *
   * @example
   * ```typescript
   * const result = await publisher.publish({
   *   pat: process.env.VSCODE_TOKEN!,
   *   vsixPath: 'dist/vscode/tpl-vscode-cpp-1.0.0.vsix',
   *   marketplace: 'vscode'
   * });
   * console.log(`Published ${result.extensionId} v${result.version} to ${result.url}`);
   * ```
   */
  async publish(options: PublishOptions): Promise<PublishResult> {
    const { pat, vsixPath, marketplace } = options;

    this.logger.info({ vsixPath, marketplace }, 'Starting publish operation');

    // Validate marketplace target
    if (marketplace === 'both') {
      throw new PublishError('Marketplace "both" not supported in publish() - call separately for vscode and openvsx', {
        marketplace,
      });
    }

    // Route to appropriate marketplace publisher
    if (marketplace === 'vscode') {
      return await this.publishToVSCodeMarketplace(pat, vsixPath);
    } else if (marketplace === 'openvsx') {
      throw new PublishError('Open VSX publishing not yet implemented (S-013)', { marketplace: 'openvsx', vsixPath });
    } else {
      throw new PublishError(`Unknown marketplace: ${marketplace}`, { marketplace, vsixPath });
    }
  }

  /**
   * Publish to VSCode Marketplace using @vscode/vsce
   *
   * @param pat - Personal Access Token from https://marketplace.visualstudio.com/manage
   * @param vsixPath - Path to .vsix file
   * @returns Promise resolving to PublishResult
   * @throws {PublishError} For authentication or API errors
   * @throws {NetworkError} For network failures
   * @throws {VersionConflictError} For version conflicts
   */
  private async publishToVSCodeMarketplace(pat: string, vsixPath: string): Promise<PublishResult> {
    this.logger.info({ vsixPath }, 'Publishing to VSCode Marketplace');

    try {
      // Extract extension metadata from .vsix filename
      // Expected format: publisher-name-version.vsix (e.g., tpl-vscode-cpp-1.0.0.vsix)
      const filename = basename(vsixPath);
      const match = filename.match(/^(.+?)-(\d+\.\d+\.\d+)\.vsix$/);

      if (!match) {
        throw new PublishError(`Invalid .vsix filename format: ${filename}`, {
          vsixPath,
          expectedFormat: 'publisher-name-version.vsix',
          hint: 'Ensure .vsix file follows naming convention',
        });
      }

      const [, nameWithPublisher, version] = match;

      // Publish using vsce
      // The publishVSIX function handles authentication and upload
      await publishVSIX(vsixPath, {
        pat,
        // Don't use pre-release flag unless explicitly needed
        // baseContentUrl and baseImagesUrl will be inferred from package.json
      });

      this.logger.info({ vsixPath, version, marketplace: 'vscode' }, 'Successfully published to VSCode Marketplace');

      // Construct result
      const result: PublishResult = {
        marketplace: 'vscode',
        vsixPath,
        extensionId: nameWithPublisher.replace(/-/g, '.'), // Convert tpl-vscode-cpp to tpl.vscode.cpp
        version,
        url: `https://marketplace.visualstudio.com/items?itemName=${nameWithPublisher.replace(/-/g, '.')}`,
        isUpdate: true, // We can't easily determine this without querying the API
      };

      return result;
    } catch (error) {
      // Handle different error types from vsce
      const errorMessage = error instanceof Error ? error.message : String(error);

      this.logger.error({ err: error, vsixPath, marketplace: 'vscode' }, 'Failed to publish to VSCode Marketplace');

      // Authentication errors
      if (
        errorMessage.includes('401') ||
        errorMessage.includes('Unauthorized') ||
        errorMessage.includes('authentication')
      ) {
        throw new PublishError('Authentication failed: Invalid or expired Personal Access Token', {
          marketplace: 'vscode',
          vsixPath,
          hint: 'Generate a new token at https://marketplace.visualstudio.com/manage',
          requiredScopes: ['Marketplace: Acquire', 'Marketplace: Publish'],
          cause: errorMessage,
        });
      }

      // Version conflict errors
      if (errorMessage.includes('already exists') || errorMessage.includes('version') || errorMessage.includes('409')) {
        const version = basename(vsixPath).match(/(\d+\.\d+\.\d+)/)?.[1] || 'unknown';
        throw new VersionConflictError(`Version ${version} already exists on VSCode Marketplace`, {
          version,
          marketplace: 'vscode',
          vsixPath,
          hint: 'Version managed by dragoscops/version-update@v3 GitHub Action',
          note: 'This error should not occur in normal CI/CD workflow',
        });
      }

      // Network errors
      if (
        errorMessage.includes('ECONNREFUSED') ||
        errorMessage.includes('ETIMEDOUT') ||
        errorMessage.includes('ENOTFOUND') ||
        errorMessage.includes('network') ||
        errorMessage.includes('timeout')
      ) {
        throw new NetworkError('Network error when connecting to VSCode Marketplace', {
          marketplace: 'vscode',
          vsixPath,
          cause: errorMessage,
          hint: 'Check internet connection and marketplace status at https://status.dev.azure.com',
        });
      }

      // Generic publish error
      throw new PublishError(`Failed to publish to VSCode Marketplace: ${errorMessage}`, {
        marketplace: 'vscode',
        vsixPath,
        cause: errorMessage,
      });
    }
  }

  /**
   * Get marketplace URL for an extension
   *
   * @param marketplace - Target marketplace
   * @param extensionId - Extension identifier (publisher.name)
   * @returns Marketplace URL
   */
  getMarketplaceUrl(marketplace: Marketplace, extensionId: string): string {
    if (marketplace === 'vscode') {
      return `https://marketplace.visualstudio.com/items?itemName=${extensionId}`;
    } else if (marketplace === 'openvsx') {
      return `https://open-vsx.org/extension/${extensionId.replace('.', '/')}`;
    } else {
      return '';
    }
  }
}
