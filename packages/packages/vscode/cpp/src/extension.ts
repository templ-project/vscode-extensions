import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('C++ Extension Pack for Vscode extension is now active!');

  // Apply settings when extension activates
  applySettings();

  // Register commands
  const applySettingsCommand = vscode.commands.registerCommand('templ-project.cpp-vscode.applySettings', () => {
    applySettings();
    vscode.window.showInformationMessage('C++ Extension Pack for Vscode settings applied!');
  });

  const resetSettingsCommand = vscode.commands.registerCommand('templ-project.cpp-vscode.resetSettings', () => {
    resetSettings();
    vscode.window.showInformationMessage('C++ Extension Pack for Vscode settings reset!');
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
  config.update('clangd.path', 'clangd', vscode.ConfigurationTarget.Global);
  config.update(
    'clangd.arguments',
    ['--header-insertion=iwyu', '--completion-style=detailed', '--function-arg-placeholders', '--fallback-style=llvm'],
    vscode.ConfigurationTarget.Global,
  );
  config.update('clangd.semanticHighlighting', true, vscode.ConfigurationTarget.Global);
  config.update('cmake.configureOnOpen', false, vscode.ConfigurationTarget.Global);
  config.update('cmake.buildDirectory', '${workspaceFolder}/build', vscode.ConfigurationTarget.Global);
  config.update('cmake.generator', 'Ninja', vscode.ConfigurationTarget.Global);
  config.update(
    'files.associations',
    {
      '*.h': 'cpp',
      '*.hpp': 'cpp',
      '*.cpp': 'cpp',
      '*.cc': 'cpp',
      '*.cxx': 'cpp',
      '*.c++': 'cpp',
      '*.C': 'cpp',
      '*.tpp': 'cpp',
      '*.ipp': 'cpp',
    },
    vscode.ConfigurationTarget.Global,
  );
  config.update('clang-format.executable', 'clang-format', vscode.ConfigurationTarget.Global);
  config.update('clang-format.style', 'llvm', vscode.ConfigurationTarget.Global);
  config.update(
    '[cpp]',
    { 'editor.defaultFormatter': 'xaver.clang-format', 'editor.formatOnSave': true, 'editor.formatOnType': true },
    vscode.ConfigurationTarget.Global,
  );
  config.update(
    '[c]',
    { 'editor.defaultFormatter': 'xaver.clang-format', 'editor.formatOnSave': true, 'editor.formatOnType': true },
    vscode.ConfigurationTarget.Global,
  );
  config.update('editor.suggest.insertMode', 'replace', vscode.ConfigurationTarget.Global);
  config.update('editor.semanticTokenColorCustomizations', { enabled: true }, vscode.ConfigurationTarget.Global);
}

/**
 * Reset settings to default values
 */
function resetSettings() {
  const config = vscode.workspace.getConfiguration();

  // Reset settings to default (undefined)
  config.update('clangd.path', undefined, vscode.ConfigurationTarget.Global);
  config.update('clangd.arguments', undefined, vscode.ConfigurationTarget.Global);
  config.update('clangd.semanticHighlighting', undefined, vscode.ConfigurationTarget.Global);
  config.update('cmake.configureOnOpen', undefined, vscode.ConfigurationTarget.Global);
  config.update('cmake.buildDirectory', undefined, vscode.ConfigurationTarget.Global);
  config.update('cmake.generator', undefined, vscode.ConfigurationTarget.Global);
  config.update('files.associations', undefined, vscode.ConfigurationTarget.Global);
  config.update('clang-format.executable', undefined, vscode.ConfigurationTarget.Global);
  config.update('clang-format.style', undefined, vscode.ConfigurationTarget.Global);
  config.update('[cpp]', undefined, vscode.ConfigurationTarget.Global);
  config.update('[c]', undefined, vscode.ConfigurationTarget.Global);
  config.update('editor.suggest.insertMode', undefined, vscode.ConfigurationTarget.Global);
  config.update('editor.semanticTokenColorCustomizations', undefined, vscode.ConfigurationTarget.Global);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
  console.log('C++ Extension Pack for Vscode extension is now deactivated!');
}
