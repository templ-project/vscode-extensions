import {
  eslint,
  prettier,
  intelliCode,
  jsDebugger,
  importCost,
  quokka,
  babelSyntax,
  bunVSCode,
  deno,
} from '../../extensions/javascript';
import { Collection } from '../../shared/types';

export const javascript: Collection = {
  description:
    'Essential JavaScript development environment for VSCode - runtime-agnostic tools for modern JavaScript development',
  tags: ['javascript', 'es6', 'frontend', 'web', 'development', 'linting', 'formatting'],

  required_extensions: [eslint, prettier, jsDebugger, babelSyntax],

  optional_extensions: [intelliCode, importCost, quokka, bunVSCode, deno],

  settings: {
    // JavaScript Language Settings
    'javascript.preferences.quoteStyle': {
      value: 'single',
      description: 'Use single quotes for JavaScript imports and strings',
      scope: 'workspace',
    },
    'javascript.suggest.autoImports': {
      value: true,
      description: 'Enable auto-import suggestions for JavaScript',
      scope: 'workspace',
    },
    'javascript.updateImportsOnFileMove.enabled': {
      value: 'always',
      description: 'Automatically update imports when files are moved',
      scope: 'workspace',
    },

    // ESLint Settings
    'eslint.validate': {
      value: ['javascript', 'javascriptreact'],
      description: 'File types to validate with ESLint',
      scope: 'workspace',
    },
    'eslint.format.enable': {
      value: false,
      description: 'Disable ESLint as formatter (use Prettier instead)',
      scope: 'workspace',
    },
    'eslint.codeActionsOnSave.rules': {
      value: ['*'],
      description: 'ESLint rules to fix on save',
      scope: 'workspace',
    },

    // Editor Settings for JavaScript
    '[javascript]': {
      value: {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
        'editor.formatOnSave': true,
        'editor.codeActionsOnSave': {
          'source.fixAll.eslint': 'explicit',
        },
        'editor.tabSize': 2,
        'editor.insertSpaces': true,
      },
      description: 'JavaScript-specific editor settings',
      scope: 'workspace',
    },
    // TODO: (keep as comment) will move to react extension pack
    // "[javascriptreact]": {
    //   value: {
    //     "editor.defaultFormatter": "esbenp.prettier-vscode",
    //     "editor.formatOnSave": true,
    //     "editor.codeActionsOnSave": {
    //       "source.fixAll.eslint": "explicit"
    //     },
    //     "editor.tabSize": 2,
    //     "editor.insertSpaces": true
    //   },
    //   description: "JavaScript React-specific editor settings",
    //   scope: "workspace"
    // }
  },

  keybindings: [
    {
      key: 'ctrl+shift+f',
      command: 'prettier.forceFormatDocument',
      when: 'editorTextFocus',
      description: 'Force format document with Prettier',
    },
    {
      key: 'ctrl+shift+e',
      command: 'eslint.executeAutofix',
      when: 'editorTextFocus',
      description: 'Fix ESLint problems in current file',
    },
  ],

  snippets: [
    // Core Language Constructs
    {
      name: 'Function Declaration',
      prefix: 'fn',
      description: 'JavaScript function declaration',
      body: ['function ${1:functionName}(${2:parameters}) {', '  ${3:// function body}', '}'],
    },
    {
      name: 'Arrow Function',
      prefix: 'af',
      description: 'JavaScript arrow function',
      body: ['const ${1:functionName} = (${2:parameters}) => {', '  ${3:// function body}', '};'],
    },
    {
      name: 'Class Declaration',
      prefix: 'cl',
      description: 'JavaScript class definition',
      body: [
        'class ${1:ClassName} {',
        '  constructor(${2:parameters}) {',
        '    ${3:// constructor body}',
        '  }',
        '',
        '  ${4:methodName}(${5:parameters}) {',
        '    ${6:// method body}',
        '  }',
        '}',
      ],
    },
    {
      name: 'Class Method',
      prefix: 'cm',
      description: 'Class method definition',
      body: ['${1:methodName}(${2:parameters}) {', '  ${3:// method body}', '}'],
    },

    // Control Flow
    {
      name: 'If Statement',
      prefix: 'if',
      description: 'Simple if statement',
      body: ['if (${1:condition}) {', '  ${2:// if body}', '}'],
    },
    {
      name: 'If-Else Statement',
      prefix: 'ifel',
      description: 'If-else statement',
      body: ['if (${1:condition}) {', '  ${2:// if body}', '} else {', '  ${3:// else body}', '}'],
    },
    {
      name: 'For Loop',
      prefix: 'for',
      description: 'Standard for loop',
      body: ['for (let ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {', '  ${3:// loop body}', '}'],
    },
    {
      name: 'For-Of Loop',
      prefix: 'forof',
      description: 'For-of loop for iterables',
      body: ['for (const ${1:item} of ${2:iterable}) {', '  ${3:// loop body}', '}'],
    },
    {
      name: 'While Loop',
      prefix: 'whl',
      description: 'While loop',
      body: ['while (${1:condition}) {', '  ${2:// loop body}', '}'],
    },
    {
      name: 'Switch Statement',
      prefix: 'sw',
      description: 'Switch statement',
      body: [
        'switch (${1:expression}) {',
        '  case ${2:value1}:',
        '    ${3:// case 1}',
        '    break;',
        '  case ${4:value2}:',
        '    ${5:// case 2}',
        '    break;',
        '  default:',
        '    ${6:// default case}',
        '}',
      ],
    },

    // Import/Export
    {
      name: 'Import Statement',
      prefix: 'im',
      description: 'ES6 import statement',
      body: "import { ${1:exports} } from '${2:module}';",
    },
    {
      name: 'Import Default',
      prefix: 'imd',
      description: 'ES6 default import',
      body: "import ${1:name} from '${2:module}';",
    },
    {
      name: 'Import All',
      prefix: 'ima',
      description: 'Import all as namespace',
      body: "import * as ${1:name} from '${2:module}';",
    },
    {
      name: 'Export Function',
      prefix: 'ex',
      description: 'Export a function',
      body: ['export function ${1:functionName}(${2:parameters}) {', '  ${3:// function body}', '}'],
    },
    {
      name: 'Export Class',
      prefix: 'exc',
      description: 'Export a class',
      body: [
        'export class ${1:ClassName} {',
        '  constructor(${2:parameters}) {',
        '    ${3:// constructor body}',
        '  }',
        '}',
      ],
    },
    {
      name: 'Export Default',
      prefix: 'exd',
      description: 'Default export',
      body: 'export default ${1:exportedItem};',
    },

    // Development/Debugging
    {
      name: 'Console Log',
      prefix: 'log',
      description: 'Console.log statement',
      body: "console.log('${1:message}', ${2:variable});",
    },
    {
      name: 'Console Error',
      prefix: 'logerr',
      description: 'Console.error statement',
      body: "console.error('${1:error}', ${2:errorObject});",
    },
    {
      name: 'Console Warn',
      prefix: 'logwarn',
      description: 'Console.warn statement',
      body: "console.warn('${1:warning}', ${2:warningObject});",
    },
    {
      name: 'Debug Print',
      prefix: 'debug',
      description: 'Debug logging with context',
      body: "console.debug('${1:context}:', ${2:variable});",
    },
    {
      name: 'Comment Block',
      prefix: 'com',
      description: 'Multi-line comment block',
      body: ['/**', ' * ${1:description}', ' */'],
    },
    {
      name: 'TODO Comment',
      prefix: 'todo',
      description: 'TODO comment marker',
      body: '// TODO: ${1:description}',
    },

    // Async/Promises
    {
      name: 'Async Function',
      prefix: 'async',
      description: 'Async function declaration',
      body: ['async function ${1:functionName}(${2:parameters}) {', '  ${3:// async function body}', '}'],
    },
    {
      name: 'Promise',
      prefix: 'promise',
      description: 'Promise constructor',
      body: ['new Promise((resolve, reject) => {', '  ${1:// promise body}', '})'],
    },
    {
      name: 'Try-Catch',
      prefix: 'try',
      description: 'Try-catch block',
      body: ['try {', '  ${1:// try body}', '} catch (${2:error}) {', '  ${3:// catch body}', '}'],
    },
  ],

  documentation: {
    setup_guide: `# JavaScript Extension Pack Setup

## Quick Start
1. Install all required extensions
2. Configure ESLint in your project
3. Set up Prettier configuration 
4. Restart VSCode to ensure all settings are applied

## Extensions Included

### Core Language Support
- **JavaScript Language Service**: Enhanced IntelliSense, refactoring, and navigation
- **ESLint**: Code linting and quality checking with auto-fix capabilities
- **Prettier**: Automatic code formatting for consistent style
- **Babel JavaScript**: Modern JavaScript syntax highlighting

### Development Tools
- **JavaScript (ES6) Snippets**: Comprehensive ES6+ code snippets
- **IntelliCode**: AI-powered code completion suggestions
- **JavaScript Debugger**: Built-in debugging capabilities

### Productivity Enhancers (Optional)
- **Import Cost**: Shows the size impact of imported packages

### Optional Advanced Tools
- **Quokka.js**: Live JavaScript playground for rapid prototyping
- **Bun for Visual Studio Code**: Official Bun runtime support with debugging and IntelliSense
- **Deno**: Official Deno runtime support with TypeScript integration and debugging

## Configuration

### ESLint Setup
Create an \`.eslintrc.js\` file in your project root:
\`\`\`javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // Add your custom rules here
  },
};
\`\`\`

### Prettier Setup
Create a \`.prettierrc\` file in your project root:
\`\`\`json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "printWidth": 100
}
\`\`\`

### Package.json Scripts
Add these helpful scripts to your \`package.json\`:
\`\`\`json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx",
    "lint:fix": "eslint . --ext .js,.jsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
\`\`\`

## Usage Tips

### Keyboard Shortcuts
- **Ctrl+Shift+F**: Format document with Prettier
- **Ctrl+Shift+E**: Fix ESLint problems

### Code Snippets
- Type \`fn\` + Tab for function declaration
- Type \`af\` + Tab for arrow function
- Type \`cl\` + Tab for class declaration
- Type \`im\` + Tab for import statement
- Type \`log\` + Tab for console.log

### Debugging
1. Set breakpoints by clicking in the gutter
2. Press F5 to start debugging
3. Use the debug console for runtime evaluation`,

    troubleshooting: `# Common Issues and Solutions

## ESLint Issues

### ESLint not working
- Ensure ESLint is installed: \`npm install eslint --save-dev\`
- Check if .eslintrc configuration file exists
- Verify file is included in eslint.validate setting
- Restart VSCode after installing ESLint

### ESLint rules not being applied
- Check .eslintrc configuration syntax
- Ensure the file extension is supported
- Check ESLint output panel for errors
- Try running \`npx eslint yourfile.js\` in terminal

## Prettier Issues

### Prettier not formatting
- Ensure Prettier is installed: \`npm install prettier --save-dev\`
- Check if .prettierrc configuration exists
- Verify Prettier is set as default formatter
- Check for conflicting formatters

### Format on save not working
- Ensure "editor.formatOnSave" is true
- Check language-specific settings
- Verify Prettier extension is enabled
- Check for workspace vs user settings conflicts

## Code Runner Issues

### Code not executing
- Check if Node.js is installed and in PATH
- Verify file has been saved
- Check Code Runner output panel for errors
- Try running code in integrated terminal manually

### Wrong output or errors
- Ensure file syntax is correct
- Check if file has proper file extension (.js)
- Verify Code Runner executor settings
- Clear previous output before running

## Import/IntelliSense Issues

### Auto-imports not working
- Ensure "javascript.suggest.autoImports" is enabled
- Check if project has proper package.json
- Verify TypeScript service is running
- Restart TypeScript service: Ctrl+Shift+P > "TypeScript: Restart TS Server"

### Missing IntelliSense
- Check if file is part of a JavaScript/TypeScript project
- Ensure proper file associations
- Check TypeScript version compatibility
- Try reloading VSCode window

## General Troubleshooting

### Extensions not loading
- Check VSCode version compatibility
- Disable/re-enable extensions
- Clear extension cache
- Check for extension conflicts

### Settings not applying
- Check settings scope (user vs workspace)
- Verify JSON syntax in settings files
- Restart VSCode after major changes
- Check for duplicate or conflicting settings`,
  },
};
