import {
  csharpDevKitVSCodium,
  csharpExtensionsVSCodium,
  csharpSnippetsVSCodium,
  csharpVSCodium,
  dotnetTestExplorerVSCodium,
  editorConfigVSCodium,
  errorLensVSCodium,
  roslynatorVSCodium,
  versionLensVSCodium
} from '../../extensions/csharp';
import { Collection } from '../../shared/types';

export const csharp: Collection = {
  description: "Essential C# development environment for VSCodium - comprehensive .NET tooling with IntelliSense, debugging, testing, and modern C# features",
  tags: ["csharp", "c#", "dotnet", ".net", "asp.net", "blazor", "maui", "testing", "nuget"],
  
  required_extensions: [
    csharpVSCodium,
    csharpDevKitVSCodium,
    editorConfigVSCodium,
    errorLensVSCodium
  ],
  
  optional_extensions: [
    csharpExtensionsVSCodium,
    dotnetTestExplorerVSCodium,
    csharpSnippetsVSCodium,
    versionLensVSCodium,
    roslynatorVSCodium
  ],
  
  settings: {
    // C# Language Server Settings
    "csharp.format.enable": {
      value: true,
      description: "Enable C# formatting",
      scope: "workspace"
    },
    "csharp.semanticHighlighting.enabled": {
      value: true,
      description: "Enable semantic highlighting for C#",
      scope: "workspace"
    },
    "csharp.completion.trigger": {
      value: true,
      description: "Enable completion triggers",
      scope: "workspace"
    },
    
    // .NET Settings
    "dotnet.server.useOmnisharp": {
      value: false,
      description: "Use the new .NET Language Server instead of OmniSharp",
      scope: "workspace"
    },
    "dotnet.completion.showCompletionItemsFromUnimportedNamespaces": {
      value: true,
      description: "Show completion items from unimported namespaces",
      scope: "workspace"
    },
    "dotnet.inlayHints.enableInlayHintsForParameters": {
      value: true,
      description: "Enable inlay hints for parameters",
      scope: "workspace"
    },
    "dotnet.inlayHints.enableInlayHintsForLiteralParameters": {
      value: true,
      description: "Enable inlay hints for literal parameters",
      scope: "workspace"
    },
    "dotnet.inlayHints.enableInlayHintsForIndexerParameters": {
      value: true,
      description: "Enable inlay hints for indexer parameters",
      scope: "workspace"
    },
    "dotnet.inlayHints.enableInlayHintsForObjectCreationParameters": {
      value: true,
      description: "Enable inlay hints for object creation parameters",
      scope: "workspace"
    },
    "dotnet.inlayHints.enableInlayHintsForOtherParameters": {
      value: false,
      description: "Enable inlay hints for other parameters",
      scope: "workspace"
    },
    "dotnet.inlayHints.enableInlayHintsForTypeParameters": {
      value: true,
      description: "Enable inlay hints for type parameters",
      scope: "workspace"
    },
    
    // File Associations
    "files.associations": {
      value: {
        "*.cs": "csharp",
        "*.csx": "csharp",
        "*.cake": "csharp",
        "*.cshtml": "aspnetcorerazor",
        "*.razor": "aspnetcorerazor"
      },
      description: "File associations for C# files",
      scope: "workspace"
    },
    
    // Editor Settings for C#
    "[csharp]": {
      value: {
        "editor.defaultFormatter": "ms-dotnettools.csharp",
        "editor.formatOnSave": true,
        "editor.formatOnType": true,
        "editor.codeActionsOnSave": {
          "source.organizeImports": "explicit"
        }
      },
      description: "C# specific editor settings",
      scope: "workspace"
    },
    
    // Test Explorer Settings
    "dotnet-test-explorer.testProjectPath": {
      value: "**/*Tests.csproj",
      description: "Pattern to find test projects",
      scope: "workspace"
    },
    "dotnet-test-explorer.useTreeView": {
      value: true,
      description: "Use tree view for test explorer",
      scope: "workspace"
    }
  },
  
  keybindings: [
    {
      key: "ctrl+shift+f",
      command: "editor.action.formatDocument",
      description: "Format current C# file",
      when: "editorTextFocus && editorLangId == 'csharp'"
    },
    {
      key: "f12",
      command: "editor.action.revealDefinition",
      description: "Go to definition",
      when: "editorTextFocus && editorLangId == 'csharp'"
    },
    {
      key: "shift+f12",
      command: "editor.action.goToReferences",
      description: "Find all references",
      when: "editorTextFocus && editorLangId == 'csharp'"
    },
    {
      key: "ctrl+shift+o",
      command: "workbench.action.gotoSymbol",
      description: "Go to symbol in file",
      when: "editorTextFocus && editorLangId == 'csharp'"
    },
    {
      key: "ctrl+t",
      command: "workbench.action.showAllSymbols",
      description: "Go to symbol in workspace",
      when: "editorTextFocus && editorLangId == 'csharp'"
    },
    {
      key: "ctrl+.",
      command: "editor.action.quickFix",
      description: "Show code actions (quick fixes)",
      when: "editorTextFocus && editorLangId == 'csharp'"
    }
  ],
  
  snippets: [
    {
      name: "class",
      prefix: "class",
      description: "C# class template",
      body: [
        "public class ${1:ClassName}",
        "{",
        "    ${0:// Class members}",
        "}"
      ]
    },
    {
      name: "interface",
      prefix: "interface",
      description: "C# interface template",
      body: [
        "public interface I${1:InterfaceName}",
        "{",
        "    ${0:// Interface members}",
        "}"
      ]
    },
    {
      name: "method",
      prefix: "method",
      description: "C# method template",
      body: [
        "public ${1:void} ${2:MethodName}(${3:parameters})",
        "{",
        "    ${0:// Method implementation}",
        "}"
      ]
    },
    {
      name: "property",
      prefix: "prop",
      description: "C# auto-property template",
      body: [
        "public ${1:string} ${2:PropertyName} { get; set; }"
      ]
    },
    {
      name: "constructor",
      prefix: "ctor",
      description: "C# constructor template",
      body: [
        "public ${1:ClassName}(${2:parameters})",
        "{",
        "    ${0:// Constructor implementation}",
        "}"
      ]
    },
    {
      name: "main",
      prefix: "main",
      description: "C# Main method template",
      body: [
        "static void Main(string[] args)",
        "{",
        "    ${0:// Program entry point}",
        "}"
      ]
    }
  ],
  
  documentation: {
    setup_guide: `
# C# Development Setup Guide for VSCodium

## Prerequisites
1. **.NET SDK**: Install the latest .NET SDK from [dotnet.microsoft.com](https://dotnet.microsoft.com/download)
   - Verify installation: \`dotnet --version\`

2. **Optional Tools**:
   - **Git**: For version control
   - **Docker**: For containerized development

## Project Setup

### 1. Create New Project
\`\`\`bash
# Console application
dotnet new console -n MyApp

# Web API
dotnet new webapi -n MyWebApi

# MVC application
dotnet new mvc -n MyMvcApp

# Class library
dotnet new classlib -n MyLibrary
\`\`\`

### 2. Project Structure
\`\`\`
MyProject/
├── MyProject.csproj
├── Program.cs
├── Models/
├── Controllers/
├── Services/
└── Tests/
    └── MyProject.Tests.csproj
\`\`\`

### 3. EditorConfig Setup
Create \`.editorconfig\` in project root:
\`\`\`ini
root = true

[*.cs]
indent_style = space
indent_size = 4
insert_final_newline = true
trim_trailing_whitespace = true

dotnet_style_qualification_for_field = false:suggestion
dotnet_style_qualification_for_property = false:suggestion
dotnet_style_qualification_for_method = false:suggestion
dotnet_style_qualification_for_event = false:suggestion
\`\`\`

## Build and Run
1. Build project: \`dotnet build\`
2. Run project: \`dotnet run\`
3. Run tests: \`dotnet test\`
4. Publish: \`dotnet publish -c Release\`

## VSCodium-Specific Notes
- Extensions are sourced from Open VSX Registry
- All functionality remains the same as VSCode
- Privacy-focused alternative to VSCode
    `,
    troubleshooting: `
# Troubleshooting C# Development in VSCodium

## Common Issues

### 1. IntelliSense Not Working
- **Problem**: No code completion or error detection
- **Solution**: 
  - Restart VSCodium
  - Run "Developer: Reload Window" command
  - Check that .NET SDK is installed: \`dotnet --version\`
  - Verify C# extension is enabled

### 2. Extension Installation
- **Problem**: Extensions not available
- **Solution**:
  - VSCodium uses Open VSX Registry by default
  - Some extensions may have different names or IDs
  - Check extension marketplace settings

### 3. Build Errors
- **Problem**: Project won't build
- **Solution**:
  - Check project file (.csproj) for syntax errors
  - Restore packages: \`dotnet restore\`
  - Clean and rebuild: \`dotnet clean && dotnet build\`

### 4. Debugging Issues
- **Problem**: Breakpoints not hitting or debugger not starting
- **Solution**:
  - Ensure launch.json is properly configured
  - Build project in Debug configuration
  - Check that the correct project is set as startup project

### 5. Package Issues
- **Problem**: NuGet packages not restoring
- **Solution**:
  - Clear NuGet cache: \`dotnet nuget locals all --clear\`
  - Restore packages: \`dotnet restore\`
  - Check internet connection and package sources

## Performance Tips
- Use Solution Folders for large projects
- Exclude unnecessary folders from workspace (bin, obj)
- Enable "Hot Reload" for faster development cycles
- Use conditional compilation for different environments
    `
  }
};
