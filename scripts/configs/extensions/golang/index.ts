import { Extension } from '../../shared/types';

// Base extension definitions (shared properties)
const baseGoExtension: Omit<Extension, 'marketplace_url'> = {
  id: "golang.go",
  name: "Go",
  description: "Rich Go language support for Visual Studio Code",
  publisher: "Go Team at Google",
  license: "MIT",
  why_required: "Official Go language support with IntelliSense, debugging, and testing"
};

const baseGoOutliner: Omit<Extension, 'marketplace_url'> = {
  id: "766b.go-outliner",
  name: "Go Outliner",
  description: "Go code outline explorer",
  publisher: "766b",
  license: "MIT",
  why_required: "Navigate Go code structure with enhanced outline view"
};

const baseGoTest: Omit<Extension, 'marketplace_url'> = {
  id: "premparihar.gotestexplorer",
  name: "Go Test Explorer",
  description: "Go Test Explorer for Visual Studio Code",
  publisher: "Prem Parihar",
  license: "MIT",
  why_required: "Visual test runner and explorer for Go tests"
};

const baseGoFillStruct: Omit<Extension, 'marketplace_url'> = {
  id: "davidbarratt.go-fill-struct",
  name: "Go Fill Struct",
  description: "Fill struct literals with default values",
  publisher: "David Barratt",
  license: "MIT", 
  why_required: "Automatically fill Go struct literals with zero values"
};

const baseGoTemplateHighlighter: Omit<Extension, 'marketplace_url'> = {
  id: "karyan40024.gotmpl-syntax-highlighter",
  name: "Go Template Syntax Highlighter",
  description: "Go Template Syntax Highlighter for Reply",
  publisher: "karyan40024",
  license: "MIT",
  why_required: "Enhanced syntax highlighting for Go template files (.gotmpl, .tmpl)"
};

const baseGoDoc: Omit<Extension, 'marketplace_url'> = {
  id: "msyrus.go-doc",
  name: "Go Doc",
  description: "Show documentation of go symbols and packages",
  publisher: "msyrus",
  license: "MIT",
  why_required: "Quick access to Go documentation for symbols and packages"
};

const baseGoCritic: Omit<Extension, 'marketplace_url'> = {
  id: "neverik.go-critic",
  name: "Go Critic",
  description: "Integration for the go-critic golang linter",
  publisher: "neverik",
  license: "MIT",
  why_required: "Advanced Go linting with go-critic integration"
};

const baseGoAsm: Omit<Extension, 'marketplace_url'> = {
  id: "quillaja.goasm",
  name: "Go Asm",
  description: "Syntax highlighting & autocomplete for Go assembly",
  publisher: "quillaja",
  license: "MIT",
  why_required: "Syntax highlighting and autocomplete for Go assembly language"
};

// VSCode Extensions (Microsoft Marketplace URLs)
export const goExtension: Extension = {
  ...baseGoExtension,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=golang.go"
};

export const goOutliner: Extension = {
  ...baseGoOutliner,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=766b.go-outliner"
};

export const goTestExplorer: Extension = {
  ...baseGoTest,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=premparihar.gotestexplorer"
};

export const goFillStruct: Extension = {
  ...baseGoFillStruct,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=davidbarratt.go-fill-struct"
};

export const goTemplateHighlighter: Extension = {
  ...baseGoTemplateHighlighter,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=karyan40024.gotmpl-syntax-highlighter"
};

export const goDoc: Extension = {
  ...baseGoDoc,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=msyrus.go-doc"
};

export const goCritic: Extension = {
  ...baseGoCritic,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=neverik.go-critic"
};

export const goAsm: Extension = {
  ...baseGoAsm,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=quillaja.goasm"
};

// VSCodium Extensions (Open VSX Registry URLs)
export const goExtensionVSCodium: Extension = {
  ...baseGoExtension,
  marketplace_url: "https://open-vsx.org/extension/golang/go"
};

export const goOutlinerVSCodium: Extension = {
  ...baseGoOutliner,
  marketplace_url: "https://open-vsx.org/extension/766b/go-outliner"
};

export const goTestExplorerVSCodium: Extension = {
  ...baseGoTest,
  marketplace_url: "https://open-vsx.org/extension/premparihar/gotestexplorer"
};

export const goFillStructVSCodium: Extension = {
  ...baseGoFillStruct,
  marketplace_url: "https://open-vsx.org/extension/davidbarratt/go-fill-struct"
};

export const goTemplateHighlighterVSCodium: Extension = {
  ...baseGoTemplateHighlighter,
  marketplace_url: "https://open-vsx.org/extension/karyan40024/gotmpl-syntax-highlighter"
};
