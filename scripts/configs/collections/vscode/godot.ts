import {
  gdscriptVSCode,
  godotFilesVSCode,
  godotShadersVSCode,
  godotSnippetsVSCode,
  godotToolsVSCode,
  rainbowBracketsVSCode,
  todoHighlightVSCode,
} from '../../extensions/godot';
import { betterComments, errorLens } from '../../extensions/productivity';
import { Collection } from '../../shared/types';

export const godot: Collection = {
  description:
    'Essential extensions for Godot game development with GDScript support, debugging, and enhanced productivity tools',
  tags: ['godot', 'gdscript', 'game development', 'engine', '3d', '2d', 'shaders'],

  required_extensions: [godotToolsVSCode, gdscriptVSCode],

  optional_extensions: [
    godotFilesVSCode,
    godotShadersVSCode,
    godotSnippetsVSCode,
    errorLens,
    todoHighlightVSCode,
    rainbowBracketsVSCode,
    betterComments,
  ],

  settings: {
    // File associations
    'files.associations': {
      value: {
        '*.gd': 'gdscript',
        '*.cs': 'csharp',
        '*.tres': 'godot-resource',
        '*.tscn': 'godot-scene',
        '*.godot': 'godot-project',
        '*.gdshader': 'godot-shader',
        '*.gdextension': 'ini',
      },
      description: 'Associate Godot file types with appropriate syntax highlighting',
      scope: 'workspace',
    },

    // Godot Tools Settings
    'godot_tools.editor_path': {
      value: '',
      description: 'Path to Godot editor executable (auto-detected if left empty)',
      scope: 'workspace',
    },
    'godot_tools.gdscript_lsp_server_host': {
      value: '127.0.0.1',
      description: 'Host address for GDScript Language Server',
      scope: 'workspace',
    },
    'godot_tools.gdscript_lsp_server_port': {
      value: 6005,
      description: 'Port for GDScript Language Server',
      scope: 'workspace',
    },

    // Editor Settings for GDScript
    'editor.tabSize': {
      value: 4,
      description: 'Set tab size to 4 for GDScript (Godot convention)',
      scope: 'workspace',
    },
    'editor.insertSpaces': {
      value: false,
      description: 'Use tabs instead of spaces for GDScript',
      scope: 'workspace',
    },
    'editor.detectIndentation': {
      value: false,
      description: 'Disable automatic indentation detection to enforce Godot conventions',
      scope: 'workspace',
    },
    'editor.formatOnSave': {
      value: true,
      description: 'Automatically format code on save',
      scope: 'workspace',
    },
    'editor.codeActionsOnSave': {
      value: {
        'source.organizeImports': true,
      },
      description: 'Organize imports on save',
      scope: 'workspace',
    },

    // Error Lens Settings
    'errorLens.enabledDiagnosticLevels': {
      value: ['error', 'warning', 'info'],
      description: 'Show error lens for errors, warnings, and info messages',
      scope: 'workspace',
    },
    'errorLens.excludeBySource': {
      value: [],
      description: 'Sources to exclude from error lens',
      scope: 'workspace',
    },

    // TODO Highlight Settings
    'todohighlight.isEnable': {
      value: true,
      description: 'Enable TODO highlighting',
      scope: 'workspace',
    },
    'todohighlight.keywords': {
      value: [
        {
          text: 'TODO:',
          color: '#ff6b6b',
          backgroundColor: 'transparent',
          overviewRulerColor: '#ff6b6b',
        },
        {
          text: 'FIXME:',
          color: '#feca57',
          backgroundColor: 'transparent',
          overviewRulerColor: '#feca57',
        },
        {
          text: 'NOTE:',
          color: '#48dbfb',
          backgroundColor: 'transparent',
          overviewRulerColor: '#48dbfb',
        },
        {
          text: 'BUG:',
          color: '#ff9ff3',
          backgroundColor: 'transparent',
          overviewRulerColor: '#ff9ff3',
        },
      ],
      description: 'Keywords to highlight in comments',
      scope: 'workspace',
    },

    // Better Comments Settings
    'better-comments.tags': {
      value: [
        {
          tag: '!',
          color: '#FF2D00',
          strikethrough: false,
          underline: false,
          backgroundColor: 'transparent',
          bold: false,
          italic: false,
        },
        {
          tag: '?',
          color: '#3498DB',
          strikethrough: false,
          underline: false,
          backgroundColor: 'transparent',
          bold: false,
          italic: false,
        },
        {
          tag: '//',
          color: '#474747',
          strikethrough: true,
          underline: false,
          backgroundColor: 'transparent',
          bold: false,
          italic: false,
        },
        {
          tag: 'todo',
          color: '#FF8C00',
          strikethrough: false,
          underline: false,
          backgroundColor: 'transparent',
          bold: false,
          italic: false,
        },
        {
          tag: '*',
          color: '#98C379',
          strikethrough: false,
          underline: false,
          backgroundColor: 'transparent',
          bold: false,
          italic: false,
        },
      ],
      description: 'Configure better comments tags for enhanced documentation',
      scope: 'workspace',
    },
  },

  keybindings: [
    {
      key: 'f5',
      command: 'godot.debugger.debug',
      description: 'Start Godot debugging session',
      when: 'resourceExtname == .gd',
    },
    {
      key: 'ctrl+f5',
      command: 'godot.debugger.debug_without_debugging',
      description: 'Run Godot project without debugging',
      when: 'resourceExtname == .gd',
    },
    {
      key: 'shift+f5',
      command: 'godot.debugger.stop',
      description: 'Stop Godot debugging session',
    },
    {
      key: 'ctrl+shift+f5',
      command: 'godot.debugger.restart',
      description: 'Restart Godot debugging session',
    },
    {
      key: 'f6',
      command: 'godot.open_editor',
      description: 'Open Godot editor',
    },
    {
      key: 'ctrl+alt+g',
      command: 'godot.list_classes',
      description: 'List Godot classes',
    },
  ],

  snippets: [
    {
      name: 'extends',
      prefix: 'extends',
      description: 'Class inheritance',
      body: 'extends ${1:Node}$0',
    },
    {
      name: 'class_name',
      prefix: 'class_name',
      description: 'Define class name',
      body: 'class_name ${1:ClassName}$0',
    },
    {
      name: 'func',
      prefix: 'func',
      description: 'Function definition',
      body: 'func ${1:function_name}(${2:parameters}):\n\t${3:pass}$0',
    },
    {
      name: '_ready',
      prefix: '_ready',
      description: 'Node _ready function',
      body: 'func _ready():\n\t${1:pass}$0',
    },
    {
      name: '_process',
      prefix: '_process',
      description: 'Node _process function',
      body: 'func _process(delta):\n\t${1:pass}$0',
    },
    {
      name: '_physics_process',
      prefix: '_physics',
      description: 'Node _physics_process function',
      body: 'func _physics_process(delta):\n\t${1:pass}$0',
    },
    {
      name: '_input',
      prefix: '_input',
      description: 'Node _input function',
      body: 'func _input(event):\n\t${1:pass}$0',
    },
    {
      name: '_unhandled_input',
      prefix: '_unhandled',
      description: 'Node _unhandled_input function',
      body: 'func _unhandled_input(event):\n\t${1:pass}$0',
    },
    {
      name: 'signal',
      prefix: 'signal',
      description: 'Signal definition',
      body: 'signal ${1:signal_name}(${2:parameters})$0',
    },
    {
      name: 'onready',
      prefix: 'onready',
      description: 'Onready variable',
      body: 'onready var ${1:variable_name} = ${2:get_node("${3:NodePath}")}$0',
    },
    {
      name: 'export',
      prefix: 'export',
      description: 'Export variable',
      body: 'export var ${1:variable_name}: ${2:int} = ${3:0}$0',
    },
    {
      name: 'for_loop',
      prefix: 'for',
      description: 'For loop',
      body: 'for ${1:i} in ${2:range(10)}:\n\t${3:pass}$0',
    },
    {
      name: 'while_loop',
      prefix: 'while',
      description: 'While loop',
      body: 'while ${1:condition}:\n\t${2:pass}$0',
    },
    {
      name: 'if_statement',
      prefix: 'if',
      description: 'If statement',
      body: 'if ${1:condition}:\n\t${2:pass}$0',
    },
    {
      name: 'if_else',
      prefix: 'ifelse',
      description: 'If-else statement',
      body: 'if ${1:condition}:\n\t${2:pass}\nelse:\n\t${3:pass}$0',
    },
    {
      name: 'match',
      prefix: 'match',
      description: 'Match statement',
      body: 'match ${1:value}:\n\t${2:pattern1}:\n\t\t${3:pass}\n\t${4:pattern2}:\n\t\t${5:pass}\n\t_:\n\t\t${6:pass}$0',
    },
  ],

  documentation: {
    setup_guide: `
# Godot Game Development Setup Guide

## Prerequisites
1. **Godot Engine**: Download from [godotengine.org](https://godotengine.org/download)
2. **VS Code**: Latest version recommended

## Quick Start
1. **Install Extensions**: This pack will install all necessary extensions
2. **Open Godot Project**: Open your Godot project folder in VS Code
3. **Configure Godot Tools**: Set the path to Godot editor in settings if not auto-detected

## Configuration

### 1. Godot Editor Setup
1. Open Godot Engine
2. Go to Editor Settings → Network → Language Server
3. Enable "Use Language Server"
4. Set Remote Host: \`127.0.0.1\`
5. Set Remote Port: \`6005\`

### 2. VS Code Settings
The extension pack automatically configures:
- GDScript syntax highlighting
- File associations for Godot files
- Proper indentation (tabs, size 4)
- Language server connection

### 3. Project Structure
\`\`\`
project/
├── project.godot
├── scenes/
│   └── Main.tscn
├── scripts/
│   └── Player.gd
├── assets/
│   ├── textures/
│   └── audio/
└── addons/
\`\`\`

### 4. GDScript Best Practices
- Use \`snake_case\` for variables and functions
- Use \`PascalCase\` for classes and constants
- Use tabs for indentation (4 spaces equivalent)
- Add type hints for better IntelliSense

## Debugging
1. **Setup**: Ensure Godot editor is running with Language Server enabled
2. **Breakpoints**: Set breakpoints in GDScript files
3. **Debug**: Press F5 or use Debug menu
4. **Remote Debug**: Connect to running Godot project

## Code Snippets
Use the following prefixes for quick code generation:
- \`extends\` - Class inheritance
- \`func\` - Function definition
- \`_ready\` - Node ready function
- \`_process\` - Process function
- \`signal\` - Signal definition
- \`export\` - Export variable
    `,
    troubleshooting: `
# Troubleshooting Godot Development

## Common Issues

### 1. Language Server Not Connecting
- **Problem**: No IntelliSense or code completion
- **Solution**: 
  - Ensure Godot editor is running
  - Check Language Server is enabled in Godot settings
  - Verify port 6005 is not blocked
  - Restart both VS Code and Godot

### 2. GDScript Syntax Not Highlighted
- **Problem**: Code appears without syntax highlighting
- **Solution**:
  - Check file extension is \`.gd\`
  - Verify GDScript extension is installed
  - Reload VS Code window
  - Check file associations in settings

### 3. Debugging Not Working
- **Problem**: Breakpoints not hitting or debug not starting
- **Solution**:
  - Ensure Godot project is running
  - Check debug configuration in launch.json
  - Verify Remote Debug is enabled in Godot
  - Use correct debug port (6007 by default)

### 4. Auto-completion Issues
- **Problem**: IntelliSense suggestions not appearing
- **Solution**:
  - Check Godot Language Server connection
  - Verify \`project.godot\` file exists
  - Restart Godot editor and VS Code
  - Check for script errors in Godot output

### 5. File Format Issues
- **Problem**: .tscn or .tres files not recognized
- **Solution**:
  - Install "Godot Files" extension
  - Check file associations in VS Code settings
  - Verify files are not corrupted

### 6. Performance Issues
- **Problem**: VS Code slow with large Godot projects
- **Solution**:
  - Exclude \`.import\` folder from VS Code search
  - Add build/export folders to .gitignore
  - Use \`files.watcherExclude\` for large asset folders

## Performance Optimization
- Exclude asset directories from VS Code indexing
- Use .gdignore files for large folders
- Configure workspace-specific settings
- Use Godot's built-in script editor for quick edits

## Getting Help
- Godot Documentation: [docs.godotengine.org](https://docs.godotengine.org)
- GDScript Reference: [docs.godotengine.org/en/stable/getting_started/scripting/gdscript/](https://docs.godotengine.org/en/stable/getting_started/scripting/gdscript/)
- Community: [godotengine.org/community](https://godotengine.org/community)
    `,
  },
};
