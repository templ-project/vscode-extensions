/**
 * Type definitions for marketplace publishing
 */

/**
 * Supported marketplace targets
 */
export type Marketplace = 'vscode' | 'openvsx' | 'both';

/**
 * Options for publishing to a marketplace
 */
export interface PublishOptions {
  /**
   * Personal Access Token for authentication
   * - VSCode Marketplace: Get from https://marketplace.visualstudio.com/manage
   * - Open VSX: Get from https://open-vsx.org/user-settings/tokens
   */
  pat: string;

  /**
   * Path to the .vsix file to publish
   */
  vsixPath: string;

  /**
   * Target marketplace
   */
  marketplace: Marketplace;

  /**
   * Optional: Package access level for VSCode Marketplace
   * @default 'public'
   */
  packagePath?: string;
}

/**
 * Result of a publish operation
 */
export interface PublishResult {
  /**
   * Marketplace where extension was published
   */
  marketplace: Marketplace;

  /**
   * Path to the published .vsix file
   */
  vsixPath: string;

  /**
   * Extension identifier (publisher.name)
   */
  extensionId: string;

  /**
   * Published version
   */
  version: string;

  /**
   * Marketplace URL of the published extension
   */
  url: string;

  /**
   * Whether this was a new extension or an update
   */
  isUpdate: boolean;
}
