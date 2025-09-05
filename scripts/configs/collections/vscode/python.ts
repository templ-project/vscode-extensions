import {
  autoDocstring,
  blackFormatter,
  flake8,
  isort,
  // pylance,
  // pythonDebugger,
  jupyter,
  pylint,
  pythonExtension,
  pythonTestExplorer,
} from '../../extensions/python';
import { Collection } from '../../shared/types';

export const python: Collection = {
  description:
    'Essential Python development environment for VSCode - comprehensive tooling for modern Python development, data science, and web applications',
  tags: ['python', 'data-science', 'web', 'development', 'testing', 'jupyter', 'machine-learning'],

  required_extensions: [
    pythonExtension,
    // pylance,
    // pythonDebugger,
    blackFormatter,
    isort,
  ],

  optional_extensions: [jupyter, pylint, flake8, autoDocstring, pythonTestExplorer],

  settings: {
    // Python Language Settings
    'python.defaultInterpreterPath': {
      value: './venv/bin/python',
      description: 'Default Python interpreter path (adjust for your environment)',
      scope: 'workspace',
    },
    'python.linting.enabled': {
      value: true,
      description: 'Enable Python linting',
      scope: 'workspace',
    },
    'python.linting.pylintEnabled': {
      value: true,
      description: 'Enable Pylint for comprehensive code analysis',
      scope: 'workspace',
    },
    'python.linting.flake8Enabled': {
      value: true,
      description: 'Enable Flake8 for style guide enforcement',
      scope: 'workspace',
    },
    'python.formatting.provider': {
      value: 'black',
      description: 'Use Black as the default Python formatter',
      scope: 'workspace',
    },
    'python.formatting.blackArgs': {
      value: ['--line-length=88'],
      description: 'Black formatter arguments',
      scope: 'workspace',
    },
    'python.sortImports.args': {
      value: ['--profile=black'],
      description: 'Configure isort to be compatible with Black',
      scope: 'workspace',
    },

    // Editor Settings for Python
    'editor.formatOnSave': {
      value: true,
      description: 'Format Python files on save',
      scope: 'workspace',
    },
    'editor.codeActionsOnSave': {
      value: {
        'source.organizeImports': true,
      },
      description: 'Organize imports on save',
      scope: 'workspace',
    },
    'editor.rulers': {
      value: [88],
      description: "Show ruler at Black's default line length",
      scope: 'workspace',
    },

    // Pylance Settings
    'python.analysis.typeCheckingMode': {
      value: 'basic',
      description: 'Pylance type checking mode (off, basic, strict)',
      scope: 'workspace',
    },
    'python.analysis.autoImportCompletions': {
      value: true,
      description: 'Enable auto-import completions',
      scope: 'workspace',
    },
    'python.analysis.autoSearchPaths': {
      value: true,
      description: 'Automatically search for imports',
      scope: 'workspace',
    },
    'python.analysis.diagnosticMode': {
      value: 'workspace',
      description: 'Analyze entire workspace for diagnostics',
      scope: 'workspace',
    },

    // Testing Settings
    'python.testing.pytestEnabled': {
      value: true,
      description: 'Enable pytest for testing',
      scope: 'workspace',
    },
    'python.testing.unittestEnabled': {
      value: false,
      description: 'Disable unittest (using pytest instead)',
      scope: 'workspace',
    },
    'python.testing.pytestArgs': {
      value: ['.'],
      description: 'Pytest arguments',
      scope: 'workspace',
    },
    'python.testing.autoTestDiscoverOnSaveEnabled': {
      value: true,
      description: 'Automatically discover tests when saving',
      scope: 'workspace',
    },

    // Jupyter Settings
    'jupyter.askForKernelRestart': {
      value: false,
      description: "Don't ask for kernel restart confirmation",
      scope: 'user',
    },
    'jupyter.interactiveWindow.textEditor.executeSelection': {
      value: true,
      description: 'Execute selected code in interactive window',
      scope: 'user',
    },

    // Terminal Settings
    'terminal.integrated.env.windows': {
      value: {
        PYTHONPATH: '${workspaceFolder}',
      },
      description: 'Set PYTHONPATH in Windows terminal',
      scope: 'workspace',
    },
    'terminal.integrated.env.linux': {
      value: {
        PYTHONPATH: '${workspaceFolder}',
      },
      description: 'Set PYTHONPATH in Linux terminal',
      scope: 'workspace',
    },
    'terminal.integrated.env.osx': {
      value: {
        PYTHONPATH: '${workspaceFolder}',
      },
      description: 'Set PYTHONPATH in macOS terminal',
      scope: 'workspace',
    },
  },

  keybindings: [
    {
      key: 'ctrl+shift+p',
      command: 'python.execInTerminal',
      description: 'Run Python file in terminal',
      when: 'editorTextFocus && editorLangId == python',
    },
    {
      key: 'f5',
      command: 'python.debugInTerminal',
      description: 'Debug Python file',
      when: 'editorTextFocus && editorLangId == python',
    },
    {
      key: 'ctrl+shift+`',
      command: 'python.createTerminal',
      description: 'Create Python terminal',
      when: 'editorTextFocus && editorLangId == python',
    },
    {
      key: 'ctrl+shift+i',
      command: 'python.sortImports',
      description: 'Sort imports',
      when: 'editorTextFocus && editorLangId == python',
    },
    {
      key: 'ctrl+shift+f',
      command: 'editor.action.formatDocument',
      description: 'Format document',
      when: 'editorTextFocus && editorLangId == python',
    },
    {
      key: 'ctrl+shift+t',
      command: 'python.runAllTests',
      description: 'Run all tests',
      when: 'editorTextFocus && editorLangId == python',
    },
    {
      key: 'ctrl+shift+r',
      command: 'python.runCurrentFile',
      description: 'Run current file',
      when: 'editorTextFocus && editorLangId == python',
    },
    {
      key: 'shift+enter',
      command: 'jupyter.execSelectionInteractive',
      description: 'Execute selection in Jupyter',
      when: 'editorTextFocus && editorLangId == python',
    },
  ],

  snippets: [
    {
      name: 'Function Definition',
      prefix: 'fn',
      description: 'Python function with docstring',
      body: [
        'def ${1:function_name}(${2:parameters}):',
        '    """${3:Description of the function}',
        '    ',
        '    Args:',
        '        ${4:parameter_name}: ${5:Description}',
        '    ',
        '    Returns:',
        '        ${6:Return description}',
        '    """',
        '    ${7:pass}',
      ],
    },
    {
      name: 'Class Definition',
      prefix: 'cl',
      description: 'Python class with docstring',
      body: [
        'class ${1:ClassName}:',
        '    """${2:Class description}',
        '    ',
        '    Attributes:',
        '        ${3:attribute_name}: ${4:Description}',
        '    """',
        '    ',
        '    def __init__(self, ${5:parameters}):',
        '        """Initialize ${1:ClassName}.',
        '        ',
        '        Args:',
        '            ${6:parameter_name}: ${7:Description}',
        '        """',
        '        ${8:pass}',
      ],
    },
    {
      name: 'Method Definition',
      prefix: 'cm',
      description: 'Python class method with docstring',
      body: [
        'def ${1:method_name}(self, ${2:parameters}):',
        '    """${3:Method description}',
        '    ',
        '    Args:',
        '        ${4:parameter_name}: ${5:Description}',
        '    ',
        '    Returns:',
        '        ${6:Return description}',
        '    """',
        '    ${7:pass}',
      ],
    },
    {
      name: 'If Statement',
      prefix: 'if',
      description: 'Python if statement',
      body: ['if ${1:condition}:', '    ${2:pass}'],
    },
    {
      name: 'If-Else Statement',
      prefix: 'ifel',
      description: 'Python if-else statement',
      body: ['if ${1:condition}:', '    ${2:pass}', 'else:', '    ${3:pass}'],
    },
    {
      name: 'For Loop',
      prefix: 'for',
      description: 'Python for loop',
      body: ['for ${1:item} in ${2:iterable}:', '    ${3:pass}'],
    },
    {
      name: 'While Loop',
      prefix: 'whl',
      description: 'Python while loop',
      body: ['while ${1:condition}:', '    ${2:pass}'],
    },
    {
      name: 'Try-Except',
      prefix: 'try',
      description: 'Python try-except block',
      body: ['try:', '    ${1:pass}', 'except ${2:Exception} as ${3:e}:', '    ${4:pass}'],
    },
    {
      name: 'Import Statement',
      prefix: 'im',
      description: 'Python import statement',
      body: ['import ${1:module}'],
    },
    {
      name: 'From Import',
      prefix: 'fim',
      description: 'Python from import statement',
      body: ['from ${1:module} import ${2:name}'],
    },
    {
      name: 'Print Statement',
      prefix: 'log',
      description: 'Python print statement',
      body: ['print(${1:variable})'],
    },
    {
      name: 'Debug Print',
      prefix: 'debug',
      description: 'Python debug print with f-string',
      body: ['print(f"DEBUG: ${1:variable} = {${1:variable}}")'],
    },
    {
      name: 'Test Function',
      prefix: 'test',
      description: 'Python test function with AAA pattern',
      body: [
        'def test_${1:function_name}():',
        '    """Test ${2:description}.',
        '    """',
        '    # Arrange',
        '    ${3:setup}',
        '    ',
        '    # Act',
        '    ${4:action}',
        '    ',
        '    # Assert',
        '    assert ${5:condition}',
      ],
    },
    {
      name: 'Main Guard',
      prefix: 'main',
      description: 'Python main guard',
      body: ['if __name__ == "__main__":', '    ${1:main()}'],
    },
    {
      name: 'TODO Comment',
      prefix: 'todo',
      description: 'Python TODO comment',
      body: ['# TODO: ${1:description}'],
    },
  ],

  documentation: {
    setup_guide: `# Python Extension Pack Setup (VSCode)

## Quick Start
1. Install Python from https://python.org/downloads/
2. Install all required extensions from VSCode Marketplace
3. Set up your Python virtual environment
4. Configure your Python interpreter
5. Start developing with comprehensive Python tooling!

## Extensions Included

### Core Extensions (5)
Essential for Python development:

- **Python**: Official Python language support with comprehensive tooling
- **Pylance**: Fast, feature-rich Python language server
- **Python Debugger**: Advanced debugging capabilities
- **Black Formatter**: Consistent code formatting
- **isort**: Import organization and sorting

### Optional Extensions (6)
Additional functionality and convenience:

- **Jupyter**: Interactive notebooks for data science and experimentation
- **Pylint**: Comprehensive code analysis and quality checking
- **Flake8**: Style guide enforcement and error detection
- **autoDocstring**: Automatic docstring generation
- **Python Test Explorer**: Visual test runner and management
- **DotENV**: Environment variable file support

## Prerequisites

### Install Python
Download and install Python from https://python.org/downloads/

### Verify Installation
\`\`\`bash
python --version
pip --version
\`\`\`

### Create Virtual Environment
\`\`\`bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\\Scripts\\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
\`\`\`

## Project Setup

### Project Structure
\`\`\`
your-project/
├── venv/                   # Virtual environment
├── src/                    # Source code
│   ├── __init__.py
│   └── main.py
├── tests/                  # Test files
│   ├── __init__.py
│   └── test_main.py
├── docs/                   # Documentation
├── requirements.txt        # Dependencies
├── requirements-dev.txt    # Development dependencies
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── README.md              # Project documentation
└── pyproject.toml         # Project configuration
\`\`\`

### Sample pyproject.toml
\`\`\`toml
[build-system]
requires = ["setuptools>=45", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "your-project"
version = "0.1.0"
description = "Your project description"
authors = [{name = "Your Name", email = "your.email@example.com"}]
dependencies = []

[project.optional-dependencies]
dev = [
    "pytest>=7.0",
    "black>=22.0",
    "isort>=5.0",
    "pylint>=2.0",
    "flake8>=4.0",
]

[tool.black]
line-length = 88
target-version = ['py39']

[tool.isort]
profile = "black"
line_length = 88

[tool.pylint.messages_control]
disable = ["C0114", "C0116", "R0903"]

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
python_functions = ["test_*"]
\`\`\`

### Sample requirements.txt
\`\`\`
# Core dependencies
requests>=2.28.0
click>=8.0.0

# Development dependencies (include with -r requirements-dev.txt)
\`\`\`

### Sample requirements-dev.txt
\`\`\`
-r requirements.txt

# Testing
pytest>=7.0.0
pytest-cov>=4.0.0

# Code Quality
black>=22.0.0
isort>=5.0.0
pylint>=2.15.0
flake8>=5.0.0

# Documentation
sphinx>=5.0.0
\`\`\`

## Configuration

### Python Interpreter
1. Open Command Palette (Ctrl+Shift+P)
2. Type "Python: Select Interpreter"
3. Choose your virtual environment's Python interpreter

### Environment Variables (.env)
\`\`\`
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
SECRET_KEY=your-secret-key
\`\`\`

## Usage Tips

### Keyboard Shortcuts
- **Ctrl+Shift+P**: Run Python file in terminal
- **F5**: Debug Python file
- **Ctrl+Shift+\`**: Create Python terminal
- **Ctrl+Shift+I**: Sort imports
- **Ctrl+Shift+F**: Format document
- **Ctrl+Shift+T**: Run all tests
- **Shift+Enter**: Execute selection in Jupyter

### Code Quality
- Black formats code automatically on save
- isort organizes imports on save
- Pylint provides comprehensive code analysis
- Flake8 enforces PEP 8 style guide

### Testing
- pytest discovers and runs tests automatically
- Test Explorer provides visual test management
- Coverage reports help identify untested code

### Debugging
- Set breakpoints by clicking line numbers
- Inspect variables in the debug console
- Step through code execution
- Debug configurations in launch.json

## Best Practices

### Code Organization
- Use virtual environments for dependency isolation
- Follow PEP 8 style guidelines
- Write comprehensive docstrings
- Organize code into modules and packages

### Testing
- Write tests for all public functions
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)
- Aim for high test coverage

### Documentation
- Use type hints for better code clarity
- Write clear docstrings with examples
- Keep README files up to date
- Document API endpoints and usage

### Version Control
- Use .gitignore for Python projects
- Commit requirements.txt changes
- Don't commit virtual environments
- Use meaningful commit messages`,

    troubleshooting: `# Common Python Issues and Solutions (VSCode)

## Python Extension Issues

### Python interpreter not found
- **Solution**: Select correct interpreter via Command Palette > "Python: Select Interpreter"
- **Alternative**: Set python.defaultInterpreterPath in settings
- **Check**: Verify Python is installed and in PATH

### IntelliSense not working
- **Solution**: Restart Pylance language server: Command Palette > "Python: Restart Language Server"
- **Check**: Ensure Pylance extension is enabled
- **Verify**: Python interpreter is correctly selected

## Virtual Environment Issues

### Virtual environment not activating
- **Windows**: Use \`venv\\Scripts\\activate\`
- **macOS/Linux**: Use \`source venv/bin/activate\`
- **PowerShell**: Use \`venv\\Scripts\\Activate.ps1\`
- **Check**: Execution policy on Windows

### Dependencies not found
- **Solution**: Ensure virtual environment is activated
- **Verify**: pip list shows installed packages
- **Fix**: Install requirements: \`pip install -r requirements.txt\`

## Formatting and Linting Issues

### Black not formatting on save
- **Solution**: Enable "editor.formatOnSave" in settings
- **Check**: Black formatter extension is installed
- **Verify**: Python formatter is set to "black"

### Import sorting not working
- **Solution**: Enable "source.organizeImports" in codeActionsOnSave
- **Check**: isort extension is installed and configured
- **Verify**: isort profile is set to "black" for compatibility

### Pylint showing too many warnings
- **Solution**: Configure pylint in pyproject.toml or .pylintrc
- **Disable**: Specific checks that don't apply to your project
- **Adjust**: Pylint severity levels in settings

## Testing Issues

### Tests not discovered
- **Solution**: Check pytest configuration in pyproject.toml
- **Verify**: Test files follow naming convention (test_*.py)
- **Ensure**: Tests are in correct directory structure
- **Check**: Python path includes source directories

### Test runner not working
- **Solution**: Select correct test framework in settings
- **Enable**: pytest and disable unittest if using pytest
- **Check**: Test discovery settings are correct

## Debugging Issues

### Debugger not stopping at breakpoints
- **Solution**: Ensure code is not optimized (-O flag)
- **Check**: Breakpoints are set on executable lines
- **Verify**: Correct Python interpreter is being used
- **Try**: Restart debugging session

### Variables not showing in debug console
- **Solution**: Check debug configuration in launch.json
- **Ensure**: "justMyCode": false for external library debugging
- **Verify**: Debug console is in correct scope

## Jupyter Issues

### Jupyter kernel not starting
- **Solution**: Install ipykernel in your virtual environment
- **Command**: \`pip install ipykernel\`
- **Register**: \`python -m ipykernel install --user --name=venv\`
- **Restart**: VSCode and select correct kernel

### Jupyter cells not executing
- **Solution**: Restart Jupyter kernel
- **Check**: Python interpreter matches Jupyter kernel
- **Verify**: Required packages are installed in environment

## Import and Module Issues

### Module not found errors
- **Solution**: Add project root to PYTHONPATH
- **Check**: __init__.py files are present in packages
- **Verify**: Relative imports are correctly formatted
- **Try**: Absolute imports from project root

### Circular import errors
- **Solution**: Refactor code to avoid circular dependencies
- **Use**: Late imports or import inside functions
- **Consider**: Dependency inversion principle

## Performance Issues

### Slow IntelliSense
- **Solution**: Reduce analysis scope in Pylance settings
- **Disable**: Type checking for large codebases
- **Exclude**: Large directories from analysis
- **Check**: Available system memory

### High CPU usage
- **Solution**: Limit number of concurrent linting processes
- **Disable**: Unnecessary extensions
- **Exclude**: Build/cache directories from file watching

## Package Management Issues

### pip install fails
- **Solution**: Upgrade pip: \`python -m pip install --upgrade pip\`
- **Try**: Use --user flag for user installation
- **Check**: Network connectivity and proxy settings
- **Alternative**: Use conda or poetry for package management

### Version conflicts
- **Solution**: Use virtual environments to isolate dependencies
- **Check**: requirements.txt for version constraints
- **Try**: \`pip install --upgrade package-name\`
- **Consider**: Using pip-tools for dependency resolution

## Platform-Specific Issues

### Windows path issues
- **Solution**: Use forward slashes or raw strings
- **Enable**: Windows long path support
- **Check**: File path length limits

### macOS permission issues
- **Solution**: Use homebrew for Python installation
- **Avoid**: System Python for development
- **Check**: Directory permissions

### Linux distribution issues
- **Solution**: Install python3-dev package
- **Check**: Python version compatibility
- **Verify**: Required system libraries are installed

## General Troubleshooting

### Extension conflicts
- **Solution**: Disable conflicting extensions temporarily
- **Check**: Extension compatibility matrix
- **Try**: Safe mode startup

### Settings not applying
- **Check**: Settings scope (user vs workspace)
- **Verify**: JSON syntax in settings files
- **Try**: Restart VSCode after major changes

### Performance optimization
- **Exclude**: Large directories from file watching
- **Disable**: Unused language features
- **Use**: Workspace-specific settings for large projects
- **Consider**: Remote development for resource-intensive work`,
  },
};
