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

const baseGoModifytags: Omit<Extension, 'marketplace_url'> = {
  id: "bungcip.better-toml",
  name: "Better TOML",
  description: "Better TOML language support",
  publisher: "bungcip",
  license: "MIT",
  why_required: "TOML support for Go module files and configuration"
};

const baseGoErrorLens: Omit<Extension, 'marketplace_url'> = {
  id: "usernamehw.errorlens",
  name: "Error Lens",
  description: "Improve highlighting of errors, warnings and other language diagnostics",
  publisher: "Alexander",
  license: "MIT",
  why_required: "Enhanced error visibility for Go development"
};

const baseGoTemplateHighlighter: Omit<Extension, 'marketplace_url'> = {
  id: "karyan40024.gotmpl-syntax-highlighter",
  name: "Go Template Syntax Highlighter",
  description: "Go Template Syntax Highlighter for Reply",
  publisher: "karyan40024",
  license: "MIT",
  why_required: "Enhanced syntax highlighting for Go template files (.gotmpl, .tmpl)"
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

export const betterToml: Extension = {
  ...baseGoModifytags,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=bungcip.better-toml"
};

export const errorLens: Extension = {
  ...baseGoErrorLens,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens"
};

export const goTemplateHighlighter: Extension = {
  ...baseGoTemplateHighlighter,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=karyan40024.gotmpl-syntax-highlighter"
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

export const betterTomlVSCodium: Extension = {
  ...baseGoModifytags,
  marketplace_url: "https://open-vsx.org/extension/bungcip/better-toml"
};

export const errorLensVSCodium: Extension = {
  ...baseGoErrorLens,
  marketplace_url: "https://open-vsx.org/extension/usernamehw/errorlens"
};

export const goTemplateHighlighterVSCodium: Extension = {
  ...baseGoTemplateHighlighter,
  marketplace_url: "https://open-vsx.org/extension/karyan40024/gotmpl-syntax-highlighter"
};
