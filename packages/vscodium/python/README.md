# Templ Project Python Extension Pack

Essential Python development extensions for VSCodium, including language support, debugging, formatting, and testing tools

## 📦 What's Included

This extension pack includes **13 carefully selected extensions** to enhance your python development experience in vscodium.

### ✅ Core Extensions (8)

These extensions are essential for python development:

- **[Python](https://open-vsx.org/extension/ms-python/python)** - Python language support with extension access points for IntelliSense (Pylance), Debugging (Python Debugger), linting, formatting, refactoring, unit tests, and more.
- **[Jupyter](https://open-vsx.org/extension/ms-toolsai/jupyter)** - Jupyter notebook support, interactive programming and computing that supports Intellisense, debugging and more.
- **[Black Formatter](https://open-vsx.org/extension/ms-python/black-formatter)** - Formatting support for Python files using the Black formatter.
- **[isort](https://open-vsx.org/extension/ms-python/isort)** - Import organization support for Python files using isort.
- **[Pylint](https://open-vsx.org/extension/ms-python/pylint)** - Linting support for Python files using Pylint.
- **[Flake8](https://open-vsx.org/extension/ms-python/flake8)** - Linting support for Python files using Flake8.
- **[autoDocstring - Python Docstring Generator](https://open-vsx.org/extension/njpwerner/autodocstring)** - Generates python docstrings automatically
- **[Python Test Explorer for Visual Studio Code](https://open-vsx.org/extension/littlefoxteam/vscode-python-test-adapter)** - Run your Python tests in the Sidebar of Visual Studio Code

### 💡 Additional Extensions (5)

These extensions provide extra functionality and convenience:

- **[Jupyter](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-toolsai.jupyter)** - Jupyter notebook support, interactive programming and computing that supports Intellisense, debugging and more.
- **[Pylint](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-python.pylint)** - Linting support for Python files using Pylint.
- **[Flake8](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-python.flake8)** - Linting support for Python files using Flake8.
- **[autoDocstring - Python Docstring Generator](https://marketplace.visualstudio.com/items?itemName&#x3D;njpwerner.autodocstring)** - Generates python docstrings automatically
- **[Python Test Explorer for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName&#x3D;littlefoxteam.vscode-python-test-adapter)** - Run your Python tests in the Sidebar of Visual Studio Code

## 🚀 Installation

### Method 1: Install from Marketplace
1. Open Vscodium
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Templ Project Python Extension Pack"
4. Click "Install"

### Method 2: Install via Command Line
```bash
codium --install-extension @templ-project/python-extension-pack
```

### Method 3: Install from VSIX
1. Download the latest `.vsix` file from [Releases](https://github.com/templ-project/vscode-extensions/releases)
2. Open Vscodium
3. Run `Extensions: Install from VSIX...` command
4. Select the downloaded file

## ⚙️ Configuration

After installation, you may want to configure some settings for optimal python development:

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

### python.defaultInterpreterPath
```json
{
  "python.defaultInterpreterPath": "python"
}
```
> Default Python interpreter path

### python.formatting.provider
```json
{
  "python.formatting.provider": "black"
}
```
> Use Black as default Python formatter

### python.linting.enabled
```json
{
  "python.linting.enabled": true
}
```
> Enable Python linting

### python.linting.pylintEnabled
```json
{
  "python.linting.pylintEnabled": true
}
```
> Enable Pylint for Python linting

### python.linting.flake8Enabled
```json
{
  "python.linting.flake8Enabled": true
}
```
> Enable Flake8 for Python linting

### python.testing.pytestEnabled
```json
{
  "python.testing.pytestEnabled": true
}
```
> Enable pytest for Python testing

### python.testing.unittestEnabled
```json
{
  "python.testing.unittestEnabled": false
}
```
> Disable unittest in favor of pytest

### jupyter.askForKernelRestart
```json
{
  "jupyter.askForKernelRestart": false
}
```
> Don&#x27;t ask for kernel restart confirmation

### jupyter.interactiveWindow.textEditor.executeSelection
```json
{
  "jupyter.interactiveWindow.textEditor.executeSelection": true
}
```
> Execute selection in interactive window


## ⌨️ Recommended Keybindings

- **Toggle bookmark**: `ctrl+shift+b`
- **Jump to next bookmark**: `ctrl+shift+j`
- **Jump to previous bookmark**: `ctrl+shift+k`
- **Execute Python file in terminal**: `ctrl+shift+p`
- **Debug Python file**: `f5`
- **Execute selection in Jupyter interactive window**: `shift+enter`
- **Run all cells above**: `ctrl+shift+enter`

## 📝 Extension Details

| Extension | Publisher | Description |
|-----------|-----------|-------------|
| [Python](https://open-vsx.org/extension/ms-python/python) | Microsoft | Python language support with extension access points for IntelliSense (Pylance), Debugging (Python Debugger), linting, formatting, refactoring, unit tests, and more. |
| [Jupyter](https://open-vsx.org/extension/ms-toolsai/jupyter) | Microsoft | Jupyter notebook support, interactive programming and computing that supports Intellisense, debugging and more. |
| [Black Formatter](https://open-vsx.org/extension/ms-python/black-formatter) | Microsoft | Formatting support for Python files using the Black formatter. |
| [isort](https://open-vsx.org/extension/ms-python/isort) | Microsoft | Import organization support for Python files using isort. |
| [Pylint](https://open-vsx.org/extension/ms-python/pylint) | Microsoft | Linting support for Python files using Pylint. |
| [Flake8](https://open-vsx.org/extension/ms-python/flake8) | Microsoft | Linting support for Python files using Flake8. |
| [autoDocstring - Python Docstring Generator](https://open-vsx.org/extension/njpwerner/autodocstring) | Nils Werner | Generates python docstrings automatically |
| [Python Test Explorer for Visual Studio Code](https://open-vsx.org/extension/littlefoxteam/vscode-python-test-adapter) | Little Fox Team | Run your Python tests in the Sidebar of Visual Studio Code |
| [Jupyter](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-toolsai.jupyter) | Microsoft | Jupyter notebook support, interactive programming and computing that supports Intellisense, debugging and more. |
| [Pylint](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-python.pylint) | Microsoft | Linting support for Python files using Pylint. |
| [Flake8](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-python.flake8) | Microsoft | Linting support for Python files using Flake8. |
| [autoDocstring - Python Docstring Generator](https://marketplace.visualstudio.com/items?itemName&#x3D;njpwerner.autodocstring) | Nils Werner | Generates python docstrings automatically |
| [Python Test Explorer for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName&#x3D;littlefoxteam.vscode-python-test-adapter) | Little Fox Team | Run your Python tests in the Sidebar of Visual Studio Code |

## 🏷️ Categories



## 📄 License

### Extension Pack License
This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscodium/python/LICENSE.md) for details.

### Third-Party Extension Licenses
**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension | Publisher | License | Description |
|-----------|-----------|---------|-------------|
| [Python](https://open-vsx.org/extension/ms-python/python) | Microsoft | MIT | Python language support with extension access points for IntelliSense (Pylance), Debugging (Python Debugger), linting, formatting, refactoring, unit tests, and more. |
| [Jupyter](https://open-vsx.org/extension/ms-toolsai/jupyter) | Microsoft | MIT | Jupyter notebook support, interactive programming and computing that supports Intellisense, debugging and more. |
| [Black Formatter](https://open-vsx.org/extension/ms-python/black-formatter) | Microsoft | MIT | Formatting support for Python files using the Black formatter. |
| [isort](https://open-vsx.org/extension/ms-python/isort) | Microsoft | MIT | Import organization support for Python files using isort. |
| [Pylint](https://open-vsx.org/extension/ms-python/pylint) | Microsoft | MIT | Linting support for Python files using Pylint. |
| [Flake8](https://open-vsx.org/extension/ms-python/flake8) | Microsoft | MIT | Linting support for Python files using Flake8. |
| [autoDocstring - Python Docstring Generator](https://open-vsx.org/extension/njpwerner/autodocstring) | Nils Werner | MIT | Generates python docstrings automatically |
| [Python Test Explorer for Visual Studio Code](https://open-vsx.org/extension/littlefoxteam/vscode-python-test-adapter) | Little Fox Team | MIT | Run your Python tests in the Sidebar of Visual Studio Code |
| [Jupyter](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-toolsai.jupyter) | Microsoft | MIT | Jupyter notebook support, interactive programming and computing that supports Intellisense, debugging and more. |
| [Pylint](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-python.pylint) | Microsoft | MIT | Linting support for Python files using Pylint. |
| [Flake8](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-python.flake8) | Microsoft | MIT | Linting support for Python files using Flake8. |
| [autoDocstring - Python Docstring Generator](https://marketplace.visualstudio.com/items?itemName&#x3D;njpwerner.autodocstring) | Nils Werner | MIT | Generates python docstrings automatically |
| [Python Test Explorer for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName&#x3D;littlefoxteam.vscode-python-test-adapter) | Little Fox Team | MIT | Run your Python tests in the Sidebar of Visual Studio Code |

### Disclaimer
- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 13
- **Required Extensions**: 8
- **Optional Extensions**: 5
- **Target IDE**: vscodium
- **Language Focus**: python

---

*This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful python development extensions.*
