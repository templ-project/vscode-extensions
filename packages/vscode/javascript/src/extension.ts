import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('[templ-project-1753303362251] Javascript Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.javascript-vscode.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('[templ-project-1753303362251] Javascript Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.javascript-vscode.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('[templ-project-1753303362251] Javascript Extension Pack settings reset!');
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
    config.update('javascript.preferences.quoteStyle', 'single', vscode.ConfigurationTarget.Global);
    config.update('javascript.suggest.autoImports', true, vscode.ConfigurationTarget.Global);
    config.update('javascript.updateImportsOnFileMove.enabled', 'always', vscode.ConfigurationTarget.Global);
    config.update('eslint.validate', [
  "javascript",
  "javascriptreact"
], vscode.ConfigurationTarget.Global);
    config.update('eslint.format.enable', false, vscode.ConfigurationTarget.Global);
    config.update('eslint.codeActionsOnSave.rules', [
  "*"
], vscode.ConfigurationTarget.Global);
    config.update('[javascript]', {
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
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
    config.update('javascript.preferences.quoteStyle', undefined, vscode.ConfigurationTarget.Global);
    config.update('javascript.suggest.autoImports', undefined, vscode.ConfigurationTarget.Global);
    config.update('javascript.updateImportsOnFileMove.enabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('eslint.validate', undefined, vscode.ConfigurationTarget.Global);
    config.update('eslint.format.enable', undefined, vscode.ConfigurationTarget.Global);
    config.update('eslint.codeActionsOnSave.rules', undefined, vscode.ConfigurationTarget.Global);
    config.update('[javascript]', undefined, vscode.ConfigurationTarget.Global);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
    console.log('[templ-project-1753303362251] Javascript Extension Pack extension is now deactivated!');
}
