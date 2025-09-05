import { Extension } from '../../shared/types';

// Base extension definitions (shared properties)
const baseTypescriptLanguage: Omit<Extension, 'marketplace_url'> = {
  id: "ms-vscode.vscode-typescript-next",
  name: "TypeScript Language Features",
  description: "Enhanced TypeScript language support with auto-import and intellisense",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Enhanced TypeScript language support and auto-import functionality"
};

// VSCode Extensions (Microsoft Marketplace URLs)
export const typescriptLanguage: Extension = {
  ...baseTypescriptLanguage,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next"
};

// VSCodium Extensions (Open VSX Registry URLs)
export const typescriptLanguageVSCodium: Extension = {
  ...baseTypescriptLanguage,
  marketplace_url: "https://open-vsx.org/extension/ms-vscode/vscode-typescript-next"
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