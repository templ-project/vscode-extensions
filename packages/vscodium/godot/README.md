# Templ Project Godot Extension Pack

Essential extensions for Godot game development with GDScript support, debugging, and enhanced productivity tools

## 📦 What's Included

This extension pack includes **7 carefully selected extensions** to enhance your godot development experience in vscodium.

### ✅ Core Extensions (2)

These extensions are essential for godot development:

- **[Godot Tools](https://open-vsx.org/extension/geequlim/godot-tools)** - Complete Godot development support with LSP, GDScript syntax highlighting, and debugging
- **[GDScript](https://open-vsx.org/extension/jjkim/gdscript)** - Syntax highlighting and code completion for GDScript

### 💡 Additional Extensions (5)

These extensions provide extra functionality and convenience:

- **[Godot Files](https://open-vsx.org/extension/alfish/godot-files)** - Syntax highlighting for Godot files (.tres, .tscn, .godot, etc.)
- **[Godot Shaders](https://open-vsx.org/extension/arkii/godot-shaders)** - Syntax highlighting and support for Godot shader files
- **[Godot Snippets](https://open-vsx.org/extension/razoric/gdscript-snippets)** - Code snippets for GDScript and Godot development
- **[TODO Highlight](https://open-vsx.org/extension/wayou/vscode-todo-highlight)** - Highlight TODOs, FIXMEs, and other annotations in your code
- **[Rainbow Brackets](https://open-vsx.org/extension/2gua/rainbow-brackets)** - Provide rainbow colors for the round brackets, the square brackets and the squiggly brackets

## 🚀 Installation

### Method 1: Install from Marketplace

1. Open Vscodium
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Templ Project Godot Extension Pack"
4. Click "Install"

### Method 2: Install via Command Line

```bash
codium --install-extension @templ-project/godot-extension-pack
```

### Method 3: Install from VSIX

1. Download the latest `.vsix` file from [Releases](https://github.com/templ-project/vscode-extensions/releases)
2. Open Vscodium
3. Run `Extensions: Install from VSIX...` command
4. Select the downloaded file

## ⚙️ Configuration

After installation, you may want to configure some settings for optimal godot development:

### files.associations

```json
{
  "files.associations": {
    "*.gd": "gdscript",
    "*.cs": "csharp",
    "*.tres": "godot-resource",
    "*.tscn": "godot-scene",
    "*.godot": "godot-project",
    "*.gdshader": "godot-shader",
    "*.gdextension": "ini"
  }
}
```

> Associate Godot file types with appropriate syntax highlighting

### godot_tools.editor_path

```json
{
  "godot_tools.editor_path": ""
}
```

> Path to Godot editor executable (auto-detected if left empty)

### godot_tools.gdscript_lsp_server_host

```json
{
  "godot_tools.gdscript_lsp_server_host": "127.0.0.1"
}
```

> Host address for GDScript Language Server

### godot_tools.gdscript_lsp_server_port

```json
{
  "godot_tools.gdscript_lsp_server_port": 6005
}
```

> Port for GDScript Language Server

### editor.tabSize

```json
{
  "editor.tabSize": 4
}
```

> Set tab size to 4 for GDScript (Godot convention)

### editor.insertSpaces

```json
{
  "editor.insertSpaces": false
}
```

> Use tabs instead of spaces for GDScript

### editor.detectIndentation

```json
{
  "editor.detectIndentation": false
}
```

> Disable automatic indentation detection to enforce Godot conventions

### editor.formatOnSave

```json
{
  "editor.formatOnSave": true
}
```

> Automatically format code on save

### editor.codeActionsOnSave

```json
{
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

> Organize imports on save

### todohighlight.isEnable

```json
{
  "todohighlight.isEnable": true
}
```

> Enable TODO highlighting

### todohighlight.keywords

```json
{
  "todohighlight.keywords": [
    {
      "text": "TODO:",
      "color": "#ff6b6b",
      "backgroundColor": "transparent",
      "overviewRulerColor": "#ff6b6b"
    },
    {
      "text": "FIXME:",
      "color": "#feca57",
      "backgroundColor": "transparent",
      "overviewRulerColor": "#feca57"
    },
    {
      "text": "NOTE:",
      "color": "#48dbfb",
      "backgroundColor": "transparent",
      "overviewRulerColor": "#48dbfb"
    },
    {
      "text": "BUG:",
      "color": "#ff9ff3",
      "backgroundColor": "transparent",
      "overviewRulerColor": "#ff9ff3"
    }
  ]
}
```

> Keywords to highlight in comments

### better-comments.tags

```json
{
  "better-comments.tags": [
    {
      "tag": "!",
      "color": "#FF2D00",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "?",
      "color": "#3498DB",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "//",
      "color": "#474747",
      "strikethrough": true,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "todo",
      "color": "#FF8C00",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "*",
      "color": "#98C379",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    }
  ]
}
```

> Configure better comments tags for enhanced documentation

## ⌨️ Recommended Keybindings

- **Start Godot debugging session**: `f5`
- **Run Godot project without debugging**: `ctrl+f5`
- **Stop Godot debugging session**: `shift+f5`
- **Restart Godot debugging session**: `ctrl+shift+f5`
- **Open Godot editor**: `f6`
- **List Godot classes**: `ctrl+alt+g`

## 📝 Extension Details

| Extension                                                                    | Publisher | Description                                                                                  |
| ---------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------- |
| [Godot Tools](https://open-vsx.org/extension/geequlim/godot-tools)           | geequlim  | Complete Godot development support with LSP, GDScript syntax highlighting, and debugging     |
| [GDScript](https://open-vsx.org/extension/jjkim/gdscript)                    | jjkim     | Syntax highlighting and code completion for GDScript                                         |
| [Godot Files](https://open-vsx.org/extension/alfish/godot-files)             | alfish    | Syntax highlighting for Godot files (.tres, .tscn, .godot, etc.)                             |
| [Godot Shaders](https://open-vsx.org/extension/arkii/godot-shaders)          | arkii     | Syntax highlighting and support for Godot shader files                                       |
| [Godot Snippets](https://open-vsx.org/extension/razoric/gdscript-snippets)   | razoric   | Code snippets for GDScript and Godot development                                             |
| [TODO Highlight](https://open-vsx.org/extension/wayou/vscode-todo-highlight) | wayou     | Highlight TODOs, FIXMEs, and other annotations in your code                                  |
| [Rainbow Brackets](https://open-vsx.org/extension/2gua/rainbow-brackets)     | 2gua      | Provide rainbow colors for the round brackets, the square brackets and the squiggly brackets |

## 🏷️ Categories

## 📄 License

### Extension Pack License

This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscodium/godot/LICENSE.md) for details.

### Third-Party Extension Licenses

**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension                                                                    | Publisher | License | Description                                                                                  |
| ---------------------------------------------------------------------------- | --------- | ------- | -------------------------------------------------------------------------------------------- |
| [Godot Tools](https://open-vsx.org/extension/geequlim/godot-tools)           | geequlim  | MIT     | Complete Godot development support with LSP, GDScript syntax highlighting, and debugging     |
| [GDScript](https://open-vsx.org/extension/jjkim/gdscript)                    | jjkim     | MIT     | Syntax highlighting and code completion for GDScript                                         |
| [Godot Files](https://open-vsx.org/extension/alfish/godot-files)             | alfish    | MIT     | Syntax highlighting for Godot files (.tres, .tscn, .godot, etc.)                             |
| [Godot Shaders](https://open-vsx.org/extension/arkii/godot-shaders)          | arkii     | MIT     | Syntax highlighting and support for Godot shader files                                       |
| [Godot Snippets](https://open-vsx.org/extension/razoric/gdscript-snippets)   | razoric   | MIT     | Code snippets for GDScript and Godot development                                             |
| [TODO Highlight](https://open-vsx.org/extension/wayou/vscode-todo-highlight) | wayou     | MIT     | Highlight TODOs, FIXMEs, and other annotations in your code                                  |
| [Rainbow Brackets](https://open-vsx.org/extension/2gua/rainbow-brackets)     | 2gua      | MIT     | Provide rainbow colors for the round brackets, the square brackets and the squiggly brackets |

### Disclaimer

- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 7
- **Required Extensions**: 2
- **Optional Extensions**: 5
- **Target IDE**: vscodium
- **Language Focus**: godot

---

_This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful godot development extensions._
