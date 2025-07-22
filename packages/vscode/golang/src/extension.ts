import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('[templ-project-1753222090466] Golang Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.golang-vscode.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('[templ-project-1753222090466] Golang Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.golang-vscode.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('[templ-project-1753222090466] Golang Extension Pack settings reset!');
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
    config.update('go.useLanguageServer', {
  "value": true,
  "description": "Use the Go language server (gopls) for enhanced features",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('go.formatTool', {
  "value": "goimports",
  "description": "Use goimports for formatting (handles imports automatically)",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('go.lintTool', {
  "value": "golangci-lint",
  "description": "Use golangci-lint for comprehensive linting",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('go.lintOnSave', {
  "value": "workspace",
  "description": "Run linter on save for workspace files",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('go.vetOnSave', {
  "value": "workspace",
  "description": "Run go vet on save for workspace files",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('go.buildOnSave', {
  "value": "workspace",
  "description": "Build on save for workspace files",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('go.testOnSave', {
  "value": false,
  "description": "Disable automatic test running on save (performance)",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('go.coverOnSave', {
  "value": false,
  "description": "Disable automatic coverage on save (performance)",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('go.gocodeAutoBuild', {
  "value": true,
  "description": "Enable automatic building for autocompletion",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('[go]', {
  "value": {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.organizeImports": "explicit"
    },
    "editor.tabSize": 4,
    "editor.insertSpaces": false,
    "editor.detectIndentation": false
  },
  "description": "Go-specific editor settings following Go conventions",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('[go.mod]', {
  "value": {
    "editor.formatOnSave": true,
    "editor.tabSize": 4,
    "editor.insertSpaces": false
  },
  "description": "Go module file specific settings",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('[go.sum]', {
  "value": {
    "editor.formatOnSave": false,
    "editor.tabSize": 4,
    "editor.insertSpaces": false
  },
  "description": "Go sum file specific settings (no formatting)",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('go.testFlags', {
  "value": [
    "-v",
    "-race"
  ],
  "description": "Default flags for go test (verbose and race detection)",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('go.testTimeout', {
  "value": "30s",
  "description": "Test timeout duration",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('go.coverageDecorator', {
  "value": {
    "type": "gutter",
    "coveredHighlightColor": "rgba(64,128,128,0.5)",
    "uncoveredHighlightColor": "rgba(128,64,64,0.25)"
  },
  "description": "Test coverage visualization settings",
  "scope": "workspace"
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
    console.log('[templ-project-1753222090466] Golang Extension Pack extension is now deactivated!');
}
