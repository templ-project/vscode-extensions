import * as vscode from 'vscode';

/**
 * This method is called when your extension is activated
 * Your extension is activated the very first time the command is executed
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('Templ Project Godot Extension Pack extension is now active!');

    // Apply settings when extension activates
    applySettings();

    // Register commands
    const applySettingsCommand = vscode.commands.registerCommand('templ-project.godot-vscode.applySettings', () => {
        applySettings();
        vscode.window.showInformationMessage('Templ Project Godot Extension Pack settings applied!');
    });

    const resetSettingsCommand = vscode.commands.registerCommand('templ-project.godot-vscode.resetSettings', () => {
        resetSettings();
        vscode.window.showInformationMessage('Templ Project Godot Extension Pack settings reset!');
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
    config.update('files.associations', {
  "*.gd": "gdscript",
  "*.cs": "csharp",
  "*.tres": "godot-resource",
  "*.tscn": "godot-scene",
  "*.godot": "godot-project",
  "*.gdshader": "godot-shader",
  "*.gdextension": "ini"
}, vscode.ConfigurationTarget.Global);
    config.update('godot_tools.editor_path', '', vscode.ConfigurationTarget.Global);
    config.update('godot_tools.gdscript_lsp_server_host', '127.0.0.1', vscode.ConfigurationTarget.Global);
    config.update('godot_tools.gdscript_lsp_server_port', 6005, vscode.ConfigurationTarget.Global);
    config.update('editor.tabSize', 4, vscode.ConfigurationTarget.Global);
    config.update('editor.insertSpaces', false, vscode.ConfigurationTarget.Global);
    config.update('editor.detectIndentation', false, vscode.ConfigurationTarget.Global);
    config.update('editor.formatOnSave', true, vscode.ConfigurationTarget.Global);
    config.update('editor.codeActionsOnSave', {
  "source.organizeImports": true
}, vscode.ConfigurationTarget.Global);
    config.update('errorLens.enabledDiagnosticLevels', [
  "error",
  "warning",
  "info"
], vscode.ConfigurationTarget.Global);
    config.update('errorLens.excludeBySource', [], vscode.ConfigurationTarget.Global);
    config.update('todohighlight.isEnable', true, vscode.ConfigurationTarget.Global);
    config.update('todohighlight.keywords', [
  {
    "text": "TODO:",
    "color": "#ff6b6b",
    "backgroundColor": "transparent",
    "overviewRulerColor": "#ff6b6b"
  },
  {
    "text": "FIXME:",
    "color": "#feca57",
    "backgroundColor": "transparent",
    "overviewRulerColor": "#feca57"
  },
  {
    "text": "NOTE:",
    "color": "#48dbfb",
    "backgroundColor": "transparent",
    "overviewRulerColor": "#48dbfb"
  },
  {
    "text": "BUG:",
    "color": "#ff9ff3",
    "backgroundColor": "transparent",
    "overviewRulerColor": "#ff9ff3"
  }
], vscode.ConfigurationTarget.Global);
    config.update('better-comments.tags', [
  {
    "tag": "!",
    "color": "#FF2D00",
    "strikethrough": false,
    "underline": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "?",
    "color": "#3498DB",
    "strikethrough": false,
    "underline": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "//",
    "color": "#474747",
    "strikethrough": true,
    "underline": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "todo",
    "color": "#FF8C00",
    "strikethrough": false,
    "underline": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "*",
    "color": "#98C379",
    "strikethrough": false,
    "underline": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  }
], vscode.ConfigurationTarget.Global);
}

/**
 * Reset settings to default values
 */
function resetSettings() {
    const config = vscode.workspace.getConfiguration();
    
    // Reset settings to default (undefined)
    config.update('files.associations', undefined, vscode.ConfigurationTarget.Global);
    config.update('godot_tools.editor_path', undefined, vscode.ConfigurationTarget.Global);
    config.update('godot_tools.gdscript_lsp_server_host', undefined, vscode.ConfigurationTarget.Global);
    config.update('godot_tools.gdscript_lsp_server_port', undefined, vscode.ConfigurationTarget.Global);
    config.update('editor.tabSize', undefined, vscode.ConfigurationTarget.Global);
    config.update('editor.insertSpaces', undefined, vscode.ConfigurationTarget.Global);
    config.update('editor.detectIndentation', undefined, vscode.ConfigurationTarget.Global);
    config.update('editor.formatOnSave', undefined, vscode.ConfigurationTarget.Global);
    config.update('editor.codeActionsOnSave', undefined, vscode.ConfigurationTarget.Global);
    config.update('errorLens.enabledDiagnosticLevels', undefined, vscode.ConfigurationTarget.Global);
    config.update('errorLens.excludeBySource', undefined, vscode.ConfigurationTarget.Global);
    config.update('todohighlight.isEnable', undefined, vscode.ConfigurationTarget.Global);
    config.update('todohighlight.keywords', undefined, vscode.ConfigurationTarget.Global);
    config.update('better-comments.tags', undefined, vscode.ConfigurationTarget.Global);
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
    console.log('Templ Project Godot Extension Pack extension is now deactivated!');
}
