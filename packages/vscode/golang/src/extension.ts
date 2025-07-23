import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('[templ-project-1753306954049] Golang Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.golang-vscode.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('[templ-project-1753306954049] Golang Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.golang-vscode.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('[templ-project-1753306954049] Golang Extension Pack settings reset!');
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
    config.update('go.useLanguageServer', true, vscode.ConfigurationTarget.Global);
    config.update('go.formatTool', 'goimports', vscode.ConfigurationTarget.Global);
    config.update('go.lintTool', 'golangci-lint', vscode.ConfigurationTarget.Global);
    config.update('go.lintOnSave', 'workspace', vscode.ConfigurationTarget.Global);
    config.update('go.vetOnSave', 'workspace', vscode.ConfigurationTarget.Global);
    config.update('go.buildOnSave', 'workspace', vscode.ConfigurationTarget.Global);
    config.update('go.testOnSave', false, vscode.ConfigurationTarget.Global);
    config.update('go.coverOnSave', false, vscode.ConfigurationTarget.Global);
    config.update('go.gocodeAutoBuild', true, vscode.ConfigurationTarget.Global);
    config.update('[go]', {
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit"
  },
  "editor.tabSize": 4,
  "editor.insertSpaces": false,
  "editor.detectIndentation": false
}, vscode.ConfigurationTarget.Global);
    config.update('[go.mod]', {
  "editor.formatOnSave": true,
  "editor.tabSize": 4,
  "editor.insertSpaces": false
}, vscode.ConfigurationTarget.Global);
    config.update('[go.sum]', {
  "editor.formatOnSave": false,
  "editor.tabSize": 4,
  "editor.insertSpaces": false
}, vscode.ConfigurationTarget.Global);
    config.update('go.testFlags', [
  "-v",
  "-race"
], vscode.ConfigurationTarget.Global);
    config.update('go.testTimeout', '30s', vscode.ConfigurationTarget.Global);
    config.update('go.coverageDecorator', {
  "type": "gutter",
  "coveredHighlightColor": "rgba(64,128,128,0.5)",
  "uncoveredHighlightColor": "rgba(128,64,64,0.25)"
}, vscode.ConfigurationTarget.Global);
}

/**
 * Reset settings to default values
 */
function resetSettings() {
    const config = vscode.workspace.getConfiguration();
    
    // Reset settings to default (undefined)
    config.update('go.useLanguageServer', undefined, vscode.ConfigurationTarget.Global);
    config.update('go.formatTool', undefined, vscode.ConfigurationTarget.Global);
    config.update('go.lintTool', undefined, vscode.ConfigurationTarget.Global);
    config.update('go.lintOnSave', undefined, vscode.ConfigurationTarget.Global);
    config.update('go.vetOnSave', undefined, vscode.ConfigurationTarget.Global);
    config.update('go.buildOnSave', undefined, vscode.ConfigurationTarget.Global);
    config.update('go.testOnSave', undefined, vscode.ConfigurationTarget.Global);
    config.update('go.coverOnSave', undefined, vscode.ConfigurationTarget.Global);
    config.update('go.gocodeAutoBuild', undefined, vscode.ConfigurationTarget.Global);
    config.update('[go]', undefined, vscode.ConfigurationTarget.Global);
    config.update('[go.mod]', undefined, vscode.ConfigurationTarget.Global);
    config.update('[go.sum]', undefined, vscode.ConfigurationTarget.Global);
    config.update('go.testFlags', undefined, vscode.ConfigurationTarget.Global);
    config.update('go.testTimeout', undefined, vscode.ConfigurationTarget.Global);
    config.update('go.coverageDecorator', undefined, vscode.ConfigurationTarget.Global);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
    console.log('[templ-project-1753306954049] Golang Extension Pack extension is now deactivated!');
}
