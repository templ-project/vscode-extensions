/**
 * Tests for MarketplacePublisher
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PublishError, NetworkError, VersionConflictError } from '../../src/errors.js';
import { createLogger } from '../../src/logger.js';
import { MarketplacePublisher } from '../../src/publish/MarketplacePublisher.js';
import type { PublishOptions } from '../../src/publish/types.js';

// Mock @vscode/vsce module
vi.mock('@vscode/vsce', () => ({
  publishVSIX: vi.fn(),
}));

// Mock ovsx module
vi.mock('ovsx', () => ({
  publish: vi.fn(),
}));

// eslint-disable-next-line imports/order
import { publishVSIX } from '@vscode/vsce';
// eslint-disable-next-line imports/order
import { publish as publishOVSX } from 'ovsx';

describe('MarketplacePublisher', () => {
  let publisher: MarketplacePublisher;
  let logger: ReturnType<typeof createLogger>;

  beforeEach(() => {
    logger = createLogger();
    publisher = new MarketplacePublisher(logger);
    vi.clearAllMocks();

    // Mock the extractVsixMetadata method
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(publisher as any, 'extractVsixMetadata').mockImplementation(async (vsixPath: string) => {
      // Parse filename to extract name and version for mocking
      const match = vsixPath.match(/([^/]+)-(\d+\.\d+\.\d+)\.vsix$/);
      if (!match) {
        throw new Error('Invalid filename');
      }
      const [, name, version] = match;

      // Mock publisher based on the IDE type in the path
      const publisher = vsixPath.includes('vscodium') ? 'templ-project' : 'templ-project';
      const extensionName = name;

      return {
        publisher,
        name: extensionName,
        version,
        extensionId: `${publisher}.${extensionName}`,
      };
    });

    // Mock version checking methods to return false by default (version doesn't exist)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(publisher as any, 'checkVSCodeMarketplaceVersion').mockResolvedValue(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(publisher as any, 'checkOpenVSXVersion').mockResolvedValue(false);
    // Mock verifyOpenVSXExtension to return true by default (extension is available)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(publisher as any, 'verifyOpenVSXExtension').mockResolvedValue(true);
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Constructor', () => {
    it('should create publisher with logger', () => {
      expect(publisher).toBeInstanceOf(MarketplacePublisher);
    });
  });

  describe('publish()', () => {
    const validOptions: PublishOptions = {
      pat: 'test-pat-token',
      vsixPath: 'dist/vscode/tpl-vscode-cpp-1.0.0.vsix',
      marketplace: 'vscode',
    };

    describe('VSCode Marketplace', () => {
      it('should publish to VSCode Marketplace successfully', async () => {
        // Mock successful publish
        vi.mocked(publishVSIX).mockResolvedValue(undefined);

        const result = await publisher.publish(validOptions);

        expect(publishVSIX).toHaveBeenCalledWith(
          validOptions.vsixPath,
          expect.objectContaining({
            pat: validOptions.pat,
          }),
        );

        expect(result).toEqual({
          marketplace: 'vscode',
          vsixPath: validOptions.vsixPath,
          extensionId: 'templ-project.tpl-vscode-cpp',
          version: '1.0.0',
          url: expect.stringContaining('marketplace.visualstudio.com'),
          isUpdate: true,
        });
      });

      it('should throw PublishError for invalid filename format', async () => {
        const invalidOptions = {
          ...validOptions,
          vsixPath: 'dist/vscode/invalid-name.vsix',
        };

        await expect(publisher.publish(invalidOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(invalidOptions)).rejects.toThrow('Invalid filename');
      });

      it('should throw PublishError for authentication failure (401)', async () => {
        vi.mocked(publishVSIX).mockRejectedValue(new Error('401 Unauthorized'));

        await expect(publisher.publish(validOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(validOptions)).rejects.toThrow('Authentication failed');

        try {
          await publisher.publish(validOptions);
        } catch (error) {
          expect(error).toBeInstanceOf(PublishError);
          if (error instanceof PublishError) {
            expect(error.context.hint).toContain('marketplace.visualstudio.com/manage');
            expect(error.context.requiredScopes).toContain('Marketplace: Acquire');
          }
        }
      });

      it('should throw VersionConflictError for version already exists (409)', async () => {
        vi.mocked(publishVSIX).mockRejectedValue(new Error('409 Conflict: version already exists'));

        await expect(publisher.publish(validOptions)).rejects.toThrow(VersionConflictError);
        await expect(publisher.publish(validOptions)).rejects.toThrow('already exists');

        try {
          await publisher.publish(validOptions);
        } catch (error) {
          expect(error).toBeInstanceOf(VersionConflictError);
          if (error instanceof VersionConflictError) {
            expect(error.context.version).toBe('1.0.0');
            expect(error.context.marketplace).toBe('vscode');
          }
        }
      });

      it('should throw NetworkError for connection timeout', async () => {
        vi.mocked(publishVSIX).mockRejectedValue(new Error('ETIMEDOUT: connection timeout'));

        await expect(publisher.publish(validOptions)).rejects.toThrow(NetworkError);
        await expect(publisher.publish(validOptions)).rejects.toThrow('Network error');

        try {
          await publisher.publish(validOptions);
        } catch (error) {
          expect(error).toBeInstanceOf(NetworkError);
          if (error instanceof NetworkError) {
            expect(error.context.hint).toContain('Check internet connection');
          }
        }
      });

      it('should throw NetworkError for connection refused', async () => {
        vi.mocked(publishVSIX).mockRejectedValue(new Error('ECONNREFUSED'));

        await expect(publisher.publish(validOptions)).rejects.toThrow(NetworkError);
      });

      it('should throw NetworkError for DNS failure', async () => {
        vi.mocked(publishVSIX).mockRejectedValue(new Error('ENOTFOUND marketplace.visualstudio.com'));

        await expect(publisher.publish(validOptions)).rejects.toThrow(NetworkError);
      });

      it('should throw PublishError for generic errors', async () => {
        vi.mocked(publishVSIX).mockRejectedValue(new Error('Unknown error'));

        await expect(publisher.publish(validOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(validOptions)).rejects.toThrow('Unknown error');
      });

      it('should throw PublishError for dependency validation failure', async () => {
        vi.mocked(publishVSIX).mockRejectedValue(new Error('Cannot resolve dependency: GregorBiswanger.json2ts'));

        await expect(publisher.publish(validOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(validOptions)).rejects.toThrow('Failed to publish to VSCode Marketplace');

        try {
          await publisher.publish(validOptions);
        } catch (error) {
          expect(error).toBeInstanceOf(PublishError);
          if (error instanceof PublishError) {
            expect(error.message).toContain('GregorBiswanger.json2ts');
            expect(error.context.hint).toContain('validation error');
          }
        }
      });
    });

    describe('Open VSX', () => {
      const openvsxOptions: PublishOptions = {
        pat: 'test-openvsx-token',
        vsixPath: 'dist/vscodium/tpl-vscodium-cpp-1.0.0.vsix',
        marketplace: 'openvsx',
      };

      it('should publish to Open VSX Registry successfully', async () => {
        // Mock successful publish
        vi.mocked(publishOVSX).mockResolvedValue([]);
        // verifyOpenVSXExtension is already mocked to return true in beforeEach

        const result = await publisher.publish(openvsxOptions);

        expect(publishOVSX).toHaveBeenCalledWith(
          expect.objectContaining({
            extensionFile: openvsxOptions.vsixPath,
            pat: openvsxOptions.pat,
          }),
        );

        expect(result).toEqual({
          marketplace: 'openvsx',
          vsixPath: openvsxOptions.vsixPath,
          extensionId: 'templ-project.tpl-vscodium-cpp',
          version: '1.0.0',
          url: expect.stringContaining('open-vsx.org'),
          isUpdate: true,
        });
      });

      it('should throw PublishError for invalid filename format', async () => {
        const invalidOptions = {
          ...openvsxOptions,
          vsixPath: 'dist/vscodium/invalid.vsix',
        };

        await expect(publisher.publish(invalidOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(invalidOptions)).rejects.toThrow('Invalid filename');
      });

      it('should throw PublishError for authentication failure (401)', async () => {
        vi.mocked(publishOVSX).mockRejectedValue(new Error('401 Unauthorized'));

        await expect(publisher.publish(openvsxOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(openvsxOptions)).rejects.toThrow('Authentication failed');

        try {
          await publisher.publish(openvsxOptions);
        } catch (error) {
          expect(error).toBeInstanceOf(PublishError);
          if (error instanceof PublishError) {
            expect(error.context.hint).toContain('open-vsx.org/user-settings/tokens');
            expect(error.context.requiredScopes).toContain('Publish extensions');
          }
        }
      });

      it('should throw PublishError for authentication failure (403 Forbidden)', async () => {
        vi.mocked(publishOVSX).mockRejectedValue(new Error('403 Forbidden: Invalid access token'));

        await expect(publisher.publish(openvsxOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(openvsxOptions)).rejects.toThrow('Authentication failed');
      });

      it('should throw VersionConflictError for version already exists', async () => {
        vi.mocked(publishOVSX).mockRejectedValue(new Error('Extension version 1.0.0 is already published'));

        await expect(publisher.publish(openvsxOptions)).rejects.toThrow(VersionConflictError);
        await expect(publisher.publish(openvsxOptions)).rejects.toThrow('already exists');

        try {
          await publisher.publish(openvsxOptions);
        } catch (error) {
          expect(error).toBeInstanceOf(VersionConflictError);
          if (error instanceof VersionConflictError) {
            expect(error.context.version).toBe('1.0.0');
            expect(error.context.marketplace).toBe('openvsx');
          }
        }
      });

      it('should throw NetworkError for connection timeout', async () => {
        vi.mocked(publishOVSX).mockRejectedValue(new Error('ETIMEDOUT: connection timeout'));

        await expect(publisher.publish(openvsxOptions)).rejects.toThrow(NetworkError);
        await expect(publisher.publish(openvsxOptions)).rejects.toThrow('Network error');

        try {
          await publisher.publish(openvsxOptions);
        } catch (error) {
          expect(error).toBeInstanceOf(NetworkError);
          if (error instanceof NetworkError) {
            expect(error.context.hint).toContain('Check internet connection');
          }
        }
      });

      it('should throw NetworkError for connection refused', async () => {
        vi.mocked(publishOVSX).mockRejectedValue(new Error('ECONNREFUSED'));

        await expect(publisher.publish(openvsxOptions)).rejects.toThrow(NetworkError);
      });

      it('should throw NetworkError for DNS failure', async () => {
        vi.mocked(publishOVSX).mockRejectedValue(new Error('ENOTFOUND open-vsx.org'));

        await expect(publisher.publish(openvsxOptions)).rejects.toThrow(NetworkError);
      });

      it('should throw PublishError for generic errors', async () => {
        vi.mocked(publishOVSX).mockRejectedValue(new Error('Unknown error from Open VSX'));

        await expect(publisher.publish(openvsxOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(openvsxOptions)).rejects.toThrow('Unknown error from Open VSX');
      });

      it('should throw PublishError for dependency validation failure', async () => {
        vi.mocked(publishOVSX).mockRejectedValue(new Error('Cannot resolve dependency: GregorBiswanger.json2ts'));

        await expect(publisher.publish(openvsxOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(openvsxOptions)).rejects.toThrow('Failed to publish to Open VSX Registry');

        try {
          await publisher.publish(openvsxOptions);
        } catch (error) {
          expect(error).toBeInstanceOf(PublishError);
          if (error instanceof PublishError) {
            expect(error.message).toContain('GregorBiswanger.json2ts');
            expect(error.context.hint).toContain('validation error');
          }
        }
      });

      it('should throw PublishError when extension fails post-publish validation', async () => {
        // Use fake timers to skip the 2-second wait
        vi.useFakeTimers();

        // Mock successful upload
        vi.mocked(publishOVSX).mockResolvedValue([]);
        // Mock failed verification (extension not available after upload)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        vi.spyOn(publisher as any, 'verifyOpenVSXExtension').mockResolvedValue(false);

        // Start the publish (it will wait 2 seconds before verifying)
        const publishPromise = publisher.publish(openvsxOptions);

        // Attach error handler immediately to prevent unhandled rejection
        publishPromise.catch(() => {
          // Error will be caught below
        });

        // Fast-forward time by 2 seconds
        await vi.advanceTimersByTimeAsync(2000);

        // Catch the rejection and verify error details
        try {
          await publishPromise;
          expect.fail('Expected publish to throw an error');
        } catch (error) {
          expect(error).toBeInstanceOf(PublishError);
          if (error instanceof PublishError) {
            expect(error.message).toContain('uploaded but failed');
            expect(error.context.hint).toContain('Check https://open-vsx.org');
          }
        }

        vi.useRealTimers();
      });
    });

    describe('Marketplace validation', () => {
      it('should throw PublishError for "both" marketplace', async () => {
        const bothOptions = {
          ...validOptions,
          marketplace: 'both' as const,
        };

        await expect(publisher.publish(bothOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(bothOptions)).rejects.toThrow('not supported');
      });

      it('should throw PublishError for unknown marketplace', async () => {
        const unknownOptions = {
          ...validOptions,
          marketplace: 'unknown' as unknown as PublishOptions['marketplace'],
        };

        await expect(publisher.publish(unknownOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(unknownOptions)).rejects.toThrow('Unknown marketplace');
      });
    });
  });

  describe('getMarketplaceUrl()', () => {
    it('should return VSCode Marketplace URL', () => {
      const url = publisher.getMarketplaceUrl('vscode', 'tpl.vscode.cpp');
      expect(url).toBe('https://marketplace.visualstudio.com/items?itemName=tpl.vscode.cpp');
    });

    it('should return Open VSX URL', () => {
      const url = publisher.getMarketplaceUrl('openvsx', 'tpl.vscode.cpp');
      expect(url).toBe('https://open-vsx.org/extension/tpl/vscode.cpp');
    });

    it('should return empty string for "both" marketplace', () => {
      const url = publisher.getMarketplaceUrl('both', 'tpl.vscode.cpp');
      expect(url).toBe('');
    });
  });
});
