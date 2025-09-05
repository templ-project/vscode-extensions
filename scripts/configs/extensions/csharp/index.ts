import { Extension } from '../../shared/types';

// Base extension definitions (shared properties)
const baseCSharp: Omit<Extension, 'marketplace_url'> = {
  id: "ms-dotnettools.csharp",
  name: "C#",
  description: "Base language support for C#",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Essential C# language support with IntelliSense, debugging, and syntax highlighting"
};

const baseCSharpDevKit: Omit<Extension, 'marketplace_url'> = {
  id: "ms-dotnettools.csdevkit",
  name: "C# Dev Kit",
  description: "Official C# extension from Microsoft",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Advanced C# development features including project system, testing, and debugging"
};

const baseEditorConfig: Omit<Extension, 'marketplace_url'> = {
  id: "editorconfig.editorconfig",
  name: "EditorConfig for VS Code",
  description: "EditorConfig Support for Visual Studio Code",
  publisher: "EditorConfig",
  license: "MIT",
  why_required: "Consistent coding styles and formatting rules across different editors and IDEs"
};

const baseCSharpExtensions: Omit<Extension, 'marketplace_url'> = {
  id: "kreativ-software.csharpextensions",
  name: "C# Extensions",
  description: "C# IDE Extensions for VSCode",
  publisher: "Kreativ Software",
  license: "MIT",
  why_recommended: "Additional C# productivity features including class creation and namespace completion"
};

const baseDotNetTestExplorer: Omit<Extension, 'marketplace_url'> = {
  id: "formulahendry.dotnet-test-explorer",
  name: ".NET Core Test Explorer",
  description: "Test Explorer for .NET Core (MSTest, xUnit, NUnit)",
  publisher: "Jun Han",
  license: "MIT",
  why_recommended: "Visual test runner and explorer for .NET unit tests"
};

const baseCSharpSnippets: Omit<Extension, 'marketplace_url'> = {
  id: "jorgeserrano.vscode-csharp-snippets",
  name: "C# Snippets",
  description: "C# Snippets for Visual Studio Code",
  publisher: "Jorge Serrano",
  license: "MIT",
  why_recommended: "Comprehensive collection of C# code snippets for faster development"
};

const baseRoslynator: Omit<Extension, 'marketplace_url'> = {
  id: "josefpihrt-vscode.roslynator",
  name: "Roslynator",
  description: "A collection of 500+ analyzers, refactorings and fixes for C#, powered by Roslyn",
  publisher: "Josef Pihrt",
  license: "MIT",
  why_recommended: "Advanced C# code analysis, refactoring, and code fixes using Roslyn analyzers"
};

// VSCode Extensions (Microsoft Marketplace URLs)
export const csharp: Extension = {
  ...baseCSharp,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp"
};

export const csharpDevKit: Extension = {
  ...baseCSharpDevKit,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit"
};

export const editorConfig: Extension = {
  ...baseEditorConfig,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=editorconfig.editorconfig"
};

export const csharpExtensions: Extension = {
  ...baseCSharpExtensions,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=kreativ-software.csharpextensions"
};

export const dotnetTestExplorer: Extension = {
  ...baseDotNetTestExplorer,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=formulahendry.dotnet-test-explorer"
};

export const csharpSnippets: Extension = {
  ...baseCSharpSnippets,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=jorgeserrano.vscode-csharp-snippets"
};

export const roslynator: Extension = {
  ...baseRoslynator,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=josefpihrt-vscode.roslynator"
};

// VSCodium Extensions (Open VSX Registry URLs)
export const csharpVSCodium: Extension = {
  ...baseCSharp,
  marketplace_url: "https://open-vsx.org/extension/ms-dotnettools/csharp"
};

export const csharpDevKitVSCodium: Extension = {
  ...baseCSharpDevKit,
  marketplace_url: "https://open-vsx.org/extension/ms-dotnettools/csdevkit"
};

export const editorConfigVSCodium: Extension = {
  ...baseEditorConfig,
  marketplace_url: "https://open-vsx.org/extension/editorconfig/editorconfig"
};

export const csharpExtensionsVSCodium: Extension = {
  ...baseCSharpExtensions,
  marketplace_url: "https://open-vsx.org/extension/kreativ-software/csharpextensions"
};

export const dotnetTestExplorerVSCodium: Extension = {
  ...baseDotNetTestExplorer,
  marketplace_url: "https://open-vsx.org/extension/formulahendry/dotnet-test-explorer"
};

export const csharpSnippetsVSCodium: Extension = {
  ...baseCSharpSnippets,
  marketplace_url: "https://open-vsx.org/extension/jorgeserrano/vscode-csharp-snippets"
};

export const roslynatorVSCodium: Extension = {
  ...baseRoslynator,
  marketplace_url: "https://open-vsx.org/extension/josefpihrt-vscode/roslynator"
};
