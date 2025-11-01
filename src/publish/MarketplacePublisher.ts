/**
 * MarketplacePublisher - Publishes .vsix files to VSCode Marketplace and Open VSX
 *
 * Handles authentication, error reporting, and marketplace-specific publishing logic.
 */

import { createReadStream } from 'node:fs';
import { basename } from 'node:path';
import { publishVSIX } from '@vscode/vsce';
import { publish as publishOVSX } from 'ovsx';
import type pino from 'pino';
import { Parse as unzip } from 'unzipper';
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
   * Extract extension metadata from .vsix file
   *
   * @param vsixPath - Path to .vsix file
   * @returns Promise resolving to { publisher, name, version, extensionId }
   */
  private async extractVsixMetadata(vsixPath: string): Promise<{
    publisher: string;
    name: string;
    version: string;
    extensionId: string;
  }> {
    return new Promise((resolve, reject) => {
      let found = false;

      const stream = createReadStream(vsixPath)
        .pipe(unzip())
        .on('entry', async (entry) => {
          if (found) {
            entry.autodrain();
            return;
          }

          if (entry.path === 'extension/package.json') {
            found = true;
            try {
              const content = await entry.buffer();
              const packageJson = JSON.parse(content.toString('utf-8'));

              const publisher = packageJson.publisher;
              const name = packageJson.name;
              const version = packageJson.version;

              if (!publisher || !name || !version) {
                stream.destroy();
                reject(
                  new PublishError('Invalid package.json in .vsix file: missing publisher, name, or version', {
                    vsixPath,
                    publisher,
                    name,
                    version,
                  }),
                );
                return;
              }

              stream.destroy();
              resolve({
                publisher,
                name,
                version,
                extensionId: `${publisher}.${name}`,
              });
            } catch (error) {
              stream.destroy();
              reject(
                new PublishError(
                  `Failed to parse package.json from .vsix file: ${error instanceof Error ? error.message : String(error)}`,
                  {
                    vsixPath,
                    cause: error instanceof Error ? error.message : String(error),
                  },
                ),
              );
            }
          } else {
            entry.autodrain();
          }
        })
        .on('error', (error) => {
          reject(
            new PublishError(`Failed to read .vsix file: ${error instanceof Error ? error.message : String(error)}`, {
              vsixPath,
              cause: error instanceof Error ? error.message : String(error),
            }),
          );
        })
        .on('finish', () => {
          if (!found) {
            reject(
              new PublishError('Could not find extension/package.json in .vsix file', {
                vsixPath,
              }),
            );
          }
        });
    });
  }

  /**
   * Check if a specific version exists on VSCode Marketplace
   *
   * @param extensionId - Extension identifier (publisher.name)
   * @param version - Version to check
   * @returns Promise resolving to true if version exists, false otherwise
   */
  private async checkVSCodeMarketplaceVersion(extensionId: string, version: string): Promise<boolean> {
    try {
      const url = `https://marketplace.visualstudio.com/items?itemName=${extensionId}`;
      this.logger.debug({ extensionId, version, url }, 'Checking VSCode Marketplace version');

      // Use fetch to get the extension page
      const response = await fetch(url);
      if (!response.ok) {
        this.logger.debug({ extensionId, status: response.status }, 'Extension not found on VSCode Marketplace');
        return false;
      }

      const html = await response.text();

      // Check if the version appears in the page HTML
      // The marketplace page includes version information in the HTML
      const versionPattern = new RegExp(`"version"\\s*:\\s*"${version.replace(/\./g, '\\.')}"`, 'i');
      const exists = versionPattern.test(html);

      this.logger.debug({ extensionId, version, exists }, 'VSCode Marketplace version check result');
      return exists;
    } catch (error) {
      this.logger.warn(
        { err: error, extensionId, version },
        'Failed to check VSCode Marketplace version, assuming it does not exist',
      );
      return false;
    }
  }

  /**
   * Check if a specific version exists on Open VSX
   *
   * @param extensionId - Extension identifier (publisher.name)
   * @param version - Version to check
   * @returns Promise resolving to true if version exists, false otherwise
   */
  private async checkOpenVSXVersion(extensionId: string, version: string): Promise<boolean> {
    try {
      const [publisher, name] = extensionId.split('.');
      const apiUrl = `https://open-vsx.org/api/${publisher}/${name}/${version}`;
      this.logger.debug({ extensionId, version, apiUrl }, 'Checking Open VSX version');

      const response = await fetch(apiUrl);
      const exists = response.ok;

      this.logger.debug({ extensionId, version, exists, status: response.status }, 'Open VSX version check result');
      return exists;
    } catch (error) {
      this.logger.warn(
        { err: error, extensionId, version },
        'Failed to check Open VSX version, assuming it does not exist',
      );
      return false;
    }
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
      return await this.publishToOpenVSX(pat, vsixPath);
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
      // Extract extension metadata from .vsix file
      const { extensionId, version } = await this.extractVsixMetadata(vsixPath);

      // Check if version already exists on marketplace
      const versionExists = await this.checkVSCodeMarketplaceVersion(extensionId, version);

      if (versionExists) {
        this.logger.info(
          { vsixPath, version, extensionId, marketplace: 'vscode' },
          'Version already exists on VSCode Marketplace, skipping publish',
        );

        // Return result without publishing
        const result: PublishResult = {
          marketplace: 'vscode',
          vsixPath,
          extensionId,
          version,
          url: `https://marketplace.visualstudio.com/items?itemName=${extensionId}`,
          isUpdate: false,
        };

        return result;
      }

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
        extensionId,
        version,
        url: `https://marketplace.visualstudio.com/items?itemName=${extensionId}`,
        isUpdate: true,
      };

      return result;
    } catch (error) {
      // Handle different error types from vsce
      const errorMessage = error instanceof Error ? error.message : String(error);

      this.logger.error({ err: error, vsixPath, marketplace: 'vscode' }, 'Failed to publish to VSCode Marketplace');

      // Authentication errors - most specific check first
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

      // All other errors are treated as validation/dependency errors
      // This catches dependency resolution errors, malformed package errors, etc.
      throw new PublishError(`Failed to publish to VSCode Marketplace: ${errorMessage}`, {
        marketplace: 'vscode',
        vsixPath,
        cause: errorMessage,
        hint: 'This may be a validation error. Check extension dependencies, package.json format, and marketplace requirements.',
      });
    }
  }

  /**
   * Publish to Open VSX Registry using ovsx
   *
   * @param pat - Personal Access Token from https://open-vsx.org/user-settings/tokens
   * @param vsixPath - Path to .vsix file
   * @returns Promise resolving to PublishResult
   * @throws {PublishError} For authentication or API errors
   * @throws {NetworkError} For network failures
   * @throws {VersionConflictError} For version conflicts
   */
  private async publishToOpenVSX(pat: string, vsixPath: string): Promise<PublishResult> {
    this.logger.info({ vsixPath }, 'Publishing to Open VSX Registry');

    try {
      // Extract extension metadata from .vsix file
      const { publisher, name: extensionName, extensionId, version } = await this.extractVsixMetadata(vsixPath);

      // Check if version already exists on Open VSX
      const versionExists = await this.checkOpenVSXVersion(extensionId, version);

      if (versionExists) {
        this.logger.info(
          { vsixPath, version, extensionId, marketplace: 'openvsx' },
          'Version already exists on Open VSX Registry, skipping publish',
        );

        // Return result without publishing
        const result: PublishResult = {
          marketplace: 'openvsx',
          vsixPath,
          extensionId,
          version,
          url: `https://open-vsx.org/extension/${publisher}/${extensionName}`,
          isUpdate: false,
        };

        return result;
      }

      // Publish using ovsx
      // The publish function handles authentication and upload
      await publishOVSX({
        extensionFile: vsixPath,
        pat,
        // registryUrl defaults to https://open-vsx.org
      });

      this.logger.info({ vsixPath, version, marketplace: 'openvsx' }, 'Successfully published to Open VSX Registry');

      // Construct result
      const result: PublishResult = {
        marketplace: 'openvsx',
        vsixPath,
        extensionId,
        version,
        url: `https://open-vsx.org/extension/${publisher}/${extensionName}`,
        isUpdate: true,
      };

      return result;
    } catch (error) {
      // Handle different error types from ovsx
      const errorMessage = error instanceof Error ? error.message : String(error);

      this.logger.error({ err: error, vsixPath, marketplace: 'openvsx' }, 'Failed to publish to Open VSX Registry');

      // Authentication errors - most specific check first
      if (
        errorMessage.includes('401') ||
        errorMessage.includes('403') ||
        errorMessage.includes('Unauthorized') ||
        errorMessage.includes('Forbidden') ||
        errorMessage.includes('authentication') ||
        errorMessage.includes('Invalid access token')
      ) {
        throw new PublishError('Authentication failed: Invalid or expired Personal Access Token', {
          marketplace: 'openvsx',
          vsixPath,
          hint: 'Generate a new token at https://open-vsx.org/user-settings/tokens',
          requiredScopes: ['Publish extensions'],
          cause: errorMessage,
        });
      }

      // Version conflict errors
      if (
        errorMessage.includes('already exists') ||
        errorMessage.includes('is already published') ||
        errorMessage.includes('version')
      ) {
        const version = basename(vsixPath).match(/(\d+\.\d+\.\d+)/)?.[1] || 'unknown';
        throw new VersionConflictError(`Version ${version} already exists on Open VSX Registry`, {
          version,
          marketplace: 'openvsx',
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
        throw new NetworkError('Network error when connecting to Open VSX Registry', {
          marketplace: 'openvsx',
          vsixPath,
          cause: errorMessage,
          hint: 'Check internet connection and Open VSX status at https://open-vsx.org',
        });
      }

      // All other errors are treated as validation/dependency errors
      // This catches dependency resolution errors, malformed package errors, etc.
      throw new PublishError(`Failed to publish to Open VSX Registry: ${errorMessage}`, {
        marketplace: 'openvsx',
        vsixPath,
        cause: errorMessage,
        hint: 'This may be a validation error. Check extension dependencies, package.json format, and marketplace requirements.',
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
