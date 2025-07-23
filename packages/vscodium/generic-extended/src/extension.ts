import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('[templ-project-1753309686364] Generic Extended Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.generic-extended-vscodium.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('[templ-project-1753309686364] Generic Extended Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.generic-extended-vscodium.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('[templ-project-1753309686364] Generic Extended Extension Pack settings reset!');
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
    config.update('openapi.completion.enable', true, vscode.ConfigurationTarget.Global);
    config.update('openapi.validation.enable', true, vscode.ConfigurationTarget.Global);
    config.update('openapi.preview.enable', true, vscode.ConfigurationTarget.Global);
    config.update('rest-client.enableTelemetry', false, vscode.ConfigurationTarget.Global);
    config.update('rest-client.showResponseInDifferentTab', true, vscode.ConfigurationTarget.Global);
    config.update('docker.attachShellCommand.linuxContainer', '/bin/bash', vscode.ConfigurationTarget.Global);
    config.update('docker.attachShellCommand.windowsContainer', 'cmd.exe', vscode.ConfigurationTarget.Global);
    config.update('docker.showStartPage', false, vscode.ConfigurationTarget.Global);
    config.update('vs-kubernetes.vs-kubernetes.namespace', '', vscode.ConfigurationTarget.Global);
    config.update('vs-kubernetes.outputFormat', 'yaml', vscode.ConfigurationTarget.Global);
    config.update('vs-kubernetes.autoCleanupOnDebugTerminate', true, vscode.ConfigurationTarget.Global);
    config.update('github.pullRequests.createOnPublishBranch', 'never', vscode.ConfigurationTarget.Global);
    config.update('github.pullRequests.pullBranch', 'never', vscode.ConfigurationTarget.Global);
    config.update('github.pullRequests.showInTimeline', true, vscode.ConfigurationTarget.Global);
    config.update('githubActions.workflows.pinned.workflows', [], vscode.ConfigurationTarget.Global);
    config.update('githubActions.workflows.pinned.refresh.enabled', true, vscode.ConfigurationTarget.Global);
    config.update('git.enableSmartCommit', true, vscode.ConfigurationTarget.Global);
    config.update('git.autofetch', true, vscode.ConfigurationTarget.Global);
    config.update('git.autofetchPeriod', 180, vscode.ConfigurationTarget.Global);
    config.update('git.confirmSync', false, vscode.ConfigurationTarget.Global);
    config.update('git.enableStatusBarSync', true, vscode.ConfigurationTarget.Global);
    config.update('yaml.schemas', {
  "https://json.schemastore.org/github-workflow.json": ".github/workflows/*",
  "https://json.schemastore.org/github-action.json": ".github/actions/*/action.yml",
  "https://json.schemastore.org/docker-compose.json": [
    "docker-compose.yml",
    "docker-compose.yaml"
  ],
  "https://json.schemastore.org/kustomization.json": [
    "kustomization.yaml",
    "kustomization.yml"
  ],
  "https://raw.githubusercontent.com/instrumenta/kubernetes-json-schema/master/v1.18.0-standalone-strict/all.json": [
    "k8s/**/*.yaml",
    "k8s/**/*.yml",
    "kubernetes/**/*.yaml",
    "kubernetes/**/*.yml"
  ]
}, vscode.ConfigurationTarget.Global);
    config.update('yaml.format.enable', true, vscode.ConfigurationTarget.Global);
    config.update('yaml.validate', true, vscode.ConfigurationTarget.Global);
    config.update('yaml.hover', true, vscode.ConfigurationTarget.Global);
    config.update('yaml.completion', true, vscode.ConfigurationTarget.Global);
}

/**
 * Reset settings to default values
 */
function resetSettings() {
    const config = vscode.workspace.getConfiguration();
    
    // Reset settings to default (undefined)
    config.update('openapi.completion.enable', undefined, vscode.ConfigurationTarget.Global);
    config.update('openapi.validation.enable', undefined, vscode.ConfigurationTarget.Global);
    config.update('openapi.preview.enable', undefined, vscode.ConfigurationTarget.Global);
    config.update('rest-client.enableTelemetry', undefined, vscode.ConfigurationTarget.Global);
    config.update('rest-client.showResponseInDifferentTab', undefined, vscode.ConfigurationTarget.Global);
    config.update('docker.attachShellCommand.linuxContainer', undefined, vscode.ConfigurationTarget.Global);
    config.update('docker.attachShellCommand.windowsContainer', undefined, vscode.ConfigurationTarget.Global);
    config.update('docker.showStartPage', undefined, vscode.ConfigurationTarget.Global);
    config.update('vs-kubernetes.vs-kubernetes.namespace', undefined, vscode.ConfigurationTarget.Global);
    config.update('vs-kubernetes.outputFormat', undefined, vscode.ConfigurationTarget.Global);
    config.update('vs-kubernetes.autoCleanupOnDebugTerminate', undefined, vscode.ConfigurationTarget.Global);
    config.update('github.pullRequests.createOnPublishBranch', undefined, vscode.ConfigurationTarget.Global);
    config.update('github.pullRequests.pullBranch', undefined, vscode.ConfigurationTarget.Global);
    config.update('github.pullRequests.showInTimeline', undefined, vscode.ConfigurationTarget.Global);
    config.update('githubActions.workflows.pinned.workflows', undefined, vscode.ConfigurationTarget.Global);
    config.update('githubActions.workflows.pinned.refresh.enabled', undefined, vscode.ConfigurationTarget.Global);
    config.update('git.enableSmartCommit', undefined, vscode.ConfigurationTarget.Global);
    config.update('git.autofetch', undefined, vscode.ConfigurationTarget.Global);
    config.update('git.autofetchPeriod', undefined, vscode.ConfigurationTarget.Global);
    config.update('git.confirmSync', undefined, vscode.ConfigurationTarget.Global);
    config.update('git.enableStatusBarSync', undefined, vscode.ConfigurationTarget.Global);
    config.update('yaml.schemas', undefined, vscode.ConfigurationTarget.Global);
    config.update('yaml.format.enable', undefined, vscode.ConfigurationTarget.Global);
    config.update('yaml.validate', undefined, vscode.ConfigurationTarget.Global);
    config.update('yaml.hover', undefined, vscode.ConfigurationTarget.Global);
    config.update('yaml.completion', undefined, vscode.ConfigurationTarget.Global);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
    console.log('[templ-project-1753309686364] Generic Extended Extension Pack extension is now deactivated!');
}
