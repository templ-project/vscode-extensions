import { Collection } from '../../shared/types';
import {
  vscodiumTsSnippets as tsSnippets,
  vscodiumTsDebugger as tsDebugger,
  vscodiumTypescriptLanguage as typescriptLanguage,
} from '../../extensions/typescript';

import {typescript as typescriptVSCode} from '../vscode/typescript';

export const typescript: Collection = {
  ...typescriptVSCode,
  description: "Essential TypeScript development environment for VSCodium - comprehensive tooling for type-safe development using open-source alternatives",

    required_extensions: [
      typescriptLanguage,
      tsSnippets,
      tsDebugger
    ],

  documentation: {
    setup_guide: `# TypeScript Extension Pack Setup (VSCodium)

## Quick Start
1. Install all required extensions from Open VSX Registry
2. Initialize TypeScript configuration (tsconfig.json)
3. Configure ESLint for TypeScript
4. Set up Prettier configuration
5. Restart VSCodium to ensure all settings are applied

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

## VSCodium Specific Notes

This collection is optimized for VSCodium and uses only open-source extensions available through the Open VSX Registry. All essential TypeScript development capabilities are included through open-source alternatives.

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

    troubleshooting: `# Common TypeScript Issues and Solutions (VSCodium)

## TypeScript Compiler Issues

### TypeScript errors not showing
- Ensure TypeScript service is running
- Check TypeScript version compatibility
- Restart TypeScript service: Ctrl+Shift+P > "TypeScript: Restart TS Server"
- Verify tsconfig.json is properly configured

### Type errors in correct code
- Check TypeScript version in project vs VSCodium
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

## Extension Installation Issues

### Extensions not available
- Ensure you're using the Open VSX Registry: \`File > Preferences > Settings > Extensions: Gallery API URL\`
- Set to: \`https://open-vsx.org/vscode/gallery\`
- Some extensions may have different names or publishers compared to VSCode marketplace

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

## VSCodium Specific Tips

### Extension Marketplace
- Use Open VSX Registry for extension installations
- Some popular VSCode extensions may not be available
- Look for alternative extensions with similar functionality

### Performance
- VSCodium may perform differently than VSCode
- Disable unused extensions to improve performance
- Consider adjusting TypeScript service memory limits for large projects

## General Troubleshooting

### Extension conflicts
- Disable other TypeScript extensions temporarily
- Check for conflicting formatter extensions
- Verify extension compatibility
- Use VSCodium's built-in TypeScript support

### Settings not applying
- Check settings scope (user vs workspace)
- Verify JSON syntax in configuration files
- Restart VSCodium after major changes
- Check for TypeScript-specific settings overrides`
  }
};
