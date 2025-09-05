import {
  vscodiumEslint as eslint,
  vscodiumPrettier as prettier,
  vscodiumJsDebugger as jsDebugger,
  vscodiumImportCost as importCost,
  vscodiumQuokka as quokka,
  vscodiumBabelSyntax as babelSyntax,
  bunVSCodium,
  denoVSCodium,
} from '../../extensions/javascript';
import { Collection } from '../../shared/types';

import { javascript as javascriptVSCode } from '../vscode/javascript';

export const javascript: Collection = {
  ...javascriptVSCode,
  description:
    'Essential JavaScript development environment for VSCodium - runtime-agnostic tools using open-source alternatives',

  required_extensions: [eslint, prettier, jsDebugger, babelSyntax],

  optional_extensions: [importCost, quokka, bunVSCodium, denoVSCodium],

  documentation: {
    setup_guide: `# JavaScript Extension Pack Setup (VSCodium)

## Quick Start
1. Install all required extensions from Open VSX Registry
2. Configure ESLint in your project
3. Set up Prettier configuration 
4. Restart VSCodium to ensure all settings are applied

## Extensions Included

### Core Language Support
- **JavaScript Language Service**: Enhanced IntelliSense, refactoring, and navigation
- **ESLint**: Code linting and quality checking with auto-fix capabilities
- **Prettier**: Automatic code formatting for consistent style
- **Babel JavaScript**: Modern JavaScript syntax highlighting

### Development Tools
- **JavaScript (ES6) Snippets**: Comprehensive ES6+ code snippets
- **JavaScript Debugger**: Built-in debugging capabilities

### Productivity Enhancers (Optional)
- **Import Cost**: Shows the size impact of imported packages

### Optional Advanced Tools
- **Quokka.js**: Live JavaScript playground for rapid prototyping
- **Bun for Visual Studio Code**: Official Bun runtime support with debugging and IntelliSense
- **Deno**: Official Deno runtime support with TypeScript integration and debugging

## VSCodium Specific Notes

This collection is optimized for VSCodium and uses only open-source extensions available through the Open VSX Registry. Microsoft's proprietary IntelliCode is excluded in favor of the built-in JavaScript language service which provides excellent IntelliSense capabilities.

Multi-language tools like Code Runner and SonarLint are available in the Generic Extended collection to avoid duplication across language-specific packs.

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

    troubleshooting: `# Common Issues and Solutions (VSCodium)

## Extension Installation Issues

### Extensions not available
- Ensure you're using the Open VSX Registry: \`File > Preferences > Settings > Extensions: Gallery API URL\`
- Set to: \`https://open-vsx.org/vscode/gallery\`
- Some extensions may have different names or publishers compared to VSCode marketplace

### IntelliCode not available
- VSCodium excludes Microsoft's proprietary IntelliCode
- The built-in JavaScript language service provides excellent IntelliSense
- Consider enabling experimental features for enhanced suggestions

## ESLint Issues

### ESLint not working
- Ensure ESLint is installed: \`npm install eslint --save-dev\`
- Check if .eslintrc configuration file exists
- Verify file is included in eslint.validate setting
- Restart VSCodium after installing ESLint

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

## Import/IntelliSense Issues

### Auto-imports not working
- Ensure "javascript.suggest.autoImports" is enabled
- Check if project has proper package.json
- Verify JavaScript service is running
- Restart JavaScript service: Ctrl+Shift+P > "JavaScript: Restart JS/TS Language Service"

### Missing IntelliSense
- Check if file is part of a JavaScript project
- Ensure proper file associations
- Check JavaScript version compatibility
- Try reloading VSCodium window

## General Troubleshooting

### Extensions not loading
- Check VSCodium version compatibility
- Disable/re-enable extensions
- Clear extension cache
- Check for extension conflicts

### Settings not applying
- Check settings scope (user vs workspace)
- Verify JSON syntax in settings files
- Restart VSCodium after major changes
- Check for duplicate or conflicting settings

## VSCodium Specific Tips

### Extension Marketplace
- Use Open VSX Registry for extension installations
- Some popular VSCode extensions may not be available
- Look for alternative extensions with similar functionality

### Performance
- VSCodium may perform differently than VSCode
- Disable unused extensions to improve performance
- Consider adjusting JavaScript service memory limits for large projects`,
  },
};
