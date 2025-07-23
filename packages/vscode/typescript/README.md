# [templ-project-1753307915621] Typescript Extension Pack

Essential TypeScript development environment for VSCode - comprehensive tooling for type-safe development

## 📦 What's Included

This extension pack includes **4 carefully selected extensions** to enhance your typescript development experience in vscode.

### ✅ Core Extensions (4)

These extensions are essential for typescript development:

- **[TypeScript Importer](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.vscode-typescript-next)** - Automatically searches for TypeScript definitions
- **[TypeScript Snippets](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.vscode-typescript-next)** - Code snippets for TypeScript development
- **[TypeScript Debugger](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.js-debug)** - Built-in TypeScript/JavaScript debugger for VS Code
- **[json2ts](https://marketplace.visualstudio.com/items?itemName&#x3D;GregorBiswanger.json2ts)** - Convert JSON object to typescript interfaces


## 🚀 Installation

### Method 1: Install from Marketplace
1. Open Vscode
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "[templ-project-1753307915621] Typescript Extension Pack"
4. Click "Install"

### Method 2: Install via Command Line
```bash
code --install-extension @templ-project/typescript-extension-pack
```

### Method 3: Install from VSIX
1. Download the latest `.vsix` file from [Releases](https://github.com/templ-project/vscode-extensions/releases)
2. Open Vscode
3. Run `Extensions: Install from VSIX...` command
4. Select the downloaded file

## ⚙️ Configuration

After installation, you may want to configure some settings for optimal typescript development:

### typescript.preferences.quoteStyle
```json
"typescript.preferences.quoteStyle": &quot;single&quot;
```
> Use single quotes for TypeScript imports and strings

### typescript.suggest.autoImports
```json
"typescript.suggest.autoImports": true
```
> Enable auto-import suggestions for TypeScript

### typescript.updateImportsOnFileMove.enabled
```json
"typescript.updateImportsOnFileMove.enabled": &quot;always&quot;
```
> Automatically update imports when files are moved

### eslint.validate
```json
"eslint.validate": [
  &quot;typescript&quot;,
  &quot;typescriptreact&quot;
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

### [typescript]
```json
"[typescript]": {
  &quot;editor.defaultFormatter&quot;: &quot;esbenp.prettier-vscode&quot;,
  &quot;editor.formatOnSave&quot;: true,
  &quot;editor.codeActionsOnSave&quot;: {
    &quot;source.fixAll.eslint&quot;: &quot;explicit&quot;
  },
  &quot;editor.tabSize&quot;: 2,
  &quot;editor.insertSpaces&quot;: true
}
```
> TypeScript-specific editor settings


## ⌨️ Recommended Keybindings

- **Force format document with Prettier**: `ctrl+shift+f`
- **Fix ESLint problems in current file**: `ctrl+shift+e`
- **Go to TypeScript definition**: `f12`

## 📝 Extension Details

| Extension | Publisher | Description |
|-----------|-----------|-------------|
| [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.vscode-typescript-next) | Microsoft | Automatically searches for TypeScript definitions |
| [TypeScript Snippets](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.vscode-typescript-next) | Microsoft | Code snippets for TypeScript development |
| [TypeScript Debugger](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.js-debug) | Microsoft | Built-in TypeScript/JavaScript debugger for VS Code |
| [json2ts](https://marketplace.visualstudio.com/items?itemName&#x3D;GregorBiswanger.json2ts) | Gregor Biswanger | Convert JSON object to typescript interfaces |

## 🏷️ Categories



## 📄 License

### Extension Pack License
This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscode/typescript/LICENSE.md) for details.

### Third-Party Extension Licenses
**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension | Publisher | License | Description |
|-----------|-----------|---------|-------------|
| [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.vscode-typescript-next) | Microsoft | MIT | Automatically searches for TypeScript definitions |
| [TypeScript Snippets](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.vscode-typescript-next) | Microsoft | MIT | Code snippets for TypeScript development |
| [TypeScript Debugger](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.js-debug) | Microsoft | MIT | Built-in TypeScript/JavaScript debugger for VS Code |
| [json2ts](https://marketplace.visualstudio.com/items?itemName&#x3D;GregorBiswanger.json2ts) | Gregor Biswanger | MIT | Convert JSON object to typescript interfaces |

### Disclaimer
- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 4
- **Required Extensions**: 4
- **Optional Extensions**: 0
- **Target IDE**: vscode
- **Language Focus**: typescript

---

*This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful typescript development extensions.*
