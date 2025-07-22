import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('[templ-project-1753222282441] Python Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.python-vscode.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('[templ-project-1753222282441] Python Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.python-vscode.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('[templ-project-1753222282441] Python Extension Pack settings reset!');
    });

    context.subscriptions.push(applySettingsCommand);
    context.subscriptions.push(resetSettingsCommand);
}

/**
 * Apply all configured settings
 */
function applySettings() {
    const config = vscode.workspace.getConfiguration();
    
    // Apply settings from YAML configuration
    config.update('python.defaultInterpreterPath', {
  "value": "./venv/bin/python",
  "description": "Default Python interpreter path (adjust for your environment)",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.linting.enabled', {
  "value": true,
  "description": "Enable Python linting",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.linting.pylintEnabled', {
  "value": true,
  "description": "Enable Pylint for comprehensive code analysis",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.linting.flake8Enabled', {
  "value": true,
  "description": "Enable Flake8 for style guide enforcement",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.formatting.provider', {
  "value": "black",
  "description": "Use Black as the default Python formatter",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.formatting.blackArgs', {
  "value": [
    "--line-length=88"
  ],
  "description": "Black formatter arguments",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.sortImports.args', {
  "value": [
    "--profile=black"
  ],
  "description": "Configure isort to be compatible with Black",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('editor.formatOnSave', {
  "value": true,
  "description": "Format Python files on save",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('editor.codeActionsOnSave', {
  "value": {
    "source.organizeImports": true
  },
  "description": "Organize imports on save",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('editor.rulers', {
  "value": [
    88
  ],
  "description": "Show ruler at Black's default line length",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.analysis.typeCheckingMode', {
  "value": "basic",
  "description": "Pylance type checking mode (off, basic, strict)",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.analysis.autoImportCompletions', {
  "value": true,
  "description": "Enable auto-import completions",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.analysis.autoSearchPaths', {
  "value": true,
  "description": "Automatically search for imports",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.analysis.diagnosticMode', {
  "value": "workspace",
  "description": "Analyze entire workspace for diagnostics",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.testing.pytestEnabled', {
  "value": true,
  "description": "Enable pytest for testing",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.testing.unittestEnabled', {
  "value": false,
  "description": "Disable unittest (using pytest instead)",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.testing.pytestArgs', {
  "value": [
    "."
  ],
  "description": "Pytest arguments",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.testing.autoTestDiscoverOnSaveEnabled', {
  "value": true,
  "description": "Automatically discover tests when saving",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('jupyter.askForKernelRestart', {
  "value": false,
  "description": "Don't ask for kernel restart confirmation",
  "scope": "user"
}, vscode.ConfigurationTarget.Global);
    config.update('jupyter.interactiveWindow.textEditor.executeSelection', {
  "value": true,
  "description": "Execute selected code in interactive window",
  "scope": "user"
}, vscode.ConfigurationTarget.Global);
    config.update('terminal.integrated.env.windows', {
  "value": {
    "PYTHONPATH": "${workspaceFolder}"
  },
  "description": "Set PYTHONPATH in Windows terminal",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('terminal.integrated.env.linux', {
  "value": {
    "PYTHONPATH": "${workspaceFolder}"
  },
  "description": "Set PYTHONPATH in Linux terminal",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('terminal.integrated.env.osx', {
  "value": {
    "PYTHONPATH": "${workspaceFolder}"
  },
  "description": "Set PYTHONPATH in macOS terminal",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
}

/**
 * Reset settings to default values
 */
function resetSettings() {
    const config = vscode.workspace.getConfiguration();
    
    // Reset settings to default (undefined)
    config.update('python.defaultInterpreterPath', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.linting.enabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.linting.pylintEnabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.linting.flake8Enabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.formatting.provider', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.formatting.blackArgs', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.sortImports.args', undefined, vscode.ConfigurationTarget.Global);
    config.update('editor.formatOnSave', undefined, vscode.ConfigurationTarget.Global);
    config.update('editor.codeActionsOnSave', undefined, vscode.ConfigurationTarget.Global);
    config.update('editor.rulers', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.analysis.typeCheckingMode', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.analysis.autoImportCompletions', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.analysis.autoSearchPaths', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.analysis.diagnosticMode', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.testing.pytestEnabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.testing.unittestEnabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.testing.pytestArgs', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.testing.autoTestDiscoverOnSaveEnabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('jupyter.askForKernelRestart', undefined, vscode.ConfigurationTarget.Global);
    config.update('jupyter.interactiveWindow.textEditor.executeSelection', undefined, vscode.ConfigurationTarget.Global);
    config.update('terminal.integrated.env.windows', undefined, vscode.ConfigurationTarget.Global);
    config.update('terminal.integrated.env.linux', undefined, vscode.ConfigurationTarget.Global);
    config.update('terminal.integrated.env.osx', undefined, vscode.ConfigurationTarget.Global);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
    console.log('[templ-project-1753222282441] Python Extension Pack extension is now deactivated!');
}
