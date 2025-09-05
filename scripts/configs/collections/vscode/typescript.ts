import { json2ts, typescriptLanguage } from '../../extensions/typescript';
import { Collection } from '../../shared/types';

export const typescript: Collection = {
  description:
    'Essential TypeScript development environment for VSCode - comprehensive tooling for type-safe development',
  tags: ['typescript', 'types', 'development', 'linting', 'formatting', 'intellisense'],

  required_extensions: [typescriptLanguage, json2ts],

  optional_extensions: [],

  settings: {
    // TypeScript Language Settings
    'typescript.preferences.quoteStyle': {
      value: 'single',
      description: 'Use single quotes for TypeScript imports and strings',
      scope: 'workspace',
    },
    'typescript.suggest.autoImports': {
      value: true,
      description: 'Enable auto-import suggestions for TypeScript',
      scope: 'workspace',
    },
    'typescript.updateImportsOnFileMove.enabled': {
      value: 'always',
      description: 'Automatically update imports when files are moved',
      scope: 'workspace',
    },

    // ESLint Settings for TypeScript
    'eslint.validate': {
      value: ['typescript', 'typescriptreact'],
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

    // Editor Settings for TypeScript
    '[typescript]': {
      value: {
        'editor.defaultFormatter': 'esbenp.prettier-vscode',
        'editor.formatOnSave': true,
        'editor.codeActionsOnSave': {
          'source.fixAll.eslint': 'explicit',
        },
        'editor.tabSize': 2,
        'editor.insertSpaces': true,
      },
      description: 'TypeScript-specific editor settings',
      scope: 'workspace',
    },
    // TODO: (keep as comment) will move to react extension pack
    // "[typescriptreact]": {
    //   value: {
    //     "editor.defaultFormatter": "esbenp.prettier-vscode",
    //     "editor.formatOnSave": true,
    //     "editor.codeActionsOnSave": {
    //       "source.fixAll.eslint": "explicit"
    //     },
    //     "editor.tabSize": 2,
    //     "editor.insertSpaces": true
    //   },
    //   description: "TypeScript React-specific editor settings",
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
    {
      key: 'f12',
      command: 'editor.action.revealDefinition',
      when: 'editorHasDefinitionProvider && editorTextFocus',
      description: 'Go to TypeScript definition',
    },
  ],

  snippets: [
    // TypeScript-specific snippets
    {
      name: 'Interface Declaration',
      prefix: 'interface',
      description: 'TypeScript interface definition',
      body: ['interface ${1:InterfaceName} {', '  ${2:property}: ${3:type};', '}'],
    },
    {
      name: 'Type Alias',
      prefix: 'type',
      description: 'TypeScript type alias',
      body: 'type ${1:TypeName} = ${2:type};',
    },
    {
      name: 'Enum Declaration',
      prefix: 'enum',
      description: 'TypeScript enum definition',
      body: ['enum ${1:EnumName} {', "  ${2:VALUE1} = '${3:value1}',", "  ${4:VALUE2} = '${5:value2}'", '}'],
    },
    {
      name: 'Generic Function',
      prefix: 'gfn',
      description: 'TypeScript generic function',
      body: [
        'function ${1:functionName}<${2:T}>(${3:param}: ${2:T}): ${4:ReturnType} {',
        '  ${5:// function body}',
        '}',
      ],
    },
    {
      name: 'Class with Constructor',
      prefix: 'class',
      description: 'TypeScript class with typed constructor',
      body: [
        'class ${1:ClassName} {',
        '  constructor(private ${2:param}: ${3:type}) {}',
        '',
        '  ${4:methodName}(): ${5:ReturnType} {',
        '    ${6:// method body}',
        '  }',
        '}',
      ],
    },
    {
      name: 'Async Function with Types',
      prefix: 'asyncts',
      description: 'TypeScript async function with return type',
      body: [
        'async function ${1:functionName}(${2:param}: ${3:ParamType}): Promise<${4:ReturnType}> {',
        '  ${5:// async function body}',
        '}',
      ],
    },
  ],

  documentation: {
    setup_guide: `# TypeScript Extension Pack Setup

## Quick Start
1. Install all required extensions
2. Initialize TypeScript configuration (tsconfig.json)
3. Configure ESLint for TypeScript
4. Set up Prettier configuration
5. Restart VSCode to ensure all settings are applied

## Extensions Included

### Core TypeScript Support
- **TypeScript Language Service**: Enhanced IntelliSense, refactoring, and navigation
- **ESLint**: Code linting and quality checking with TypeScript rules
- **Prettier**: Automatic code formatting for consistent style
- **TypeScript Debugger**: Built-in debugging capabilities

### Development Tools
- **TypeScript Snippets**: Essential TypeScript code snippets

### Productivity Tools (Optional)
- **json2ts**: Convert JSON objects to TypeScript interfaces
- **TypeScript Hero**: Enhanced TypeScript tooling with auto-import organization

## Configuration

### TypeScript Setup
Create a \`tsconfig.json\` file in your project root:
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
\`\`\`

### ESLint Setup for TypeScript
Install TypeScript ESLint parser and plugin:
\`\`\`bash
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
\`\`\`

Create an \`.eslintrc.js\` file:
\`\`\`javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    // Add your custom TypeScript rules here
  }
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
    "build": "tsc",
    "dev": "tsc --watch",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit"
  }
}
\`\`\`

## Usage Tips

### Keyboard Shortcuts
- **Ctrl+Shift+F**: Format document with Prettier
- **Ctrl+Shift+E**: Fix ESLint problems
- **F12**: Go to definition
- **Shift+F12**: Find all references
- **F2**: Rename symbol

### Code Snippets
- Type \`interface\` + Tab for interface declaration
- Type \`type\` + Tab for type alias
- Type \`enum\` + Tab for enum declaration
- Type \`class\` + Tab for typed class
- Type \`gfn\` + Tab for generic function

### TypeScript Features
- Hover over variables to see inferred types
- Use Ctrl+Space for intelligent auto-completion
- Leverage TypeScript's strict type checking
- Use refactoring tools for safe code changes

## Best Practices

### Type Definitions
- Prefer interfaces for object shapes
- Use type aliases for union types and primitives
- Always type function parameters and return values
- Use generics for reusable components

### Project Structure
- Keep interfaces and types in separate files
- Use index files for clean imports
- Organize code by feature, not by file type
- Maintain consistent naming conventions`,

    troubleshooting: `# Common TypeScript Issues and Solutions

## TypeScript Compiler Issues

### TypeScript errors not showing
- Ensure TypeScript service is running
- Check TypeScript version compatibility
- Restart TypeScript service: Ctrl+Shift+P > "TypeScript: Restart TS Server"
- Verify tsconfig.json is properly configured

### Type errors in correct code
- Check TypeScript version in project vs VSCode
- Ensure all necessary @types packages are installed
- Verify tsconfig.json includes/excludes are correct
- Clear TypeScript cache and restart

## ESLint Issues with TypeScript

### ESLint not recognizing TypeScript
- Ensure @typescript-eslint/parser is installed
- Check .eslintrc configuration for TypeScript parser
- Verify file extensions in eslint.validate setting
- Check project field in parserOptions

### Conflicting rules between ESLint and TypeScript
- Use @typescript-eslint/recommended preset
- Disable JavaScript rules that conflict with TypeScript
- Use typescript-eslint rules for type-aware linting
- Configure rule overrides for TypeScript files

## Import/Module Issues

### Cannot find module errors
- Check if @types package is installed for the module
- Verify module resolution in tsconfig.json
- Ensure proper file extensions and paths
- Check if declaration files exist

### Auto-imports not working
- Ensure "typescript.suggest.autoImports" is enabled
- Check if files are included in TypeScript project
- Verify tsconfig.json configuration
- Restart TypeScript service

## Debugging Issues

### Breakpoints not working
- Ensure source maps are generated (sourceMap: true)
- Check if files are compiled correctly
- Verify debugger configuration in launch.json
- Check if TypeScript files are in the correct location

### Cannot step through TypeScript code
- Ensure source maps are enabled
- Check TypeScript compilation output
- Verify source map paths are correct
- Use inline source maps for easier debugging

## Performance Issues

### Slow TypeScript compilation
- Exclude unnecessary files in tsconfig.json
- Use incremental compilation (incremental: true)
- Consider using project references for large codebases
- Limit strict checks for better performance during development

### High memory usage
- Increase TypeScript service memory: typescript.tsserver.maxTsServerMemory
- Use skipLibCheck for external libraries
- Consider splitting large projects into smaller modules
- Restart TypeScript service periodically

## General Troubleshooting

### Extension conflicts
- Disable other TypeScript extensions temporarily
- Check for conflicting formatter extensions
- Verify extension compatibility
- Use VSCode's built-in TypeScript support

### Settings not applying
- Check settings scope (user vs workspace)
- Verify JSON syntax in configuration files
- Restart VSCode after major changes
- Check for TypeScript-specific settings overrides`,
  },
};
