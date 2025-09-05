import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('Templ Project Csharp Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.csharp-vscode.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('Templ Project Csharp Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.csharp-vscode.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('Templ Project Csharp Extension Pack settings reset!');
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
    config.update('csharp.format.enable', true, vscode.ConfigurationTarget.Global);
    config.update('csharp.semanticHighlighting.enabled', true, vscode.ConfigurationTarget.Global);
    config.update('csharp.completion.trigger', true, vscode.ConfigurationTarget.Global);
    config.update('dotnet.server.useOmnisharp', false, vscode.ConfigurationTarget.Global);
    config.update('dotnet.completion.showCompletionItemsFromUnimportedNamespaces', true, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForParameters', true, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForLiteralParameters', true, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForIndexerParameters', true, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForObjectCreationParameters', true, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForOtherParameters', false, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForTypeParameters', true, vscode.ConfigurationTarget.Global);
    config.update('files.associations', {
  "*.cs": "csharp",
  "*.csx": "csharp",
  "*.cake": "csharp",
  "*.cshtml": "aspnetcorerazor",
  "*.razor": "aspnetcorerazor"
}, vscode.ConfigurationTarget.Global);
    config.update('[csharp]', {
  "editor.defaultFormatter": "ms-dotnettools.csharp",
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit"
  }
}, vscode.ConfigurationTarget.Global);
    config.update('dotnet-test-explorer.testProjectPath', '**/*Tests.csproj', vscode.ConfigurationTarget.Global);
    config.update('dotnet-test-explorer.useTreeView', true, vscode.ConfigurationTarget.Global);
}

/**
 * Reset settings to default values
 */
function resetSettings() {
    const config = vscode.workspace.getConfiguration();
    
    // Reset settings to default (undefined)
    config.update('csharp.format.enable', undefined, vscode.ConfigurationTarget.Global);
    config.update('csharp.semanticHighlighting.enabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('csharp.completion.trigger', undefined, vscode.ConfigurationTarget.Global);
    config.update('dotnet.server.useOmnisharp', undefined, vscode.ConfigurationTarget.Global);
    config.update('dotnet.completion.showCompletionItemsFromUnimportedNamespaces', undefined, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForParameters', undefined, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForLiteralParameters', undefined, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForIndexerParameters', undefined, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForObjectCreationParameters', undefined, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForOtherParameters', undefined, vscode.ConfigurationTarget.Global);
    config.update('dotnet.inlayHints.enableInlayHintsForTypeParameters', undefined, vscode.ConfigurationTarget.Global);
    config.update('files.associations', undefined, vscode.ConfigurationTarget.Global);
    config.update('[csharp]', undefined, vscode.ConfigurationTarget.Global);
    config.update('dotnet-test-explorer.testProjectPath', undefined, vscode.ConfigurationTarget.Global);
    config.update('dotnet-test-explorer.useTreeView', undefined, vscode.ConfigurationTarget.Global);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
    console.log('Templ Project Csharp Extension Pack extension is now deactivated!');
}
