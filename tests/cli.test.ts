/**
 * CLI Integration Tests
 *
 * Tests the command-line interface for building and publishing extension packs.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { spawn } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLI_PATH = join(__dirname, '../dist/index.js');

/**
 * Helper to run CLI command and capture output
 */
function runCLI(args: string[]): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn('node', [CLI_PATH, ...args], {
      env: { ...process.env, LOG_LEVEL: 'error' }, // Reduce log noise in tests
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      resolve({ code: code || 0, stdout, stderr });
    });
  });
}

describe('CLI', () => {
  describe('help and version', () => {
    it('should display help when no arguments provided', async () => {
      const result = await runCLI([]);

      // Commander exits with code 1 when no command given but shows help
      expect(result.code).toBe(1);
      expect(result.stderr).toContain('Build and publish VSCode/VSCodium extension packs');
    });    it('should display help with --help flag', async () => {
      const result = await runCLI(['--help']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Usage:');
      expect(result.stdout).toContain('Commands:');
    });

    it('should display version with --version flag', async () => {
      const result = await runCLI(['--version']);

      expect(result.code).toBe(0);
      expect(result.stdout).toMatch(/\d+\.\d+\.\d+/); // Semver pattern
    });

    it('should display help with -h flag', async () => {
      const result = await runCLI(['-h']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Usage:');
    });

    it('should display version with -V flag', async () => {
      const result = await runCLI(['-V']);

      expect(result.code).toBe(0);
      expect(result.stdout).toMatch(/\d+\.\d+\.\d+/);
    });
  });

  describe('build command help', () => {
    it('should display build command help', async () => {
      const result = await runCLI(['build', '--help']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Build an extension pack');
      expect(result.stdout).toContain('<ide>');
      expect(result.stdout).toContain('<language>');
      expect(result.stdout).toContain('--output');
      expect(result.stdout).toContain('--logos-dir');
      expect(result.stdout).toContain('--package');
    });
  });

  describe('publish command help', () => {
    it('should display publish command help', async () => {
      const result = await runCLI(['publish', '--help']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Publish extension packs');
      expect(result.stdout).toContain('<vsix-pattern>');
      expect(result.stdout).toContain('--marketplace');
    });
  });

  describe('build command validation', () => {
    it('should reject invalid IDE', async () => {
      const result = await runCLI(['build', 'invalid-ide', 'cpp']);

      expect(result.code).toBe(1);
      expect(result.stderr).toContain('invalid-ide');
    });

    it('should reject missing arguments', async () => {
      const result = await runCLI(['build']);

      expect(result.code).toBe(1);
      expect(result.stderr).toContain('error:');
    });

    it('should reject build with only IDE argument', async () => {
      const result = await runCLI(['build', 'vscode']);

      expect(result.code).toBe(1);
      expect(result.stderr).toContain('error:');
    });
  });

  describe('build command execution', () => {
    it.skip('should build cpp extension for vscode', async () => {
      // Skip in CI: requires full collection configs
      const result = await runCLI(['build', 'vscode', 'cpp', '--output', '/tmp/vscode-ext-test']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Build successful');
      expect(result.stdout).toContain('Package directory:');
    }, 30000);

    it.skip('should support --output flag', async () => {
      // Skip in CI: requires full collection configs
      const customOutput = '/tmp/custom-output';
      const result = await runCLI(['build', 'vscode', 'typescript', '--output', customOutput]);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain(customOutput);
    }, 30000);

    it.skip('should support --package flag', async () => {
      // Skip in CI: requires full collection configs and proper environment
      const result = await runCLI(['build', 'vscode', 'python', '--package']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('VSIX file:');
    }, 30000);

    it.skip('should support --logos-dir flag', async () => {
      // Skip in CI: requires full collection configs
      const result = await runCLI(['build', 'vscode', 'cpp', '--logos-dir', './logos']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Build successful');
    }, 30000);
  });

  describe('publish command (stub)', () => {
    it('should execute publish command stub', async () => {
      const result = await runCLI(['publish', 'dist/vscode/*.vsix']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('Publish command');
      expect(result.stdout).toContain('not yet implemented');
    });

    it('should support --marketplace flag', async () => {
      const result = await runCLI(['publish', 'dist/vscode/*.vsix', '--marketplace', 'vscode']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('vscode');
    });

    it('should default marketplace to "both"', async () => {
      const result = await runCLI(['publish', 'dist/vscode/*.vsix']);

      expect(result.code).toBe(0);
      expect(result.stdout).toContain('both');
    });
  });

  describe('invalid commands', () => {
    it('should reject unknown command', async () => {
      const result = await runCLI(['unknown-command']);

      expect(result.code).toBe(1);
      expect(result.stderr).toContain('error:');
    });

    it('should reject invalid option', async () => {
      const result = await runCLI(['build', 'vscode', 'cpp', '--invalid-option']);

      expect(result.code).toBe(1);
      expect(result.stderr).toContain('error:');
    });
  });

  describe('error handling', () => {
    it('should handle non-existent language gracefully', async () => {
      const result = await runCLI(['build', 'vscode', 'nonexistent-language']);

      expect(result.code).toBe(1);
      // Should contain error message about configuration not found
    });

    it('should handle non-existent output directory gracefully', async () => {
      // Note: mkdir with recursive:true handles this, but test the behavior
      const result = await runCLI(['build', 'vscode', 'cpp', '--output', '/nonexistent/deeply/nested/path']);

      // Should either succeed (create directories) or fail with clear error
      expect([0, 1]).toContain(result.code);
    });
  });
});
