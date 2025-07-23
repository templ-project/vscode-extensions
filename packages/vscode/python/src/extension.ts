import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('[templ-project-1753309684274] Python Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.python-vscode.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('[templ-project-1753309684274] Python Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.python-vscode.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('[templ-project-1753309684274] Python Extension Pack settings reset!');
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
    config.update('python.defaultInterpreterPath', './venv/bin/python', vscode.ConfigurationTarget.Global);
    config.update('python.linting.enabled', true, vscode.ConfigurationTarget.Global);
    config.update('python.linting.pylintEnabled', true, vscode.ConfigurationTarget.Global);
    config.update('python.linting.flake8Enabled', true, vscode.ConfigurationTarget.Global);
    config.update('python.formatting.provider', 'black', vscode.ConfigurationTarget.Global);
    config.update('python.formatting.blackArgs', [
  "--line-length=88"
], vscode.ConfigurationTarget.Global);
    config.update('python.sortImports.args', [
  "--profile=black"
], vscode.ConfigurationTarget.Global);
    config.update('editor.formatOnSave', true, vscode.ConfigurationTarget.Global);
    config.update('editor.codeActionsOnSave', {
  "source.organizeImports": true
}, vscode.ConfigurationTarget.Global);
    config.update('editor.rulers', [
  88
], vscode.ConfigurationTarget.Global);
    config.update('python.analysis.typeCheckingMode', 'basic', vscode.ConfigurationTarget.Global);
    config.update('python.analysis.autoImportCompletions', true, vscode.ConfigurationTarget.Global);
    config.update('python.analysis.autoSearchPaths', true, vscode.ConfigurationTarget.Global);
    config.update('python.analysis.diagnosticMode', 'workspace', vscode.ConfigurationTarget.Global);
    config.update('python.testing.pytestEnabled', true, vscode.ConfigurationTarget.Global);
    config.update('python.testing.unittestEnabled', false, vscode.ConfigurationTarget.Global);
    config.update('python.testing.pytestArgs', [
  "."
], vscode.ConfigurationTarget.Global);
    config.update('python.testing.autoTestDiscoverOnSaveEnabled', true, vscode.ConfigurationTarget.Global);
    config.update('jupyter.askForKernelRestart', false, vscode.ConfigurationTarget.Global);
    config.update('jupyter.interactiveWindow.textEditor.executeSelection', true, vscode.ConfigurationTarget.Global);
    config.update('terminal.integrated.env.windows', {
  "PYTHONPATH": "${workspaceFolder}"
}, vscode.ConfigurationTarget.Global);
    config.update('terminal.integrated.env.linux', {
  "PYTHONPATH": "${workspaceFolder}"
}, vscode.ConfigurationTarget.Global);
    config.update('terminal.integrated.env.osx', {
  "PYTHONPATH": "${workspaceFolder}"
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
    console.log('[templ-project-1753309684274] Python Extension Pack extension is now deactivated!');
}
