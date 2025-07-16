import { Extension } from '../../shared/types';

// Base extension definitions (shared properties)
const baseTypescriptLanguage: Omit<Extension, 'marketplace_url'> = {
  id: "ms-vscode.vscode-typescript-next",
  name: "TypeScript Importer",
  description: "Automatically searches for TypeScript definitions",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Enhanced TypeScript language support and auto-import functionality"
};

const baseTsSnippets: Omit<Extension, 'marketplace_url'> = {
  id: "ms-vscode.vscode-typescript-next",
  name: "TypeScript Snippets",
  description: "Code snippets for TypeScript development",
  publisher: "Microsoft",
  license: "MIT", 
  why_required: "Essential TypeScript snippets for faster development"
};

const baseTsDebugger: Omit<Extension, 'marketplace_url'> = {
  id: "ms-vscode.js-debug",
  name: "TypeScript Debugger",
  description: "Built-in TypeScript/JavaScript debugger for VS Code",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Essential debugging capabilities for TypeScript applications"
};

// VSCode Extensions (Microsoft Marketplace URLs)
export const typescriptLanguage: Extension = {
  ...baseTypescriptLanguage,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next"
};

export const tsSnippets: Extension = {
  ...baseTsSnippets,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next"
};

export const tsDebugger: Extension = {
  ...baseTsDebugger,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-vscode.js-debug"
};

// VSCodium Extensions (Open VSX Registry URLs)
export const vscodiumTypescriptLanguage: Extension = {
  ...baseTypescriptLanguage,
  marketplace_url: "https://open-vsx.org/extension/ms-vscode/vscode-typescript-next"
};

export const vscodiumTsSnippets: Extension = {
  ...baseTsSnippets,
  marketplace_url: "https://open-vsx.org/extension/ms-vscode/vscode-typescript-next"
};

export const vscodiumTsDebugger: Extension = {
  ...baseTsDebugger,
  marketplace_url: "https://open-vsx.org/extension/ms-vscode/js-debug"
};

// Additional TypeScript productivity extensions
export const json2ts: Extension = {
  id: "GregorBiswanger.json2ts",
  name: "json2ts",
  description: "Convert JSON object to typescript interfaces",
  publisher: "Gregor Biswanger",
  license: "MIT",
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=GregorBiswanger.json2ts",
  why_required: "Convert JSON to TypeScript interfaces for rapid development"
};

export const typescriptHero: Extension = {
  id: "rbbit.typescript-hero",
  name: "TypeScript Hero",
  description: "Additional tooling for TypeScript",
  publisher: "Christoph Bühler",
  license: "MIT",
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero",
  why_required: "Enhanced TypeScript tooling with auto-import organization and code completion"
};
