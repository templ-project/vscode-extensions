import { Collection } from '../../shared/types';
import { genericEssential } from '../vscode/generic-essential';
import { 
  pythonExtensionVSCodium,
  // pylanceVSCodium,
  // pythonDebuggerVSCodium,
  jupyterVSCodium,
  blackFormatterVSCodium,
  isortVSCodium,
  pylintVSCodium,
  flake8VSCodium,
  autoDocstringVSCodium,
  pythonTestExplorerVSCodium
} from '../../extensions/python';
import { python as pythonVSCode } from '../vscode/python';

export const python: Collection = {
  ...pythonVSCode,
  description: "Essential Python development extensions for VSCodium, including language support, debugging, formatting, and testing tools",
  
  required_extensions: [
    // Python-specific extensions
    pythonExtensionVSCodium,
    // pylanceVSCodium,
    // pythonDebuggerVSCodium,
    jupyterVSCodium,
    blackFormatterVSCodium,
    isortVSCodium,
    pylintVSCodium,
    flake8VSCodium,
    autoDocstringVSCodium,
    pythonTestExplorerVSCodium
  ],
  
  settings: {
    ...genericEssential.settings,
    // Python-specific settings
    'python.defaultInterpreterPath': {
      value: 'python',
      description: 'Default Python interpreter path',
      scope: 'workspace'
    },
    'python.formatting.provider': {
      value: 'black',
      description: 'Use Black as default Python formatter',
      scope: 'workspace'
    },
    'python.linting.enabled': {
      value: true,
      description: 'Enable Python linting',
      scope: 'workspace'
    },
    'python.linting.pylintEnabled': {
      value: true,
      description: 'Enable Pylint for Python linting',
      scope: 'workspace'
    },
    'python.linting.flake8Enabled': {
      value: true,
      description: 'Enable Flake8 for Python linting',
      scope: 'workspace'
    },
    'python.testing.pytestEnabled': {
      value: true,
      description: 'Enable pytest for Python testing',
      scope: 'workspace'
    },
    'python.testing.unittestEnabled': {
      value: false,
      description: 'Disable unittest in favor of pytest',
      scope: 'workspace'
    },
    'jupyter.askForKernelRestart': {
      value: false,
      description: 'Don\'t ask for kernel restart confirmation',
      scope: 'user'
    },
    'jupyter.interactiveWindow.textEditor.executeSelection': {
      value: true,
      description: 'Execute selection in interactive window',
      scope: 'user'
    }
  },
  
  keybindings: [
    ...genericEssential.keybindings,
    // Python-specific keybindings
    {
      key: 'ctrl+shift+p',
      command: 'python.execInTerminal',
      description: 'Execute Python file in terminal',
      when: 'editorLangId == python'
    },
    {
      key: 'f5',
      command: 'python.debugInTerminal',
      description: 'Debug Python file',
      when: 'editorLangId == python'
    },
    {
      key: 'shift+enter',
      command: 'jupyter.execSelectionInteractive',
      description: 'Execute selection in Jupyter interactive window',
      when: 'editorLangId == python'
    },
    {
      key: 'ctrl+shift+enter',
      command: 'jupyter.runallcellsabove.palette',
      description: 'Run all cells above',
      when: 'editorLangId == python'
    }
  ],
  
  snippets: [
    {
      name: "Python Main Function",
      prefix: "pymain",
      description: "Basic Python main function structure",
      body: [
        "def main():",
        "    \"\"\"Main function.\"\"\"",
        "    ${1:pass}",
        "",
        "",
        "if __name__ == \"__main__\":",
        "    main()"
      ]
    },
    {
      name: "Python Class",
      prefix: "pyclass",
      description: "Basic Python class with init",
      body: [
        "class ${1:ClassName}:",
        "    \"\"\"${2:Class description}.\"\"\"",
        "    ",
        "    def __init__(self, ${3:parameters}):",
        "        \"\"\"Initialize ${1:ClassName}.",
        "        ",
        "        Args:",
        "            ${4:parameter_description}",
        "        \"\"\"",
        "        ${5:pass}"
      ]
    }
  ],
  
  documentation: {
    setup_guide: `# Python Development Pack for VSCodium Setup

## Quick Start
1. Install Python 3.8+ on your system
2. Install all required extensions through this pack
3. Configure Python interpreter path
4. Set up virtual environment (recommended)

## Python Environment Setup
\`\`\`bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment (Windows)
.venv\\Scripts\\activate

# Activate virtual environment (macOS/Linux)
source .venv/bin/activate

# Install development dependencies
pip install black isort pylint flake8 pytest
\`\`\`

## Extensions Included
### Core Python Support
- **Python**: Official Python language support with IntelliSense and debugging
- **Pylance**: Advanced Python language server with type checking
- **Python Debugger**: Integrated debugging support for Python applications

### Code Quality & Formatting
- **Black Formatter**: Opinionated code formatting for consistent Python style
- **isort**: Import sorting and organization for cleaner code structure
- **Pylint**: Comprehensive Python code analysis and quality checking
- **Flake8**: Style guide enforcement and error detection

### Development Tools
- **Jupyter**: Interactive Python development with notebook support
- **autoDocstring**: Automatic docstring generation for Python functions and classes
- **Python Test Explorer**: Integrated test discovery and execution interface
- **Python DotENV**: Environment variable management for Python projects

## Configuration Tips
1. **Set Python Interpreter**: Ctrl+Shift+P > "Python: Select Interpreter"
2. **Configure Formatting**: Black is enabled by default for consistent code style
3. **Enable Linting**: Pylint and Flake8 are enabled for code quality checks
4. **Testing Setup**: pytest is configured as the default test framework`,

    troubleshooting: `# Python Development Troubleshooting

## Python Interpreter Issues
- **Problem**: "Python interpreter not found"
- **Solution**: Set interpreter path in VSCodium settings or use Command Palette

## Import Resolution Problems
- **Problem**: Imports not being resolved correctly
- **Solution**: Ensure Python path is correct and virtual environment is activated

## Linting Not Working
- **Problem**: Pylint or Flake8 not showing warnings
- **Solution**: 
  1. Install linters in your Python environment: \`pip install pylint flake8\`
  2. Check Python interpreter is correctly set
  3. Reload VSCodium window

## Jupyter Issues
- **Problem**: Jupyter kernels not detected
- **Solution**:
  1. Install Jupyter: \`pip install jupyter\`
  2. Select correct Python interpreter for Jupyter
  3. Restart VSCodium

## Debugging Problems
- **Problem**: Debugger not stopping at breakpoints
- **Solution**:
  1. Ensure Python debugger extension is enabled
  2. Check that the correct Python interpreter is selected
  3. Verify launch configuration in .vscode/launch.json

## Performance Issues
- **Problem**: VSCodium slow with large Python projects
- **Solution**:
  1. Exclude __pycache__ and .pyc files from search
  2. Use workspace-specific settings for large codebases
  3. Consider disabling real-time linting for very large files`
  }
};
