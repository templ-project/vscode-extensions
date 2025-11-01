import { rustAnalyzer, codeLLDB, crates, evenBetterTOML, errorLens } from '../../extensions/rust';
import { Collection } from '../../shared/types';

export const rust: Collection = {
  description:
    'Essential Rust development environment for VSCode - comprehensive tooling for modern systems programming',

  tags: ['rust', 'cargo', 'development', 'systems-programming', 'debugging', 'toml'],

  required_extensions: [rustAnalyzer, codeLLDB],

  optional_extensions: [crates, evenBetterTOML, errorLens],

  settings: {
    // Rust Analyzer Settings
    'rust-analyzer.check.command': {
      value: 'clippy',
      description: 'Use clippy for better linting (install with: rustup component add clippy)',
      scope: 'workspace',
    },
    'rust-analyzer.cargo.features': {
      value: 'all',
      description: 'Enable all Cargo features for completions and analysis',
      scope: 'workspace',
    },
    'rust-analyzer.inlayHints.parameterHints.enable': {
      value: true,
      description: 'Show parameter hints inline for better code understanding',
      scope: 'workspace',
    },
    'rust-analyzer.inlayHints.typeHints.enable': {
      value: true,
      description: 'Show type hints inline for variables and expressions',
      scope: 'workspace',
    },
    'rust-analyzer.inlayHints.chainingHints.enable': {
      value: true,
      description: 'Show type hints for chained method calls',
      scope: 'workspace',
    },
    'rust-analyzer.lens.enable': {
      value: true,
      description: 'Enable code lenses for run/debug/test actions',
      scope: 'workspace',
    },
    'rust-analyzer.lens.references.adt.enable': {
      value: true,
      description: 'Show references for structs, enums, and unions',
      scope: 'workspace',
    },
    'rust-analyzer.lens.references.enumVariant.enable': {
      value: true,
      description: 'Show references for enum variants',
      scope: 'workspace',
    },
    'rust-analyzer.lens.references.method.enable': {
      value: true,
      description: 'Show references for methods',
      scope: 'workspace',
    },
    'rust-analyzer.lens.references.trait.enable': {
      value: true,
      description: 'Show references for traits',
      scope: 'workspace',
    },
    'rust-analyzer.assist.importGranularity': {
      value: 'module',
      description: 'How to organize imports (module, item, crate, preserve)',
      scope: 'workspace',
    },
    'rust-analyzer.completion.autoimport.enable': {
      value: true,
      description: 'Enable auto-import suggestions in completions',
      scope: 'workspace',
    },
    'rust-analyzer.completion.autoself.enable': {
      value: true,
      description: 'Automatically add self when completing methods',
      scope: 'workspace',
    },
    'rust-analyzer.diagnostics.enable': {
      value: true,
      description: 'Enable error and warning diagnostics',
      scope: 'workspace',
    },
    'rust-analyzer.hover.actions.enable': {
      value: true,
      description: 'Show actions in hover documentation',
      scope: 'workspace',
    },
    'rust-analyzer.hover.documentation.enable': {
      value: true,
      description: 'Show documentation on hover',
      scope: 'workspace',
    },

    // Editor Settings for Rust
    '[rust]': {
      value: {
        'editor.defaultFormatter': 'rust-lang.rust-analyzer',
        'editor.formatOnSave': true,
        'editor.rulers': [100],
        'editor.tabSize': 4,
        'editor.insertSpaces': true,
        'editor.semanticHighlighting.enabled': true,
      },
      description: 'Rust-specific editor configuration',
      scope: 'workspace',
    },

    // TOML Settings (for Cargo.toml)
    '[toml]': {
      value: {
        'editor.defaultFormatter': 'tamasfe.even-better-toml',
        'editor.formatOnSave': true,
        'editor.tabSize': 2,
        'editor.insertSpaces': true,
      },
      description: 'TOML-specific editor settings for Cargo.toml and config files',
      scope: 'workspace',
    },

    // Error Lens Settings
    'errorLens.enabledDiagnosticLevels': {
      value: ['error', 'warning', 'info'],
      description: 'Which diagnostic levels to display inline',
      scope: 'workspace',
    },
    'errorLens.followCursor': {
      value: 'activeLine',
      description: 'Show inline errors only on the active line',
      scope: 'workspace',
    },

    // Crates Extension Settings
    'crates.listPreReleases': {
      value: false,
      description: 'Show pre-release versions in Cargo.toml',
      scope: 'workspace',
    },
    'crates.compatibleDecorator': {
      value: '✓',
      description: 'Decorator for compatible crate versions',
      scope: 'workspace',
    },
    'crates.incompatibleDecorator': {
      value: '⚠',
      description: 'Decorator for incompatible crate versions',
      scope: 'workspace',
    },

    // Files Settings
    'files.watcherExclude': {
      value: {
        '**/target/**': true,
      },
      description: 'Exclude Rust build directory from file watching',
      scope: 'workspace',
    },
    'files.exclude': {
      value: {
        '**/.git': true,
        '**/target': false,
      },
      description: 'Files to exclude from the explorer (show target directory)',
      scope: 'workspace',
    },
  },

  keybindings: [
    {
      key: 'ctrl+shift+b',
      command: 'rust-analyzer.run',
      description: 'Run Rust project with cargo run',
      when: 'editorLangId == rust',
    },
    {
      key: 'ctrl+shift+t',
      command: 'rust-analyzer.openCargoToml',
      description: 'Open Cargo.toml file',
      when: 'editorLangId == rust',
    },
    {
      key: 'ctrl+shift+d',
      command: 'rust-analyzer.openDocs',
      description: 'Open Rust documentation',
      when: 'editorLangId == rust',
    },
    {
      key: 'f5',
      command: 'workbench.action.debug.start',
      description: 'Start debugging Rust application',
      when: 'editorLangId == rust',
    },
  ],

  snippets: [
    {
      name: 'main',
      prefix: 'main',
      description: 'Main function entry point',
      body: ['fn main() {', '    ${1:println!("Hello, world!");}', '}'],
    },
    {
      name: 'function',
      prefix: 'fn',
      description: 'Function definition',
      body: ['fn ${1:name}(${2:params}) -> ${3:ReturnType} {', '    ${4:// function body}', '}'],
    },
    {
      name: 'pub_function',
      prefix: 'pfn',
      description: 'Public function definition',
      body: ['pub fn ${1:name}(${2:params}) -> ${3:ReturnType} {', '    ${4:// function body}', '}'],
    },
    {
      name: 'struct',
      prefix: 'struct',
      description: 'Struct definition',
      body: ['struct ${1:Name} {', '    ${2:field}: ${3:Type},', '}'],
    },
    {
      name: 'pub_struct',
      prefix: 'pstruct',
      description: 'Public struct definition',
      body: ['pub struct ${1:Name} {', '    pub ${2:field}: ${3:Type},', '}'],
    },
    {
      name: 'enum',
      prefix: 'enum',
      description: 'Enum definition',
      body: ['enum ${1:Name} {', '    ${2:Variant1},', '    ${3:Variant2}(${4:Type}),', '}'],
    },
    {
      name: 'impl',
      prefix: 'impl',
      description: 'Implementation block',
      body: [
        'impl ${1:Name} {',
        '    pub fn ${2:new}(${3:params}) -> Self {',
        '        Self {',
        '            ${4:field}: ${5:value},',
        '        }',
        '    }',
        '}',
      ],
    },
    {
      name: 'impl_trait',
      prefix: 'implt',
      description: 'Trait implementation',
      body: [
        'impl ${1:Trait} for ${2:Type} {',
        '    fn ${3:method}(&self) -> ${4:ReturnType} {',
        '        ${5:// implementation}',
        '    }',
        '}',
      ],
    },
    {
      name: 'trait',
      prefix: 'trait',
      description: 'Trait definition',
      body: ['trait ${1:Name} {', '    fn ${2:method}(&self) -> ${3:ReturnType};', '}'],
    },
    {
      name: 'test',
      prefix: 'test',
      description: 'Test function',
      body: ['#[test]', 'fn ${1:test_name}() {', '    ${2:assert_eq!(1 + 1, 2);}', '}'],
    },
    {
      name: 'test_module',
      prefix: 'testmod',
      description: 'Test module',
      body: [
        '#[cfg(test)]',
        'mod tests {',
        '    use super::*;',
        '',
        '    #[test]',
        '    fn ${1:test_name}() {',
        '        ${2:assert!(true);}',
        '    }',
        '}',
      ],
    },
    {
      name: 'macro_rules',
      prefix: 'macro',
      description: 'Declarative macro',
      body: ['macro_rules! ${1:name} {', '    (${2:pattern}) => {', '        ${3:// expansion}', '    };', '}'],
    },
    {
      name: 'match',
      prefix: 'match',
      description: 'Match expression',
      body: [
        'match ${1:expression} {',
        '    ${2:Pattern1} => ${3:result1},',
        '    ${4:Pattern2} => ${5:result2},',
        '    _ => ${6:default},',
        '}',
      ],
    },
    {
      name: 'if_let',
      prefix: 'iflet',
      description: 'If let expression',
      body: ['if let ${1:Some(value)} = ${2:expression} {', '    ${3:// handle value}', '}'],
    },
    {
      name: 'while_let',
      prefix: 'whilelet',
      description: 'While let loop',
      body: ['while let ${1:Some(value)} = ${2:expression} {', '    ${3:// handle value}', '}'],
    },
    {
      name: 'for_loop',
      prefix: 'for',
      description: 'For loop',
      body: ['for ${1:item} in ${2:iterator} {', '    ${3:// loop body}', '}'],
    },
    {
      name: 'println',
      prefix: 'pln',
      description: 'println! macro',
      body: 'println!("${1:{}}", ${2:variable});',
    },
    {
      name: 'eprintln',
      prefix: 'epln',
      description: 'eprintln! macro for stderr',
      body: 'eprintln!("${1:{}}", ${2:variable});',
    },
    {
      name: 'vec',
      prefix: 'vec',
      description: 'vec! macro',
      body: 'vec![${1:elements}]',
    },
    {
      name: 'result',
      prefix: 'result',
      description: 'Result type alias',
      body: 'type Result<T> = std::result::Result<T, ${1:Error}>;',
    },
    {
      name: 'derive',
      prefix: 'derive',
      description: 'Derive attribute',
      body: '#[derive(${1:Debug, Clone, PartialEq})]',
    },
    {
      name: 'allow',
      prefix: 'allow',
      description: 'Allow attribute to suppress warnings',
      body: '#[allow(${1:dead_code})]',
    },
    {
      name: 'cfg',
      prefix: 'cfg',
      description: 'Conditional compilation attribute',
      body: '#[cfg(${1:test})]',
    },
    {
      name: 'mod',
      prefix: 'mod',
      description: 'Module declaration',
      body: ['mod ${1:name} {', '    ${2:// module contents}', '}'],
    },
    {
      name: 'use',
      prefix: 'use',
      description: 'Use statement',
      body: 'use ${1:std::${2:collections::HashMap}};',
    },
  ],

  documentation: {
    setup_guide: `# Rust Extension Pack Setup

## Prerequisites

### Install Rust
\`\`\`bash
# Install Rust using rustup (recommended)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Verify installation
rustc --version
cargo --version
\`\`\`

### Install Essential Components
\`\`\`bash
# Install Clippy (linter)
rustup component add clippy

# Install rustfmt (code formatter)
rustup component add rustfmt

# Install Rust source code (for documentation and goto definition)
rustup component add rust-src
\`\`\`

## Quick Start

1. **Install this extension pack**
   - All required extensions will be installed automatically
   - Optional extensions can be enabled based on your needs

2. **Create or open a Rust project**
   \`\`\`bash
   # Create new binary project
   cargo new my-project

   # Create new library project
   cargo new --lib my-library

   # Open in VSCode
   code my-project
   \`\`\`

3. **Wait for rust-analyzer to initialize**
   - First-time setup may take a few moments
   - rust-analyzer will index your project and download dependencies
   - Check status in the bottom status bar

4. **Start coding!**
   - IntelliSense and code completion work automatically
   - Inline errors and warnings appear as you type
   - Use code lenses to run/debug/test your code

## Extensions Included

### Required Extensions

#### rust-analyzer
The official Rust language server providing:
- **IntelliSense**: Intelligent code completion
- **Error Checking**: Real-time error and warning detection
- **Code Navigation**: Go to definition, find references
- **Refactoring**: Rename symbols, extract functions
- **Inlay Hints**: Type annotations and parameter names
- **Code Lenses**: Run, debug, and test actions inline

#### CodeLLDB
Native debugger for Rust applications:
- **Breakpoints**: Set breakpoints in your code
- **Variable Inspection**: View and modify variables
- **Call Stack**: Navigate the execution stack
- **Watch Expressions**: Monitor expressions during execution
- **Multi-threading**: Debug concurrent Rust programs

### Optional Extensions

#### crates
Cargo.toml dependency management:
- **Version Information**: Shows latest crate versions inline
- **Update Suggestions**: Highlights outdated dependencies
- **Documentation Links**: Quick access to crates.io documentation
- **Compatibility Indicators**: Shows if versions are compatible

#### Even Better TOML
Enhanced TOML support:
- **Syntax Highlighting**: Better colors for TOML files
- **Validation**: Catches TOML syntax errors
- **Formatting**: Auto-format Cargo.toml files
- **Autocompletion**: Suggests keys and values

#### Error Lens
Inline error display:
- **Inline Errors**: Shows errors directly in the code
- **Inline Warnings**: Displays warnings without hovering
- **Custom Styling**: Configurable error appearance
- **Quick Problem Identification**: Spot issues faster

## Configuration

### Cargo.toml Example
\`\`\`toml
[package]
name = "my-project"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }

[dev-dependencies]
criterion = "0.5"

[profile.dev]
opt-level = 0

[profile.release]
opt-level = 3
lto = true
codegen-units = 1
\`\`\`

### Workspace Settings
Create a \`.vscode/settings.json\` file for project-specific configuration:
\`\`\`json
{
  "rust-analyzer.cargo.features": "all",
  "rust-analyzer.check.command": "clippy",
  "rust-analyzer.checkOnSave.allTargets": true,
  "editor.formatOnSave": true
}
\`\`\`

### Launch Configuration
Create a \`.vscode/launch.json\` for debugging:
\`\`\`json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "Debug executable 'my-project'",
      "cargo": {
        "args": [
          "build",
          "--bin=my-project",
          "--package=my-project"
        ],
        "filter": {
          "name": "my-project",
          "kind": "bin"
        }
      },
      "args": [],
      "cwd": "\${workspaceFolder}"
    },
    {
      "type": "lldb",
      "request": "launch",
      "name": "Debug unit tests",
      "cargo": {
        "args": [
          "test",
          "--no-run",
          "--lib",
          "--package=my-project"
        ],
        "filter": {
          "name": "my-project",
          "kind": "lib"
        }
      },
      "args": [],
      "cwd": "\${workspaceFolder}"
    }
  ]
}
\`\`\`

## Usage Tips

### Keyboard Shortcuts
- **Ctrl+Shift+B**: Run project (\`cargo run\`)
- **Ctrl+Shift+T**: Open Cargo.toml
- **Ctrl+Shift+D**: Open Rust documentation
- **F5**: Start debugging
- **F12**: Go to definition
- **Shift+F12**: Find all references
- **F2**: Rename symbol
- **Ctrl+.**: Quick fix / code actions

### Code Lenses
Click on code lenses above functions to:
- **Run**: Execute the function/example
- **Debug**: Debug the function/test
- **Test**: Run specific test
- **▶ Run**: Run main function

### Code Snippets
Type these prefixes and press Tab:
- \`main\` - Main function
- \`fn\` - Function definition
- \`struct\` - Struct definition
- \`impl\` - Implementation block
- \`test\` - Test function
- \`match\` - Match expression
- \`for\` - For loop

### Inlay Hints
Rust-analyzer shows helpful hints inline:
- **Type Hints**: Variable types
- **Parameter Hints**: Function parameter names
- **Chaining Hints**: Method chain types

You can toggle hints with: Ctrl+Shift+P > "Toggle Inlay Hints"

## Cargo Commands

### Build and Run
\`\`\`bash
# Build project
cargo build

# Build with optimizations
cargo build --release

# Run project
cargo run

# Run with arguments
cargo run -- arg1 arg2

# Check for errors (faster than build)
cargo check
\`\`\`

### Testing
\`\`\`bash
# Run all tests
cargo test

# Run specific test
cargo test test_name

# Run tests with output
cargo test -- --nocapture

# Run benchmarks
cargo bench
\`\`\`

### Code Quality
\`\`\`bash
# Lint with Clippy
cargo clippy

# Format code
cargo fmt

# Check formatting without modifying
cargo fmt -- --check
\`\`\`

### Documentation
\`\`\`bash
# Build and open documentation
cargo doc --open

# Build docs for dependencies
cargo doc --no-deps
\`\`\`

### Dependencies
\`\`\`bash
# Add dependency
cargo add serde

# Remove dependency
cargo rm serde

# Update dependencies
cargo update

# Check for outdated dependencies
cargo outdated
\`\`\`

## Best Practices

### Project Structure
\`\`\`
my-project/
├── Cargo.toml
├── Cargo.lock
├── src/
│   ├── main.rs          # Binary entry point
│   ├── lib.rs           # Library root
│   ├── bin/             # Additional binaries
│   │   └── tool.rs
│   └── modules/
│       ├── mod.rs
│       └── submodule.rs
├── tests/               # Integration tests
│   └── integration_test.rs
├── benches/             # Benchmarks
│   └── benchmark.rs
└── examples/            # Example code
    └── example.rs
\`\`\`

### Code Organization
- Keep functions small and focused
- Use modules to organize related code
- Prefer composition over inheritance
- Write comprehensive tests
- Document public APIs with /// comments
- Use descriptive error messages

### Error Handling
- Use \`Result<T, E>\` for recoverable errors
- Use \`panic!\` only for unrecoverable errors
- Implement custom error types for libraries
- Use the \`?\` operator for error propagation
- Consider using error handling crates like \`anyhow\` or \`thiserror\`

### Performance
- Profile before optimizing
- Use \`cargo build --release\` for benchmarks
- Consider using \`#[inline]\` for hot paths
- Avoid unnecessary allocations
- Use iterators instead of explicit loops

## Additional Resources

### Official Documentation
- **Rust Book**: https://doc.rust-lang.org/book/
- **Rust by Example**: https://doc.rust-lang.org/rust-by-example/
- **Cargo Book**: https://doc.rust-lang.org/cargo/
- **std Library**: https://doc.rust-lang.org/std/

### Community Resources
- **Rust Forum**: https://users.rust-lang.org/
- **Rust Reddit**: https://reddit.com/r/rust
- **Rust Discord**: https://discord.gg/rust-lang
- **This Week in Rust**: https://this-week-in-rust.org/

### Learning Resources
- **Rustlings**: https://github.com/rust-lang/rustlings
- **Exercism Rust Track**: https://exercism.org/tracks/rust
- **Rust Cookbook**: https://rust-lang-nursery.github.io/rust-cookbook/
- **Awesome Rust**: https://github.com/rust-unofficial/awesome-rust`,

    troubleshooting: `# Troubleshooting Rust Development

## rust-analyzer Issues

### rust-analyzer not working
**Problem**: No completions, errors, or IntelliSense

**Solutions**:
1. **Check rust-analyzer status**
   - Look at the status bar (bottom right)
   - Should show "rust-analyzer: ready"

2. **Restart rust-analyzer**
   - Ctrl+Shift+P > "rust-analyzer: Restart server"

3. **Check Rust installation**
   \`\`\`bash
   rustc --version
   cargo --version
   rustup component list --installed
   \`\`\`

4. **Rebuild project index**
   - Delete \`target/\` directory
   - Run \`cargo check\`
   - Restart rust-analyzer

5. **Check for Cargo.toml**
   - rust-analyzer requires a valid Cargo.toml
   - Ensure you're in a Cargo project directory

### Slow performance
**Problem**: rust-analyzer is slow or unresponsive

**Solutions**:
1. **Disable some features**
   \`\`\`json
   {
     "rust-analyzer.inlayHints.enable": false,
     "rust-analyzer.lens.enable": false
   }
   \`\`\`

2. **Limit features**
   \`\`\`json
   {
     "rust-analyzer.cargo.features": []
   }
   \`\`\`

3. **Increase memory limit**
   - Close other applications
   - Restart VSCode

4. **Exclude target directory**
   \`\`\`json
   {
     "files.watcherExclude": {
       "**/target/**": true
     }
   }
   \`\`\`

### Incorrect errors shown
**Problem**: rust-analyzer shows errors but code compiles

**Solutions**:
1. **Sync with cargo check**
   \`\`\`bash
   cargo clean
   cargo check
   \`\`\`

2. **Update rust-analyzer**
   - Check for extension updates
   - Update VSCode

3. **Check Cargo.toml features**
   - Ensure rust-analyzer uses correct features
   - Set \`rust-analyzer.cargo.features\` if needed

## Debugging Issues

### Breakpoints not hit
**Problem**: Debugger starts but breakpoints don't work

**Solutions**:
1. **Build in debug mode**
   \`\`\`bash
   cargo build  # Not cargo build --release
   \`\`\`

2. **Check launch.json**
   - Ensure correct binary name
   - Verify workspace folder path

3. **Verify debug symbols**
   - Check \`Cargo.toml\` profile settings
   - Ensure \`debug = true\` in profile

4. **Reinstall CodeLLDB**
   - Uninstall and reinstall extension
   - Restart VSCode

### Cannot start debugger
**Problem**: Debugger fails to start

**Solutions**:
1. **Install LLDB**
   - **Linux**: \`sudo apt-get install lldb\`
   - **macOS**: Included with Xcode Command Line Tools
   - **Windows**: CodeLLDB includes LLDB

2. **Check CodeLLDB installation**
   - Verify extension is enabled
   - Check for installation errors

3. **Verify launch configuration**
   - Check \`launch.json\` syntax
   - Ensure cargo paths are correct

4. **Try manual build**
   \`\`\`bash
   cargo build
   # Then debug the binary in target/debug/
   \`\`\`

### Variables not showing
**Problem**: Cannot inspect variables in debugger

**Solutions**:
1. **Enable debug info**
   Add to \`Cargo.toml\`:
   \`\`\`toml
   [profile.dev]
   debug = true
   \`\`\`

2. **Check optimization level**
   - Lower optimization preserves more debug info
   - Use \`opt-level = 0\` for development

3. **Use different visualization**
   - Try "Watch" panel
   - Add variables to watch list

## Compilation Issues

### Linker errors
**Problem**: Linker cannot find libraries

**Solutions**:
1. **Install build tools**
   - **Linux**: \`sudo apt-get install build-essential\`
   - **macOS**: \`xcode-select --install\`
   - **Windows**: Install Visual Studio Build Tools

2. **Check system dependencies**
   \`\`\`bash
   # For Linux, install pkg-config
   sudo apt-get install pkg-config
   \`\`\`

3. **Verify Rust toolchain**
   \`\`\`bash
   rustup show
   rustup default stable
   \`\`\`

### Dependency resolution failed
**Problem**: Cannot download or build dependencies

**Solutions**:
1. **Clear cargo cache**
   \`\`\`bash
   cargo clean
   rm -rf ~/.cargo/registry
   cargo update
   \`\`\`

2. **Check internet connection**
   - Verify access to crates.io
   - Check proxy settings if behind firewall

3. **Use cargo vendor**
   \`\`\`bash
   cargo vendor
   \`\`\`

4. **Check dependency versions**
   - Update Cargo.lock
   - Fix version conflicts

### Out of memory during compilation
**Problem**: Compiler runs out of memory

**Solutions**:
1. **Reduce parallel jobs**
   \`\`\`bash
   cargo build -j 1
   \`\`\`

2. **Increase swap space**
   - Configure system swap

3. **Use incremental compilation**
   \`\`\`toml
   [profile.dev]
   incremental = true
   \`\`\`

4. **Split large dependencies**
   - Use features to reduce compilation size

## Crates Extension Issues

### Version information not showing
**Problem**: crates extension doesn't show versions

**Solutions**:
1. **Check Cargo.toml syntax**
   - Ensure valid TOML format
   - Check dependency declarations

2. **Reload window**
   - Ctrl+Shift+P > "Developer: Reload Window"

3. **Check internet connection**
   - Extension needs access to crates.io

4. **Reinstall extension**
   - Uninstall and reinstall crates extension

## Formatting Issues

### rustfmt not working
**Problem**: Format on save doesn't work

**Solutions**:
1. **Install rustfmt**
   \`\`\`bash
   rustup component add rustfmt
   \`\`\`

2. **Check settings**
   \`\`\`json
   {
     "[rust]": {
       "editor.defaultFormatter": "rust-lang.rust-analyzer",
       "editor.formatOnSave": true
     }
   }
   \`\`\`

3. **Check rustfmt.toml**
   - Verify configuration is valid
   - Try default settings first

4. **Manual format**
   \`\`\`bash
   cargo fmt
   \`\`\`

## Clippy Issues

### Clippy warnings not showing
**Problem**: No clippy warnings in editor

**Solutions**:
1. **Install clippy**
   \`\`\`bash
   rustup component add clippy
   \`\`\`

2. **Configure rust-analyzer**
   \`\`\`json
   {
     "rust-analyzer.check.command": "clippy"
   }
   \`\`\`

3. **Restart rust-analyzer**
   - Ctrl+Shift+P > "rust-analyzer: Restart server"

4. **Run manually**
   \`\`\`bash
   cargo clippy
   \`\`\`

## Performance Optimization

### Build times too long
**Problem**: Compilation takes too long

**Solutions**:
1. **Use incremental compilation**
   \`\`\`toml
   [profile.dev]
   incremental = true
   \`\`\`

2. **Reduce optimization for dev builds**
   \`\`\`toml
   [profile.dev]
   opt-level = 0
   \`\`\`

3. **Use cargo check**
   - Faster than cargo build
   - Only checks, doesn't produce binaries

4. **Parallel compilation**
   \`\`\`bash
   # Use all CPU cores
   cargo build -j $(nproc)
   \`\`\`

5. **Use sccache**
   \`\`\`bash
   cargo install sccache
   export RUSTC_WRAPPER=sccache
   \`\`\`

## General Tips

### Clear cargo cache
\`\`\`bash
# Remove target directory
cargo clean

# Remove all build artifacts and registry cache
rm -rf target/
rm -rf ~/.cargo/registry/
rm -rf ~/.cargo/git/
\`\`\`

### Update everything
\`\`\`bash
# Update Rust toolchain
rustup update

# Update dependencies
cargo update

# Update VSCode extensions
# Extensions > ... > Check for Extension Updates
\`\`\`

### Get help
- Check rust-analyzer logs: Output panel > rust-analyzer
- Check CodeLLDB logs: Output panel > CodeLLDB
- Search existing issues on GitHub
- Ask on Rust forum or Discord

### Workspace vs User settings
- **Workspace settings**: \`.vscode/settings.json\` (project-specific)
- **User settings**: Global VSCode settings
- Workspace settings override user settings`,
  },
};
