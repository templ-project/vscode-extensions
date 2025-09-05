# Templ Project Python Extension Pack

Essential Python development environment for VSCode - comprehensive tooling for modern Python development, data science, and web applications

## 📦 What's Included

This extension pack includes **8 carefully selected extensions** to enhance your python development experience in vscode.

### ✅ Core Extensions (3)

These extensions are essential for python development:

- **[Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)** - Python language support with extension access points for IntelliSense (Pylance), Debugging (Python Debugger), linting, formatting, refactoring, unit tests, and more.
- **[Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter)** - Formatting support for Python files using the Black formatter.
- **[isort](https://marketplace.visualstudio.com/items?itemName=ms-python.isort)** - Import organization support for Python files using isort.

### 💡 Additional Extensions (5)

These extensions provide extra functionality and convenience:

- **[Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)** - Jupyter notebook support, interactive programming and computing that supports Intellisense, debugging and more.
- **[Pylint](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint)** - Linting support for Python files using Pylint.
- **[Flake8](https://marketplace.visualstudio.com/items?itemName=ms-python.flake8)** - Linting support for Python files using Flake8.
- **[autoDocstring - Python Docstring Generator](https://marketplace.visualstudio.com/items?itemName=njpwerner.autodocstring)** - Generates python docstrings automatically
- **[Python Test Explorer for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=littlefoxteam.vscode-python-test-adapter)** - Run your Python tests in the Sidebar of Visual Studio Code

## 🚀 Installation

### Method 1: Install from Marketplace

1. Open Vscode
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Templ Project Python Extension Pack"
4. Click "Install"

### Method 2: Install via Command Line

```bash
code --install-extension @templ-project/python-extension-pack
```

### Method 3: Install from VSIX

1. Download the latest `.vsix` file from [Releases](https://github.com/templ-project/vscode-extensions/releases)
2. Open Vscode
3. Run `Extensions: Install from VSIX...` command
4. Select the downloaded file

## ⚙️ Configuration

After installation, you may want to configure some settings for optimal python development:

### python.defaultInterpreterPath

```json
"python.defaultInterpreterPath": &quot;./venv/bin/python&quot;
```

> Default Python interpreter path (adjust for your environment)

### python.linting.enabled

```json
"python.linting.enabled": true
```

> Enable Python linting

### python.linting.pylintEnabled

```json
"python.linting.pylintEnabled": true
```

> Enable Pylint for comprehensive code analysis

### python.linting.flake8Enabled

```json
"python.linting.flake8Enabled": true
```

> Enable Flake8 for style guide enforcement

### python.formatting.provider

```json
"python.formatting.provider": &quot;black&quot;
```

> Use Black as the default Python formatter

### python.formatting.blackArgs

```json
"python.formatting.blackArgs": [
  &quot;--line-length&#x3D;88&quot;
]
```

> Black formatter arguments

### python.sortImports.args

```json
"python.sortImports.args": [
  &quot;--profile&#x3D;black&quot;
]
```

> Configure isort to be compatible with Black

### editor.formatOnSave

```json
"editor.formatOnSave": true
```

> Format Python files on save

### editor.codeActionsOnSave

```json
"editor.codeActionsOnSave": {
  &quot;source.organizeImports&quot;: true
}
```

> Organize imports on save

### editor.rulers

```json
"editor.rulers": [
  88
]
```

> Show ruler at Black&#x27;s default line length

### python.analysis.typeCheckingMode

```json
"python.analysis.typeCheckingMode": &quot;basic&quot;
```

> Pylance type checking mode (off, basic, strict)

### python.analysis.autoImportCompletions

```json
"python.analysis.autoImportCompletions": true
```

> Enable auto-import completions

### python.analysis.autoSearchPaths

```json
"python.analysis.autoSearchPaths": true
```

> Automatically search for imports

### python.analysis.diagnosticMode

```json
"python.analysis.diagnosticMode": &quot;workspace&quot;
```

> Analyze entire workspace for diagnostics

### python.testing.pytestEnabled

```json
"python.testing.pytestEnabled": true
```

> Enable pytest for testing

### python.testing.unittestEnabled

```json
"python.testing.unittestEnabled": false
```

> Disable unittest (using pytest instead)

### python.testing.pytestArgs

```json
"python.testing.pytestArgs": [
  &quot;.&quot;
]
```

> Pytest arguments

### python.testing.autoTestDiscoverOnSaveEnabled

```json
"python.testing.autoTestDiscoverOnSaveEnabled": true
```

> Automatically discover tests when saving

### jupyter.askForKernelRestart

```json
"jupyter.askForKernelRestart": false
```

> Don&#x27;t ask for kernel restart confirmation

### jupyter.interactiveWindow.textEditor.executeSelection

```json
"jupyter.interactiveWindow.textEditor.executeSelection": true
```

> Execute selected code in interactive window

### terminal.integrated.env.windows

```json
"terminal.integrated.env.windows": {
  &quot;PYTHONPATH&quot;: &quot;${workspaceFolder}&quot;
}
```

> Set PYTHONPATH in Windows terminal

### terminal.integrated.env.linux

```json
"terminal.integrated.env.linux": {
  &quot;PYTHONPATH&quot;: &quot;${workspaceFolder}&quot;
}
```

> Set PYTHONPATH in Linux terminal

### terminal.integrated.env.osx

```json
"terminal.integrated.env.osx": {
  &quot;PYTHONPATH&quot;: &quot;${workspaceFolder}&quot;
}
```

> Set PYTHONPATH in macOS terminal

## ⌨️ Recommended Keybindings

- **Run Python file in terminal**: `ctrl+shift+p`
- **Debug Python file**: `f5`
- **Create Python terminal**: `ctrl+shift+&#x60;`
- **Sort imports**: `ctrl+shift+i`
- **Format document**: `ctrl+shift+f`
- **Run all tests**: `ctrl+shift+t`
- **Run current file**: `ctrl+shift+r`
- **Execute selection in Jupyter**: `shift+enter`

## 📝 Extension Details

| Extension                                                                                                                                   | Publisher       | Description                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)                                                              | Microsoft       | Python language support with extension access points for IntelliSense (Pylance), Debugging (Python Debugger), linting, formatting, refactoring, unit tests, and more. |
| [Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter)                                            | Microsoft       | Formatting support for Python files using the Black formatter.                                                                                                        |
| [isort](https://marketplace.visualstudio.com/items?itemName=ms-python.isort)                                                                | Microsoft       | Import organization support for Python files using isort.                                                                                                             |
| [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)                                                           | Microsoft       | Jupyter notebook support, interactive programming and computing that supports Intellisense, debugging and more.                                                       |
| [Pylint](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint)                                                              | Microsoft       | Linting support for Python files using Pylint.                                                                                                                        |
| [Flake8](https://marketplace.visualstudio.com/items?itemName=ms-python.flake8)                                                              | Microsoft       | Linting support for Python files using Flake8.                                                                                                                        |
| [autoDocstring - Python Docstring Generator](https://marketplace.visualstudio.com/items?itemName=njpwerner.autodocstring)                   | Nils Werner     | Generates python docstrings automatically                                                                                                                             |
| [Python Test Explorer for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=littlefoxteam.vscode-python-test-adapter) | Little Fox Team | Run your Python tests in the Sidebar of Visual Studio Code                                                                                                            |

## 🏷️ Categories

## 📄 License

### Extension Pack License

This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscode/python/LICENSE.md) for details.

### Third-Party Extension Licenses

**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension                                                                                                                                   | Publisher       | License | Description                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)                                                              | Microsoft       | MIT     | Python language support with extension access points for IntelliSense (Pylance), Debugging (Python Debugger), linting, formatting, refactoring, unit tests, and more. |
| [Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter)                                            | Microsoft       | MIT     | Formatting support for Python files using the Black formatter.                                                                                                        |
| [isort](https://marketplace.visualstudio.com/items?itemName=ms-python.isort)                                                                | Microsoft       | MIT     | Import organization support for Python files using isort.                                                                                                             |
| [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)                                                           | Microsoft       | MIT     | Jupyter notebook support, interactive programming and computing that supports Intellisense, debugging and more.                                                       |
| [Pylint](https://marketplace.visualstudio.com/items?itemName=ms-python.pylint)                                                              | Microsoft       | MIT     | Linting support for Python files using Pylint.                                                                                                                        |
| [Flake8](https://marketplace.visualstudio.com/items?itemName=ms-python.flake8)                                                              | Microsoft       | MIT     | Linting support for Python files using Flake8.                                                                                                                        |
| [autoDocstring - Python Docstring Generator](https://marketplace.visualstudio.com/items?itemName=njpwerner.autodocstring)                   | Nils Werner     | MIT     | Generates python docstrings automatically                                                                                                                             |
| [Python Test Explorer for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=littlefoxteam.vscode-python-test-adapter) | Little Fox Team | MIT     | Run your Python tests in the Sidebar of Visual Studio Code                                                                                                            |

### Disclaimer

- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 8
- **Required Extensions**: 3
- **Optional Extensions**: 5
- **Target IDE**: vscode
- **Language Focus**: python

---

_This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful python development extensions._
