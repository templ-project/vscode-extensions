import { zigLanguage, codeLLDB, errorLens } from '../../extensions/zig';
import { Collection } from '../../shared/types';

export const zig: Collection = {
  description:
    'Essential Zig development environment for VSCode - comprehensive tooling for modern systems programming',

  tags: ['zig', 'zls', 'development', 'systems-programming', 'debugging', 'build'],

  required_extensions: [zigLanguage, codeLLDB],

  optional_extensions: [errorLens],

  settings: {
    // Zig Language Settings
    'zig.path': {
      value: 'zig',
      description: 'Path to Zig executable (install with: https://ziglang.org/download/)',
      scope: 'workspace',
    },
    'zig.zls.enabled': {
      value: true,
      description: 'Enable Zig Language Server (ZLS) for IntelliSense and completions',
      scope: 'workspace',
    },
    'zig.zls.path': {
      value: 'zls',
      description: 'Path to ZLS executable (install from: https://github.com/zigtools/zls/releases)',
      scope: 'workspace',
    },
    'zig.buildOnSave': {
      value: false,
      description: 'Run zig build on save',
      scope: 'workspace',
    },
    'zig.buildOption': {
      value: 'build',
      description: 'Build option for zig build command',
      scope: 'workspace',
    },
    'zig.buildArgs': {
      value: [],
      description: 'Additional arguments for zig build',
      scope: 'workspace',
    },
    'zig.initialSetupDone': {
      value: false,
      description: 'Whether initial setup is complete',
      scope: 'workspace',
    },

    // ZLS Settings
    'zig.zls.debugLog': {
      value: false,
      description: 'Enable debug logging for ZLS',
      scope: 'workspace',
    },
    'zig.zls.enableSnippets': {
      value: true,
      description: 'Enable code snippets',
      scope: 'workspace',
    },
    'zig.zls.enableArgumentPlaceholders': {
      value: true,
      description: 'Enable placeholder arguments for function completions',
      scope: 'workspace',
    },
    'zig.zls.enableBuildOnSave': {
      value: false,
      description: 'Run zig build on save',
      scope: 'workspace',
    },
    'zig.zls.buildOnSaveStep': {
      value: 'install',
      description: 'Build step to run on save (e.g., install, test)',
      scope: 'workspace',
    },
    'zig.zls.enableAutofix': {
      value: true,
      description: 'Enable automatic fixes for common issues',
      scope: 'workspace',
    },
    'zig.zls.semanticTokens': {
      value: 'full',
      description: 'Enable semantic tokens for better syntax highlighting',
      scope: 'workspace',
    },
    'zig.zls.enableInlayHints': {
      value: true,
      description: 'Enable inlay hints for types and parameters',
      scope: 'workspace',
    },
    'zig.zls.inlayHintsShowVariableTypeHints': {
      value: true,
      description: 'Show type hints for variables',
      scope: 'workspace',
    },
    'zig.zls.inlayHintsShowParameterName': {
      value: true,
      description: 'Show parameter names in function calls',
      scope: 'workspace',
    },
    'zig.zls.inlayHintsHideRedundantParamNames': {
      value: true,
      description: 'Hide parameter names when they match the argument',
      scope: 'workspace',
    },
    'zig.zls.warnStyle': {
      value: true,
      description: 'Enable style warnings',
      scope: 'workspace',
    },
    'zig.zls.highlightGlobalVarDeclarations': {
      value: true,
      description: 'Highlight global variable declarations',
      scope: 'workspace',
    },

    // Editor Settings for Zig
    '[zig]': {
      value: {
        'editor.defaultFormatter': 'ziglang.vscode-zig',
        'editor.formatOnSave': true,
        'editor.tabSize': 4,
        'editor.insertSpaces': true,
        'editor.detectIndentation': false,
        'editor.rulers': [100],
        'editor.semanticHighlighting.enabled': true,
        'editor.inlayHints.enabled': 'on',
      },
      description: 'Editor configuration for Zig files',
      scope: 'workspace',
    },

    // Files Settings
    'files.associations': {
      value: {
        '*.zig': 'zig',
        '*.zon': 'zig',
      },
      description: 'File associations for Zig files',
      scope: 'workspace',
    },

    // CodeLLDB Settings for Zig
    'lldb.library': {
      value: null,
      description: 'Path to LLDB library (auto-detected if not set)',
      scope: 'workspace',
    },
    'lldb.displayFormat': {
      value: 'auto',
      description: 'Default format for variable display',
      scope: 'workspace',
    },
    'lldb.showDisassembly': {
      value: 'auto',
      description: 'When to show disassembly',
      scope: 'workspace',
    },
    'lldb.dereferencePointers': {
      value: true,
      description: 'Automatically dereference pointers in variables view',
      scope: 'workspace',
    },

    // Error Lens Settings
    'errorLens.enabled': {
      value: true,
      description: 'Enable Error Lens for inline error display',
      scope: 'workspace',
    },
    'errorLens.enabledDiagnosticLevels': {
      value: ['error', 'warning', 'info'],
      description: 'Diagnostic levels to display inline',
      scope: 'workspace',
    },
  },

  keybindings: [
    {
      key: 'ctrl+shift+b',
      command: 'zig.build',
      description: 'Build Zig project',
      when: 'editorLangId == zig',
    },
    {
      key: 'ctrl+shift+t',
      command: 'zig.test',
      description: 'Run Zig tests',
      when: 'editorLangId == zig',
    },
    {
      key: 'f5',
      command: 'workbench.action.debug.start',
      description: 'Start debugging',
      when: 'editorLangId == zig',
    },
    {
      key: 'ctrl+shift+d',
      command: 'zig.openDocs',
      description: 'Open Zig documentation',
      when: 'editorLangId == zig',
    },
  ],

  snippets: [
    {
      name: 'Main function',
      prefix: 'main',
      description: 'Create main function',
      body: ['const std = @import("std");', '', 'pub fn main() !void {', '    ${1:// Your code here}', '}'],
    },
    {
      name: 'Public function',
      prefix: 'fn',
      description: 'Create public function',
      body: ['pub fn ${1:functionName}(${2:params}) ${3:returnType} {', '    ${4:// Function body}', '}'],
    },
    {
      name: 'Private function',
      prefix: 'pfn',
      description: 'Create private function',
      body: ['fn ${1:functionName}(${2:params}) ${3:returnType} {', '    ${4:// Function body}', '}'],
    },
    {
      name: 'Struct',
      prefix: 'struct',
      description: 'Create struct',
      body: [
        'const ${1:StructName} = struct {',
        '    ${2:field}: ${3:type},',
        '',
        '    pub fn init(${4:params}) ${1:StructName} {',
        '        return .{',
        '            .${2:field} = ${5:value},',
        '        };',
        '    }',
        '};',
      ],
    },
    {
      name: 'Enum',
      prefix: 'enum',
      description: 'Create enum',
      body: ['const ${1:EnumName} = enum {', '    ${2:variant1},', '    ${3:variant2},', '};'],
    },
    {
      name: 'Union',
      prefix: 'union',
      description: 'Create union',
      body: [
        'const ${1:UnionName} = union(enum) {',
        '    ${2:variant1}: ${3:type1},',
        '    ${4:variant2}: ${5:type2},',
        '};',
      ],
    },
    {
      name: 'Test',
      prefix: 'test',
      description: 'Create test',
      body: [
        'test "${1:test name}" {',
        '    const std = @import("std");',
        '    const testing = std.testing;',
        '',
        '    ${2:// Test code}',
        '}',
      ],
    },
    {
      name: 'Allocator',
      prefix: 'alloc',
      description: 'Create allocator',
      body: [
        'var gpa = std.heap.GeneralPurposeAllocator(.{}){};',
        'defer _ = gpa.deinit();',
        'const allocator = gpa.allocator();',
      ],
    },
    {
      name: 'ArrayList',
      prefix: 'arraylist',
      description: 'Create ArrayList',
      body: ['var ${1:list} = std.ArrayList(${2:T}).init(${3:allocator});', 'defer ${1:list}.deinit();'],
    },
    {
      name: 'HashMap',
      prefix: 'hashmap',
      description: 'Create HashMap',
      body: ['var ${1:map} = std.AutoHashMap(${2:K}, ${3:V}).init(${4:allocator});', 'defer ${1:map}.deinit();'],
    },
    {
      name: 'Error',
      prefix: 'err',
      description: 'Define error',
      body: ['const ${1:Error} = error{', '    ${2:ErrorName},', '};'],
    },
    {
      name: 'Error union',
      prefix: 'errorfn',
      description: 'Function returning error union',
      body: ['pub fn ${1:functionName}(${2:params}) !${3:returnType} {', '    ${4:// Function body}', '}'],
    },
    {
      name: 'Switch',
      prefix: 'switch',
      description: 'Switch statement',
      body: ['switch (${1:value}) {', '    ${2:pattern} => ${3:result},', '    else => ${4:default},', '}'],
    },
    {
      name: 'If optional',
      prefix: 'ifopt',
      description: 'If optional unwrap',
      body: ['if (${1:optional}) |${2:value}| {', '    ${3:// Code with value}', '}'],
    },
    {
      name: 'If error',
      prefix: 'iferr',
      description: 'If error catch',
      body: [
        'if (${1:result}) |${2:value}| {',
        '    ${3:// Success}',
        '} else |err| {',
        '    ${4:// Handle error}',
        '}',
      ],
    },
    {
      name: 'While',
      prefix: 'while',
      description: 'While loop',
      body: ['while (${1:condition}) {', '    ${2:// Loop body}', '}'],
    },
    {
      name: 'For',
      prefix: 'for',
      description: 'For loop',
      body: ['for (${1:items}) |${2:item}| {', '    ${3:// Loop body}', '}'],
    },
    {
      name: 'Defer',
      prefix: 'defer',
      description: 'Defer statement',
      body: ['defer ${1:expression};'],
    },
    {
      name: 'Errdefer',
      prefix: 'errdefer',
      description: 'Error defer statement',
      body: ['errdefer ${1:expression};'],
    },
    {
      name: 'Comptime',
      prefix: 'comptime',
      description: 'Comptime block',
      body: ['comptime {', '    ${1:// Compile-time code}', '}'],
    },
    {
      name: 'Inline for',
      prefix: 'inlinefor',
      description: 'Inline for loop',
      body: ['inline for (${1:items}) |${2:item}| {', '    ${3:// Loop body}', '}'],
    },
    {
      name: 'Import',
      prefix: 'import',
      description: 'Import module',
      body: ['const ${1:name} = @import("${2:module}");'],
    },
    {
      name: 'Build file',
      prefix: 'build',
      description: 'Basic build.zig file',
      body: [
        'const std = @import("std");',
        '',
        'pub fn build(b: *std.Build) void {',
        '    const target = b.standardTargetOptions(.{});',
        '    const optimize = b.standardOptimizeOption(.{});',
        '',
        '    const exe = b.addExecutable(.{',
        '        .name = "${1:app}",',
        '        .root_source_file = b.path("src/main.zig"),',
        '        .target = target,',
        '        .optimize = optimize,',
        '    });',
        '',
        '    b.installArtifact(exe);',
        '',
        '    const run_cmd = b.addRunArtifact(exe);',
        '    run_cmd.step.dependOn(b.getInstallStep());',
        '',
        '    const run_step = b.step("run", "Run the app");',
        '    run_step.dependOn(&run_cmd.step);',
        '}',
      ],
    },
  ],

  documentation: {
    setup_guide: `# Zig Extension Pack Setup Guide

## Prerequisites

Before using this extension pack, ensure you have the following installed:

1. **Zig Compiler** (latest version recommended)
   - Download from: https://ziglang.org/download/
   - Or use package manager:
     - macOS: \`brew install zig\`
     - Linux: \`snap install zig --classic --beta\`
     - Windows: \`choco install zig\`

2. **ZLS (Zig Language Server)** (latest version recommended)
   - Download from: https://github.com/zigtools/zls/releases
   - Or build from source: \`zig build -Doptimize=ReleaseSafe\`
   - Make sure ZLS is in your PATH

3. **LLDB** (for debugging)
   - Usually comes with LLVM/Clang installation
   - macOS: Included with Xcode Command Line Tools
   - Linux: \`sudo apt install lldb\` or \`sudo dnf install lldb\`
   - Windows: Included with Visual Studio or install LLVM

## Quick Start

### 1. Verify Installation

Open a terminal and verify your installations:

\`\`\`bash
# Check Zig version
zig version

# Check ZLS
zls --version

# Check LLDB
lldb --version
\`\`\`

### 2. Configure Workspace

The extension pack automatically configures your workspace with optimal settings for Zig development.

### 3. Create a New Project

\`\`\`bash
# Initialize a new Zig project
zig init-exe
# or
zig init-lib
\`\`\`

### 4. Open in VSCode

Open the project folder in VSCode. The Zig extension will automatically activate and configure ZLS.

## Extension Overview

### Required Extensions

#### Zig Language (ziglang.vscode-zig)
- **Purpose**: Official Zig language support
- **Features**:
  - Syntax highlighting
  - ZLS integration for IntelliSense
  - Code completion and navigation
  - Error checking and diagnostics
  - Formatting with \`zig fmt\`
  - Build integration

#### CodeLLDB (vadimcn.vscode-lldb)
- **Purpose**: Native debugging for Zig applications
- **Features**:
  - Breakpoint debugging
  - Variable inspection
  - Call stack navigation
  - Expression evaluation
  - Memory view

### Optional Extensions

#### Error Lens (usernamehw.errorlens)
- **Purpose**: Enhanced error visualization
- **Features**:
  - Inline error messages
  - Warning highlights
  - Diagnostic previews

## Configuration

### ZLS Settings

The extension pack configures ZLS with sensible defaults:

\`\`\`json
{
  "zig.zls.enabled": true,
  "zig.zls.enableSnippets": true,
  "zig.zls.enableArgumentPlaceholders": true,
  "zig.zls.enableInlayHints": true,
  "zig.zls.semanticTokens": "full"
}
\`\`\`

### Formatting

Zig has a built-in formatter. Format on save is enabled by default:

\`\`\`json
{
  "[zig]": {
    "editor.defaultFormatter": "ziglang.vscode-zig",
    "editor.formatOnSave": true
  }
}
\`\`\`

### Building

Configure build settings:

\`\`\`json
{
  "zig.buildOnSave": false,
  "zig.buildOption": "build",
  "zig.buildArgs": []
}
\`\`\`

## Usage Tips

### Building Your Project

- **Keyboard Shortcut**: Press \`Ctrl+Shift+B\` (or \`Cmd+Shift+B\` on macOS)
- **Command**: Run "Zig: Build Project" from the Command Palette (\`Ctrl+Shift+P\`)
- **Terminal**: \`zig build\`

### Running Tests

- **Keyboard Shortcut**: Press \`Ctrl+Shift+T\`
- **Command**: Run "Zig: Test" from the Command Palette
- **Terminal**: \`zig build test\`

### Debugging

1. Set breakpoints by clicking in the gutter
2. Press \`F5\` or click the debug icon
3. Use debug controls to step through code
4. Inspect variables in the debug panel

### Code Navigation

- **Go to Definition**: \`F12\`
- **Find References**: \`Shift+F12\`
- **Rename Symbol**: \`F2\`
- **Format Document**: \`Shift+Alt+F\`

## Common Zig Commands

\`\`\`bash
# Build project
zig build

# Build and run
zig build run

# Run tests
zig build test

# Format code
zig fmt src/

# Check code without building
zig build-exe src/main.zig --check

# Create optimized release build
zig build -Doptimize=ReleaseFast

# Create small optimized build
zig build -Doptimize=ReleaseSmall
\`\`\`

## Best Practices

### 1. Project Structure

\`\`\`
my-project/
├── build.zig          # Build configuration
├── build.zig.zon      # Package dependencies
├── src/
│   ├── main.zig      # Entry point
│   └── module.zig    # Other modules
└── tests/
    └── test.zig      # Tests
\`\`\`

### 2. Memory Management

- Use \`defer\` for cleanup
- Use \`errdefer\` for error cleanup
- Prefer stack allocation when possible
- Use \`GeneralPurposeAllocator\` with defer for heap allocation

### 3. Error Handling

- Use error unions (\`!Type\`)
- Catch errors with \`catch\`
- Use \`try\` for error propagation
- Use \`if\` for optional unwrapping

### 4. Testing

- Write tests in the same file as the code
- Use \`test "description"\` blocks
- Use \`std.testing\` for assertions

### 5. Comptime

- Leverage compile-time evaluation
- Use \`comptime\` for generic code
- Prefer comptime over runtime when possible

## Learning Resources

### Official Documentation

- **Zig Language Reference**: https://ziglang.org/documentation/master/
- **Zig Standard Library**: https://ziglang.org/documentation/master/std/
- **Zig Learn**: https://ziglearn.org/

### Community Resources

- **Zig Forum**: https://ziggit.dev/
- **Zig GitHub**: https://github.com/ziglang/zig
- **ZLS GitHub**: https://github.com/zigtools/zls
- **Zig NEWS**: https://zig.news/

### Tutorials

- **Ziglings**: https://github.com/ratfactor/ziglings (Interactive exercises)
- **Zig by Example**: https://zig-by-example.com/
- **Zig Guide**: https://zig.guide/
`,

    troubleshooting: `# Troubleshooting Zig Development

## Common Issues

### ZLS Not Working

**Problem**: ZLS not providing completions or diagnostics

**Solutions**:

1. **Verify ZLS Installation**:
   \`\`\`bash
   zls --version
   \`\`\`

2. **Check ZLS Path**:
   - Go to Settings → Search for "zig.zls.path"
   - Ensure the path points to your ZLS executable

3. **Restart ZLS**:
   - Command Palette (\`Ctrl+Shift+P\`) → "Zig: Restart ZLS"

4. **Check Output**:
   - View → Output → Select "Zig Language Server" from dropdown
   - Look for error messages

5. **Enable Debug Logging**:
   \`\`\`json
   {
     "zig.zls.debugLog": true
   }
   \`\`\`

### Debugging Not Working

**Problem**: Breakpoints not hitting or debugger not starting

**Solutions**:

1. **Check Debug Build**:
   - Ensure you're building in debug mode
   - Add to build.zig: \`optimize = .Debug\`

2. **Verify LLDB Installation**:
   \`\`\`bash
   lldb --version
   \`\`\`

3. **Configure launch.json**:
   \`\`\`json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug Zig",
         "type": "lldb",
         "request": "launch",
         "program": "\${workspaceFolder}/zig-out/bin/your-app",
         "args": [],
         "cwd": "\${workspaceFolder}",
         "sourceMap": {
           "/build": "\${workspaceFolder}"
         }
       }
     ]
   }
   \`\`\`

4. **Build Before Debugging**:
   - Run \`zig build\` before starting debugger
   - Or add preLaunchTask to launch.json

### Build Errors

**Problem**: Build fails with errors

**Solutions**:

1. **Check Zig Version**:
   \`\`\`bash
   zig version
   \`\`\`
   - Ensure you're using a compatible version
   - Zig is pre-1.0, breaking changes occur frequently

2. **Clean Build**:
   \`\`\`bash
   rm -rf zig-cache zig-out
   zig build
   \`\`\`

3. **Check build.zig**:
   - Verify syntax and configuration
   - Check dependency versions

4. **Update Dependencies**:
   - Update build.zig.zon packages
   - Run \`zig build\` to fetch updates

### Formatting Issues

**Problem**: Code not formatting or formatting incorrectly

**Solutions**:

1. **Check Zig Formatter**:
   \`\`\`bash
   zig fmt --check src/
   \`\`\`

2. **Verify Format on Save**:
   \`\`\`json
   {
     "[zig]": {
       "editor.formatOnSave": true,
       "editor.defaultFormatter": "ziglang.vscode-zig"
     }
   }
   \`\`\`

3. **Manual Format**:
   - Press \`Shift+Alt+F\` (Windows/Linux) or \`Shift+Option+F\` (macOS)
   - Or use Command Palette: "Format Document"

### Performance Issues

**Problem**: Slow completions or high CPU usage

**Solutions**:

1. **Disable Unused Features**:
   \`\`\`json
   {
     "zig.zls.enableInlayHints": false,
     "zig.zls.semanticTokens": "none"
   }
   \`\`\`

2. **Exclude Build Artifacts**:
   \`\`\`json
   {
     "files.watcherExclude": {
       "**/zig-cache/**": true,
       "**/zig-out/**": true
     }
   }
   \`\`\`

3. **Increase Memory**:
   - Close other applications
   - Restart VSCode

4. **Update ZLS**:
   - Get the latest ZLS release
   - Newer versions have performance improvements

### Compilation Errors

**Problem**: Strange compilation errors

**Solutions**:

1. **Check Syntax**:
   - Zig syntax is strict
   - Common issues: missing semicolons, wrong types

2. **Verify Imports**:
   - Check \`@import\` paths
   - Ensure modules exist

3. **Type Checking**:
   - Zig is strongly typed
   - Use \`@as\` for explicit casts
   - Check for null/undefined values

4. **Error Union Handling**:
   - Use \`try\` or \`catch\`
   - Don't ignore errors

### IntelliSense Issues

**Problem**: No completions or incorrect suggestions

**Solutions**:

1. **Wait for Analysis**:
   - ZLS needs time to analyze on first open
   - Check status bar for "Analyzing..."

2. **Clear Cache**:
   \`\`\`bash
   rm -rf ~/.cache/zls
   \`\`\`

3. **Restart Extension**:
   - Command Palette → "Developer: Reload Window"

4. **Check File Association**:
   \`\`\`json
   {
     "files.associations": {
       "*.zig": "zig"
     }
   }
   \`\`\`

### Cross-Platform Issues

**Problem**: Code works on one platform but not another

**Solutions**:

1. **Check Platform-Specific Code**:
   - Use \`@import("builtin")\` for platform detection
   - Test on target platforms

2. **Use \`std.Target\`**:
   - Specify target triple
   - \`zig build -Dtarget=x86_64-linux-gnu\`

3. **Check Path Separators**:
   - Use \`std.fs.path\` utilities
   - Don't hardcode \`/\` or \`\\\`

## Getting Help

If you're still experiencing issues:

1. **Check Zig Forums**: https://ziggit.dev/
2. **ZLS Issues**: https://github.com/zigtools/zls/issues
3. **VSCode Extension Issues**: https://github.com/ziglang/vscode-zig/issues
4. **Zig Language Issues**: https://github.com/ziglang/zig/issues

When reporting issues, include:
- Zig version (\`zig version\`)
- ZLS version (\`zls --version\`)
- VSCode version
- Operating system
- Minimal reproducible example
- Error messages and logs
`,
  },
};
