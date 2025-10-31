import type { Collection } from '../../../scripts/configs/shared/types.js';

/**
 * Minimal test collection for integration testing
 * Uses a small set of real extensions to keep tests fast
 */
export const testCollection: Collection = {
  description: 'Test collection for integration tests',
  tags: ['test', 'integration'],
  required_extensions: [
    {
      id: 'ms-vscode.vscode-typescript-next',
      name: 'TypeScript Nightly',
      description: 'TypeScript language support',
      publisher: 'ms-vscode',
      license: 'MIT',
      why_required: 'Latest TypeScript features for testing',
    },
    {
      id: 'dbaeumer.vscode-eslint',
      name: 'ESLint',
      description: 'Integrates ESLint JavaScript',
      publisher: 'dbaeumer',
      license: 'MIT',
      why_required: 'JavaScript/TypeScript linting',
    },
  ],
  optional_extensions: [
    {
      id: 'esbenp.prettier-vscode',
      name: 'Prettier',
      description: 'Code formatter',
      publisher: 'esbenp',
      license: 'MIT',
      why_recommended: 'Code formatting',
    },
  ],
  settings: {
    'editor.formatOnSave': {
      value: true,
      description: 'Format code on save',
      scope: 'user',
    },
    'eslint.enable': {
      value: true,
      description: 'Enable ESLint',
      scope: 'workspace',
    },
  },
  snippets: [
    {
      name: 'Test Console Log',
      prefix: 'tclog',
      description: 'Test console.log statement',
      body: "console.log('test:', ${1:variable});",
    },
    {
      name: 'Test Arrow Function',
      prefix: 'taf',
      description: 'Test arrow function',
      body: ['const ${1:name} = (${2:params}) => {', '  ${3:// body}', '};'],
    },
  ],
  keybindings: [
    {
      key: 'ctrl+shift+t',
      command: 'workbench.action.terminal.new',
      description: 'Open new terminal',
      when: 'terminalFocus',
    },
  ],
  documentation: {
    setup_guide: `# Test Collection Setup

This is a test collection for integration testing.

## Installation

1. Install the extension pack
2. Reload VSCode
3. Test features work correctly

## Usage

Use this collection to test the build system.
`,
    troubleshooting: `# Troubleshooting

## Common Issues

### Extension Not Loading

1. Check VSCode version compatibility
2. Reload window
3. Check extension logs

### Settings Not Applied

1. Verify settings.json syntax
2. Restart VSCode
3. Check workspace settings priority
`,
  },
};
