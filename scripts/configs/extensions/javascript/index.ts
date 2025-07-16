import { Extension } from '../../shared/types';

// Base extension definitions (shared properties)
const baseEslint: Omit<Extension, 'marketplace_url'> = {
  id: "dbaeumer.vscode-eslint",
  name: "ESLint",
  description: "Integrates ESLint JavaScript linting into VS Code",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Essential for JavaScript code quality, error detection, and maintaining coding standards"
};

const basePrettier: Omit<Extension, 'marketplace_url'> = {
  id: "esbenp.prettier-vscode",
  name: "Prettier - Code formatter",
  description: "Code formatter using prettier for consistent code style",
  publisher: "Prettier",
  license: "MIT",
  why_required: "Automatic code formatting for consistent style across the project"
};

const baseJsSnippets: Omit<Extension, 'marketplace_url'> = {
  id: "xabikos.JavaScriptSnippets",
  name: "JavaScript (ES6) code snippets",
  description: "Code snippets for JavaScript in ES6 syntax",
  publisher: "charalampos karypidis",
  license: "MIT",
  why_required: "Essential ES6+ snippets for faster JavaScript development"
};

const baseJsDebugger: Omit<Extension, 'marketplace_url'> = {
  id: "ms-vscode.js-debug",
  name: "JavaScript Debugger",
  description: "Built-in JavaScript debugger for VS Code",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Essential debugging capabilities for JavaScript applications"
};

const baseImportCost: Omit<Extension, 'marketplace_url'> = {
  id: "wix.vscode-import-cost",
  name: "Import Cost",
  description: "Display import/require package size in the editor",
  publisher: "Wix",
  license: "MIT",
  why_required: "Helps optimize bundle size by showing the cost of imported packages"
};

const baseQuokka: Omit<Extension, 'marketplace_url'> = {
  id: "WallabyJs.quokka-vscode",
  name: "Quokka.js",
  description: "JavaScript and TypeScript playground in your editor",
  publisher: "Wallaby.js",
  license: "Commercial",
  why_required: "Live JavaScript playground for rapid prototyping and learning"
};

const baseBabelSyntax: Omit<Extension, 'marketplace_url'> = {
  id: "mgmcdermott.vscode-language-babel",
  name: "Babel JavaScript",
  description: "Syntax highlighting for today's JavaScript",
  publisher: "Michael McDermott",
  license: "MIT",
  why_required: "Enhanced syntax highlighting for modern JavaScript features and JSX"
};

// VSCode-only extensions (not available on VSCodium/Open VSX)
const baseIntelliCode: Omit<Extension, 'marketplace_url'> = {
  id: "VisualStudioExptTeam.vscodeintellicode",
  name: "IntelliCode",
  description: "AI-assisted development for JavaScript",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "AI-powered code completion suggestions based on best practices"
};

// VSCode Extensions (Microsoft Marketplace URLs)
export const eslint: Extension = {
  ...baseEslint,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint"
};

export const prettier: Extension = {
  ...basePrettier,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode"
};

export const jsSnippets: Extension = {
  ...baseJsSnippets,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets"
};

export const intelliCode: Extension = {
  ...baseIntelliCode,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode"
};

export const jsDebugger: Extension = {
  ...baseJsDebugger,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-vscode.js-debug"
};

export const importCost: Extension = {
  ...baseImportCost,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost"
};

export const quokka: Extension = {
  ...baseQuokka,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode"
};

export const babelSyntax: Extension = {
  ...baseBabelSyntax,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel"
};

// VSCodium Extensions (Open VSX Registry URLs)
export const vscodiumEslint: Extension = {
  ...baseEslint,
  marketplace_url: "https://open-vsx.org/extension/dbaeumer/vscode-eslint"
};

export const vscodiumPrettier: Extension = {
  ...basePrettier,
  marketplace_url: "https://open-vsx.org/extension/esbenp/prettier-vscode"
};

export const vscodiumJsSnippets: Extension = {
  ...baseJsSnippets,
  marketplace_url: "https://open-vsx.org/extension/xabikos/JavaScriptSnippets"
};

// Note: IntelliCode is Microsoft proprietary and not available on Open VSX
// VSCodium users rely on built-in TypeScript language service instead

export const vscodiumJsDebugger: Extension = {
  ...baseJsDebugger,
  marketplace_url: "https://open-vsx.org/extension/ms-vscode/js-debug"
};

export const vscodiumImportCost: Extension = {
  ...baseImportCost,
  marketplace_url: "https://open-vsx.org/extension/wix/vscode-import-cost"
};

export const vscodiumQuokka: Extension = {
  ...baseQuokka,
  marketplace_url: "https://open-vsx.org/extension/WallabyJs/quokka-vscode"
};

export const vscodiumBabelSyntax: Extension = {
  ...baseBabelSyntax,
  marketplace_url: "https://open-vsx.org/extension/mgmcdermott/vscode-language-babel"
};

export const bunVSCode: Extension = {
  id: "oven.bun-vscode",
  name: "Bun for Visual Studio Code",
  description: "VS Code extension for Bun",
  publisher: "Oven",
  license: "MIT",
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode",
  why_required: "Official Bun runtime support with debugging and IntelliSense"
};

export const bunVSCodium: Extension = {
  ...bunVSCode,
  marketplace_url: "https://open-vsx.org/extension/oven/bun-vscode"
};

export const deno: Extension = {
  id: "denoland.vscode-deno",
  name: "Deno",
  description: "Deno support for Visual Studio Code",
  publisher: "Deno Land Inc.",
  license: "MIT",
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno",
  why_required: "Official Deno runtime support with TypeScript integration and debugging"
};

export const denoVSCodium: Extension = {
  ...deno,
  marketplace_url: "https://open-vsx.org/extension/denoland/vscode-deno"
};