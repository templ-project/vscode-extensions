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

// eslint-disable-next-line imports/order
import { publishVSIX } from '@vscode/vsce';

describe('MarketplacePublisher', () => {
  let publisher: MarketplacePublisher;
  let logger: ReturnType<typeof createLogger>;

  beforeEach(() => {
    logger = createLogger();
    publisher = new MarketplacePublisher(logger);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
          extensionId: expect.stringContaining('tpl.vscode.cpp'),
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
        await expect(publisher.publish(invalidOptions)).rejects.toThrow('Invalid .vsix filename format');
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
    });

    describe('Open VSX', () => {
      it('should throw PublishError for Open VSX (not yet implemented)', async () => {
        const openvsxOptions = {
          ...validOptions,
          marketplace: 'openvsx' as const,
        };

        await expect(publisher.publish(openvsxOptions)).rejects.toThrow(PublishError);
        await expect(publisher.publish(openvsxOptions)).rejects.toThrow('not yet implemented');
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
