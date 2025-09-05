# Templ Project Csharp Extension Pack

Essential C# development environment for VSCode - comprehensive .NET tooling with IntelliSense, debugging, testing, and modern C# features

## 📦 What's Included

This extension pack includes **9 carefully selected extensions** to enhance your csharp development experience in vscode.

### ✅ Core Extensions (4)

These extensions are essential for csharp development:

- **[C#](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-dotnettools.csharp)** - Base language support for C#
- **[C# Dev Kit](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-dotnettools.csdevkit)** - Official C# extension from Microsoft
- **[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName&#x3D;editorconfig.editorconfig)** - EditorConfig Support for Visual Studio Code
- **[Error Lens](https://marketplace.visualstudio.com/items?itemName&#x3D;usernamehw.errorlens)** - Improve highlighting of errors, warnings and other language diagnostics

### 💡 Additional Extensions (5)

These extensions provide extra functionality and convenience:

- **[C# Extensions](https://marketplace.visualstudio.com/items?itemName&#x3D;kreativ-software.csharpextensions)** - C# IDE Extensions for VSCode
- **[.NET Core Test Explorer](https://marketplace.visualstudio.com/items?itemName&#x3D;formulahendry.dotnet-test-explorer)** - Test Explorer for .NET Core (MSTest, xUnit, NUnit)
- **[C# Snippets](https://marketplace.visualstudio.com/items?itemName&#x3D;jorgeserrano.vscode-csharp-snippets)** - C# Snippets for Visual Studio Code
- **[Version Lens](https://marketplace.visualstudio.com/items?itemName&#x3D;pflannery.vscode-versionlens)** - Shows the latest version for each package using code lens
- **[Roslynator](https://marketplace.visualstudio.com/items?itemName&#x3D;josefpihrt-vscode.roslynator)** - A collection of 500+ analyzers, refactorings and fixes for C#, powered by Roslyn

## 🚀 Installation

### Method 1: Install from Marketplace
1. Open Vscode
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Templ Project Csharp Extension Pack"
4. Click "Install"

### Method 2: Install via Command Line
```bash
code --install-extension @templ-project/csharp-extension-pack
```

### Method 3: Install from VSIX
1. Download the latest `.vsix` file from [Releases](https://github.com/templ-project/vscode-extensions/releases)
2. Open Vscode
3. Run `Extensions: Install from VSIX...` command
4. Select the downloaded file

## ⚙️ Configuration

After installation, you may want to configure some settings for optimal csharp development:

### csharp.format.enable
```json
"csharp.format.enable": true
```
> Enable C# formatting

### csharp.semanticHighlighting.enabled
```json
"csharp.semanticHighlighting.enabled": true
```
> Enable semantic highlighting for C#

### csharp.completion.trigger
```json
"csharp.completion.trigger": true
```
> Enable completion triggers

### dotnet.server.useOmnisharp
```json
"dotnet.server.useOmnisharp": false
```
> Use the new .NET Language Server instead of OmniSharp

### dotnet.completion.showCompletionItemsFromUnimportedNamespaces
```json
"dotnet.completion.showCompletionItemsFromUnimportedNamespaces": true
```
> Show completion items from unimported namespaces

### dotnet.inlayHints.enableInlayHintsForParameters
```json
"dotnet.inlayHints.enableInlayHintsForParameters": true
```
> Enable inlay hints for parameters

### dotnet.inlayHints.enableInlayHintsForLiteralParameters
```json
"dotnet.inlayHints.enableInlayHintsForLiteralParameters": true
```
> Enable inlay hints for literal parameters

### dotnet.inlayHints.enableInlayHintsForIndexerParameters
```json
"dotnet.inlayHints.enableInlayHintsForIndexerParameters": true
```
> Enable inlay hints for indexer parameters

### dotnet.inlayHints.enableInlayHintsForObjectCreationParameters
```json
"dotnet.inlayHints.enableInlayHintsForObjectCreationParameters": true
```
> Enable inlay hints for object creation parameters

### dotnet.inlayHints.enableInlayHintsForOtherParameters
```json
"dotnet.inlayHints.enableInlayHintsForOtherParameters": false
```
> Enable inlay hints for other parameters

### dotnet.inlayHints.enableInlayHintsForTypeParameters
```json
"dotnet.inlayHints.enableInlayHintsForTypeParameters": true
```
> Enable inlay hints for type parameters

### files.associations
```json
"files.associations": {
  &quot;*.cs&quot;: &quot;csharp&quot;,
  &quot;*.csx&quot;: &quot;csharp&quot;,
  &quot;*.cake&quot;: &quot;csharp&quot;,
  &quot;*.cshtml&quot;: &quot;aspnetcorerazor&quot;,
  &quot;*.razor&quot;: &quot;aspnetcorerazor&quot;
}
```
> File associations for C# files

### [csharp]
```json
"[csharp]": {
  &quot;editor.defaultFormatter&quot;: &quot;ms-dotnettools.csharp&quot;,
  &quot;editor.formatOnSave&quot;: true,
  &quot;editor.formatOnType&quot;: true,
  &quot;editor.codeActionsOnSave&quot;: {
    &quot;source.organizeImports&quot;: &quot;explicit&quot;
  }
}
```
> C# specific editor settings

### dotnet-test-explorer.testProjectPath
```json
"dotnet-test-explorer.testProjectPath": &quot;**/*Tests.csproj&quot;
```
> Pattern to find test projects

### dotnet-test-explorer.useTreeView
```json
"dotnet-test-explorer.useTreeView": true
```
> Use tree view for test explorer


## ⌨️ Recommended Keybindings

- **Format current C# file**: `ctrl+shift+f`
- **Go to definition**: `f12`
- **Find all references**: `shift+f12`
- **Go to symbol in file**: `ctrl+shift+o`
- **Go to symbol in workspace**: `ctrl+t`
- **Show code actions (quick fixes)**: `ctrl+.`

## 📝 Extension Details

| Extension | Publisher | Description |
|-----------|-----------|-------------|
| [C#](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-dotnettools.csharp) | Microsoft | Base language support for C# |
| [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-dotnettools.csdevkit) | Microsoft | Official C# extension from Microsoft |
| [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName&#x3D;editorconfig.editorconfig) | EditorConfig | EditorConfig Support for Visual Studio Code |
| [Error Lens](https://marketplace.visualstudio.com/items?itemName&#x3D;usernamehw.errorlens) | Alexander | Improve highlighting of errors, warnings and other language diagnostics |
| [C# Extensions](https://marketplace.visualstudio.com/items?itemName&#x3D;kreativ-software.csharpextensions) | Kreativ Software | C# IDE Extensions for VSCode |
| [.NET Core Test Explorer](https://marketplace.visualstudio.com/items?itemName&#x3D;formulahendry.dotnet-test-explorer) | Jun Han | Test Explorer for .NET Core (MSTest, xUnit, NUnit) |
| [C# Snippets](https://marketplace.visualstudio.com/items?itemName&#x3D;jorgeserrano.vscode-csharp-snippets) | Jorge Serrano | C# Snippets for Visual Studio Code |
| [Version Lens](https://marketplace.visualstudio.com/items?itemName&#x3D;pflannery.vscode-versionlens) | pflannery | Shows the latest version for each package using code lens |
| [Roslynator](https://marketplace.visualstudio.com/items?itemName&#x3D;josefpihrt-vscode.roslynator) | Josef Pihrt | A collection of 500+ analyzers, refactorings and fixes for C#, powered by Roslyn |

## 🏷️ Categories



## 📄 License

### Extension Pack License
This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscode/csharp/LICENSE.md) for details.

### Third-Party Extension Licenses
**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension | Publisher | License | Description |
|-----------|-----------|---------|-------------|
| [C#](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-dotnettools.csharp) | Microsoft | MIT | Base language support for C# |
| [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-dotnettools.csdevkit) | Microsoft | MIT | Official C# extension from Microsoft |
| [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName&#x3D;editorconfig.editorconfig) | EditorConfig | MIT | EditorConfig Support for Visual Studio Code |
| [Error Lens](https://marketplace.visualstudio.com/items?itemName&#x3D;usernamehw.errorlens) | Alexander | MIT | Improve highlighting of errors, warnings and other language diagnostics |
| [C# Extensions](https://marketplace.visualstudio.com/items?itemName&#x3D;kreativ-software.csharpextensions) | Kreativ Software | MIT | C# IDE Extensions for VSCode |
| [.NET Core Test Explorer](https://marketplace.visualstudio.com/items?itemName&#x3D;formulahendry.dotnet-test-explorer) | Jun Han | MIT | Test Explorer for .NET Core (MSTest, xUnit, NUnit) |
| [C# Snippets](https://marketplace.visualstudio.com/items?itemName&#x3D;jorgeserrano.vscode-csharp-snippets) | Jorge Serrano | MIT | C# Snippets for Visual Studio Code |
| [Version Lens](https://marketplace.visualstudio.com/items?itemName&#x3D;pflannery.vscode-versionlens) | pflannery | MIT | Shows the latest version for each package using code lens |
| [Roslynator](https://marketplace.visualstudio.com/items?itemName&#x3D;josefpihrt-vscode.roslynator) | Josef Pihrt | MIT | A collection of 500+ analyzers, refactorings and fixes for C#, powered by Roslyn |

### Disclaimer
- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 9
- **Required Extensions**: 4
- **Optional Extensions**: 5
- **Target IDE**: vscode
- **Language Focus**: csharp

---

*This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful csharp development extensions.*
