import { Collection } from '../../shared/types';
import { githubCopilotVSCode } from '../../extensions/ai';
import { 
  bookmarks, 
  todoTree, 
  codeSpellChecker, 
  betterComments,
  trailingSpaces,
  yamlSupport,
  tomlSupport,
  json5Support,
  markdownAllInOne,
  markdownlint,
  markdownTablePrettify,
  versionLens,
  pathIntellisense,
  dotenv
} from '../../extensions/productivity';
import {
  gitlens, 
} from '../../extensions/cvs';

export const genericEssential: Collection = {
  description: "Essential productivity extensions for general development in VSCode",
  tags: ["productivity", "general", "essential", "git", "debugging", "editing"],
  
  required_extensions: [
    // ai extensions
    githubCopilotVSCode,
    // CVS
    gitlens,
    // Productivity
    betterComments,
    bookmarks,
    codeSpellChecker,
    dotenv,
    pathIntellisense,
    todoTree,
    versionLens,
    // Editing
    json5Support,
    markdownAllInOne,
    markdownlint,
    markdownTablePrettify,
    tomlSupport,
    yamlSupport,
  ],
  
  optional_extensions: [
    // Productivity
    trailingSpaces
  ],
  
  settings: {
    'workbench.colorTheme': {
      value: 'Default Dark+',
      description: 'Default dark theme for better visibility',
      scope: 'user'
    },
    'editor.renderWhitespace': {
      value: 'trailing',
      description: 'Show trailing whitespace',
      scope: 'user'
    },
    'files.trimTrailingWhitespace': {
      value: true,
      description: 'Trim trailing whitespace on save',
      scope: 'workspace'
    },
    'files.insertFinalNewline': {
      value: true,
      description: 'Insert final newline at end of file',
      scope: 'workspace'
    },
    'editor.rulers': {
      value: [80, 120],
      description: 'Show rulers at 80 and 120 characters',
      scope: 'user'
    },
    'scm.defaultViewMode': {
      value: 'tree',
      description: 'Default Git view mode',
      scope: 'user'
    },
    
    // JSON and JSONC formatting settings
    '[json]': {
      value: {
        "editor.defaultFormatter": "vscode.json-language-features",
        "editor.formatOnSave": true,
        "editor.tabSize": 2,
        "editor.insertSpaces": true
      },
      description: "JSON file formatting settings using built-in formatter",
      scope: "workspace"
    },
    '[jsonc]': {
      value: {
        "editor.defaultFormatter": "vscode.json-language-features",
        "editor.formatOnSave": true,
        "editor.tabSize": 2,
        "editor.insertSpaces": true
      },
      description: "JSON with Comments file formatting settings using built-in formatter",
      scope: "workspace"
    }
  },
  
  keybindings: [
    {
      key: 'ctrl+shift+b',
      command: 'bookmarks.toggle',
      description: 'Toggle bookmark',
      when: 'editorTextFocus'
    },
    {
      key: 'ctrl+shift+j',
      command: 'bookmarks.jumpToNext',
      description: 'Jump to next bookmark'
    },
    {
      key: 'ctrl+shift+k',
      command: 'bookmarks.jumpToPrevious',
      description: 'Jump to previous bookmark'
    }
  ],
  
  snippets: [],
  
  documentation: {
    setup_guide: `# Generic Essential Extension Pack Setup

## Quick Start
1. Install all required extensions
2. Configure Git if not already done
3. Set up GitHub Copilot authentication
4. Restart VSCode to ensure all settings are applied

## Extensions Included
- **GitHub Copilot**: AI-powered code completion and suggestions
- **GitLens**: Enhanced Git integration and history visualization
- **Bookmarks**: Quick navigation within large codebases
- **TODO Tree**: Track TODOs and FIXMEs across the project
- **Code Spell Checker**: Prevent typos in code, comments, and documentation
- **Better Comments**: Enhanced comment visibility and organization
- **DotENV**: Syntax highlighting and IntelliSense for .env files
- **Path Intellisense**: Autocomplete for file paths and imports to improve productivity
- **YAML Support**: Essential YAML editing and validation
- **TOML Support**: Advanced TOML editing with validation, formatting, and JSON schema support
- **JSON Support**: JSON language support with schema validation (includes JSONC formatting)
- **JSON5 Support**: JSON5 syntax support for configuration files
- **Markdown All in One**: Comprehensive Markdown editing with table of contents, shortcuts, and preview
- **markdownlint**: Markdown linting and style checking for consistent documentation
- **Markdown Table Prettifier**: Format and prettify markdown tables for better readability
- **Version Lens**: Version information for package dependencies in package.json files

## Git Configuration
\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
\`\`\`

## GitHub Copilot Setup
1. Sign in to GitHub Copilot through VSCode
2. Accept the license terms
3. Start coding with AI assistance`,

    troubleshooting: `# Common Issues and Solutions

## GitHub Copilot not working
- Ensure you have an active GitHub Copilot subscription
- Sign in through VSCode: Command Palette > "GitHub Copilot: Sign In"
- Check network connectivity

## GitLens not showing information
- Ensure you're in a Git repository
- Check that Git is installed and accessible
- Refresh the repository: Command Palette > "GitLens: Reset Avatar Cache"

## Bookmarks not persisting
- Bookmarks are saved per workspace
- Check that workspace is properly configured
- Verify file permissions in workspace directory`
  }
};
