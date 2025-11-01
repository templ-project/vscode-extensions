import { mkdtemp, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { readExistingVersion, isValidVersion } from '../../src/build/version-utils.js';
import { BuildError } from '../../src/errors.js';
import { createLogger } from '../../src/logger.js';

describe('Version Utilities', () => {
  let logger: ReturnType<typeof createLogger>;
  let tempDir: string;

  beforeEach(async () => {
    logger = createLogger({ level: 'silent' }); // Silent to avoid test output noise
    tempDir = await mkdtemp(join(tmpdir(), 'version-test-'));
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('readExistingVersion()', () => {
    test('reads version from valid package.json', async () => {
      const packagePath = join(tempDir, 'package.json');
      const packageJson = {
        name: 'test-package',
        version: '1.2.3',
        description: 'Test package',
      };

      await writeFile(packagePath, JSON.stringify(packageJson, null, 2));

      const version = await readExistingVersion(packagePath, logger);

      expect(version).toBe('1.2.3');
    });

    test('reads version with pre-release tag', async () => {
      const packagePath = join(tempDir, 'package.json');
      const packageJson = {
        name: 'test-package',
        version: '2.0.0-beta.1',
      };

      await writeFile(packagePath, JSON.stringify(packageJson, null, 2));

      const version = await readExistingVersion(packagePath, logger);

      expect(version).toBe('2.0.0-beta.1');
    });

    test('reads version with build metadata', async () => {
      const packagePath = join(tempDir, 'package.json');
      const packageJson = {
        name: 'test-package',
        version: '3.1.4+build.20231101',
      };

      await writeFile(packagePath, JSON.stringify(packageJson, null, 2));

      const version = await readExistingVersion(packagePath, logger);

      expect(version).toBe('3.1.4+build.20231101');
    });

    test('returns default version when file does not exist', async () => {
      const packagePath = join(tempDir, 'nonexistent', 'package.json');

      const version = await readExistingVersion(packagePath, logger);

      expect(version).toBe('0.0.1');
    });

    test('returns default version when version field is missing', async () => {
      const packagePath = join(tempDir, 'package.json');
      const packageJson = {
        name: 'test-package',
        description: 'No version field',
      };

      await writeFile(packagePath, JSON.stringify(packageJson, null, 2));

      const version = await readExistingVersion(packagePath, logger);

      expect(version).toBe('0.0.1');
    });

    test('returns default version when version field is empty string', async () => {
      const packagePath = join(tempDir, 'package.json');
      const packageJson = {
        name: 'test-package',
        version: '',
      };

      await writeFile(packagePath, JSON.stringify(packageJson, null, 2));

      const version = await readExistingVersion(packagePath, logger);

      expect(version).toBe('0.0.1');
    });

    test('returns default version when version field is not a string', async () => {
      const packagePath = join(tempDir, 'package.json');
      const packageJson = {
        name: 'test-package',
        version: 123, // Invalid: number instead of string
      };

      await writeFile(packagePath, JSON.stringify(packageJson, null, 2));

      const version = await readExistingVersion(packagePath, logger);

      expect(version).toBe('0.0.1');
    });

    test('throws BuildError when JSON is invalid', async () => {
      const packagePath = join(tempDir, 'package.json');
      await writeFile(packagePath, '{ invalid json }');

      await expect(readExistingVersion(packagePath, logger)).rejects.toThrow(BuildError);

      await expect(readExistingVersion(packagePath, logger)).rejects.toThrow('Invalid JSON in package.json');
    });

    test('throws BuildError when JSON is not an object', async () => {
      const packagePath = join(tempDir, 'package.json');
      await writeFile(packagePath, '"just a string"');

      await expect(readExistingVersion(packagePath, logger)).rejects.toThrow(BuildError);

      await expect(readExistingVersion(packagePath, logger)).rejects.toThrow('not a valid object');
    });

    test('throws BuildError when JSON is an array', async () => {
      const packagePath = join(tempDir, 'package.json');
      await writeFile(packagePath, '["array", "of", "values"]');

      await expect(readExistingVersion(packagePath, logger)).rejects.toThrow(BuildError);

      await expect(readExistingVersion(packagePath, logger)).rejects.toThrow('not a valid object');
    });

    test('throws BuildError when JSON is null', async () => {
      const packagePath = join(tempDir, 'package.json');
      await writeFile(packagePath, 'null');

      await expect(readExistingVersion(packagePath, logger)).rejects.toThrow(BuildError);

      await expect(readExistingVersion(packagePath, logger)).rejects.toThrow('not a valid object');
    });

    test('throws BuildError on file system errors (not ENOENT)', async () => {
      // Create a directory with the same name as the file we're trying to read
      const packagePath = join(tempDir, 'package.json');
      await mkdir(packagePath);

      await expect(readExistingVersion(packagePath, logger)).rejects.toThrow(BuildError);
    });

    test('reads version from package.json with extra fields', async () => {
      const packagePath = join(tempDir, 'package.json');
      const packageJson = {
        name: 'test-package',
        version: '4.5.6',
        description: 'Test package with many fields',
        author: 'Test Author',
        license: 'MIT',
        dependencies: {
          'some-dep': '^1.0.0',
        },
        scripts: {
          build: 'tsc',
          test: 'vitest',
        },
      };

      await writeFile(packagePath, JSON.stringify(packageJson, null, 2));

      const version = await readExistingVersion(packagePath, logger);

      expect(version).toBe('4.5.6');
    });

    test('handles package.json with minified JSON', async () => {
      const packagePath = join(tempDir, 'package.json');
      const packageJson = { name: 'test', version: '7.8.9' };

      // Write minified JSON (no whitespace)
      await writeFile(packagePath, JSON.stringify(packageJson));

      const version = await readExistingVersion(packagePath, logger);

      expect(version).toBe('7.8.9');
    });
  });

  describe('isValidVersion()', () => {
    test('validates standard semantic versions', () => {
      expect(isValidVersion('0.0.1')).toBe(true);
      expect(isValidVersion('1.0.0')).toBe(true);
      expect(isValidVersion('1.2.3')).toBe(true);
      expect(isValidVersion('10.20.30')).toBe(true);
      expect(isValidVersion('99.999.9999')).toBe(true);
    });

    test('validates versions with pre-release tags', () => {
      expect(isValidVersion('1.0.0-alpha')).toBe(true);
      expect(isValidVersion('1.0.0-alpha.1')).toBe(true);
      expect(isValidVersion('1.0.0-beta')).toBe(true);
      expect(isValidVersion('1.0.0-rc.1')).toBe(true);
      expect(isValidVersion('1.0.0-0.3.7')).toBe(true);
      expect(isValidVersion('1.0.0-x.7.z.92')).toBe(true);
    });

    test('validates versions with build metadata', () => {
      expect(isValidVersion('1.0.0+build')).toBe(true);
      expect(isValidVersion('1.0.0+build.1')).toBe(true);
      expect(isValidVersion('1.0.0+20231101')).toBe(true);
      expect(isValidVersion('1.0.0+exp.sha.5114f85')).toBe(true);
    });

    test('validates versions with pre-release and build metadata', () => {
      expect(isValidVersion('1.0.0-beta+build.1')).toBe(true);
      expect(isValidVersion('1.0.0-alpha.1+20231101')).toBe(true);
      expect(isValidVersion('2.0.0-rc.1+build.123')).toBe(true);
    });

    test('rejects invalid version formats', () => {
      expect(isValidVersion('')).toBe(false);
      expect(isValidVersion('1')).toBe(false);
      expect(isValidVersion('1.0')).toBe(false);
      expect(isValidVersion('1.0.0.0')).toBe(false); // 4 segments
      expect(isValidVersion('v1.0.0')).toBe(false); // prefix
      expect(isValidVersion('1.0.x')).toBe(false); // wildcard
      expect(isValidVersion('not-a-version')).toBe(false);
      expect(isValidVersion('1.0.0-')).toBe(false); // trailing dash
      expect(isValidVersion('1.0.0+')).toBe(false); // trailing plus
      expect(isValidVersion('a.b.c')).toBe(false); // non-numeric
    });

    test('rejects versions with invalid characters', () => {
      expect(isValidVersion('1.0.0 ')).toBe(false); // trailing space
      expect(isValidVersion(' 1.0.0')).toBe(false); // leading space
      expect(isValidVersion('1.0.0@beta')).toBe(false); // invalid separator
      expect(isValidVersion('1.0.0#build')).toBe(false); // invalid separator
    });
  });

  describe('Integration - Real Extension Package', () => {
    test('reads version from actual cpp extension package.json', async () => {
      // This test uses the real package.json from the repository
      const realPackagePath = join(process.cwd(), 'packages/vscode/cpp/package.json');

      const version = await readExistingVersion(realPackagePath, logger);

      // Should read a valid version (may be 0.0.1 if not yet versioned by CI)
      expect(isValidVersion(version)).toBe(true);
    });

    test('handles reading from non-existent language directory', async () => {
      const nonExistentPath = join(process.cwd(), 'packages/vscode/nonexistent/package.json');

      const version = await readExistingVersion(nonExistentPath, logger);

      expect(version).toBe('0.0.1');
    });
  });
});
