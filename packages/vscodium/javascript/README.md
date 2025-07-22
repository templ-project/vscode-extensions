# [templ-project-1753222233700] Javascript Extension Pack

Essential JavaScript development environment for VSCodium - runtime-agnostic tools using open-source alternatives

## 📦 What's Included

This extension pack includes **8 carefully selected extensions** to enhance your javascript development experience in vscodium.

### ✅ Core Extensions (4)

These extensions are essential for javascript development:

- **[ESLint](https://open-vsx.org/extension/dbaeumer/vscode-eslint)** - Integrates ESLint JavaScript linting into VS Code
- **[Prettier - Code formatter](https://open-vsx.org/extension/esbenp/prettier-vscode)** - Code formatter using prettier for consistent code style
- **[JavaScript Debugger](https://open-vsx.org/extension/ms-vscode/js-debug)** - Built-in JavaScript debugger for VS Code
- **[Babel JavaScript](https://open-vsx.org/extension/mgmcdermott/vscode-language-babel)** - Syntax highlighting for today&#x27;s JavaScript

### 💡 Additional Extensions (4)

These extensions provide extra functionality and convenience:

- **[Import Cost](https://open-vsx.org/extension/wix/vscode-import-cost)** - Display import/require package size in the editor
- **[Quokka.js](https://open-vsx.org/extension/WallabyJs/quokka-vscode)** - JavaScript and TypeScript playground in your editor
- **[Bun for Visual Studio Code](https://open-vsx.org/extension/oven/bun-vscode)** - VS Code extension for Bun
- **[Deno](https://open-vsx.org/extension/denoland/vscode-deno)** - Deno support for Visual Studio Code

## 🚀 Installation

### Method 1: Install from Marketplace
1. Open Vscodium
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "[templ-project-1753222233700] Javascript Extension Pack"
4. Click "Install"

### Method 2: Install via Command Line
```bash
codium --install-extension @templ-project/javascript-extension-pack
```

### Method 3: Install from VSIX
1. Download the latest `.vsix` file from [Releases](https://github.com/templ-project/vscode-extensions/releases)
2. Open Vscodium
3. Run `Extensions: Install from VSIX...` command
4. Select the downloaded file

## ⚙️ Configuration

After installation, you may want to configure some settings for optimal javascript development:

### javascript.preferences.quoteStyle
```json
"javascript.preferences.quoteStyle": &quot;single&quot;
```
> Use single quotes for JavaScript imports and strings

### javascript.suggest.autoImports
```json
"javascript.suggest.autoImports": true
```
> Enable auto-import suggestions for JavaScript

### javascript.updateImportsOnFileMove.enabled
```json
"javascript.updateImportsOnFileMove.enabled": &quot;always&quot;
```
> Automatically update imports when files are moved

### eslint.validate
```json
"eslint.validate": [
  &quot;javascript&quot;,
  &quot;javascriptreact&quot;
]
```
> File types to validate with ESLint

### eslint.format.enable
```json
"eslint.format.enable": false
```
> Disable ESLint as formatter (use Prettier instead)

### eslint.codeActionsOnSave.rules
```json
"eslint.codeActionsOnSave.rules": [
  &quot;*&quot;
]
```
> ESLint rules to fix on save

### [javascript]
```json
"[javascript]": {
  &quot;editor.defaultFormatter&quot;: &quot;esbenp.prettier-vscode&quot;,
  &quot;editor.formatOnSave&quot;: true,
  &quot;editor.codeActionsOnSave&quot;: {
    &quot;source.fixAll.eslint&quot;: &quot;explicit&quot;
  },
  &quot;editor.tabSize&quot;: 2,
  &quot;editor.insertSpaces&quot;: true
}
```
> JavaScript-specific editor settings


## ⌨️ Recommended Keybindings

- **Force format document with Prettier**: `ctrl+shift+f`
- **Fix ESLint problems in current file**: `ctrl+shift+e`

## 📝 Extension Details

| Extension | Publisher | Description |
|-----------|-----------|-------------|
| [ESLint](https://open-vsx.org/extension/dbaeumer/vscode-eslint) | Microsoft | Integrates ESLint JavaScript linting into VS Code |
| [Prettier - Code formatter](https://open-vsx.org/extension/esbenp/prettier-vscode) | Prettier | Code formatter using prettier for consistent code style |
| [JavaScript Debugger](https://open-vsx.org/extension/ms-vscode/js-debug) | Microsoft | Built-in JavaScript debugger for VS Code |
| [Babel JavaScript](https://open-vsx.org/extension/mgmcdermott/vscode-language-babel) | Michael McDermott | Syntax highlighting for today&#x27;s JavaScript |
| [Import Cost](https://open-vsx.org/extension/wix/vscode-import-cost) | Wix | Display import/require package size in the editor |
| [Quokka.js](https://open-vsx.org/extension/WallabyJs/quokka-vscode) | Wallaby.js | JavaScript and TypeScript playground in your editor |
| [Bun for Visual Studio Code](https://open-vsx.org/extension/oven/bun-vscode) | Oven | VS Code extension for Bun |
| [Deno](https://open-vsx.org/extension/denoland/vscode-deno) | Deno Land Inc. | Deno support for Visual Studio Code |

## 🏷️ Categories



## 📄 License

### Extension Pack License
This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscodium/javascript/LICENSE.md) for details.

### Third-Party Extension Licenses
**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension | Publisher | License | Description |
|-----------|-----------|---------|-------------|
| [ESLint](https://open-vsx.org/extension/dbaeumer/vscode-eslint) | Microsoft | MIT | Integrates ESLint JavaScript linting into VS Code |
| [Prettier - Code formatter](https://open-vsx.org/extension/esbenp/prettier-vscode) | Prettier | MIT | Code formatter using prettier for consistent code style |
| [JavaScript Debugger](https://open-vsx.org/extension/ms-vscode/js-debug) | Microsoft | MIT | Built-in JavaScript debugger for VS Code |
| [Babel JavaScript](https://open-vsx.org/extension/mgmcdermott/vscode-language-babel) | Michael McDermott | MIT | Syntax highlighting for today&#x27;s JavaScript |
| [Import Cost](https://open-vsx.org/extension/wix/vscode-import-cost) | Wix | MIT | Display import/require package size in the editor |
| [Quokka.js](https://open-vsx.org/extension/WallabyJs/quokka-vscode) | Wallaby.js | Commercial | JavaScript and TypeScript playground in your editor |
| [Bun for Visual Studio Code](https://open-vsx.org/extension/oven/bun-vscode) | Oven | MIT | VS Code extension for Bun |
| [Deno](https://open-vsx.org/extension/denoland/vscode-deno) | Deno Land Inc. | MIT | Deno support for Visual Studio Code |

### Disclaimer
- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 8
- **Required Extensions**: 4
- **Optional Extensions**: 4
- **Target IDE**: vscodium
- **Language Focus**: javascript

---

*This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful javascript development extensions.*
