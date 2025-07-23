import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('[templ-project-1753303249884] Generic Essential Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.generic-essential-vscode.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('[templ-project-1753303249884] Generic Essential Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.generic-essential-vscode.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('[templ-project-1753303249884] Generic Essential Extension Pack settings reset!');
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
    config.update('workbench.colorTheme', 'Default Dark+', vscode.ConfigurationTarget.Global);
    config.update('editor.renderWhitespace', 'trailing', vscode.ConfigurationTarget.Global);
    config.update('files.trimTrailingWhitespace', true, vscode.ConfigurationTarget.Global);
    config.update('files.insertFinalNewline', true, vscode.ConfigurationTarget.Global);
    config.update('editor.rulers', [
  80,
  120
], vscode.ConfigurationTarget.Global);
    config.update('scm.defaultViewMode', 'tree', vscode.ConfigurationTarget.Global);
    config.update('[json]', {
  "editor.defaultFormatter": "vscode.json-language-features",
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true
}, vscode.ConfigurationTarget.Global);
    config.update('[jsonc]', {
  "editor.defaultFormatter": "vscode.json-language-features",
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.insertSpaces": true
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
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
    console.log('[templ-project-1753303249884] Generic Essential Extension Pack extension is now deactivated!');
}
