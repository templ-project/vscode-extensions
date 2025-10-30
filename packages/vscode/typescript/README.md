# Templ Project Typescript Extension Pack

Essential TypeScript development environment for VSCode - comprehensive tooling for type-safe development

## 📦 What's Included

This extension pack includes **2 carefully selected extensions** to enhance your typescript development experience in vscode.

### ✅ Core Extensions (2)

These extensions are essential for typescript development:

- **[TypeScript Language Features](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)** - Enhanced TypeScript language support with auto-import and intellisense
- **[json2ts](https://marketplace.visualstudio.com/items?itemName=GregorBiswanger.json2ts)** - Convert JSON object to typescript interfaces

## 🚀 Installation

### Method 1: Install from Marketplace

1. Open Vscode
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Templ Project Typescript Extension Pack"
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
{
  "typescript.preferences.quoteStyle": "single"
}
```

> Use single quotes for TypeScript imports and strings

### typescript.suggest.autoImports

```json
{
  "typescript.suggest.autoImports": true
}
```

> Enable auto-import suggestions for TypeScript

### typescript.updateImportsOnFileMove.enabled

```json
{
  "typescript.updateImportsOnFileMove.enabled": "always"
}
```

> Automatically update imports when files are moved

### eslint.validate

```json
{
  "eslint.validate": ["typescript", "typescriptreact"]
}
```

> File types to validate with ESLint

### eslint.format.enable

```json
{
  "eslint.format.enable": false
}
```

> Disable ESLint as formatter (use Prettier instead)

### eslint.codeActionsOnSave.rules

```json
{
  "eslint.codeActionsOnSave.rules": ["*"]
}
```

> ESLint rules to fix on save

### [typescript]

```json
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    },
    "editor.tabSize": 2,
    "editor.insertSpaces": true
  }
}
```

> TypeScript-specific editor settings

## ⌨️ Recommended Keybindings

- **Force format document with Prettier**: `ctrl+shift+f`
- **Fix ESLint problems in current file**: `ctrl+shift+e`
- **Go to TypeScript definition**: `f12`

## 📝 Extension Details

| Extension                                                                                                            | Publisher        | Description                                                            |
| -------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------- |
| [TypeScript Language Features](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next) | Microsoft        | Enhanced TypeScript language support with auto-import and intellisense |
| [json2ts](https://marketplace.visualstudio.com/items?itemName=GregorBiswanger.json2ts)                               | Gregor Biswanger | Convert JSON object to typescript interfaces                           |

## 🏷️ Categories

## 📄 License

### Extension Pack License

This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscode/typescript/LICENSE.md) for details.

### Third-Party Extension Licenses

**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension                                                                                                            | Publisher        | License | Description                                                            |
| -------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- | ---------------------------------------------------------------------- |
| [TypeScript Language Features](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next) | Microsoft        | MIT     | Enhanced TypeScript language support with auto-import and intellisense |
| [json2ts](https://marketplace.visualstudio.com/items?itemName=GregorBiswanger.json2ts)                               | Gregor Biswanger | MIT     | Convert JSON object to typescript interfaces                           |

### Disclaimer

- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 2
- **Required Extensions**: 2
- **Optional Extensions**: 0
- **Target IDE**: vscode
- **Language Focus**: typescript

---

_This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful typescript development extensions._
