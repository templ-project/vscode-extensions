import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('[templ-project-1753222063917] Generic Extended Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.generic-extended-vscodium.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('[templ-project-1753222063917] Generic Extended Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.generic-extended-vscodium.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('[templ-project-1753222063917] Generic Extended Extension Pack settings reset!');
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
    config.update('openapi.completion.enable', {
  "value": true,
  "description": "Enable OpenAPI completion suggestions",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('openapi.validation.enable', {
  "value": true,
  "description": "Enable OpenAPI validation",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('openapi.preview.enable', {
  "value": true,
  "description": "Enable OpenAPI preview",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('rest-client.enableTelemetry', {
  "value": false,
  "description": "Disable REST Client telemetry",
  "scope": "user"
}, vscode.ConfigurationTarget.Global);
    config.update('rest-client.showResponseInDifferentTab', {
  "value": true,
  "description": "Show REST Client response in separate tab",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('docker.attachShellCommand.linuxContainer', {
  "value": "/bin/bash",
  "description": "Default shell command for Linux containers",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('docker.attachShellCommand.windowsContainer', {
  "value": "cmd.exe",
  "description": "Default shell command for Windows containers",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('docker.showStartPage', {
  "value": false,
  "description": "Hide Docker start page",
  "scope": "user"
}, vscode.ConfigurationTarget.Global);
    config.update('vs-kubernetes.vs-kubernetes.namespace', {
  "value": "",
  "description": "Default Kubernetes namespace",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('vs-kubernetes.outputFormat', {
  "value": "yaml",
  "description": "Default output format for Kubernetes resources",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('vs-kubernetes.autoCleanupOnDebugTerminate', {
  "value": true,
  "description": "Auto cleanup Kubernetes debug resources",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('github.pullRequests.createOnPublishBranch', {
  "value": "never",
  "description": "Never create pull requests on publish branch",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('github.pullRequests.pullBranch', {
  "value": "never",
  "description": "Never pull branch on pull request",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('github.pullRequests.showInTimeline', {
  "value": true,
  "description": "Show pull requests in timeline view",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('githubActions.workflows.pinned.workflows', {
  "value": [],
  "description": "Pinned GitHub Actions workflows",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('githubActions.workflows.pinned.refresh.enabled', {
  "value": true,
  "description": "Enable automatic refresh of pinned workflows",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('git.enableSmartCommit', {
  "value": true,
  "description": "Enable smart commit (stage all changes when committing)",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('git.autofetch', {
  "value": true,
  "description": "Enable automatic git fetch",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('git.autofetchPeriod', {
  "value": 180,
  "description": "Auto fetch period in seconds (3 minutes)",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('git.confirmSync', {
  "value": false,
  "description": "Disable confirmation for git sync",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('git.enableStatusBarSync', {
  "value": true,
  "description": "Enable git sync status in status bar",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('yaml.schemas', {
  "value": {
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
  },
  "description": "YAML schema mappings for various file types",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('yaml.format.enable', {
  "value": true,
  "description": "Enable YAML formatting",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('yaml.validate', {
  "value": true,
  "description": "Enable YAML validation",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('yaml.hover', {
  "value": true,
  "description": "Enable YAML hover information",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
    config.update('yaml.completion', {
  "value": true,
  "description": "Enable YAML completion",
  "scope": "workspace"
}, vscode.ConfigurationTarget.Global);
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
    console.log('[templ-project-1753222063917] Generic Extended Extension Pack extension is now deactivated!');
}
