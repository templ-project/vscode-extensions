# Templ Project Cpp Extension Pack

Essential C/C++ development environment for VSCodium - modern tooling with clang-based language server, CMake/XMake build systems, and advanced debugging

## 📦 What's Included

This extension pack includes **9 carefully selected extensions** to enhance your cpp development experience in vscodium.

### ✅ Core Extensions (4)

These extensions are essential for cpp development:

- **[clangd](https://open-vsx.org/extension/llvm-vs-code-extensions/vscode-clangd)** - C/C++ completion, navigation, and insights
- **[CMake](https://open-vsx.org/extension/twxs/cmake)** - CMake language support for Visual Studio Code
- **[Clang-Format](https://open-vsx.org/extension/xaver/clang-format)** - Use Clang-Format in Visual Studio Code
- **[Error Lens](https://open-vsx.org/extension/usernamehw/errorlens)** - Improve highlighting of errors, warnings and other language diagnostics

### 💡 Additional Extensions (5)

These extensions provide extra functionality and convenience:

- **[CMake Tools](https://open-vsx.org/extension/ms-vscode/cmake-tools)** - Extended CMake support in Visual Studio Code
- **[XMake](https://open-vsx.org/extension/tboox/xmake-vscode)** - Extended XMake support in Visual Studio Code
- **[Better C++ Syntax](https://open-vsx.org/extension/jeff-hykin/better-cpp-syntax)** - The bleeding edge of the C++ syntax
- **[Doxygen Documentation Generator](https://open-vsx.org/extension/cschlosser/doxdocgen)** - Let me generate Doxygen documentation from your source code for you
- **[Native Debug](https://open-vsx.org/extension/webfreak/debug)** - GDB, LLDB &amp; Mago-MI Debugger support for VSCode

## 🚀 Installation

### Method 1: Install from Marketplace
1. Open Vscodium
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Templ Project Cpp Extension Pack"
4. Click "Install"

### Method 2: Install via Command Line
```bash
codium --install-extension @templ-project/cpp-extension-pack
```

### Method 3: Install from VSIX
1. Download the latest `.vsix` file from [Releases](https://github.com/templ-project/vscode-extensions/releases)
2. Open Vscodium
3. Run `Extensions: Install from VSIX...` command
4. Select the downloaded file

## ⚙️ Configuration

After installation, you may want to configure some settings for optimal cpp development:

### clangd.path
```json
"clangd.path": &quot;clangd&quot;
```
> Path to clangd executable (use system PATH or specify absolute path)

### clangd.arguments
```json
"clangd.arguments": [
  &quot;--header-insertion&#x3D;iwyu&quot;,
  &quot;--completion-style&#x3D;detailed&quot;,
  &quot;--function-arg-placeholders&quot;,
  &quot;--fallback-style&#x3D;llvm&quot;
]
```
> Additional arguments passed to clangd language server

### clangd.semanticHighlighting
```json
"clangd.semanticHighlighting": true
```
> Enable semantic highlighting for better code visualization

### cmake.configureOnOpen
```json
"cmake.configureOnOpen": false
```
> Automatically configure CMake project when opened

### cmake.buildDirectory
```json
"cmake.buildDirectory": &quot;${workspaceFolder}/build&quot;
```
> Default CMake build directory

### cmake.generator
```json
"cmake.generator": &quot;Ninja&quot;
```
> Default CMake generator (Ninja, Unix Makefiles, etc.)

### files.associations
```json
"files.associations": {
  &quot;*.h&quot;: &quot;cpp&quot;,
  &quot;*.hpp&quot;: &quot;cpp&quot;,
  &quot;*.cpp&quot;: &quot;cpp&quot;,
  &quot;*.cc&quot;: &quot;cpp&quot;,
  &quot;*.cxx&quot;: &quot;cpp&quot;,
  &quot;*.c++&quot;: &quot;cpp&quot;,
  &quot;*.C&quot;: &quot;cpp&quot;,
  &quot;*.tpp&quot;: &quot;cpp&quot;,
  &quot;*.ipp&quot;: &quot;cpp&quot;
}
```
> File associations for C/C++ files

### clang-format.executable
```json
"clang-format.executable": &quot;clang-format&quot;
```
> Path to clang-format executable

### clang-format.style
```json
"clang-format.style": &quot;llvm&quot;
```
> Clang-format style (llvm, google, chromium, mozilla, webkit, or file)

### [cpp]
```json
"[cpp]": {
  &quot;editor.defaultFormatter&quot;: &quot;xaver.clang-format&quot;,
  &quot;editor.formatOnSave&quot;: true,
  &quot;editor.formatOnType&quot;: true
}
```
> C++ specific editor settings

### [c]
```json
"[c]": {
  &quot;editor.defaultFormatter&quot;: &quot;xaver.clang-format&quot;,
  &quot;editor.formatOnSave&quot;: true,
  &quot;editor.formatOnType&quot;: true
}
```
> C specific editor settings

### editor.suggest.insertMode
```json
"editor.suggest.insertMode": &quot;replace&quot;
```
> How code completion should behave when inserting text

### editor.semanticTokenColorCustomizations
```json
"editor.semanticTokenColorCustomizations": {
  &quot;enabled&quot;: true
}
```
> Enable semantic token color customizations


## ⌨️ Recommended Keybindings

- **Format current file with clang-format**: `ctrl+shift+f`
- **Switch between header and source file**: `ctrl+shift+i`
- **Go to definition**: `f12`
- **Find all references**: `ctrl+f12`
- **Go to symbol in file**: `ctrl+shift+o`

## 📝 Extension Details

| Extension | Publisher | Description |
|-----------|-----------|-------------|
| [clangd](https://open-vsx.org/extension/llvm-vs-code-extensions/vscode-clangd) | LLVM Extensions | C/C++ completion, navigation, and insights |
| [CMake](https://open-vsx.org/extension/twxs/cmake) | twxs | CMake language support for Visual Studio Code |
| [Clang-Format](https://open-vsx.org/extension/xaver/clang-format) | xaver | Use Clang-Format in Visual Studio Code |
| [Error Lens](https://open-vsx.org/extension/usernamehw/errorlens) | Alexander | Improve highlighting of errors, warnings and other language diagnostics |
| [CMake Tools](https://open-vsx.org/extension/ms-vscode/cmake-tools) | Microsoft | Extended CMake support in Visual Studio Code |
| [XMake](https://open-vsx.org/extension/tboox/xmake-vscode) | tboox | Extended XMake support in Visual Studio Code |
| [Better C++ Syntax](https://open-vsx.org/extension/jeff-hykin/better-cpp-syntax) | Jeff Hykin | The bleeding edge of the C++ syntax |
| [Doxygen Documentation Generator](https://open-vsx.org/extension/cschlosser/doxdocgen) | Christoph Schlosser | Let me generate Doxygen documentation from your source code for you |
| [Native Debug](https://open-vsx.org/extension/webfreak/debug) | WebFreak | GDB, LLDB &amp; Mago-MI Debugger support for VSCode |

## 🏷️ Categories



## 📄 License

### Extension Pack License
This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscodium/cpp/LICENSE.md) for details.

### Third-Party Extension Licenses
**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension | Publisher | License | Description |
|-----------|-----------|---------|-------------|
| [clangd](https://open-vsx.org/extension/llvm-vs-code-extensions/vscode-clangd) | LLVM Extensions | Apache-2.0 | C/C++ completion, navigation, and insights |
| [CMake](https://open-vsx.org/extension/twxs/cmake) | twxs | MIT | CMake language support for Visual Studio Code |
| [Clang-Format](https://open-vsx.org/extension/xaver/clang-format) | xaver | MIT | Use Clang-Format in Visual Studio Code |
| [Error Lens](https://open-vsx.org/extension/usernamehw/errorlens) | Alexander | MIT | Improve highlighting of errors, warnings and other language diagnostics |
| [CMake Tools](https://open-vsx.org/extension/ms-vscode/cmake-tools) | Microsoft | MIT | Extended CMake support in Visual Studio Code |
| [XMake](https://open-vsx.org/extension/tboox/xmake-vscode) | tboox | Apache-2.0 | Extended XMake support in Visual Studio Code |
| [Better C++ Syntax](https://open-vsx.org/extension/jeff-hykin/better-cpp-syntax) | Jeff Hykin | MIT | The bleeding edge of the C++ syntax |
| [Doxygen Documentation Generator](https://open-vsx.org/extension/cschlosser/doxdocgen) | Christoph Schlosser | MIT | Let me generate Doxygen documentation from your source code for you |
| [Native Debug](https://open-vsx.org/extension/webfreak/debug) | WebFreak | Unlicense | GDB, LLDB &amp; Mago-MI Debugger support for VSCode |

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
- **Target IDE**: vscodium
- **Language Focus**: cpp

---

*This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful cpp development extensions.*
