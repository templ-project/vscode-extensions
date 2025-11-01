import { Extension } from '../../shared/types';

// Base extension definitions (shared properties)
const baseZigLanguage: Omit<Extension, 'marketplace_url'> = {
  id: 'ziglang.vscode-zig',
  name: 'Zig Language',
  description: 'Official Zig language support with ZLS integration for IntelliSense and code completion',
  publisher: 'ziglang',
  license: 'MIT',
  why_required:
    'Essential for Zig development - provides syntax highlighting, ZLS integration, code completion, and error checking',
};

const baseCodeLLDB: Omit<Extension, 'marketplace_url'> = {
  id: 'vadimcn.vscode-lldb',
  name: 'CodeLLDB',
  description: 'Native debugger based on LLDB for debugging Zig applications',
  publisher: 'vadimcn',
  license: 'MIT',
  why_required: 'Essential for debugging Zig applications with breakpoints and variable inspection',
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
export const zigLanguage: Extension = {
  ...baseZigLanguage,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=ziglang.vscode-zig',
};

export const codeLLDB: Extension = {
  ...baseCodeLLDB,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb',
};

export const errorLens: Extension = {
  ...baseErrorLens,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens',
};

// VSCodium Extensions (Open VSX Registry URLs)
export const zigLanguageVSCodium: Extension = {
  ...baseZigLanguage,
  marketplace_url: 'https://open-vsx.org/extension/ziglang/vscode-zig',
};

export const codeLLDBVSCodium: Extension = {
  ...baseCodeLLDB,
  marketplace_url: 'https://open-vsx.org/extension/vadimcn/vscode-lldb',
};

export const errorLensVSCodium: Extension = {
  ...baseErrorLens,
  marketplace_url: 'https://open-vsx.org/extension/usernamehw/errorlens',
};
