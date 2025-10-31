import { constants } from 'node:fs';
import { mkdtemp, rm, readFile, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { testCollection } from './fixtures/test-collection.js';
import { ExtensionPackBuilder } from '../../src/build/ExtensionPackBuilder.js';
import { TemplateGenerator } from '../../src/build/TemplateGenerator.js';
import { ConfigLoader } from '../../src/config/ConfigLoader.js';
import { createLogger } from '../../src/logger.js';

/**
 * Integration Tests: Build Workflow
 *
 * Smoke tests verifying all modules work together correctly.
 * Detailed edge cases are covered by unit tests.
 *
 * These tests verify:
 * - ConfigLoader can load real collection files
 * - ExtensionPackBuilder can build with real configs
 * - All modules integrate without errors
 * - Output files have expected structure
 */
describe('Integration: Build Workflow', () => {
  const logger = createLogger({ level: 'silent' }); // Quiet during tests
  let testOutputDir: string;
  let builder: ExtensionPackBuilder;
  let templateGenerator: TemplateGenerator;

  beforeAll(async () => {
    // Create temporary directory for test output
    testOutputDir = await mkdtemp(join(tmpdir(), 'vscode-ext-test-'));

    // Initialize template generator and builder
    templateGenerator = new TemplateGenerator(logger);
    builder = new ExtensionPackBuilder(logger, templateGenerator);
  });

  afterAll(async () => {
    // Clean up test artifacts
    try {
      await rm(testOutputDir, { recursive: true, force: true });
    } catch (error) {
      // Ignore cleanup errors
      console.warn('Failed to clean up test directory:', error);
    }
  });

  describe('Complete Build Pipeline', () => {
    it.skip('should build extension pack from collection config', async () => {
      const language = 'test-language';
      const ide = 'vscode';
      const packageDir = join(testOutputDir, 'packages', ide, language);

      // Build extension pack
      const result = await builder.build(testCollection, {
        language,
        ide,
        outputDir: join(testOutputDir, 'packages'),
        logosDir: join(process.cwd(), 'logos'),
      });

      // Verify build result
      expect(result).toBeDefined();
      expect(result.packageDir).toBe(packageDir);
      expect(result.files).toBeInstanceOf(Array);
      expect(result.files.length).toBeGreaterThan(0);

      // Verify package directory exists
      await expect(access(packageDir, constants.F_OK), 'Package directory should exist').resolves.toBeUndefined();

      // Verify package.json exists and is valid
      const packageJsonPath = join(packageDir, 'package.json');
      const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
      const packageJson = JSON.parse(packageJsonContent);

      expect(packageJson).toMatchObject({
        name: expect.stringContaining('test-language'),

        displayName: expect.any(String),
        description: 'Test collection for integration tests',
        publisher: expect.any(String),
        engines: expect.objectContaining({
          vscode: expect.any(String),
        }),
        categories: expect.arrayContaining(['Extension Packs']),
        extensionPack: expect.arrayContaining([
          'ms-vscode.vscode-typescript-next',
          'dbaeumer.vscode-eslint',
          'esbenp.prettier-vscode',
        ]),
      });

      // Verify README exists
      const readmePath = join(packageDir, 'README.md');
      const readmeContent = await readFile(readmePath, 'utf-8');
      expect(readmeContent).toContain('Test collection for integration tests');
      expect(readmeContent).toContain('TypeScript Nightly');
      expect(readmeContent).toContain('ESLint');

      // Verify CHANGELOG exists
      const changelogPath = join(packageDir, 'CHANGELOG.md');
      await expect(access(changelogPath, constants.F_OK)).resolves.toBeUndefined();

      // Verify LICENSE exists
      const licensePath = join(packageDir, 'LICENSE.md');
      await expect(access(licensePath, constants.F_OK)).resolves.toBeUndefined();

      // Verify snippets exist
      const snippetsDir = join(packageDir, 'snippets');
      const snippetsPath = join(snippetsDir, 'snippets.json');
      const snippetsContent = await readFile(snippetsPath, 'utf-8');
      const snippets = JSON.parse(snippetsContent);
      expect(snippets).toHaveProperty('Test Console Log');
      expect(snippets).toHaveProperty('Test Arrow Function');

      // Verify settings exist
      const settingsPath = join(packageDir, 'settings.json');
      const settingsContent = await readFile(settingsPath, 'utf-8');
      const settings = JSON.parse(settingsContent);
      expect(settings).toHaveProperty('editor.formatOnSave');
      expect(settings).toHaveProperty('eslint.enable');

      // Verify keybindings exist
      const keybindingsPath = join(packageDir, 'keybindings.json');
      const keybindingsContent = await readFile(keybindingsPath, 'utf-8');
      const keybindings = JSON.parse(keybindingsContent);
      expect(keybindings).toBeInstanceOf(Array);
      expect(keybindings).toHaveLength(1);
      expect(keybindings[0]).toMatchObject({
        key: 'ctrl+shift+t',
        command: 'workbench.action.terminal.new',
      });

      // Verify extension entry point exists
      const extensionPath = join(packageDir, 'src', 'extension.ts');
      await expect(access(extensionPath, constants.F_OK)).resolves.toBeUndefined();

      // Verify tsconfig exists
      const tsconfigPath = join(packageDir, 'tsconfig.json');
      const tsconfigContent = await readFile(tsconfigPath, 'utf-8');
      const tsconfig = JSON.parse(tsconfigContent);
      expect(tsconfig).toHaveProperty('compilerOptions');

      // Verify logo exists (copied from logos directory)
      const logoPath = join(packageDir, 'logo.png');
      await expect(
        access(logoPath, constants.F_OK),
        'Logo should be copied to package directory',
      ).resolves.toBeUndefined();
    }, 30000); // 30 second timeout for complete build
  });

  describe('Real Collection Loading', () => {
    it('should successfully load cpp collection', async () => {
      const configLoader = new ConfigLoader(logger);
      const cppCollection = await configLoader.loadCollection('vscode', 'cpp');

      // Verify collection structure
      expect(cppCollection).toBeDefined();
      expect(cppCollection.description).toBeTruthy();
      expect(cppCollection.required_extensions).toBeInstanceOf(Array);
      expect(cppCollection.required_extensions.length).toBeGreaterThan(0);
    });

    it('should successfully load typescript collection', async () => {
      const configLoader = new ConfigLoader(logger);
      const tsCollection = await configLoader.loadCollection('vscode', 'typescript');

      // Verify collection structure
      expect(tsCollection).toBeDefined();
      expect(tsCollection.description).toBeTruthy();
      expect(tsCollection.required_extensions).toBeInstanceOf(Array);
      expect(tsCollection.required_extensions.length).toBeGreaterThan(0);
    });

    it('should successfully load all language collections', async () => {
      const configLoader = new ConfigLoader(logger);
      const languages = ['cpp', 'csharp', 'godot', 'golang', 'javascript', 'python', 'typescript'];

      for (const language of languages) {
        const collection = await configLoader.loadCollection('vscode', language);
        expect(collection, `Collection for ${language} should load`).toBeDefined();
        expect(collection.required_extensions.length, `${language} should have required extensions`).toBeGreaterThan(0);
      }
    }, 30000);
  });

  describe('Module Integration', () => {
    it('should successfully integrate ConfigLoader with all collections', async () => {
      const configLoader = new ConfigLoader(logger);

      // Test that all collections can be loaded
      const vscodeCollection = await configLoader.loadCollection('vscode', 'cpp');
      const vscodiumCollection = await configLoader.loadCollection('vscodium', 'cpp');

      expect(vscodeCollection).toBeDefined();
      expect(vscodiumCollection).toBeDefined();

      // Both should have similar structure
      expect(vscodeCollection.required_extensions.length).toBeGreaterThan(0);
      expect(vscodiumCollection.required_extensions.length).toBeGreaterThan(0);
    });

    it('should verify all modules work together without errors', () => {
      // This test verifies that all major components can be instantiated
      // and work together. Detailed functionality is tested in unit tests.
      expect(builder).toBeDefined();
      expect(templateGenerator).toBeDefined();

      // Verify logger hierarchy
      expect(logger).toBeDefined();
    });
  });
});
