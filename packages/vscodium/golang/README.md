# [templ-project-1753304902606] Golang Extension Pack

Essential Go development environment for VSCodium - comprehensive tooling for modern Go development using open-source alternatives

## 📦 What's Included

This extension pack includes **6 carefully selected extensions** to enhance your golang development experience in vscodium.

### ✅ Core Extensions (2)

These extensions are essential for golang development:

- **[Go](https://open-vsx.org/extension/golang/go)** - Rich Go language support for Visual Studio Code
- **[Error Lens](https://open-vsx.org/extension/usernamehw/errorlens)** - Improve highlighting of errors, warnings and other language diagnostics

### 💡 Additional Extensions (4)

These extensions provide extra functionality and convenience:

- **[Go Outliner](https://open-vsx.org/extension/766b/go-outliner)** - Go code outline explorer
- **[Go Test Explorer](https://open-vsx.org/extension/premparihar/gotestexplorer)** - Go Test Explorer for Visual Studio Code
- **[Go Fill Struct](https://open-vsx.org/extension/davidbarratt/go-fill-struct)** - Fill struct literals with default values
- **[Go Template Syntax Highlighter](https://open-vsx.org/extension/karyan40024/gotmpl-syntax-highlighter)** - Go Template Syntax Highlighter for Reply

## 🚀 Installation

### Method 1: Install from Marketplace
1. Open Vscodium
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "[templ-project-1753304902606] Golang Extension Pack"
4. Click "Install"

### Method 2: Install via Command Line
```bash
codium --install-extension @templ-project/golang-extension-pack
```

### Method 3: Install from VSIX
1. Download the latest `.vsix` file from [Releases](https://github.com/templ-project/vscode-extensions/releases)
2. Open Vscodium
3. Run `Extensions: Install from VSIX...` command
4. Select the downloaded file

## ⚙️ Configuration

After installation, you may want to configure some settings for optimal golang development:

### go.useLanguageServer
```json
"go.useLanguageServer": true
```
> Use the Go language server (gopls) for enhanced features

### go.formatTool
```json
"go.formatTool": &quot;goimports&quot;
```
> Use goimports for formatting (handles imports automatically)

### go.lintTool
```json
"go.lintTool": &quot;golangci-lint&quot;
```
> Use golangci-lint for comprehensive linting

### go.lintOnSave
```json
"go.lintOnSave": &quot;workspace&quot;
```
> Run linter on save for workspace files

### go.vetOnSave
```json
"go.vetOnSave": &quot;workspace&quot;
```
> Run go vet on save for workspace files

### go.buildOnSave
```json
"go.buildOnSave": &quot;workspace&quot;
```
> Build on save for workspace files

### go.testOnSave
```json
"go.testOnSave": false
```
> Disable automatic test running on save (performance)

### go.coverOnSave
```json
"go.coverOnSave": false
```
> Disable automatic coverage on save (performance)

### go.gocodeAutoBuild
```json
"go.gocodeAutoBuild": true
```
> Enable automatic building for autocompletion

### [go]
```json
"[go]": {
  &quot;editor.formatOnSave&quot;: true,
  &quot;editor.codeActionsOnSave&quot;: {
    &quot;source.organizeImports&quot;: &quot;explicit&quot;
  },
  &quot;editor.tabSize&quot;: 4,
  &quot;editor.insertSpaces&quot;: false,
  &quot;editor.detectIndentation&quot;: false
}
```
> Go-specific editor settings following Go conventions

### [go.mod]
```json
"[go.mod]": {
  &quot;editor.formatOnSave&quot;: true,
  &quot;editor.tabSize&quot;: 4,
  &quot;editor.insertSpaces&quot;: false
}
```
> Go module file specific settings

### [go.sum]
```json
"[go.sum]": {
  &quot;editor.formatOnSave&quot;: false,
  &quot;editor.tabSize&quot;: 4,
  &quot;editor.insertSpaces&quot;: false
}
```
> Go sum file specific settings (no formatting)

### go.testFlags
```json
"go.testFlags": [
  &quot;-v&quot;,
  &quot;-race&quot;
]
```
> Default flags for go test (verbose and race detection)

### go.testTimeout
```json
"go.testTimeout": &quot;30s&quot;
```
> Test timeout duration

### go.coverageDecorator
```json
"go.coverageDecorator": {
  &quot;type&quot;: &quot;gutter&quot;,
  &quot;coveredHighlightColor&quot;: &quot;rgba(64,128,128,0.5)&quot;,
  &quot;uncoveredHighlightColor&quot;: &quot;rgba(128,64,64,0.25)&quot;
}
```
> Test coverage visualization settings


## ⌨️ Recommended Keybindings

- **Run tests in current package**: `ctrl+shift+t`
- **Format Go code**: `ctrl+shift+f`
- **Run tests in current file**: `ctrl+shift+r`
- **Go to definition**: `f12`
- **Find all references**: `shift+f12`

## 📝 Extension Details

| Extension | Publisher | Description |
|-----------|-----------|-------------|
| [Go](https://open-vsx.org/extension/golang/go) | Go Team at Google | Rich Go language support for Visual Studio Code |
| [Error Lens](https://open-vsx.org/extension/usernamehw/errorlens) | Alexander | Improve highlighting of errors, warnings and other language diagnostics |
| [Go Outliner](https://open-vsx.org/extension/766b/go-outliner) | 766b | Go code outline explorer |
| [Go Test Explorer](https://open-vsx.org/extension/premparihar/gotestexplorer) | Prem Parihar | Go Test Explorer for Visual Studio Code |
| [Go Fill Struct](https://open-vsx.org/extension/davidbarratt/go-fill-struct) | David Barratt | Fill struct literals with default values |
| [Go Template Syntax Highlighter](https://open-vsx.org/extension/karyan40024/gotmpl-syntax-highlighter) | karyan40024 | Go Template Syntax Highlighter for Reply |

## 🏷️ Categories



## 📄 License

### Extension Pack License
This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscodium/golang/LICENSE.md) for details.

### Third-Party Extension Licenses
**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension | Publisher | License | Description |
|-----------|-----------|---------|-------------|
| [Go](https://open-vsx.org/extension/golang/go) | Go Team at Google | MIT | Rich Go language support for Visual Studio Code |
| [Error Lens](https://open-vsx.org/extension/usernamehw/errorlens) | Alexander | MIT | Improve highlighting of errors, warnings and other language diagnostics |
| [Go Outliner](https://open-vsx.org/extension/766b/go-outliner) | 766b | MIT | Go code outline explorer |
| [Go Test Explorer](https://open-vsx.org/extension/premparihar/gotestexplorer) | Prem Parihar | MIT | Go Test Explorer for Visual Studio Code |
| [Go Fill Struct](https://open-vsx.org/extension/davidbarratt/go-fill-struct) | David Barratt | MIT | Fill struct literals with default values |
| [Go Template Syntax Highlighter](https://open-vsx.org/extension/karyan40024/gotmpl-syntax-highlighter) | karyan40024 | MIT | Go Template Syntax Highlighter for Reply |

### Disclaimer
- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 6
- **Required Extensions**: 2
- **Optional Extensions**: 4
- **Target IDE**: vscodium
- **Language Focus**: golang

---

*This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful golang development extensions.*
