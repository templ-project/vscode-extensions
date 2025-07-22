import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('[templ-project] Typescript Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.typescript-vscodium.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('[templ-project] Typescript Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.typescript-vscodium.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('[templ-project] Typescript Extension Pack settings reset!');
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
    config.update('typescript.preferences.quoteStyle', {
  "value": "single",
  "description": "Use single quotes for TypeScript imports and strings",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('typescript.suggest.autoImports', {
  "value": true,
  "description": "Enable auto-import suggestions for TypeScript",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('typescript.updateImportsOnFileMove.enabled', {
  "value": "always",
  "description": "Automatically update imports when files are moved",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('eslint.validate', {
  "value": [
    "typescript",
    "typescriptreact"
  ],
  "description": "File types to validate with ESLint",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('eslint.format.enable', {
  "value": false,
  "description": "Disable ESLint as formatter (use Prettier instead)",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('eslint.codeActionsOnSave.rules', {
  "value": [
    "*"
  ],
  "description": "ESLint rules to fix on save",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('[typescript]', {
  "value": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    },
    "editor.tabSize": 2,
    "editor.insertSpaces": true
  },
  "description": "TypeScript-specific editor settings",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
}

/**
 * Reset settings to default values
 */
function resetSettings() {
    const config = vscode.workspace.getConfiguration();
    
    // Reset settings to default (undefined)
    config.update('typescript.preferences.quoteStyle', undefined, vscode.ConfigurationTarget.Global);
    config.update('typescript.suggest.autoImports', undefined, vscode.ConfigurationTarget.Global);
    config.update('typescript.updateImportsOnFileMove.enabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('eslint.validate', undefined, vscode.ConfigurationTarget.Global);
    config.update('eslint.format.enable', undefined, vscode.ConfigurationTarget.Global);
    config.update('eslint.codeActionsOnSave.rules', undefined, vscode.ConfigurationTarget.Global);
    config.update('[typescript]', undefined, vscode.ConfigurationTarget.Global);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
    console.log('[templ-project] Typescript Extension Pack extension is now deactivated!');
}
