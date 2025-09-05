import {
  betterCppSyntaxVSCodium,
  clangdVSCodium,
  clangFormatVSCodium,
  cmakeToolsVSCodium,
  cmakeVSCodium,
  doxygenVSCodium,
  nativeDebugVSCodium,
  xmakeVSCodium,
} from '../../extensions/cpp';
import { errorLensVSCodium } from '../../extensions/productivity';
import { Collection } from '../../shared/types';

export const cpp: Collection = {
  description:
    'Essential C/C++ development environment for VSCodium - modern tooling with clang-based language server, CMake/XMake build systems, and advanced debugging',
  tags: ['cpp', 'c++', 'c', 'clang', 'cmake', 'xmake', 'native', 'systems', 'embedded'],

  required_extensions: [clangdVSCodium, cmakeVSCodium, clangFormatVSCodium, errorLensVSCodium],

  optional_extensions: [
    cmakeToolsVSCodium,
    xmakeVSCodium,
    betterCppSyntaxVSCodium,
    doxygenVSCodium,
    nativeDebugVSCodium,
  ],

  settings: {
    // Clangd Language Server Settings
    'clangd.path': {
      value: 'clangd',
      description: 'Path to clangd executable (use system PATH or specify absolute path)',
      scope: 'workspace',
    },
    'clangd.arguments': {
      value: [
        '--header-insertion=iwyu',
        '--completion-style=detailed',
        '--function-arg-placeholders',
        '--fallback-style=llvm',
      ],
      description: 'Additional arguments passed to clangd language server',
      scope: 'workspace',
    },
    'clangd.semanticHighlighting': {
      value: true,
      description: 'Enable semantic highlighting for better code visualization',
      scope: 'workspace',
    },

    // CMake Settings
    'cmake.configureOnOpen': {
      value: false,
      description: 'Automatically configure CMake project when opened',
      scope: 'workspace',
    },
    'cmake.buildDirectory': {
      value: '${workspaceFolder}/build',
      description: 'Default CMake build directory',
      scope: 'workspace',
    },
    'cmake.generator': {
      value: 'Ninja',
      description: 'Default CMake generator (Ninja, Unix Makefiles, etc.)',
      scope: 'workspace',
    },

    // C/C++ File Settings
    'files.associations': {
      value: {
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
      description: 'File associations for C/C++ files',
      scope: 'workspace',
    },

    // Clang-Format Settings
    'clang-format.executable': {
      value: 'clang-format',
      description: 'Path to clang-format executable',
      scope: 'workspace',
    },
    'clang-format.style': {
      value: 'llvm',
      description: 'Clang-format style (llvm, google, chromium, mozilla, webkit, or file)',
      scope: 'workspace',
    },
    '[cpp]': {
      value: {
        'editor.defaultFormatter': 'xaver.clang-format',
        'editor.formatOnSave': true,
        'editor.formatOnType': true,
      },
      description: 'C++ specific editor settings',
      scope: 'workspace',
    },
    '[c]': {
      value: {
        'editor.defaultFormatter': 'xaver.clang-format',
        'editor.formatOnSave': true,
        'editor.formatOnType': true,
      },
      description: 'C specific editor settings',
      scope: 'workspace',
    },

    // Editor Settings for C/C++
    'editor.suggest.insertMode': {
      value: 'replace',
      description: 'How code completion should behave when inserting text',
      scope: 'workspace',
    },
    'editor.semanticTokenColorCustomizations': {
      value: {
        enabled: true,
      },
      description: 'Enable semantic token color customizations',
      scope: 'workspace',
    },
  },

  keybindings: [
    {
      key: 'ctrl+shift+f',
      command: 'clang-format.format',
      description: 'Format current file with clang-format',
      when: "editorTextFocus && (editorLangId == 'cpp' || editorLangId == 'c')",
    },
    {
      key: 'ctrl+shift+i',
      command: 'clangd.switchheadersource',
      description: 'Switch between header and source file',
      when: "editorTextFocus && (editorLangId == 'cpp' || editorLangId == 'c')",
    },
    {
      key: 'f12',
      command: 'editor.action.revealDefinition',
      description: 'Go to definition',
      when: "editorTextFocus && (editorLangId == 'cpp' || editorLangId == 'c')",
    },
    {
      key: 'ctrl+f12',
      command: 'editor.action.goToReferences',
      description: 'Find all references',
      when: "editorTextFocus && (editorLangId == 'cpp' || editorLangId == 'c')",
    },
    {
      key: 'ctrl+shift+o',
      command: 'workbench.action.gotoSymbol',
      description: 'Go to symbol in file',
      when: "editorTextFocus && (editorLangId == 'cpp' || editorLangId == 'c')",
    },
  ],

  snippets: [
    {
      name: 'class',
      prefix: 'class',
      description: 'Basic C++ class template',
      body: [
        'class ${1:ClassName} {',
        'public:',
        '    ${1:ClassName}();',
        '    ~${1:ClassName}();',
        '    ',
        'private:',
        '    ${0:// Private members}',
        '};',
      ],
    },
    {
      name: 'main',
      prefix: 'main',
      description: 'Main function template',
      body: ['int main(${1:int argc, char* argv[]}) {', '    ${0:// Your code here}', '    return 0;', '}'],
    },
    {
      name: 'header_guard',
      prefix: 'guard',
      description: 'Header guard template',
      body: [
        '#ifndef ${1:${TM_FILENAME_BASE/(.*)/${1:/upcase}/}_H}',
        '#define ${1:${TM_FILENAME_BASE/(.*)/${1:/upcase}/}_H}',
        '',
        '${0:// Header content}',
        '',
        '#endif // ${1:${TM_FILENAME_BASE/(.*)/${1:/upcase}/}_H}',
      ],
    },
    {
      name: 'namespace',
      prefix: 'namespace',
      description: 'Namespace template',
      body: ['namespace ${1:name} {', '', '${0:// Namespace content}', '', '} // namespace ${1:name}'],
    },
    {
      name: 'for_range',
      prefix: 'forr',
      description: 'Range-based for loop',
      body: ['for (${1:const auto&} ${2:item} : ${3:container}) {', '    ${0:// Loop body}', '}'],
    },
  ],

  documentation: {
    setup_guide: `
# C/C++ Development Setup Guide for VSCodium

## Prerequisites
1. **Clang/LLVM**: Install clang and clangd language server
   - Ubuntu/Debian: \`sudo apt install clang clangd\`
   - macOS: \`brew install llvm\` (clangd included)
   - Windows: Install LLVM from official website

2. **Build Systems**:
   - **CMake**: Download from cmake.org or use package manager
   - **XMake**: Install from xmake.io
   - **Ninja** (recommended): \`pip install ninja\` or package manager

3. **Debugging Tools**:
   - **GDB**: Usually pre-installed on Linux, available via package managers
   - **LLDB**: Included with LLVM installation

## Configuration

### 1. Clangd Configuration
Create \`.clangd\` file in your project root:
\`\`\`yaml
CompileFlags:
  Add: [-std=c++17]
  Remove: [-W*]
\`\`\`

### 2. CMake Project Structure
\`\`\`
project/
├── CMakeLists.txt
├── src/
│   └── main.cpp
├── include/
│   └── myheader.h
└── build/
\`\`\`

### 3. Clang-Format Configuration
Create \`.clang-format\` in project root:
\`\`\`yaml
BasedOnStyle: LLVM
IndentWidth: 4
ColumnLimit: 100
\`\`\`

## Build and Debug
1. Configure CMake: \`Ctrl+Shift+P\` → "CMake: Configure"
2. Build project: \`Ctrl+Shift+P\` → "CMake: Build"
3. Debug: Set breakpoints and press \`F5\`

## VSCodium-Specific Notes
- Extensions are sourced from Open VSX Registry
- All functionality remains the same as VSCode
- Privacy-focused alternative to VSCode
    `,
    troubleshooting: `
# Troubleshooting C/C++ Development in VSCodium

## Common Issues

### 1. Clangd Not Working
- **Problem**: No IntelliSense or errors not showing
- **Solution**: 
  - Ensure clangd is installed and in PATH
  - Check VSCodium settings for clangd.path
  - Generate compile_commands.json for your project

### 2. CMake Configuration Issues
- **Problem**: CMake tools not detecting project
- **Solution**:
  - Ensure CMakeLists.txt exists in workspace root
  - Use "CMake: Delete Cache and Reconfigure"
  - Check cmake.configureOnOpen setting

### 3. Extension Installation
- **Problem**: Extensions not available
- **Solution**:
  - VSCodium uses Open VSX Registry by default
  - Some extensions may have different names or IDs
  - Check extension marketplace settings

### 4. Clang-Format Not Working
- **Problem**: Code formatting not applying
- **Solution**:
  - Verify clang-format is installed
  - Check .clang-format file syntax
  - Ensure correct formatter is set in settings

### 5. Debugging Issues
- **Problem**: Breakpoints not hitting
- **Solution**:
  - Compile with debug symbols (-g flag)
  - Ensure debug configuration in launch.json
  - Check that executable matches debug target

## Performance Optimization
- Use \`clangd.arguments\` to limit resource usage
- Exclude build directories from workspace indexing
- Use .clangd-tidy for specific project linting rules
    `,
  },
};
