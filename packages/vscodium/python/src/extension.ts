import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('[templ-project] Python Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.python-vscodium.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('[templ-project] Python Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.python-vscodium.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('[templ-project] Python Extension Pack settings reset!');
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
    config.update('workbench.colorTheme', {
  "value": "Default Dark+",
  "description": "Default dark theme for better visibility",
  "scope": "user"
}, vscode.ConfigurationTarget.Global);
    config.update('editor.renderWhitespace', {
  "value": "trailing",
  "description": "Show trailing whitespace",
  "scope": "user"
}, vscode.ConfigurationTarget.Global);
    config.update('files.trimTrailingWhitespace', {
  "value": true,
  "description": "Trim trailing whitespace on save",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('files.insertFinalNewline', {
  "value": true,
  "description": "Insert final newline at end of file",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('editor.rulers', {
  "value": [
    80,
    120
  ],
  "description": "Show rulers at 80 and 120 characters",
  "scope": "user"
}, vscode.ConfigurationTarget.Global);
    config.update('scm.defaultViewMode', {
  "value": "tree",
  "description": "Default Git view mode",
  "scope": "user"
}, vscode.ConfigurationTarget.Global);
    config.update('[json]', {
  "value": {
    "editor.defaultFormatter": "vscode.json-language-features",
    "editor.formatOnSave": true,
    "editor.tabSize": 2,
    "editor.insertSpaces": true
  },
  "description": "JSON file formatting settings using built-in formatter",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('[jsonc]', {
  "value": {
    "editor.defaultFormatter": "vscode.json-language-features",
    "editor.formatOnSave": true,
    "editor.tabSize": 2,
    "editor.insertSpaces": true
  },
  "description": "JSON with Comments file formatting settings using built-in formatter",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.defaultInterpreterPath', {
  "value": "python",
  "description": "Default Python interpreter path",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.formatting.provider', {
  "value": "black",
  "description": "Use Black as default Python formatter",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.linting.enabled', {
  "value": true,
  "description": "Enable Python linting",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.linting.pylintEnabled', {
  "value": true,
  "description": "Enable Pylint for Python linting",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.linting.flake8Enabled', {
  "value": true,
  "description": "Enable Flake8 for Python linting",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.testing.pytestEnabled', {
  "value": true,
  "description": "Enable pytest for Python testing",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('python.testing.unittestEnabled', {
  "value": false,
  "description": "Disable unittest in favor of pytest",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('jupyter.askForKernelRestart', {
  "value": false,
  "description": "Don't ask for kernel restart confirmation",
  "scope": "user"
}, vscode.ConfigurationTarget.Global);
    config.update('jupyter.interactiveWindow.textEditor.executeSelection', {
  "value": true,
  "description": "Execute selection in interactive window",
  "scope": "user"
}, vscode.ConfigurationTarget.Global);
}

/**
 * Reset settings to default values
 */
function resetSettings() {
    const config = vscode.workspace.getConfiguration();
    
    // Reset settings to default (undefined)
    config.update('workbench.colorTheme', undefined, vscode.ConfigurationTarget.Global);
    config.update('editor.renderWhitespace', undefined, vscode.ConfigurationTarget.Global);
    config.update('files.trimTrailingWhitespace', undefined, vscode.ConfigurationTarget.Global);
    config.update('files.insertFinalNewline', undefined, vscode.ConfigurationTarget.Global);
    config.update('editor.rulers', undefined, vscode.ConfigurationTarget.Global);
    config.update('scm.defaultViewMode', undefined, vscode.ConfigurationTarget.Global);
    config.update('[json]', undefined, vscode.ConfigurationTarget.Global);
    config.update('[jsonc]', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.defaultInterpreterPath', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.formatting.provider', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.linting.enabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.linting.pylintEnabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.linting.flake8Enabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.testing.pytestEnabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('python.testing.unittestEnabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('jupyter.askForKernelRestart', undefined, vscode.ConfigurationTarget.Global);
    config.update('jupyter.interactiveWindow.textEditor.executeSelection', undefined, vscode.ConfigurationTarget.Global);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
    console.log('[templ-project] Python Extension Pack extension is now deactivated!');
}
