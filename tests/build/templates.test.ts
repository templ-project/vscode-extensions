import { resolve } from 'node:path';
import { describe, test, expect, beforeEach } from 'vitest';
import { TemplateGenerator } from '../../src/build/TemplateGenerator.js';
import { createLogger } from '../../src/logger.js';

describe('Template Files', () => {
  let logger: ReturnType<typeof createLogger>;
  let generator: TemplateGenerator;
  const templatesDir = resolve(process.cwd(), 'templates');

  beforeEach(() => {
    logger = createLogger({ level: 'silent' });
    generator = new TemplateGenerator(logger, templatesDir);
  });

  // Sample context data for testing templates
  const sampleContext = {
    name: 'tpl-vscode-cpp',
    displayName: 'C++ Extension Pack',
    description: 'Essential C/C++ development environment for VSCode',
    version: '1.0.0',
    publisher: 'templ-project',
    organization: 'templ-project',
    repositoryUrl: 'https://github.com/templ-project/vscode-extensions',
    ide: 'vscode',
    language: 'cpp',
    capitalizedIde: 'VSCode',
    cliCommand: 'code',
    year: new Date().getFullYear(),
    date: new Date().toISOString().split('T')[0],
    keywords: ['cpp', 'c++', 'vscode', 'extensions'],
    tags: ['C++', 'Development', 'VSCode'],
    totalExtensions: 5,
    allExtensions: [
      {
        id: 'llvm-vs-code-extensions.vscode-clangd',
        name: 'clangd',
        description: 'C/C++ language server',
        publisher: 'llvm-vs-code-extensions',
        license: 'MIT',
        marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.vscode-clangd',
      },
      {
        id: 'ms-vscode.cmake-tools',
        name: 'CMake Tools',
        description: 'Extended CMake support',
        publisher: 'Microsoft',
        license: 'MIT',
        marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools',
      },
    ],
    requiredExtensions: [
      {
        id: 'llvm-vs-code-extensions.vscode-clangd',
        name: 'clangd',
        description: 'C/C++ language server',
        publisher: 'llvm-vs-code-extensions',
        license: 'MIT',
        marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.vscode-clangd',
      },
    ],
    optionalExtensions: [
      {
        id: 'ms-vscode.cmake-tools',
        name: 'CMake Tools',
        description: 'Extended CMake support',
        publisher: 'Microsoft',
        license: 'MIT',
        marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools',
      },
    ],
    settings: {
      'editor.formatOnSave': {
        value: true,
        description: 'Format code on save',
        scope: 'workspace',
      },
      'clangd.path': {
        value: '/usr/bin/clangd',
        description: 'Path to clangd executable',
        scope: 'user',
      },
    },
    keybindings: [
      {
        key: 'ctrl+shift+b',
        command: 'workbench.action.tasks.build',
        description: 'Build project',
      },
      {
        key: 'f5',
        command: 'workbench.action.debug.start',
        description: 'Start debugging',
        when: 'debuggersAvailable',
      },
    ],
    snippets: {
      'main-function': {
        prefix: 'main',
        body: 'int main() {\n    return 0;\n}',
        description: 'Main function',
      },
      'include-iostream': {
        prefix: 'inc',
        body: ['#include <iostream>', '#include <${1:vector}>'],
        description: 'Include standard library',
      },
    },
    hasCommands: true,
    configHash: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
  };

  describe('package.json.handlebars', () => {
    test('renders valid package.json', async () => {
      const output = await generator.render('package.json.handlebars', sampleContext);

      // Should be valid JSON
      const parsed = JSON.parse(output);

      expect(parsed.name).toBe('tpl-vscode-cpp');
      expect(parsed.displayName).toBe('C++ Extension Pack');
      expect(parsed.version).toBe('1.0.0');
      expect(parsed.publisher).toBe('templ-project');
      expect(parsed.engines.vscode).toBe('^1.75.0');
    });

    test('includes extension pack array', async () => {
      const output = await generator.render('package.json.handlebars', sampleContext);
      const parsed = JSON.parse(output);

      expect(parsed.extensionPack).toBeInstanceOf(Array);
      expect(parsed.extensionPack).toContain('llvm-vs-code-extensions.vscode-clangd');
      expect(parsed.extensionPack).toContain('ms-vscode.cmake-tools');
    });

    test('includes keywords', async () => {
      const output = await generator.render('package.json.handlebars', sampleContext);
      const parsed = JSON.parse(output);

      expect(parsed.keywords).toEqual(['cpp', 'c++', 'vscode', 'extensions']);
    });

    test('includes contributes section with snippets', async () => {
      const output = await generator.render('package.json.handlebars', sampleContext);
      const parsed = JSON.parse(output);

      expect(parsed.contributes.snippets).toBeDefined();
      expect(parsed.contributes.snippets[0].language).toBe('cpp');
    });

    test('includes keybindings in contributes', async () => {
      const output = await generator.render('package.json.handlebars', sampleContext);
      const parsed = JSON.parse(output);

      expect(parsed.contributes.keybindings).toBeDefined();
      expect(parsed.contributes.keybindings).toHaveLength(2);
    });
  });

  describe('README.md.handlebars', () => {
    test('renders README with all sections', async () => {
      const output = await generator.render('README.md.handlebars', sampleContext);

      expect(output).toContain('# C++ Extension Pack');
      expect(output).toContain("## 📦 What's Included");
      expect(output).toContain('## 🚀 Installation');
      expect(output).toContain('## ⚙️ Configuration');
      expect(output).toContain('## 📄 License');
    });

    test('includes extension list', async () => {
      const output = await generator.render('README.md.handlebars', sampleContext);

      expect(output).toContain('clangd');
      expect(output).toContain('CMake Tools');
      expect(output).toContain('llvm-vs-code-extensions.vscode-clangd');
    });

    test('includes settings section', async () => {
      const output = await generator.render('README.md.handlebars', sampleContext);

      expect(output).toContain('editor.formatOnSave');
      expect(output).toContain('clangd.path');
    });

    test('includes keybindings section', async () => {
      const output = await generator.render('README.md.handlebars', sampleContext);

      expect(output).toContain('⌨️ Recommended Keybindings');
      expect(output).toContain('ctrl+shift+b');
      expect(output).toContain('Build project');
    });
  });

  describe('CHANGELOG.md.handlebars', () => {
    test('renders CHANGELOG with version', async () => {
      const output = await generator.render('CHANGELOG.md.handlebars', sampleContext);

      expect(output).toContain('# Change Log');
      expect(output).toContain('[1.0.0]');
      expect(output).toContain(sampleContext.date);
    });

    test('includes extension lists', async () => {
      const output = await generator.render('CHANGELOG.md.handlebars', sampleContext);

      expect(output).toContain('Required Extensions');
      expect(output).toContain('Optional Extensions');
      expect(output).toContain('clangd');
    });
  });

  describe('LICENSE.md.handlebars', () => {
    test('renders MIT license', async () => {
      const output = await generator.render('LICENSE.md.handlebars', sampleContext);

      expect(output).toContain('# MIT License');
      expect(output).toContain(`Copyright (c) ${sampleContext.year} templ-project`);
      expect(output).toContain('THE SOFTWARE IS PROVIDED "AS IS"');
    });

    test('includes third-party extension licenses', async () => {
      const output = await generator.render('LICENSE.md.handlebars', sampleContext);

      expect(output).toContain('## Third-Party Extensions');
      expect(output).toContain('clangd');
      expect(output).toContain('llvm-vs-code-extensions');
    });
  });

  describe('extension.ts.handlebars', () => {
    test('renders extension entry point', async () => {
      const output = await generator.render('extension.ts.handlebars', sampleContext);

      expect(output).toContain('export function activate');
      expect(output).toContain('export function deactivate');
      expect(output).toContain('C++ Extension Pack extension is now active!');
    });

    test('includes settings application logic', async () => {
      const output = await generator.render('extension.ts.handlebars', sampleContext);

      expect(output).toContain('function applySettings()');
      expect(output).toContain('function resetSettings()');
      expect(output).toContain('editor.formatOnSave');
    });

    test('registers commands', async () => {
      const output = await generator.render('extension.ts.handlebars', sampleContext);

      expect(output).toContain('templ-project.cpp-vscode.applySettings');
      expect(output).toContain('templ-project.cpp-vscode.resetSettings');
    });
  });

  describe('snippets.json.handlebars', () => {
    test('renders valid snippets JSON', async () => {
      const output = await generator.render('snippets.json.handlebars', sampleContext);

      const parsed = JSON.parse(output);
      expect(parsed['main-function']).toBeDefined();
      expect(parsed['main-function'].prefix).toBe('main');
      expect(parsed['main-function'].description).toBe('Main function');
    });

    test('handles string body', async () => {
      const output = await generator.render('snippets.json.handlebars', sampleContext);
      const parsed = JSON.parse(output);

      // json helper properly handles newlines, so actual newlines are in the output
      expect(parsed['main-function'].body).toEqual(['int main() {\n    return 0;\n}']);
    });

    test('handles array body', async () => {
      const output = await generator.render('snippets.json.handlebars', sampleContext);
      const parsed = JSON.parse(output);

      expect(parsed['include-iostream'].body).toHaveLength(2);
      expect(parsed['include-iostream'].body[0]).toContain('#include <iostream>');
    });
  });

  describe('settings.json.handlebars', () => {
    test('renders valid settings JSON', async () => {
      const output = await generator.render('settings.json.handlebars', sampleContext);

      const parsed = JSON.parse(output);
      expect(parsed['editor.formatOnSave']).toBe(true);
      expect(parsed['clangd.path']).toBe('/usr/bin/clangd');
    });
  });

  describe('keybindings.json.handlebars', () => {
    test('renders valid keybindings JSON array', async () => {
      const output = await generator.render('keybindings.json.handlebars', sampleContext);

      const parsed = JSON.parse(output);
      expect(parsed).toBeInstanceOf(Array);
      expect(parsed).toHaveLength(2);
    });

    test('includes when clause if present', async () => {
      const output = await generator.render('keybindings.json.handlebars', sampleContext);
      const parsed = JSON.parse(output) as Array<{ command: string; when?: string }>;

      const debugBinding = parsed.find((b) => b.command === 'workbench.action.debug.start');
      expect(debugBinding?.when).toBe('debuggersAvailable');
    });
  });

  describe('tsconfig.json.handlebars', () => {
    test('renders valid TypeScript config', async () => {
      const output = await generator.render('tsconfig.json.handlebars', sampleContext);

      const parsed = JSON.parse(output);
      expect(parsed.compilerOptions.module).toBe('commonjs');
      expect(parsed.compilerOptions.target).toBe('ES2020');
      expect(parsed.compilerOptions.outDir).toBe('out');
    });
  });

  describe('Template Syntax', () => {
    test('all templates compile without errors', async () => {
      const templateFiles = [
        'package.json.handlebars',
        'README.md.handlebars',
        'CHANGELOG.md.handlebars',
        'LICENSE.md.handlebars',
        'extension.ts.handlebars',
        'snippets.json.handlebars',
        'settings.json.handlebars',
        'keybindings.json.handlebars',
        'tsconfig.json.handlebars',
      ];

      for (const templateFile of templateFiles) {
        await expect(generator.render(templateFile, sampleContext)).resolves.toBeDefined();
      }
    });

    test('JSON templates produce valid JSON', async () => {
      const jsonTemplates = [
        'package.json.handlebars',
        'snippets.json.handlebars',
        'settings.json.handlebars',
        'keybindings.json.handlebars',
        'tsconfig.json.handlebars',
      ];

      for (const templateFile of jsonTemplates) {
        const output = await generator.render(templateFile, sampleContext);
        expect(() => JSON.parse(output)).not.toThrow();
      }
    });
  });

  describe('Edge Cases', () => {
    test('handles missing optional extensions', async () => {
      const minimalContext = {
        ...sampleContext,
        optionalExtensions: [],
      };

      const output = await generator.render('README.md.handlebars', minimalContext);
      expect(output).not.toContain('Additional Extensions (0)');
    });

    test('handles missing settings', async () => {
      const minimalContext = {
        ...sampleContext,
        settings: {},
      };

      const output = await generator.render('README.md.handlebars', minimalContext);
      expect(output).not.toContain('## ⚙️ Configuration');
    });

    test('handles missing keybindings', async () => {
      const minimalContext = {
        ...sampleContext,
        keybindings: [],
      };

      const output = await generator.render('README.md.handlebars', minimalContext);
      expect(output).not.toContain('## ⌨️ Recommended Keybindings');
    });

    test('handles missing snippets', async () => {
      const minimalContext = {
        ...sampleContext,
        snippets: {},
      };

      const output = await generator.render('package.json.handlebars', minimalContext);
      const parsed = JSON.parse(output);

      expect(parsed.contributes.snippets).toBeUndefined();
    });
  });
});
