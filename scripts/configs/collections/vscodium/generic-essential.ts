import { Collection } from '../../shared/types';
import { continueAIVSCodium, codeiumVSCodium } from '../../extensions/ai';
import { 
  bookmarks, 
  todoTree, 
  codeSpellChecker, 
  betterComments,
  yamlSupport,
  tomlSupport,
  markdownAllInOne,
  markdownlint,
  markdownTablePrettify,
  betterJson5,
  versionLensVSCodium,
  trailingSpacesVSCodium,
  pathIntellisenseVSCodium,
  dotenvVSCodium
} from '../../extensions/productivity';
import {
  gitlensVSCodium, 
} from '../../extensions/cvs';
import { genericEssential as genericEssentialVSCode } from '../vscode/generic-essential';

export const genericEssential: Collection = {
  ...genericEssentialVSCode,
  description: "Essential productivity extensions for general development in VSCodium (JSON support built-in)",
  
  required_extensions: [
    // ai extensions
    continueAIVSCodium,
    // CVS
    gitlensVSCodium,
    // Productivity
    bookmarks,
    todoTree,
    codeSpellChecker,
    betterComments,
    dotenvVSCodium,
    pathIntellisenseVSCodium,
    versionLensVSCodium,
    // Editing
    yamlSupport,
    tomlSupport,
    betterJson5,
    markdownAllInOne,
    markdownlint,
    markdownTablePrettify,
  ],
  
  optional_extensions: [
    // ai extensions
    // TODO: (keep commented) make sure codeium is a good fit for VSCodium extension
    // codeiumVSCodium,
    // Productivity
    trailingSpacesVSCodium,
  ],
  
  settings: {
    ...genericEssentialVSCode.settings,
    'telemetry.enableTelemetry': {
      value: false,
      description: 'Disable telemetry (VSCodium default)',
      scope: 'user'
    },
    'update.mode': {
      value: 'manual',
      description: 'Manual updates recommended for VSCodium',
      scope: 'user'
    }
  },
  
  documentation: {
    setup_guide: `# Generic Essential Extension Pack Setup for VSCodium

## Quick Start
1. Install all required extensions from Open VSX Registry
2. Configure Git if not already done
3. Set up Continue AI assistant
4. Restart VSCodium to ensure all settings are applied

## Extensions Included
- **Continue AI**: AI-powered code completion and chat
- **GitLens**: Enhanced Git integration and history visualization
- **Bookmarks**: Quick navigation within large codebases
- **TODO Tree**: Track TODOs and FIXMEs across the project
- **Code Spell Checker**: Prevent typos in code, comments, and documentation
- **Better Comments**: Enhanced comment visibility and organization
- **DotENV**: Syntax highlighting and IntelliSense for .env files
- **Path Intellisense**: Autocomplete for file paths and imports to improve productivity
- **YAML Support**: Essential YAML editing and validation
- **TOML Support**: TOML configuration file support
- **Better JSON5**: JSON5 syntax support for configuration files
- **Markdown All in One**: Comprehensive Markdown editing with table of contents, shortcuts, and preview
- **markdownlint**: Markdown linting and style checking for consistent documentation
- **Markdown Table Prettifier**: Format and prettify markdown tables for better readability
- **Version Lens**: Version information for package dependencies in package.json files

## Built-in Support
- **JSON**: Basic JSON editing and validation (built into VSCodium)
- **JSONC**: JSON with Comments support (built into VSCodium)

## Git Configuration
\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
\`\`\`

## Continue AI Assistant Setup
1. Install Continue extension
2. Configure your preferred AI model (OpenAI, Anthropic, etc.)
3. Set up API keys in Continue settings
4. Start coding with AI assistance

## VSCodium vs VSCode
- VSCodium uses Open VSX Registry instead of Microsoft Marketplace
- Some Microsoft extensions may not be available
- Telemetry is disabled by default
- Open source alternative to VSCode`,

    troubleshooting: `# Common Issues and Solutions

## Continue AI not working
- Configure AI provider in Continue settings
- Check API keys are correctly set
- Verify network connectivity
- Review Continue documentation for setup

## Extension not found
- Check if extension is available in Open VSX Registry
- Look for alternative extensions
- Consider manual installation from .vsix files

## GitLens not showing information
- Ensure you're in a Git repository
- Check that Git is installed and accessible
- Refresh the repository view

## Bookmarks not persisting
- Bookmarks are saved per workspace
- Check that workspace is properly configured
- Verify file permissions in workspace directory`
  }
};
