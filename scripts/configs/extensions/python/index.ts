import { Extension } from '../../shared/types';

// Base extension definitions (shared properties)
const basePythonExtension: Omit<Extension, 'marketplace_url'> = {
  id: "ms-python.python",
  name: "Python",
  description: "Python language support with extension access points for IntelliSense (Pylance), Debugging (Python Debugger), linting, formatting, refactoring, unit tests, and more.",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Official Python language support with comprehensive development tools"
};

// const basePylance: Omit<Extension, 'marketplace_url'> = {
//   id: "ms-python.vscode-pylance",
//   name: "Pylance",
//   description: "A performant, feature-rich language server for Python in VS Code",
//   publisher: "Microsoft",
//   license: "MIT",
//   why_required: "Fast Python language server with advanced IntelliSense and type checking"
// };

// const basePythonDebugger: Omit<Extension, 'marketplace_url'> = {
//   id: "ms-python.debugpy",
//   name: "Python Debugger",
//   description: "Python Debugger extension using debugpy.",
//   publisher: "Microsoft",
//   license: "MIT",
//   why_required: "Advanced Python debugging capabilities with breakpoints and variable inspection"
// };

const baseJupyter: Omit<Extension, 'marketplace_url'> = {
  id: "ms-toolsai.jupyter",
  name: "Jupyter",
  description: "Jupyter notebook support, interactive programming and computing that supports Intellisense, debugging and more.",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Interactive Python development with Jupyter notebooks and data science support"
};

const baseBlackFormatter: Omit<Extension, 'marketplace_url'> = {
  id: "ms-python.black-formatter",
  name: "Black Formatter",
  description: "Formatting support for Python files using the Black formatter.",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Consistent Python code formatting with the popular Black formatter"
};

const baseIsort: Omit<Extension, 'marketplace_url'> = {
  id: "ms-python.isort",
  name: "isort",
  description: "Import organization support for Python files using isort.",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Automatic import sorting and organization for clean Python code"
};

const basePylint: Omit<Extension, 'marketplace_url'> = {
  id: "ms-python.pylint",
  name: "Pylint",
  description: "Linting support for Python files using Pylint.",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Comprehensive Python code analysis and quality checking"
};

const baseFlake8: Omit<Extension, 'marketplace_url'> = {
  id: "ms-python.flake8",
  name: "Flake8",
  description: "Linting support for Python files using Flake8.",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Fast Python style guide enforcement and error checking"
};

const baseAutoDocstring: Omit<Extension, 'marketplace_url'> = {
  id: "njpwerner.autodocstring",
  name: "autoDocstring - Python Docstring Generator",
  description: "Generates python docstrings automatically",
  publisher: "Nils Werner",
  license: "MIT",
  why_required: "Automatic generation of Python docstrings with multiple format support"
};

const basePythonTestExplorer: Omit<Extension, 'marketplace_url'> = {
  id: "littlefoxteam.vscode-python-test-adapter",
  name: "Python Test Explorer for Visual Studio Code",
  description: "Run your Python tests in the Sidebar of Visual Studio Code",
  publisher: "Little Fox Team",
  license: "MIT",
  why_required: "Visual test runner and explorer for Python unittest and pytest"
};

// VSCode Extensions (Microsoft Marketplace URLs)
export const pythonExtension: Extension = {
  ...basePythonExtension,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-python.python"
};

// export const pylance: Extension = {
//   ...basePylance,
//   marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance"
// };

// export const pythonDebugger: Extension = {
//   ...basePythonDebugger,
//   marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-python.debugpy"
// };

export const jupyter: Extension = {
  ...baseJupyter,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter"
};

export const blackFormatter: Extension = {
  ...baseBlackFormatter,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter"
};

export const isort: Extension = {
  ...baseIsort,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-python.isort"
};

export const pylint: Extension = {
  ...basePylint,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-python.pylint"
};

export const flake8: Extension = {
  ...baseFlake8,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-python.flake8"
};

export const autoDocstring: Extension = {
  ...baseAutoDocstring,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=njpwerner.autodocstring"
};

export const pythonTestExplorer: Extension = {
  ...basePythonTestExplorer,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=littlefoxteam.vscode-python-test-adapter"
};

// VSCodium Extensions (Open VSX Registry URLs)
export const pythonExtensionVSCodium: Extension = {
  ...basePythonExtension,
  marketplace_url: "https://open-vsx.org/extension/ms-python/python"
};

// export const pylanceVSCodium: Extension = {
//   ...basePylance,
//   marketplace_url: "https://open-vsx.org/extension/ms-python/vscode-pylance"
// };

// export const pythonDebuggerVSCodium: Extension = {
//   ...basePythonDebugger,
//   marketplace_url: "https://open-vsx.org/extension/ms-python/debugpy"
// };

export const jupyterVSCodium: Extension = {
  ...baseJupyter,
  marketplace_url: "https://open-vsx.org/extension/ms-toolsai/jupyter"
};

export const blackFormatterVSCodium: Extension = {
  ...baseBlackFormatter,
  marketplace_url: "https://open-vsx.org/extension/ms-python/black-formatter"
};

export const isortVSCodium: Extension = {
  ...baseIsort,
  marketplace_url: "https://open-vsx.org/extension/ms-python/isort"
};

export const pylintVSCodium: Extension = {
  ...basePylint,
  marketplace_url: "https://open-vsx.org/extension/ms-python/pylint"
};

export const flake8VSCodium: Extension = {
  ...baseFlake8,
  marketplace_url: "https://open-vsx.org/extension/ms-python/flake8"
};

export const autoDocstringVSCodium: Extension = {
  ...baseAutoDocstring,
  marketplace_url: "https://open-vsx.org/extension/njpwerner/autodocstring"
};

export const pythonTestExplorerVSCodium: Extension = {
  ...basePythonTestExplorer,
  marketplace_url: "https://open-vsx.org/extension/littlefoxteam/vscode-python-test-adapter"
};
