import { Extension } from '../../shared/types';

// Base extension definitions (shared properties)
const baseRustAnalyzer: Omit<Extension, 'marketplace_url'> = {
  id: 'rust-lang.rust-analyzer',
  name: 'rust-analyzer',
  description: 'Official Rust language server with IntelliSense, code completion, and refactoring',
  publisher: 'rust-lang',
  license: 'MIT OR Apache-2.0',
  why_required:
    'Essential for Rust development - provides IntelliSense, code completion, error checking, and refactoring',
};

const baseCodeLLDB: Omit<Extension, 'marketplace_url'> = {
  id: 'vadimcn.vscode-lldb',
  name: 'CodeLLDB',
  description: 'Native debugger based on LLDB for debugging Rust applications',
  publisher: 'vadimcn',
  license: 'MIT',
  why_required: 'Essential for debugging Rust applications with breakpoints and variable inspection',
};

const baseCrates: Omit<Extension, 'marketplace_url'> = {
  id: 'serayuzgur.crates',
  name: 'crates',
  description: 'Cargo.toml dependency management with version checking and updates',
  publisher: 'serayuzgur',
  license: 'MIT',
  why_recommended: 'Helps manage Cargo dependencies with inline version information and update suggestions',
};

const baseEvenBetterTOML: Omit<Extension, 'marketplace_url'> = {
  id: 'tamasfe.even-better-toml',
  name: 'Even Better TOML',
  description: 'TOML language support with syntax highlighting and validation',
  publisher: 'tamasfe',
  license: 'MIT',
  why_recommended: 'Enhanced TOML support for Cargo.toml and other configuration files',
};

const baseErrorLens: Omit<Extension, 'marketplace_url'> = {
  id: 'usernamehw.errorlens',
  name: 'Error Lens',
  description: 'Inline error and warning messages for better visibility',
  publisher: 'Alexander',
  license: 'MIT',
  why_recommended: 'Displays errors and warnings inline, making it easier to spot issues quickly',
};

// VSCode Extensions (Microsoft Marketplace URLs)
export const rustAnalyzer: Extension = {
  ...baseRustAnalyzer,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer',
};

export const codeLLDB: Extension = {
  ...baseCodeLLDB,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb',
};

export const crates: Extension = {
  ...baseCrates,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=serayuzgur.crates',
};

export const evenBetterTOML: Extension = {
  ...baseEvenBetterTOML,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml',
};

export const errorLens: Extension = {
  ...baseErrorLens,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens',
};

// VSCodium Extensions (Open VSX Registry URLs)
export const rustAnalyzerVSCodium: Extension = {
  ...baseRustAnalyzer,
  marketplace_url: 'https://open-vsx.org/extension/rust-lang/rust-analyzer',
};

export const codeLLDBVSCodium: Extension = {
  ...baseCodeLLDB,
  marketplace_url: 'https://open-vsx.org/extension/vadimcn/vscode-lldb',
};

export const cratesVSCodium: Extension = {
  ...baseCrates,
  marketplace_url: 'https://open-vsx.org/extension/serayuzgur/crates',
};

export const evenBetterTOMLVSCodium: Extension = {
  ...baseEvenBetterTOML,
  marketplace_url: 'https://open-vsx.org/extension/tamasfe/even-better-toml',
};

export const errorLensVSCodium: Extension = {
  ...baseErrorLens,
  marketplace_url: 'https://open-vsx.org/extension/usernamehw/errorlens',
};
