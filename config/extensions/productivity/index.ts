import { Extension } from '../../shared/types';

export const bookmarks: Extension = {
  id: 'alefragnani.bookmarks',
  name: 'Bookmarks',
  description: 'Mark lines and jump to them',
  publisher: 'Alessandro Fragnani',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=alefragnani.bookmarks',
  why_required: 'Quick navigation within large codebases',
};

export const todoTree: Extension = {
  id: 'gruntfuggly.todo-tree',
  name: 'TODO Tree',
  description: 'Show TODO, FIXME, etc. comment tags in a tree view',
  publisher: 'Gruntfuggly',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=gruntfuggly.todo-tree',
  why_required: 'Track TODOs and FIXMEs across the project',
};

export const codeSpellChecker: Extension = {
  id: 'streetsidesoftware.code-spell-checker',
  name: 'Code Spell Checker',
  description: 'Spelling checker for source code',
  publisher: 'Street Side Software',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker',
  why_required: 'Prevent typos in code, comments, and documentation',
};

export const betterComments: Extension = {
  id: 'aaron-bond.better-comments',
  name: 'Better Comments',
  description: 'Improve your code commenting by annotating with alert, info, todo, and more',
  publisher: 'Aaron Bond',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments',
  why_required: 'Enhanced comment visibility and organization',
};

export const trailingSpaces: Extension = {
  id: 'shardulm94.trailing-spaces',
  name: 'Trailing Spaces',
  description: 'Highlight trailing spaces and delete them in a flash',
  publisher: 'Shardul Mahadik',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces',
  why_recommended: 'Clean up code by removing unnecessary spaces',
};

export const trailingSpacesVSCodium: Extension = {
  ...trailingSpaces,
  marketplace_url: 'https://open-vsx.org/extension/shardulm94/trailing-spaces',
};

export const yamlSupport: Extension = {
  id: 'redhat.vscode-yaml',
  name: 'YAML',
  description: 'YAML language support with schema validation',
  publisher: 'Red Hat',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml',
  why_required: 'Essential YAML editing and validation',
};

export const tomlSupport: Extension = {
  id: 'tamasfe.even-better-toml',
  name: 'Even Better TOML',
  description: 'Fully-featured TOML support with syntax highlighting, validation, formatting, and schema support',
  publisher: 'tamasfe',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml',
  why_required: 'Advanced TOML editing with validation, formatting, and JSON schema support',
};

export const tomlSupportVSCodium: Extension = {
  ...tomlSupport,
  marketplace_url: 'https://open-vsx.org/extension/tamasfe/even-better-toml',
};

export const markdownAllInOne: Extension = {
  id: 'yzhang.markdown-all-in-one',
  name: 'Markdown All in One',
  description: 'All you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more)',
  publisher: 'Yu Zhang',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one',
  why_required: 'Comprehensive Markdown editing with table of contents, shortcuts, and preview',
};

export const markdownMermaid: Extension = {
  id: 'bierner.markdown-mermaid',
  name: 'Markdown Preview Mermaid Support',
  description: "Adds Mermaid diagram and flowchart support to VS Code's builtin markdown preview",
  publisher: 'Matt Bierner',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermai',
  why_required: 'The need to view Mermaid diagrams and flowcharts directly within markdown files',
};

export const markdownWermaidSyntax: Extension = {
  id: 'bpruitt-goddard.mermaid-markdown-syntax-highlighting',
  name: 'Mermaid Markdown Syntax Highlighting',
  description: 'Markdown syntax support for the Mermaid charting language',
  publisher: 'Brian Pruitt-Goddard',
  license: 'MIT',
  marketplace_url:
    'https://marketplace.visualstudio.com/items?itemName=bpruitt-goddard.mermaid-markdown-syntax-highlighting',
  why_required: 'The need to view Mermaid Syntax when working in Markdown files',
};

export const markdownlint: Extension = {
  id: 'davidanson.vscode-markdownlint',
  name: 'markdownlint',
  description: 'Markdown linting and style checking for Visual Studio Code',
  publisher: 'David Anson',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=davidanson.vscode-markdownlint',
  why_required: 'Markdown linting and style checking for consistent documentation',
};

export const markdownTablePrettify: Extension = {
  id: 'darkriszty.markdown-table-prettify',
  name: 'Markdown Table Prettifier',
  description: 'Transforms markdown tables to be more readable',
  publisher: 'darkriszty',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=darkriszty.markdown-table-prettify',
  why_required: 'Format and prettify markdown tables for better readability',
};

export const betterJson5: Extension = {
  id: 'BlueGlassBlock.better-json5',
  name: 'Better JSON5',
  description: 'JSON5 language support with syntax highlighting and validation',
  publisher: 'BlueGlassBlock',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/BlueGlassBlock/better-json5',
  why_required: 'JSON5 syntax support for configuration files (Open VSX compatible)',
};

export const versionLens: Extension = {
  id: 'pflannery.vscode-versionlens',
  name: 'Version Lens',
  description: 'Shows the latest version for each package using code lens',
  publisher: 'pflannery',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens',
  why_required: 'Version information for package dependencies in package.json files',
};

export const versionLensVSCodium: Extension = {
  id: 'pflannery.vscode-versionlens',
  name: 'Version Lens',
  description: 'Shows the latest version for each package using code lens',
  publisher: 'pflannery',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/pflannery/vscode-versionlens',
  why_required: 'Version information for package dependencies in package.json files (Open VSX compatible)',
};

export const pathIntellisense: Extension = {
  id: 'christian-kohler.path-intellisense',
  name: 'Path Intellisense',
  description: 'Visual Studio Code plugin that autocompletes filenames',
  publisher: 'Christian Kohler',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense',
  why_required: 'Autocomplete for file paths and imports to improve productivity',
};

export const pathIntellisenseVSCodium: Extension = {
  ...pathIntellisense,
  marketplace_url: 'https://open-vsx.org/extension/christian-kohler/path-intellisense',
};

export const dotenv: Extension = {
  id: 'mikestead.dotenv',
  name: 'DotENV',
  description: 'Support for dotenv file syntax',
  publisher: 'mikestead',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv',
  why_required: 'Syntax highlighting and IntelliSense for .env files',
};

export const dotenvVSCodium: Extension = {
  ...dotenv,
  marketplace_url: 'https://open-vsx.org/extension/mikestead/dotenv',
};

export const json5Support: Extension = {
  id: 'mrmlnc.vscode-json5',
  name: 'JSON5 syntax',
  description: 'JSON5 syntax support',
  publisher: 'mrmlnc',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-json5',
  why_required: 'JSON5 configuration file support',
};

// Multi-language development tools
export const codeRunner: Extension = {
  id: 'formulahendry.code-runner',
  name: 'Code Runner',
  description: 'Run code snippets or code files for multiple languages',
  publisher: 'Jun Han',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner',
  why_required: 'Quick execution of code snippets for testing and prototyping across multiple languages',
};

export const sonarLint: Extension = {
  id: 'SonarSource.sonarlint-vscode',
  name: 'SonarLint',
  description: 'Detects bugs, vulnerabilities and code smells for multiple languages',
  publisher: 'SonarSource',
  license: 'LGPL-3.0',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode',
  why_required:
    'Advanced code analysis for detecting bugs, security vulnerabilities, and code smells across multiple languages',
};

// VSCodium variants (Open VSX Registry)
export const codeRunnerVSCodium: Extension = {
  id: 'formulahendry.code-runner',
  name: 'Code Runner',
  description: 'Run code snippets or code files for multiple languages',
  publisher: 'Jun Han',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/formulahendry/code-runner',
  why_required:
    'Quick execution of code snippets for testing and prototyping across multiple languages (Open VSX compatible)',
};

export const sonarLintVSCodium: Extension = {
  id: 'SonarSource.sonarlint-vscode',
  name: 'SonarLint',
  description: 'Detects bugs, vulnerabilities and code smells for multiple languages',
  publisher: 'SonarSource',
  license: 'LGPL-3.0',
  marketplace_url: 'https://open-vsx.org/extension/SonarSource/sonarlint-vscode',
  why_required:
    'Advanced code analysis for detecting bugs, security vulnerabilities, and code smells across multiple languages (Open VSX compatible)',
};

// Error highlighting and diagnostics
export const errorLens: Extension = {
  id: 'usernamehw.errorlens',
  name: 'Error Lens',
  description: 'Improve highlighting of errors, warnings and other language diagnostics',
  publisher: 'Alexander',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens',
  why_required:
    'Enhanced error visibility and inline diagnostics for better development experience across all languages',
};

export const errorLensVSCodium: Extension = {
  ...errorLens,
  marketplace_url: 'https://open-vsx.org/extension/usernamehw/errorlens',
};

const baseEditorConfig: Omit<Extension, 'marketplace_url'> = {
  id: 'editorconfig.editorconfig',
  name: 'EditorConfig for VS Code',
  description: 'EditorConfig Support for Visual Studio Code',
  publisher: 'EditorConfig',
  license: 'MIT',
  why_required: 'Consistent coding styles and formatting rules across different editors and IDEs',
};

export const editorConfig: Extension = {
  ...baseEditorConfig,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=editorconfig.editorconfig',
};

export const editorConfigVSCodium: Extension = {
  ...baseEditorConfig,
  marketplace_url: 'https://open-vsx.org/extension/editorconfig/editorconfig',
};
