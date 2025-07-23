# [templ-project-1753307470618] Generic Essential Extension Pack

Essential productivity extensions for general development in VSCode

## 📦 What's Included

This extension pack includes **16 carefully selected extensions** to enhance your generic-essential development experience in vscode.

### ✅ Core Extensions (15)

These extensions are essential for generic-essential development:

- **[GitHub Copilot](https://marketplace.visualstudio.com/items?itemName&#x3D;github.copilot)** - Your AI pair programmer
- **[GitLens](https://marketplace.visualstudio.com/items?itemName&#x3D;eamodio.gitlens)** - Git supercharged
- **[Better Comments](https://marketplace.visualstudio.com/items?itemName&#x3D;aaron-bond.better-comments)** - Improve your code commenting by annotating with alert, info, todo, and more
- **[Bookmarks](https://marketplace.visualstudio.com/items?itemName&#x3D;alefragnani.bookmarks)** - Mark lines and jump to them
- **[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName&#x3D;streetsidesoftware.code-spell-checker)** - Spelling checker for source code
- **[DotENV](https://marketplace.visualstudio.com/items?itemName&#x3D;mikestead.dotenv)** - Support for dotenv file syntax
- **[Path Intellisense](https://marketplace.visualstudio.com/items?itemName&#x3D;christian-kohler.path-intellisense)** - Visual Studio Code plugin that autocompletes filenames
- **[TODO Tree](https://marketplace.visualstudio.com/items?itemName&#x3D;gruntfuggly.todo-tree)** - Show TODO, FIXME, etc. comment tags in a tree view
- **[Version Lens](https://marketplace.visualstudio.com/items?itemName&#x3D;pflannery.vscode-versionlens)** - Shows the latest version for each package using code lens
- **[JSON5 syntax](https://marketplace.visualstudio.com/items?itemName&#x3D;mrmlnc.vscode-json5)** - JSON5 syntax support
- **[Markdown All in One](https://marketplace.visualstudio.com/items?itemName&#x3D;yzhang.markdown-all-in-one)** - All you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more)
- **[markdownlint](https://marketplace.visualstudio.com/items?itemName&#x3D;davidanson.vscode-markdownlint)** - Markdown linting and style checking for Visual Studio Code
- **[Markdown Table Prettifier](https://marketplace.visualstudio.com/items?itemName&#x3D;darkriszty.markdown-table-prettify)** - Transforms markdown tables to be more readable
- **[Even Better TOML](https://marketplace.visualstudio.com/items?itemName&#x3D;tamasfe.even-better-toml)** - Fully-featured TOML support with syntax highlighting, validation, formatting, and schema support
- **[YAML](https://marketplace.visualstudio.com/items?itemName&#x3D;redhat.vscode-yaml)** - YAML language support with schema validation

### 💡 Additional Extensions (1)

These extensions provide extra functionality and convenience:

- **[Trailing Spaces](https://marketplace.visualstudio.com/items?itemName&#x3D;shardulm94.trailing-spaces)** - Highlight trailing spaces and delete them in a flash

## 🚀 Installation

### Method 1: Install from Marketplace
1. Open Vscode
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "[templ-project-1753307470618] Generic Essential Extension Pack"
4. Click "Install"

### Method 2: Install via Command Line
```bash
code --install-extension @templ-project/generic-essential-extension-pack
```

### Method 3: Install from VSIX
1. Download the latest `.vsix` file from [Releases](https://github.com/templ-project/vscode-extensions/releases)
2. Open Vscode
3. Run `Extensions: Install from VSIX...` command
4. Select the downloaded file

## ⚙️ Configuration

After installation, you may want to configure some settings for optimal generic-essential development:

### workbench.colorTheme
```json
"workbench.colorTheme": &quot;Default Dark+&quot;
```
> Default dark theme for better visibility

### editor.renderWhitespace
```json
"editor.renderWhitespace": &quot;trailing&quot;
```
> Show trailing whitespace

### files.trimTrailingWhitespace
```json
"files.trimTrailingWhitespace": true
```
> Trim trailing whitespace on save

### files.insertFinalNewline
```json
"files.insertFinalNewline": true
```
> Insert final newline at end of file

### editor.rulers
```json
"editor.rulers": [
  80,
  120
]
```
> Show rulers at 80 and 120 characters

### scm.defaultViewMode
```json
"scm.defaultViewMode": &quot;tree&quot;
```
> Default Git view mode

### [json]
```json
"[json]": {
  &quot;editor.defaultFormatter&quot;: &quot;vscode.json-language-features&quot;,
  &quot;editor.formatOnSave&quot;: true,
  &quot;editor.tabSize&quot;: 2,
  &quot;editor.insertSpaces&quot;: true
}
```
> JSON file formatting settings using built-in formatter

### [jsonc]
```json
"[jsonc]": {
  &quot;editor.defaultFormatter&quot;: &quot;vscode.json-language-features&quot;,
  &quot;editor.formatOnSave&quot;: true,
  &quot;editor.tabSize&quot;: 2,
  &quot;editor.insertSpaces&quot;: true
}
```
> JSON with Comments file formatting settings using built-in formatter


## ⌨️ Recommended Keybindings

- **Toggle bookmark**: `ctrl+shift+b`
- **Jump to next bookmark**: `ctrl+shift+j`
- **Jump to previous bookmark**: `ctrl+shift+k`

## 📝 Extension Details

| Extension | Publisher | Description |
|-----------|-----------|-------------|
| [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName&#x3D;github.copilot) | GitHub | Your AI pair programmer |
| [GitLens](https://marketplace.visualstudio.com/items?itemName&#x3D;eamodio.gitlens) | Eric Amodio | Git supercharged |
| [Better Comments](https://marketplace.visualstudio.com/items?itemName&#x3D;aaron-bond.better-comments) | Aaron Bond | Improve your code commenting by annotating with alert, info, todo, and more |
| [Bookmarks](https://marketplace.visualstudio.com/items?itemName&#x3D;alefragnani.bookmarks) | Alessandro Fragnani | Mark lines and jump to them |
| [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName&#x3D;streetsidesoftware.code-spell-checker) | Street Side Software | Spelling checker for source code |
| [DotENV](https://marketplace.visualstudio.com/items?itemName&#x3D;mikestead.dotenv) | mikestead | Support for dotenv file syntax |
| [Path Intellisense](https://marketplace.visualstudio.com/items?itemName&#x3D;christian-kohler.path-intellisense) | Christian Kohler | Visual Studio Code plugin that autocompletes filenames |
| [TODO Tree](https://marketplace.visualstudio.com/items?itemName&#x3D;gruntfuggly.todo-tree) | Gruntfuggly | Show TODO, FIXME, etc. comment tags in a tree view |
| [Version Lens](https://marketplace.visualstudio.com/items?itemName&#x3D;pflannery.vscode-versionlens) | pflannery | Shows the latest version for each package using code lens |
| [JSON5 syntax](https://marketplace.visualstudio.com/items?itemName&#x3D;mrmlnc.vscode-json5) | mrmlnc | JSON5 syntax support |
| [Markdown All in One](https://marketplace.visualstudio.com/items?itemName&#x3D;yzhang.markdown-all-in-one) | Yu Zhang | All you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more) |
| [markdownlint](https://marketplace.visualstudio.com/items?itemName&#x3D;davidanson.vscode-markdownlint) | David Anson | Markdown linting and style checking for Visual Studio Code |
| [Markdown Table Prettifier](https://marketplace.visualstudio.com/items?itemName&#x3D;darkriszty.markdown-table-prettify) | darkriszty | Transforms markdown tables to be more readable |
| [Even Better TOML](https://marketplace.visualstudio.com/items?itemName&#x3D;tamasfe.even-better-toml) | tamasfe | Fully-featured TOML support with syntax highlighting, validation, formatting, and schema support |
| [YAML](https://marketplace.visualstudio.com/items?itemName&#x3D;redhat.vscode-yaml) | Red Hat | YAML language support with schema validation |
| [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName&#x3D;shardulm94.trailing-spaces) | Shardul Mahadik | Highlight trailing spaces and delete them in a flash |

## 🏷️ Categories



## 📄 License

### Extension Pack License
This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscode/generic-essential/LICENSE.md) for details.

### Third-Party Extension Licenses
**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension | Publisher | License | Description |
|-----------|-----------|---------|-------------|
| [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName&#x3D;github.copilot) | GitHub | GitHub Copilot License | Your AI pair programmer |
| [GitLens](https://marketplace.visualstudio.com/items?itemName&#x3D;eamodio.gitlens) | Eric Amodio | MIT | Git supercharged |
| [Better Comments](https://marketplace.visualstudio.com/items?itemName&#x3D;aaron-bond.better-comments) | Aaron Bond | MIT | Improve your code commenting by annotating with alert, info, todo, and more |
| [Bookmarks](https://marketplace.visualstudio.com/items?itemName&#x3D;alefragnani.bookmarks) | Alessandro Fragnani | MIT | Mark lines and jump to them |
| [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName&#x3D;streetsidesoftware.code-spell-checker) | Street Side Software | MIT | Spelling checker for source code |
| [DotENV](https://marketplace.visualstudio.com/items?itemName&#x3D;mikestead.dotenv) | mikestead | MIT | Support for dotenv file syntax |
| [Path Intellisense](https://marketplace.visualstudio.com/items?itemName&#x3D;christian-kohler.path-intellisense) | Christian Kohler | MIT | Visual Studio Code plugin that autocompletes filenames |
| [TODO Tree](https://marketplace.visualstudio.com/items?itemName&#x3D;gruntfuggly.todo-tree) | Gruntfuggly | MIT | Show TODO, FIXME, etc. comment tags in a tree view |
| [Version Lens](https://marketplace.visualstudio.com/items?itemName&#x3D;pflannery.vscode-versionlens) | pflannery | MIT | Shows the latest version for each package using code lens |
| [JSON5 syntax](https://marketplace.visualstudio.com/items?itemName&#x3D;mrmlnc.vscode-json5) | mrmlnc | MIT | JSON5 syntax support |
| [Markdown All in One](https://marketplace.visualstudio.com/items?itemName&#x3D;yzhang.markdown-all-in-one) | Yu Zhang | MIT | All you need to write Markdown (keyboard shortcuts, table of contents, auto preview and more) |
| [markdownlint](https://marketplace.visualstudio.com/items?itemName&#x3D;davidanson.vscode-markdownlint) | David Anson | MIT | Markdown linting and style checking for Visual Studio Code |
| [Markdown Table Prettifier](https://marketplace.visualstudio.com/items?itemName&#x3D;darkriszty.markdown-table-prettify) | darkriszty | MIT | Transforms markdown tables to be more readable |
| [Even Better TOML](https://marketplace.visualstudio.com/items?itemName&#x3D;tamasfe.even-better-toml) | tamasfe | MIT | Fully-featured TOML support with syntax highlighting, validation, formatting, and schema support |
| [YAML](https://marketplace.visualstudio.com/items?itemName&#x3D;redhat.vscode-yaml) | Red Hat | MIT | YAML language support with schema validation |
| [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName&#x3D;shardulm94.trailing-spaces) | Shardul Mahadik | MIT | Highlight trailing spaces and delete them in a flash |

### Disclaimer
- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 16
- **Required Extensions**: 15
- **Optional Extensions**: 1
- **Target IDE**: vscode
- **Language Focus**: generic-essential

---

*This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful generic-essential development extensions.*
