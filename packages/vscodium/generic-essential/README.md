# Templ Project Generic Essential Extension Pack

Essential productivity extensions for general development in VSCodium (JSON support built-in)

## 📦 What's Included

This extension pack includes **19 carefully selected extensions** to enhance your generic-essential development experience in vscodium.

### ✅ Core Extensions (18)

These extensions are essential for generic-essential development:

- **[Continue - open-source AI code assistant](https://open-vsx.org/extension/Continue/continue)** - The leading open-source AI code assistant
- **[GitLens](https://open-vsx.org/extension/eamodio/gitlens)** - Git supercharged
- **[Bookmarks](https://marketplace.visualstudio.com/items?itemName&#x3D;alefragnani.bookmarks)** - Mark lines and jump to them
- **[TODO Tree](https://marketplace.visualstudio.com/items?itemName&#x3D;gruntfuggly.todo-tree)** - Show TODO, FIXME, etc. comment tags in a tree view
- **[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName&#x3D;streetsidesoftware.code-spell-checker)** - Spelling checker for source code
- **[Better Comments](https://marketplace.visualstudio.com/items?itemName&#x3D;aaron-bond.better-comments)** - Improve your code commenting by annotating with alert, info, todo, and more
- **[DotENV](https://open-vsx.org/extension/mikestead/dotenv)** - Support for dotenv file syntax
- **[Path Intellisense](https://open-vsx.org/extension/christian-kohler/path-intellisense)** - Visual Studio Code plugin that autocompletes filenames
- **[Version Lens](https://open-vsx.org/extension/pflannery/vscode-versionlens)** - Shows the latest version for each package using code lens
- **[YAML](https://marketplace.visualstudio.com/items?itemName&#x3D;redhat.vscode-yaml)** - YAML language support with schema validation
- **[Even Better TOML](https://open-vsx.org/extension/tamasfe/even-better-toml)** - Fully-featured TOML support with syntax highlighting, validation, formatting, and schema support
- **[Better JSON5](https://open-vsx.org/extension/BlueGlassBlock/better-json5)** - JSON5 language support with syntax highlighting and validation
- **[Markdown All in One](https://marketplace.visualstudio.com/items?itemName&#x3D;yzhang.markdown-all-in-one)** - All you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more)
- **[markdownlint](https://marketplace.visualstudio.com/items?itemName&#x3D;davidanson.vscode-markdownlint)** - Markdown linting and style checking for Visual Studio Code
- **[Markdown Table Prettifier](https://marketplace.visualstudio.com/items?itemName&#x3D;darkriszty.markdown-table-prettify)** - Transforms markdown tables to be more readable
- **[EditorConfig for VS Code](https://open-vsx.org/extension/editorconfig/editorconfig)** - EditorConfig Support for Visual Studio Code
- **[Version Lens](https://open-vsx.org/extension/pflannery/vscode-versionlens)** - Shows the latest version for each package using code lens
- **[Error Lens](https://open-vsx.org/extension/usernamehw/errorlens)** - Improve highlighting of errors, warnings and other language diagnostics

### 💡 Additional Extensions (1)

These extensions provide extra functionality and convenience:

- **[Trailing Spaces](https://open-vsx.org/extension/shardulm94/trailing-spaces)** - Highlight trailing spaces and delete them in a flash

## 🚀 Installation

### Method 1: Install from Marketplace
1. Open Vscodium
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Templ Project Generic Essential Extension Pack"
4. Click "Install"

### Method 2: Install via Command Line
```bash
codium --install-extension @templ-project/generic-essential-extension-pack
```

### Method 3: Install from VSIX
1. Download the latest `.vsix` file from [Releases](https://github.com/templ-project/vscode-extensions/releases)
2. Open Vscodium
3. Run `Extensions: Install from VSIX...` command
4. Select the downloaded file

## ⚙️ Configuration

After installation, you may want to configure some settings for optimal generic-essential development:

### workbench.colorTheme
```json
{
  "workbench.colorTheme": "Default Dark+"
}
```
> Default dark theme for better visibility

### editor.renderWhitespace
```json
{
  "editor.renderWhitespace": "trailing"
}
```
> Show trailing whitespace

### files.trimTrailingWhitespace
```json
{
  "files.trimTrailingWhitespace": true
}
```
> Trim trailing whitespace on save

### files.insertFinalNewline
```json
{
  "files.insertFinalNewline": true
}
```
> Insert final newline at end of file

### editor.rulers
```json
{
  "editor.rulers": [
  80,
  120
]
}
```
> Show rulers at 80 and 120 characters

### scm.defaultViewMode
```json
{
  "scm.defaultViewMode": "tree"
}
```
> Default Git view mode

### errorLens.enabledDiagnosticLevels
```json
{
  "errorLens.enabledDiagnosticLevels": [
  "error",
  "warning",
  "info"
]
}
```
> Show error lens for errors, warnings, and info messages

### errorLens.excludeBySource
```json
{
  "errorLens.excludeBySource": []
}
```
> Sources to exclude from error lens

### [json]
```json
{
  "[json]": {
  "editor.defaultFormatter": "vscode.json-language-features",
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true
}
}
```
> JSON file formatting settings using built-in formatter

### [jsonc]
```json
{
  "[jsonc]": {
  "editor.defaultFormatter": "vscode.json-language-features",
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true
}
}
```
> JSON with Comments file formatting settings using built-in formatter

### telemetry.enableTelemetry
```json
{
  "telemetry.enableTelemetry": false
}
```
> Disable telemetry (VSCodium default)

### update.mode
```json
{
  "update.mode": "manual"
}
```
> Manual updates recommended for VSCodium


## ⌨️ Recommended Keybindings

- **Toggle bookmark**: `ctrl+shift+b`
- **Jump to next bookmark**: `ctrl+shift+j`
- **Jump to previous bookmark**: `ctrl+shift+k`

## 📝 Extension Details

| Extension | Publisher | Description |
|-----------|-----------|-------------|
| [Continue - open-source AI code assistant](https://open-vsx.org/extension/Continue/continue) | Continue | The leading open-source AI code assistant |
| [GitLens](https://open-vsx.org/extension/eamodio/gitlens) | Eric Amodio | Git supercharged |
| [Bookmarks](https://marketplace.visualstudio.com/items?itemName&#x3D;alefragnani.bookmarks) | Alessandro Fragnani | Mark lines and jump to them |
| [TODO Tree](https://marketplace.visualstudio.com/items?itemName&#x3D;gruntfuggly.todo-tree) | Gruntfuggly | Show TODO, FIXME, etc. comment tags in a tree view |
| [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName&#x3D;streetsidesoftware.code-spell-checker) | Street Side Software | Spelling checker for source code |
| [Better Comments](https://marketplace.visualstudio.com/items?itemName&#x3D;aaron-bond.better-comments) | Aaron Bond | Improve your code commenting by annotating with alert, info, todo, and more |
| [DotENV](https://open-vsx.org/extension/mikestead/dotenv) | mikestead | Support for dotenv file syntax |
| [Path Intellisense](https://open-vsx.org/extension/christian-kohler/path-intellisense) | Christian Kohler | Visual Studio Code plugin that autocompletes filenames |
| [Version Lens](https://open-vsx.org/extension/pflannery/vscode-versionlens) | pflannery | Shows the latest version for each package using code lens |
| [YAML](https://marketplace.visualstudio.com/items?itemName&#x3D;redhat.vscode-yaml) | Red Hat | YAML language support with schema validation |
| [Even Better TOML](https://open-vsx.org/extension/tamasfe/even-better-toml) | tamasfe | Fully-featured TOML support with syntax highlighting, validation, formatting, and schema support |
| [Better JSON5](https://open-vsx.org/extension/BlueGlassBlock/better-json5) | BlueGlassBlock | JSON5 language support with syntax highlighting and validation |
| [Markdown All in One](https://marketplace.visualstudio.com/items?itemName&#x3D;yzhang.markdown-all-in-one) | Yu Zhang | All you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more) |
| [markdownlint](https://marketplace.visualstudio.com/items?itemName&#x3D;davidanson.vscode-markdownlint) | David Anson | Markdown linting and style checking for Visual Studio Code |
| [Markdown Table Prettifier](https://marketplace.visualstudio.com/items?itemName&#x3D;darkriszty.markdown-table-prettify) | darkriszty | Transforms markdown tables to be more readable |
| [EditorConfig for VS Code](https://open-vsx.org/extension/editorconfig/editorconfig) | EditorConfig | EditorConfig Support for Visual Studio Code |
| [Version Lens](https://open-vsx.org/extension/pflannery/vscode-versionlens) | pflannery | Shows the latest version for each package using code lens |
| [Error Lens](https://open-vsx.org/extension/usernamehw/errorlens) | Alexander | Improve highlighting of errors, warnings and other language diagnostics |
| [Trailing Spaces](https://open-vsx.org/extension/shardulm94/trailing-spaces) | Shardul Mahadik | Highlight trailing spaces and delete them in a flash |

## 🏷️ Categories



## 📄 License

### Extension Pack License
This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscodium/generic-essential/LICENSE.md) for details.

### Third-Party Extension Licenses
**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension | Publisher | License | Description |
|-----------|-----------|---------|-------------|
| [Continue - open-source AI code assistant](https://open-vsx.org/extension/Continue/continue) | Continue | Apache-2.0 | The leading open-source AI code assistant |
| [GitLens](https://open-vsx.org/extension/eamodio/gitlens) | Eric Amodio | MIT | Git supercharged |
| [Bookmarks](https://marketplace.visualstudio.com/items?itemName&#x3D;alefragnani.bookmarks) | Alessandro Fragnani | MIT | Mark lines and jump to them |
| [TODO Tree](https://marketplace.visualstudio.com/items?itemName&#x3D;gruntfuggly.todo-tree) | Gruntfuggly | MIT | Show TODO, FIXME, etc. comment tags in a tree view |
| [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName&#x3D;streetsidesoftware.code-spell-checker) | Street Side Software | MIT | Spelling checker for source code |
| [Better Comments](https://marketplace.visualstudio.com/items?itemName&#x3D;aaron-bond.better-comments) | Aaron Bond | MIT | Improve your code commenting by annotating with alert, info, todo, and more |
| [DotENV](https://open-vsx.org/extension/mikestead/dotenv) | mikestead | MIT | Support for dotenv file syntax |
| [Path Intellisense](https://open-vsx.org/extension/christian-kohler/path-intellisense) | Christian Kohler | MIT | Visual Studio Code plugin that autocompletes filenames |
| [Version Lens](https://open-vsx.org/extension/pflannery/vscode-versionlens) | pflannery | MIT | Shows the latest version for each package using code lens |
| [YAML](https://marketplace.visualstudio.com/items?itemName&#x3D;redhat.vscode-yaml) | Red Hat | MIT | YAML language support with schema validation |
| [Even Better TOML](https://open-vsx.org/extension/tamasfe/even-better-toml) | tamasfe | MIT | Fully-featured TOML support with syntax highlighting, validation, formatting, and schema support |
| [Better JSON5](https://open-vsx.org/extension/BlueGlassBlock/better-json5) | BlueGlassBlock | MIT | JSON5 language support with syntax highlighting and validation |
| [Markdown All in One](https://marketplace.visualstudio.com/items?itemName&#x3D;yzhang.markdown-all-in-one) | Yu Zhang | MIT | All you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more) |
| [markdownlint](https://marketplace.visualstudio.com/items?itemName&#x3D;davidanson.vscode-markdownlint) | David Anson | MIT | Markdown linting and style checking for Visual Studio Code |
| [Markdown Table Prettifier](https://marketplace.visualstudio.com/items?itemName&#x3D;darkriszty.markdown-table-prettify) | darkriszty | MIT | Transforms markdown tables to be more readable |
| [EditorConfig for VS Code](https://open-vsx.org/extension/editorconfig/editorconfig) | EditorConfig | MIT | EditorConfig Support for Visual Studio Code |
| [Version Lens](https://open-vsx.org/extension/pflannery/vscode-versionlens) | pflannery | MIT | Shows the latest version for each package using code lens |
| [Error Lens](https://open-vsx.org/extension/usernamehw/errorlens) | Alexander | MIT | Improve highlighting of errors, warnings and other language diagnostics |
| [Trailing Spaces](https://open-vsx.org/extension/shardulm94/trailing-spaces) | Shardul Mahadik | MIT | Highlight trailing spaces and delete them in a flash |

### Disclaimer
- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 19
- **Required Extensions**: 18
- **Optional Extensions**: 1
- **Target IDE**: vscodium
- **Language Focus**: generic-essential

---

*This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful generic-essential development extensions.*
