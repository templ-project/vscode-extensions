import { Extension } from '../../shared/types';

// ============================================================================
// Base Extension Definitions (without marketplace_url)
// ============================================================================

const baseCalva: Omit<Extension, 'marketplace_url'> = {
  id: 'betterthantomorrow.calva',
  name: 'Calva',
  description: 'Clojure & ClojureScript Interactive Programming',
  publisher: 'betterthantomorrow',
  license: 'MIT',
  why_required:
    'Essential for Clojure/ClojureScript development - provides REPL integration, syntax highlighting, structural editing, and interactive evaluation',
};

const baseClojureLSP: Omit<Extension, 'marketplace_url'> = {
  id: 'betterthantomorrow.clojure-lsp',
  name: 'Clojure LSP',
  description: 'Language Server Protocol support for Clojure',
  publisher: 'betterthantomorrow',
  license: 'MIT',
  why_required:
    'Provides advanced language features like navigation, refactoring, and code intelligence via clojure-lsp',
};

const baseParinfer: Omit<Extension, 'marketplace_url'> = {
  id: 'shaunlebron.vscode-parinfer',
  name: 'Parinfer',
  description: 'Simplifies Lisp parentheses editing',
  publisher: 'shaunlebron',
  license: 'MIT',
  why_recommended: 'Alternative structural editing mode that automatically manages parentheses - great for beginners',
};

const baseRainbowBrackets: Omit<Extension, 'marketplace_url'> = {
  id: '2gua.rainbow-brackets',
  name: 'Rainbow Brackets',
  description: 'Colorizes matching brackets',
  publisher: '2gua',
  license: 'MIT',
  why_recommended: 'Helps visualize nested s-expressions with color-coded brackets',
};

const baseClojureSnippets: Omit<Extension, 'marketplace_url'> = {
  id: 'rafaeldelboni.clojure-snippets',
  name: 'Clojure Snippets',
  description: 'Code snippets for Clojure',
  publisher: 'rafaeldelboni',
  license: 'MIT',
  why_recommended: 'Provides useful code snippets for common Clojure patterns',
};

// ============================================================================
// VSCode Marketplace Extensions
// ============================================================================

export const calva: Extension = {
  ...baseCalva,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=betterthantomorrow.calva',
};

export const clojureLSP: Extension = {
  ...baseClojureLSP,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=betterthantomorrow.clojure-lsp',
};

export const parinfer: Extension = {
  ...baseParinfer,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=shaunlebron.vscode-parinfer',
};

export const rainbowBrackets: Extension = {
  ...baseRainbowBrackets,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets',
};

export const clojureSnippets: Extension = {
  ...baseClojureSnippets,
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=rafaeldelboni.clojure-snippets',
};

// ============================================================================
// Open VSX (VSCodium) Extensions
// Note: Only Calva and Parinfer are available on Open VSX.
// Other extensions (clojure-lsp, rainbow-brackets, clojure-snippets) are not
// published to Open VSX and cannot be included in VSCodium extension pack.
// ============================================================================

export const calvaVSCodium: Extension = {
  ...baseCalva,
  marketplace_url: 'https://open-vsx.org/extension/betterthantomorrow/calva',
};

export const parinferVSCodium: Extension = {
  ...baseParinfer,
  marketplace_url: 'https://open-vsx.org/extension/shaunlebron/vscode-parinfer',
};
