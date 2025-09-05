# Templ Project Godot Extension Pack

Essential extensions for Godot game development with GDScript support, debugging, and enhanced productivity tools

## 📦 What's Included

This extension pack includes **9 carefully selected extensions** to enhance your godot development experience in vscodium.

### ✅ Core Extensions (2)

These extensions are essential for godot development:

- **[Godot Tools](https://open-vsx.org/extension/geequlim/godot-tools)** - Complete Godot development support with LSP, GDScript syntax highlighting, and debugging
- **[GDScript](https://open-vsx.org/extension/jjkim/gdscript)** - Syntax highlighting and code completion for GDScript

### 💡 Additional Extensions (7)

These extensions provide extra functionality and convenience:

- **[Godot Files](https://open-vsx.org/extension/alfish/godot-files)** - Syntax highlighting for Godot files (.tres, .tscn, .godot, etc.)
- **[Godot Shaders](https://open-vsx.org/extension/arkii/godot-shaders)** - Syntax highlighting and support for Godot shader files
- **[Godot Snippets](https://open-vsx.org/extension/razoric/gdscript-snippets)** - Code snippets for GDScript and Godot development
- **[Error Lens](https://open-vsx.org/extension/usernamehw/errorlens)** - Improve highlighting of errors, warnings and other language diagnostics
- **[TODO Highlight](https://open-vsx.org/extension/wayou/vscode-todo-highlight)** - Highlight TODOs, FIXMEs, and other annotations in your code
- **[Rainbow Brackets](https://open-vsx.org/extension/2gua/rainbow-brackets)** - Provide rainbow colors for the round brackets, the square brackets and the squiggly brackets
- **[Better Comments](https://open-vsx.org/extension/aaron-bond/better-comments)** - Improve your code commenting by annotating with alert, informational, TODOs, and more

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
"files.associations": {
  &quot;*.gd&quot;: &quot;gdscript&quot;,
  &quot;*.cs&quot;: &quot;csharp&quot;,
  &quot;*.tres&quot;: &quot;godot-resource&quot;,
  &quot;*.tscn&quot;: &quot;godot-scene&quot;,
  &quot;*.godot&quot;: &quot;godot-project&quot;,
  &quot;*.gdshader&quot;: &quot;godot-shader&quot;,
  &quot;*.gdextension&quot;: &quot;ini&quot;
}
```
> Associate Godot file types with appropriate syntax highlighting

### godot_tools.editor_path
```json
"godot_tools.editor_path": &quot;&quot;
```
> Path to Godot editor executable (auto-detected if left empty)

### godot_tools.gdscript_lsp_server_host
```json
"godot_tools.gdscript_lsp_server_host": &quot;127.0.0.1&quot;
```
> Host address for GDScript Language Server

### godot_tools.gdscript_lsp_server_port
```json
"godot_tools.gdscript_lsp_server_port": 6005
```
> Port for GDScript Language Server

### editor.tabSize
```json
"editor.tabSize": 4
```
> Set tab size to 4 for GDScript (Godot convention)

### editor.insertSpaces
```json
"editor.insertSpaces": false
```
> Use tabs instead of spaces for GDScript

### editor.detectIndentation
```json
"editor.detectIndentation": false
```
> Disable automatic indentation detection to enforce Godot conventions

### editor.formatOnSave
```json
"editor.formatOnSave": true
```
> Automatically format code on save

### editor.codeActionsOnSave
```json
"editor.codeActionsOnSave": {
  &quot;source.organizeImports&quot;: true
}
```
> Organize imports on save

### errorLens.enabledDiagnosticLevels
```json
"errorLens.enabledDiagnosticLevels": [
  &quot;error&quot;,
  &quot;warning&quot;,
  &quot;info&quot;
]
```
> Show error lens for errors, warnings, and info messages

### errorLens.excludeBySource
```json
"errorLens.excludeBySource": []
```
> Sources to exclude from error lens

### todohighlight.isEnable
```json
"todohighlight.isEnable": true
```
> Enable TODO highlighting

### todohighlight.keywords
```json
"todohighlight.keywords": [
  {
    &quot;text&quot;: &quot;TODO:&quot;,
    &quot;color&quot;: &quot;#ff6b6b&quot;,
    &quot;backgroundColor&quot;: &quot;transparent&quot;,
    &quot;overviewRulerColor&quot;: &quot;#ff6b6b&quot;
  },
  {
    &quot;text&quot;: &quot;FIXME:&quot;,
    &quot;color&quot;: &quot;#feca57&quot;,
    &quot;backgroundColor&quot;: &quot;transparent&quot;,
    &quot;overviewRulerColor&quot;: &quot;#feca57&quot;
  },
  {
    &quot;text&quot;: &quot;NOTE:&quot;,
    &quot;color&quot;: &quot;#48dbfb&quot;,
    &quot;backgroundColor&quot;: &quot;transparent&quot;,
    &quot;overviewRulerColor&quot;: &quot;#48dbfb&quot;
  },
  {
    &quot;text&quot;: &quot;BUG:&quot;,
    &quot;color&quot;: &quot;#ff9ff3&quot;,
    &quot;backgroundColor&quot;: &quot;transparent&quot;,
    &quot;overviewRulerColor&quot;: &quot;#ff9ff3&quot;
  }
]
```
> Keywords to highlight in comments

### better-comments.tags
```json
"better-comments.tags": [
  {
    &quot;tag&quot;: &quot;!&quot;,
    &quot;color&quot;: &quot;#FF2D00&quot;,
    &quot;strikethrough&quot;: false,
    &quot;underline&quot;: false,
    &quot;backgroundColor&quot;: &quot;transparent&quot;,
    &quot;bold&quot;: false,
    &quot;italic&quot;: false
  },
  {
    &quot;tag&quot;: &quot;?&quot;,
    &quot;color&quot;: &quot;#3498DB&quot;,
    &quot;strikethrough&quot;: false,
    &quot;underline&quot;: false,
    &quot;backgroundColor&quot;: &quot;transparent&quot;,
    &quot;bold&quot;: false,
    &quot;italic&quot;: false
  },
  {
    &quot;tag&quot;: &quot;//&quot;,
    &quot;color&quot;: &quot;#474747&quot;,
    &quot;strikethrough&quot;: true,
    &quot;underline&quot;: false,
    &quot;backgroundColor&quot;: &quot;transparent&quot;,
    &quot;bold&quot;: false,
    &quot;italic&quot;: false
  },
  {
    &quot;tag&quot;: &quot;todo&quot;,
    &quot;color&quot;: &quot;#FF8C00&quot;,
    &quot;strikethrough&quot;: false,
    &quot;underline&quot;: false,
    &quot;backgroundColor&quot;: &quot;transparent&quot;,
    &quot;bold&quot;: false,
    &quot;italic&quot;: false
  },
  {
    &quot;tag&quot;: &quot;*&quot;,
    &quot;color&quot;: &quot;#98C379&quot;,
    &quot;strikethrough&quot;: false,
    &quot;underline&quot;: false,
    &quot;backgroundColor&quot;: &quot;transparent&quot;,
    &quot;bold&quot;: false,
    &quot;italic&quot;: false
  }
]
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

| Extension | Publisher | Description |
|-----------|-----------|-------------|
| [Godot Tools](https://open-vsx.org/extension/geequlim/godot-tools) | geequlim | Complete Godot development support with LSP, GDScript syntax highlighting, and debugging |
| [GDScript](https://open-vsx.org/extension/jjkim/gdscript) | jjkim | Syntax highlighting and code completion for GDScript |
| [Godot Files](https://open-vsx.org/extension/alfish/godot-files) | alfish | Syntax highlighting for Godot files (.tres, .tscn, .godot, etc.) |
| [Godot Shaders](https://open-vsx.org/extension/arkii/godot-shaders) | arkii | Syntax highlighting and support for Godot shader files |
| [Godot Snippets](https://open-vsx.org/extension/razoric/gdscript-snippets) | razoric | Code snippets for GDScript and Godot development |
| [Error Lens](https://open-vsx.org/extension/usernamehw/errorlens) | usernamehw | Improve highlighting of errors, warnings and other language diagnostics |
| [TODO Highlight](https://open-vsx.org/extension/wayou/vscode-todo-highlight) | wayou | Highlight TODOs, FIXMEs, and other annotations in your code |
| [Rainbow Brackets](https://open-vsx.org/extension/2gua/rainbow-brackets) | 2gua | Provide rainbow colors for the round brackets, the square brackets and the squiggly brackets |
| [Better Comments](https://open-vsx.org/extension/aaron-bond/better-comments) | aaron-bond | Improve your code commenting by annotating with alert, informational, TODOs, and more |

## 🏷️ Categories



## 📄 License

### Extension Pack License
This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscodium/godot/LICENSE.md) for details.

### Third-Party Extension Licenses
**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension | Publisher | License | Description |
|-----------|-----------|---------|-------------|
| [Godot Tools](https://open-vsx.org/extension/geequlim/godot-tools) | geequlim | MIT | Complete Godot development support with LSP, GDScript syntax highlighting, and debugging |
| [GDScript](https://open-vsx.org/extension/jjkim/gdscript) | jjkim | MIT | Syntax highlighting and code completion for GDScript |
| [Godot Files](https://open-vsx.org/extension/alfish/godot-files) | alfish | MIT | Syntax highlighting for Godot files (.tres, .tscn, .godot, etc.) |
| [Godot Shaders](https://open-vsx.org/extension/arkii/godot-shaders) | arkii | MIT | Syntax highlighting and support for Godot shader files |
| [Godot Snippets](https://open-vsx.org/extension/razoric/gdscript-snippets) | razoric | MIT | Code snippets for GDScript and Godot development |
| [Error Lens](https://open-vsx.org/extension/usernamehw/errorlens) | usernamehw | MIT | Improve highlighting of errors, warnings and other language diagnostics |
| [TODO Highlight](https://open-vsx.org/extension/wayou/vscode-todo-highlight) | wayou | MIT | Highlight TODOs, FIXMEs, and other annotations in your code |
| [Rainbow Brackets](https://open-vsx.org/extension/2gua/rainbow-brackets) | 2gua | MIT | Provide rainbow colors for the round brackets, the square brackets and the squiggly brackets |
| [Better Comments](https://open-vsx.org/extension/aaron-bond/better-comments) | aaron-bond | MIT | Improve your code commenting by annotating with alert, informational, TODOs, and more |

### Disclaimer
- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 9
- **Required Extensions**: 2
- **Optional Extensions**: 7
- **Target IDE**: vscodium
- **Language Focus**: godot

---

*This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful godot development extensions.*
