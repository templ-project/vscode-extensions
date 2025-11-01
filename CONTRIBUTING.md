# Contributing to VSCode Extension Pack Builder

Welcome! This guide provides comprehensive information on how to develop, build, test, and contribute to this project. Whether you're fixing a bug, adding a new language extension pack, or improving the build system, this document will help you understand the entire development process.

## Table of Contents

- [Contributing to VSCode Extension Pack Builder](#contributing-to-vscode-extension-pack-builder)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
  - [Project Architecture](#project-architecture)
    - [High-Level Overview](#high-level-overview)
    - [Core Modules](#core-modules)
    - [Directory Structure](#directory-structure)
  - [Development Environment Setup](#development-environment-setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [IDE Setup (VSCode)](#ide-setup-vscode)
  - [Understanding the Codebase](#understanding-the-codebase)
    - [Data Flow](#data-flow)
    - [Key Concepts](#key-concepts)
      - [Collection](#collection)
      - [Extension](#extension)
      - [Setting](#setting)
      - [Snippet](#snippet)
    - [Template System](#template-system)
  - [Adding a New Language Extension Pack](#adding-a-new-language-extension-pack)
    - [Step-by-Step Guide](#step-by-step-guide)
      - [Step 1: Define Individual Extensions](#step-1-define-individual-extensions)
      - [Step 2: Create VSCode Collection Configuration](#step-2-create-vscode-collection-configuration)
      - [Step 3: Create VSCodium Collection Configuration](#step-3-create-vscodium-collection-configuration)
      - [Step 4: Add Logo](#step-4-add-logo)
      - [Step 5: Update Taskfile.yml](#step-5-update-taskfileyml)
      - [Step 6: Build and Test](#step-6-build-and-test)
      - [Step 7: Run Tests](#step-7-run-tests)
      - [Step 8: Commit Changes](#step-8-commit-changes)
  - [Working with Extensions](#working-with-extensions)
    - [Finding Extensions](#finding-extensions)
    - [Extension ID Format](#extension-id-format)
    - [Extension Metadata](#extension-metadata)
    - [Checking Extension Availability](#checking-extension-availability)
    - [Dual Marketplace Strategy](#dual-marketplace-strategy)
  - [Configuration Reference](#configuration-reference)
    - [Collection Interface](#collection-interface)
    - [Settings Best Practices](#settings-best-practices)
    - [Keybindings Best Practices](#keybindings-best-practices)
    - [Generic Snippets Reference](#generic-snippets-reference)
      - [Universal Snippets (All Languages)](#universal-snippets-all-languages)
      - [Object-Oriented Snippets](#object-oriented-snippets)
      - [Struct-Based Snippets](#struct-based-snippets)
      - [Error Handling Snippets](#error-handling-snippets)
      - [Module/Import Snippets](#moduleimport-snippets)
      - [Async/Concurrency Snippets](#asyncconcurrency-snippets)
      - [Language Support Matrix](#language-support-matrix)
      - [Snippet Guidelines](#snippet-guidelines)
    - [Snippets Best Practices](#snippets-best-practices)
    - [Documentation Best Practices](#documentation-best-practices)
  - [Build System](#build-system)
    - [Build Process Overview](#build-process-overview)
    - [Template Context](#template-context)
    - [Version Preservation](#version-preservation)
    - [Custom Template Helpers](#custom-template-helpers)
  - [Testing](#testing)
    - [Test Structure](#test-structure)
    - [Running Tests](#running-tests)
    - [Writing Tests](#writing-tests)
    - [Test Coverage](#test-coverage)
  - [Publishing](#publishing)
    - [Publishing to VSCode Marketplace](#publishing-to-vscode-marketplace)
    - [Publishing to Open VSX](#publishing-to-open-vsx)
    - [Publishing to Both Marketplaces](#publishing-to-both-marketplaces)
    - [Error Handling](#error-handling)
  - [CI/CD Workflow](#cicd-workflow)
    - [GitHub Actions Workflow](#github-actions-workflow)
    - [Conventional Commits](#conventional-commits)
    - [Required Secrets](#required-secrets)
    - [Local CI Testing](#local-ci-testing)
  - [Code Style and Standards](#code-style-and-standards)
    - [TypeScript](#typescript)
    - [Formatting](#formatting)
    - [Linting](#linting)
    - [Commit Messages](#commit-messages)
    - [File Naming](#file-naming)
    - [Code Organization](#code-organization)
    - [Documentation](#documentation)
  - [Troubleshooting Development Issues](#troubleshooting-development-issues)
    - [Build Errors](#build-errors)
      - [Module Not Found](#module-not-found)
      - [Validation Errors](#validation-errors)
      - [Template Rendering Errors](#template-rendering-errors)
    - [Test Failures](#test-failures)
      - [Import Errors in Tests](#import-errors-in-tests)
      - [Test Timeouts](#test-timeouts)
    - [Runtime Errors](#runtime-errors)
      - [Logo Not Found](#logo-not-found)
      - [Version Preservation Not Working](#version-preservation-not-working)
    - [Publishing Errors](#publishing-errors)
      - [Authentication Failed](#authentication-failed)
      - [Network Timeout](#network-timeout)
    - [Performance Issues](#performance-issues)
      - [Slow Builds](#slow-builds)
      - [High Memory Usage](#high-memory-usage)
  - [Getting Help](#getting-help)
    - [Resources](#resources)
    - [Asking Questions](#asking-questions)
    - [Contributing Improvements](#contributing-improvements)
  - [Conclusion](#conclusion)

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/templ-project/vscode-extensions.git
cd vscode-extensions

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. Run tests
npm test

# 5. Build a sample extension pack
task build:extension EXTENSION=cpp
```

---

## Project Architecture

### High-Level Overview

```
┌─────────────────────┐
│ TypeScript Configs  │  Extension pack definitions
│  (config/)          │  - Extensions list
└──────────┬──────────┘  - Settings
           │             - Snippets
           │             - Keybindings
           ↓
┌─────────────────────┐
│   ConfigLoader      │  Loads & validates configurations
│  (src/config/)      │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│ ExtensionPackBuilder│  Orchestrates build process
│  (src/build/)       │  - Generates files from templates
└──────────┬──────────┘  - Preserves versions
           │             - Copies logos
           │             - Packages .vsix
           ↓
┌─────────────────────┐
│ MarketplacePublisher│  Publishes to marketplaces
│  (src/publish/)     │  - VSCode Marketplace
└─────────────────────┘  - Open VSX Registry
```

### Core Modules

1. **ConfigLoader** (`src/config/ConfigLoader.ts`)
   - Dynamically imports TypeScript configuration files
   - Validates using Zod schemas
   - Caches loaded configs for performance

2. **ExtensionPackBuilder** (`src/build/ExtensionPackBuilder.ts`)
   - Reads existing package.json to preserve versions
   - Generates all required files using templates
   - Copies logo files
   - Packages everything into .vsix files using @vscode/vsce

3. **TemplateGenerator** (`src/build/TemplateGenerator.ts`)
   - Compiles and caches Handlebars templates
   - Renders templates with context data
   - Registers custom Handlebars helpers

4. **MarketplacePublisher** (`src/publish/MarketplacePublisher.ts`)
   - Publishes .vsix files to VSCode Marketplace
   - Publishes .vsix files to Open VSX Registry
   - Handles authentication and error reporting
   - Only suppresses version conflicts (already published)

5. **ErrorReporter** (`src/error-reporter.ts`)
   - Formats errors with Problem/Cause/Fix/Docs structure
   - Categorizes errors (Configuration, Build, Publish, etc.)
   - Provides actionable guidance

### Directory Structure

```
vscode-extensions/
├── config/                      # Extension pack configurations
│   ├── collections/             # Extension pack definitions
│   │   ├── vscode/              # VSCode Marketplace versions
│   │   │   ├── cpp.ts
│   │   │   ├── python.ts
│   │   │   ├── typescript.ts
│   │   │   └── ...
│   │   └── vscodium/            # Open VSX Registry versions
│   │       ├── cpp.ts
│   │       ├── python.ts
│   │       └── ...
│   ├── extensions/              # Individual extension definitions
│   │   ├── cpp/
│   │   │   └── index.ts         # clangd, cmake, clang-format definitions
│   │   ├── python/
│   │   │   └── index.ts         # Python, Black, isort definitions
│   │   └── ...
│   └── shared/
│       └── types.ts             # TypeScript interfaces
│
├── src/                         # Source code
│   ├── config/                  # Configuration loading & validation
│   │   ├── ConfigLoader.ts
│   │   ├── schemas.ts           # Zod validation schemas
│   │   └── types.ts
│   ├── build/                   # Build system
│   │   ├── ExtensionPackBuilder.ts
│   │   ├── TemplateGenerator.ts
│   │   └── version-utils.ts
│   ├── publish/                 # Publishing system
│   │   ├── MarketplacePublisher.ts
│   │   └── types.ts
│   ├── index.ts                 # CLI entry point
│   ├── logger.ts                # Pino logger
│   ├── errors.ts                # Custom error classes
│   └── error-reporter.ts        # Error formatting
│
├── templates/                   # Handlebars templates
│   ├── package.json.handlebars  # Extension manifest
│   ├── README.md.handlebars     # Documentation
│   ├── CHANGELOG.md.handlebars
│   ├── settings.json.handlebars # VSCode settings
│   ├── keybindings.json.handlebars
│   ├── snippets.json.handlebars # Code snippets
│   └── extension.ts.handlebars  # Extension entry point
│
├── tests/                       # Test suite (Vitest)
│   ├── config/                  # ConfigLoader tests
│   ├── build/                   # Builder tests
│   └── publish/                 # Publisher tests
│
├── logos/                       # Extension pack logos (128x128 PNG)
│   ├── cpp-128.png
│   ├── python-128.png
│   └── ...
│
├── packages/                    # Generated extension packs (build output)
│   ├── vscode/
│   │   ├── cpp/
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   ├── logo.png
│   │   │   └── ...
│   │   └── ...
│   └── vscodium/
│       └── ...
│
└── dist/                        # Packaged .vsix files
    ├── vscode/
    │   ├── tpl-vscode-cpp-1.0.0.vsix
    │   └── ...
    └── vscodium/
        ├── tpl-vscodium-cpp-1.0.0.vsix
        └── ...
```

---

## Development Environment Setup

### Prerequisites

- **Node.js** ≥ 20.0.0 (LTS recommended)
- **Task CLI** for build orchestration ([installation guide](https://taskfile.dev/installation/))
- **Git** for version control
- **VSCode** (optional, for development)

### Installation

```bash
# Install Node.js dependencies
npm install

# Build TypeScript code
npm run build

# Verify installation
task --list
```

### Environment Variables

For development, you typically don't need marketplace tokens unless testing publishing:

```bash
# Optional: For testing publishing to VSCode Marketplace
export VSCODE_TOKEN="your-vscode-marketplace-pat"

# Optional: For testing publishing to Open VSX
export OPENVSX_TOKEN="your-openvsx-pat"

# Optional: Set logging level (default: info)
export LOG_LEVEL="debug"  # Options: trace, debug, info, warn, error, fatal
```

### IDE Setup (VSCode)

Recommended extensions for development:

1. **ESLint** - Code linting
2. **Prettier** - Code formatting
3. **TypeScript + JavaScript** - Language support
4. **Vitest** - Test runner integration
5. **Task** - Taskfile.yml syntax support

The project includes `.vscode/settings.json` with recommended settings.

---

## Understanding the Codebase

### Data Flow

1. **Configuration Loading**

   ```
   config/collections/vscode/cpp.ts
   ↓
   ConfigLoader.load()
   ↓
   Zod validation (schemas.ts)
   ↓
   Validated Collection object
   ```

2. **Build Process**

   ```
   Collection object
   ↓
   ExtensionPackBuilder.build()
   ↓
   Read existing package.json (preserve version)
   ↓
   Generate files from templates
   ↓
   Copy logo file
   ↓
   Package .vsix file
   ```

3. **Publishing**
   ```
   .vsix file
   ↓
   MarketplacePublisher.publish()
   ↓
   Check if version already exists
   ↓
   Upload to marketplace(s)
   ↓
   Verify availability (Open VSX only)
   ```

### Key Concepts

#### Collection

A `Collection` represents a complete extension pack configuration:

```typescript
interface Collection {
  description: string; // Pack description
  tags: string[]; // Keywords for marketplace
  required_extensions: Extension[]; // Must-have extensions
  optional_extensions: Extension[]; // Nice-to-have extensions
  settings: Record<string, Setting>; // VSCode settings
  keybindings: Keybinding[]; // Keyboard shortcuts
  snippets: Snippet[]; // Code snippets
  documentation: Documentation; // Setup guide & troubleshooting
}
```

#### Extension

An `Extension` represents a single VSCode extension:

```typescript
interface Extension {
  id: string; // e.g., 'llvm-vs-code-extensions.vscode-clangd'
  name: string; // e.g., 'clangd'
  description: string; // What this extension does
  publisher: string; // e.g., 'llvm-vs-code-extensions'
  license: string; // e.g., 'MIT'
  marketplace_url?: string; // Full marketplace URL
  why_required?: string; // Why this extension is essential
  why_recommended?: string; // Why this extension is optional but useful
}
```

#### Setting

A `Setting` represents a VSCode configuration:

```typescript
interface Setting {
  value: unknown; // The actual setting value (any type)
  description: string; // Human-readable explanation
  scope: "user" | "workspace"; // Where this setting applies
}
```

#### Snippet

A `Snippet` represents a code snippet:

```typescript
interface Snippet {
  name: string; // Unique identifier (e.g., 'class')
  prefix: string; // Trigger text (e.g., 'class')
  description: string; // What this snippet creates
  body: string | string[]; // Template code (string or array of lines)
}
```

### Template System

Templates use Handlebars syntax with custom helpers:

**Custom Helpers:**

- `{{json value}}` - Serialize to JSON
- `{{hasKeys object}}` - Check if object has keys
- `{{capitalizedIde}}` - Capitalize IDE name (VSCode → VSCode)
- `{{cliCommand}}` - Get CLI command based on IDE (code vs codium)

**Example Template Usage:**

```handlebars
{{! package.json.handlebars }}
{ "name": "tpl-{{ide}}-{{language}}", "displayName": "{{capitalizedIde}}
{{language}}
Extension Pack", "version": "{{version}}", "extensionPack": [
{{#each requiredExtensions}}
  "{{this.id}}"{{#unless @last}},{{/unless}}
{{/each}}
] }
```

---

## Adding a New Language Extension Pack

### Step-by-Step Guide

Let's add a Rust extension pack as an example.

#### Step 1: Define Individual Extensions

Create `config/extensions/rust/index.ts`:

```typescript
import { Extension } from "../../shared/types";

// Base extension definitions
const baseRustAnalyzer: Extension = {
  id: "rust-lang.rust-analyzer",
  name: "rust-analyzer",
  description: "Official Rust language server",
  publisher: "rust-lang",
  license: "MIT OR Apache-2.0",
  why_required: "Provides IntelliSense, code completion, and refactoring for Rust",
};

const baseCodeLLDB: Extension = {
  id: "vadimcn.vscode-lldb",
  name: "CodeLLDB",
  description: "Native debugger based on LLDB",
  publisher: "vadimcn",
  license: "MIT",
  why_required: "Essential for debugging Rust applications",
};

const baseCratesToml: Extension = {
  id: "serayuzgur.crates",
  name: "crates",
  description: "Cargo.toml dependency management",
  publisher: "serayuzgur",
  license: "MIT",
  why_recommended: "Helps manage Cargo dependencies with version checking",
};

// VSCode Marketplace versions
export const rustAnalyzer: Extension = {
  ...baseRustAnalyzer,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer",
};

export const codeLLDB: Extension = {
  ...baseCodeLLDB,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb",
};

export const cratesToml: Extension = {
  ...baseCratesToml,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=serayuzgur.crates",
};

// VSCodium (Open VSX) versions
export const rustAnalyzerVSCodium: Extension = {
  ...baseRustAnalyzer,
  marketplace_url: "https://open-vsx.org/extension/rust-lang/rust-analyzer",
};

export const codeLLDBVSCodium: Extension = {
  ...baseCodeLLDB,
  marketplace_url: "https://open-vsx.org/extension/vadimcn/vscode-lldb",
};

export const cratesTomlVSCodium: Extension = {
  ...baseCratesToml,
  marketplace_url: "https://open-vsx.org/extension/serayuzgur/crates",
};
```

#### Step 2: Create VSCode Collection Configuration

Create `config/collections/vscode/rust.ts`:

```typescript
import { Collection } from "../../shared/types";
import { rustAnalyzer, codeLLDB, cratesToml } from "../../extensions/rust";

export const rust: Collection = {
  description: "Essential Rust development environment for VSCode - comprehensive tooling for modern Rust development",

  tags: ["rust", "cargo", "development", "testing", "debugging", "systems-programming"],

  required_extensions: [rustAnalyzer, codeLLDB],

  optional_extensions: [cratesToml],

  settings: {
    // Rust Analyzer settings
    "rust-analyzer.check.command": {
      value: "clippy",
      description: "Use clippy for better linting (requires: rustup component add clippy)",
      scope: "workspace",
    },
    "rust-analyzer.cargo.features": {
      value: "all",
      description: "Enable all Cargo features for completions",
      scope: "workspace",
    },
    "rust-analyzer.inlayHints.parameterHints.enable": {
      value: true,
      description: "Show parameter hints inline",
      scope: "workspace",
    },

    // Editor settings for Rust
    "[rust]": {
      value: {
        "editor.defaultFormatter": "rust-lang.rust-analyzer",
        "editor.formatOnSave": true,
        "editor.rulers": [100],
      },
      description: "Rust-specific editor configuration",
      scope: "workspace",
    },
  },

  keybindings: [
    {
      key: "ctrl+shift+b",
      command: "rust-analyzer.run",
      description: "Run Rust project",
      when: "editorLangId == rust",
    },
    {
      key: "ctrl+shift+t",
      command: "rust-analyzer.openCargoToml",
      description: "Open Cargo.toml",
      when: "editorLangId == rust",
    },
  ],

  snippets: [
    {
      name: "main",
      prefix: "main",
      description: "Main function",
      body: ["fn main() {", '    ${1:println!("Hello, world!");}', "}"],
    },
    {
      name: "struct",
      prefix: "struct",
      description: "Struct definition",
      body: ["struct ${1:Name} {", "    ${2:field}: ${3:Type},", "}"],
    },
    {
      name: "impl",
      prefix: "impl",
      description: "Implementation block",
      body: [
        "impl ${1:Name} {",
        "    pub fn ${2:new}(${3:args}) -> Self {",
        "        Self {",
        "            ${4:field}: ${5:value},",
        "        }",
        "    }",
        "}",
      ],
    },
    {
      name: "test",
      prefix: "test",
      description: "Test function",
      body: ["#[test]", "fn ${1:test_name}() {", "    ${2:assert_eq!(1 + 1, 2);}", "}"],
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

### Install Clippy (optional, but recommended)
\`\`\`bash
rustup component add clippy
\`\`\`

### Install rustfmt (optional, for formatting)
\`\`\`bash
rustup component add rustfmt
\`\`\`

## Quick Start

1. Install this extension pack
2. Open or create a Rust project (\`cargo new my-project\`)
3. Open the project folder in VSCode
4. rust-analyzer will automatically start analyzing your code
5. Start coding! IntelliSense and code completion will work automatically

## Features

### Code Completion
- Intelligent code completion for Rust
- Import suggestions
- Type inference

### Debugging
- Set breakpoints in Rust code
- Step through code execution
- Inspect variables and call stack

### Code Actions
- Automatic imports
- Extract function/variable
- Inline variable
- Generate implementation stubs

### Cargo Integration
- Run cargo commands from the command palette
- Build and run projects
- Execute tests
- Manage dependencies

## Recommended Workflow

1. **Create new project**: \`cargo new project-name\`
2. **Open in VSCode**: \`code project-name\`
3. **Edit code**: Edit \`src/main.rs\` or other files
4. **Build**: Press \`Ctrl+Shift+B\` or run \`cargo build\`
5. **Run**: Press \`F5\` or run \`cargo run\`
6. **Test**: Run \`cargo test\`

## Additional Resources

- [Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
- [Cargo Guide](https://doc.rust-lang.org/cargo/)
- [rust-analyzer User Manual](https://rust-analyzer.github.io/manual.html)
`,
    troubleshooting: `# Troubleshooting

## rust-analyzer not working

### Problem
rust-analyzer doesn't provide completions or shows errors

### Solutions

1. **Check Rust installation**
   \`\`\`bash
   rustc --version
   cargo --version
   \`\`\`

2. **Reload rust-analyzer**
   - Open Command Palette (\`Ctrl+Shift+P\`)
   - Run: "rust-analyzer: Restart Server"

3. **Check cargo.toml**
   - Ensure your Cargo.toml is valid
   - Run \`cargo check\` to verify project builds

4. **Update rust-analyzer**
   - Open Extensions view
   - Check for updates to rust-analyzer extension

## Debugging not working

### Problem
Breakpoints don't hit or debugger doesn't start

### Solutions

1. **Install LLDB**
   - Linux: \`sudo apt-get install lldb\`
   - macOS: Included with Xcode Command Line Tools
   - Windows: Installed automatically by CodeLLDB

2. **Check launch configuration**
   - Create \`.vscode/launch.json\` if it doesn't exist
   - Ensure "type": "lldb" is set

3. **Build in debug mode**
   \`\`\`bash
   cargo build
   # Not: cargo build --release
   \`\`\`

## Performance issues

### Problem
rust-analyzer is slow or consumes lots of resources

### Solutions

1. **Disable unused features**
   \`\`\`json
   {
     "rust-analyzer.inlayHints.enable": false,
     "rust-analyzer.checkOnSave.enable": false
   }
   \`\`\`

2. **Increase check interval**
   \`\`\`json
   {
     "rust-analyzer.checkOnSave.checkOnSave": false
   }
   \`\`\`

3. **Exclude target directory**
   - Add \`target/\` to \`.gitignore\`
   - Add \`target/\` to VSCode's \`files.exclude\` setting
`,
  },
};
```

#### Step 3: Create VSCodium Collection Configuration

Create `config/collections/vscodium/rust.ts`:

```typescript
import { Collection } from "../../shared/types";
import { rustAnalyzerVSCodium, codeLLDBVSCodium, cratesTomlVSCodium } from "../../extensions/rust";

export const rust: Collection = {
  // Same as VSCode version, but with VSCodium extension references
  description:
    "Essential Rust development environment for VSCodium - comprehensive tooling for modern Rust development",

  tags: ["rust", "cargo", "development", "testing", "debugging", "systems-programming"],

  required_extensions: [rustAnalyzerVSCodium, codeLLDBVSCodium],

  optional_extensions: [cratesTomlVSCodium],

  // Settings, keybindings, snippets, and documentation are the same
  // Copy from vscode/rust.ts
  settings: {
    /* ... same as VSCode ... */
  },
  keybindings: [
    /* ... same as VSCode ... */
  ],
  snippets: [
    /* ... same as VSCode ... */
  ],
  documentation: {
    /* ... same as VSCode ... */
  },
};
```

#### Step 4: Add Logo

Add `logos/rust-128.png` (128x128 pixels, PNG format).

Tips for logo creation:

- Use official language/framework logos when possible
- Ensure the logo is clear at 128x128 resolution
- Use transparent background (PNG with alpha channel)
- Keep file size reasonable (<50KB)

#### Step 5: Update Taskfile.yml

Add tasks for building the new extension pack:

```yaml
# Add to Taskfile.yml under build:extension section
tasks:
  # ... existing tasks ...

  build:extension:rust:
    desc: Build Rust extension pack for both IDEs
    deps:
      - build:extension:rust:vscode
      - build:extension:rust:vscodium

  build:extension:rust:vscode:
    desc: Build Rust extension pack for VSCode
    cmds:
      - task: build:extension:ide
        vars:
          IDE: vscode
          EXTENSION: rust

  build:extension:rust:vscodium:
    desc: Build Rust extension pack for VSCodium
    cmds:
      - task: build:extension:ide
        vars:
          IDE: vscodium
          EXTENSION: rust
```

#### Step 6: Build and Test

```bash
# Build the Rust extension pack
task build:extension EXTENSION=rust

# Check generated files
ls -la packages/vscode/rust/
ls -la packages/vscodium/rust/

# Check .vsix packages
ls -la dist/vscode/tpl-vscode-rust-*.vsix
ls -la dist/vscodium/tpl-vscodium-rust-*.vsix

# Test installation (optional)
code --install-extension dist/vscode/tpl-vscode-rust-1.0.0.vsix
```

#### Step 7: Run Tests

```bash
# Run all tests
npm test

# Run specific tests for the build system
npm test -- tests/build/

# Run tests in watch mode while developing
npm run test:watch
```

#### Step 8: Commit Changes

```bash
# Add files
git add config/collections/vscode/rust.ts
git add config/collections/vscodium/rust.ts
git add config/extensions/rust/index.ts
git add logos/rust-128.png
git add Taskfile.yml

# Commit with conventional commit message
git commit -m "feat: add Rust extension pack

- Add rust-analyzer, CodeLLDB, and crates extensions
- Configure Rust-specific settings and keybindings
- Include common Rust code snippets
- Add comprehensive setup guide and troubleshooting"

# Push to your fork
git push origin feature/rust-extension-pack
```

---

## Working with Extensions

### Finding Extensions

1. **VSCode Marketplace**: https://marketplace.visualstudio.com/
2. **Open VSX Registry**: https://open-vsx.org/

### Extension ID Format

Extension IDs follow the format: `publisher.extension-name`

Examples:

- `ms-python.python`
- `rust-lang.rust-analyzer`
- `llvm-vs-code-extensions.vscode-clangd`

### Extension Metadata

When defining extensions, include:

```typescript
const extension: Extension = {
  id: "publisher.extension-name",
  name: "Human Readable Name",
  description: "Clear description of what this extension does",
  publisher: "publisher",
  license: "MIT", // Check extension's LICENSE file
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=publisher.extension-name",
  why_required: "Explain why this is essential", // For required extensions
  why_recommended: "Explain the benefits", // For optional extensions
};
```

### Checking Extension Availability

**VSCode Marketplace**: Extensions are usually available.

**Open VSX**: Not all extensions are available. Check:

1. Visit https://open-vsx.org/
2. Search for the extension
3. If not found, the extension cannot be included in VSCodium packs

### Dual Marketplace Strategy

For each extension, create two versions:

1. **VSCode version** - with VSCode Marketplace URL
2. **VSCodium version** - with Open VSX URL

This allows the same extension pack to work on both platforms.

---

## Configuration Reference

### Collection Interface

Complete reference for the `Collection` interface:

```typescript
interface Collection {
  // Basic Information
  description: string; // Short description for marketplace (max 200 chars)
  tags: string[]; // Keywords for search (5-10 recommended)

  // Extensions
  required_extensions: Extension[]; // Must-have extensions (5-15 recommended)
  optional_extensions: Extension[]; // Nice-to-have extensions (0-10 recommended)

  // Configuration
  settings: Record<string, Setting>; // VSCode settings (5-20 recommended)
  keybindings: Keybinding[]; // Keyboard shortcuts (0-10 recommended)
  snippets: Snippet[]; // Code snippets (5-20 recommended)

  // Documentation
  documentation: Documentation; // Setup guide and troubleshooting
}
```

### Settings Best Practices

1. **Scope Properly**
   - Use `workspace` for project-specific settings
   - Use `user` for personal preferences

2. **Provide Context**
   - Always include a clear description
   - Explain the impact of the setting

3. **Use Reasonable Defaults**
   - Choose values that work for most users
   - Document how to customize

Example:

```typescript
settings: {
  'editor.formatOnSave': {
    value: true,
    description: 'Automatically format code when saving files',
    scope: 'workspace',
  },
  'files.autoSave': {
    value: 'onFocusChange',
    description: 'Auto-save files when switching editors',
    scope: 'user',
  },
}
```

### Keybindings Best Practices

1. **Avoid Conflicts**
   - Check existing VSCode keybindings
   - Use language-specific `when` clauses

2. **Follow Conventions**
   - `Ctrl+Shift+B` for build
   - `F5` for run/debug
   - `Ctrl+Shift+T` for test

3. **Add Context**
   - Use descriptive descriptions
   - Include `when` clauses for context-awareness

Example:

```typescript
keybindings: [
  {
    key: "ctrl+shift+b",
    command: "rust-analyzer.run",
    description: "Run Rust project",
    when: "editorLangId == rust", // Only active in Rust files
  },
];
```

### Generic Snippets Reference

When creating snippet collections for different languages, use these common snippet patterns where applicable. **Not all languages support all snippet types** - use the language support matrix below to determine which snippets to include.

#### Universal Snippets (All Languages)

These snippets work across all programming languages:

**1. Function/Method Definition**

- **Prefix**: `fn`, `func`, `function`, `def` (language-dependent)
- **Purpose**: Define a new function or method
- **Supported**: All languages
- **Example**:
  ```typescript
  {
    name: 'function',
    prefix: 'fn',
    description: 'Define a function',
    body: [
      'function ${1:name}(${2:params}) {',
      '\t${3:// body}',
      '}'
    ]
  }
  ```

**2. If Statement**

- **Prefix**: `if`
- **Purpose**: Conditional execution
- **Supported**: All languages
- **Example**:
  ```typescript
  {
    name: 'if_statement',
    prefix: 'if',
    description: 'If statement',
    body: [
      'if (${1:condition}) {',
      '\t${2:// body}',
      '}'
    ]
  }
  ```

**3. If-Else Statement**

- **Prefix**: `ifelse`, `ife`
- **Purpose**: Conditional with alternative branch
- **Supported**: All languages
- **Example**:
  ```typescript
  {
    name: 'if_else',
    prefix: 'ifelse',
    description: 'If-else statement',
    body: [
      'if (${1:condition}) {',
      '\t${2:// if body}',
      '} else {',
      '\t${3:// else body}',
      '}'
    ]
  }
  ```

**4. For Loop**

- **Prefix**: `for`
- **Purpose**: Iteration
- **Supported**: All languages (syntax varies)
- **Example**:
  ```typescript
  {
    name: 'for_loop',
    prefix: 'for',
    description: 'For loop',
    body: [
      'for (${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {',
      '\t${3:// body}',
      '}'
    ]
  }
  ```

**5. While Loop**

- **Prefix**: `while`
- **Purpose**: Conditional iteration
- **Supported**: All languages
- **Example**:
  ```typescript
  {
    name: 'while_loop',
    prefix: 'while',
    description: 'While loop',
    body: [
      'while (${1:condition}) {',
      '\t${2:// body}',
      '}'
    ]
  }
  ```

**6. Test Function**

- **Prefix**: `test`, `tst`
- **Purpose**: Unit test definition
- **Supported**: All languages (framework-dependent)
- **Example**:
  ```typescript
  {
    name: 'test',
    prefix: 'test',
    description: 'Test function',
    body: [
      'test("${1:description}", () => {',
      '\t${2:// test body}',
      '});'
    ]
  }
  ```

**7. Comment Block**

- **Prefix**: `comment`, `doc`
- **Purpose**: Documentation comment
- **Supported**: All languages (syntax varies)

#### Object-Oriented Snippets

These snippets apply to object-oriented languages:

**1. Class Definition**

- **Prefix**: `class`, `cls`
- **Purpose**: Define a new class
- **Supported**: ✅ C++, C#, Python, JavaScript, TypeScript, Java, Godot (GDScript), Kotlin, Swift
- **Not Supported**: ❌ C (no classes), Go (struct-based), Rust (struct + impl), Zig (struct-based)
- **Example**:
  ```typescript
  {
    name: 'class',
    prefix: 'class',
    description: 'Class definition',
    body: [
      'class ${1:ClassName} {',
      '\tconstructor(${2:params}) {',
      '\t\t${3:// constructor body}',
      '\t}',
      '',
      '\t${4:// methods}',
      '}'
    ]
  }
  ```

**2. Interface Definition**

- **Prefix**: `interface`, `iface`
- **Purpose**: Define a contract/interface
- **Supported**: ✅ TypeScript, C#, Java, Go, Kotlin, Swift
- **Not Supported**: ❌ C, C++ (abstract classes instead), Python (duck typing), JavaScript (no native interfaces)
- **Note**: Go uses interface differently (implicit implementation)
- **Example**:
  ```typescript
  {
    name: 'interface',
    prefix: 'interface',
    description: 'Interface definition',
    body: [
      'interface ${1:InterfaceName} {',
      '\t${2:// members}',
      '}'
    ]
  }
  ```

**3. Method Definition**

- **Prefix**: `method`, `met`
- **Purpose**: Class method
- **Supported**: ✅ All OOP languages
- **Example**:
  ```typescript
  {
    name: 'method',
    prefix: 'method',
    description: 'Class method',
    body: [
      '${1:methodName}(${2:params}) {',
      '\t${3:// body}',
      '}'
    ]
  }
  ```

#### Struct-Based Snippets

These snippets apply to languages with struct support:

**1. Struct Definition**

- **Prefix**: `struct`, `st`
- **Purpose**: Define a data structure
- **Supported**: ✅ C, C++, Go, Rust, Zig, Swift
- **Not Supported**: ❌ Python, JavaScript, TypeScript, Java (class-based)
- **Note**: In C++ and Swift, structs are similar to classes
- **Example**:
  ```typescript
  {
    name: 'struct',
    prefix: 'struct',
    description: 'Struct definition',
    body: [
      'struct ${1:StructName} {',
      '\t${2:// fields}',
      '};'
    ]
  }
  ```

**2. Enum Definition**

- **Prefix**: `enum`, `en`
- **Purpose**: Define enumeration
- **Supported**: ✅ C, C++, C#, Java, TypeScript, Rust, Go, Swift, Kotlin
- **Not Supported**: ❌ Python (uses class-based Enum), JavaScript (no native enums)
- **Example**:
  ```typescript
  {
    name: 'enum',
    prefix: 'enum',
    description: 'Enum definition',
    body: [
      'enum ${1:EnumName} {',
      '\t${2:// values}',
      '};'
    ]
  }
  ```

#### Error Handling Snippets

**1. Try-Catch Block**

- **Prefix**: `try`, `trycatch`
- **Purpose**: Exception handling
- **Supported**: ✅ C++, C#, Python, JavaScript, TypeScript, Java, Swift, Kotlin
- **Not Supported**: ❌ Go (error return values), Rust (Result type), C (errno)
- **Example**:
  ```typescript
  {
    name: 'try_catch',
    prefix: 'try',
    description: 'Try-catch block',
    body: [
      'try {',
      '\t${1:// try body}',
      '} catch (${2:error}) {',
      '\t${3:// catch body}',
      '}'
    ]
  }
  ```

**2. Error Checking (Go/Rust style)**

- **Prefix**: `iferr`
- **Purpose**: Error handling without exceptions
- **Supported**: ✅ Go, Rust (Result), C (errno checking)
- **Example for Go**:
  ```typescript
  {
    name: 'error_check',
    prefix: 'iferr',
    description: 'Error checking',
    body: [
      'if err != nil {',
      '\t${1:// handle error}',
      '}'
    ]
  }
  ```

#### Module/Import Snippets

**1. Import Statement**

- **Prefix**: `import`, `imp`
- **Purpose**: Import modules/packages
- **Supported**: All languages (syntax varies)
- **Examples**:
  - Python: `import ${1:module}`
  - JavaScript/TypeScript: `import ${1:name} from '${2:module}';`
  - Go: `import "${1:package}"`
  - C/C++: `#include <${1:header}>`
  - C#: `using ${1:namespace};`

**2. Export/Module Definition**

- **Prefix**: `export`, `module`
- **Purpose**: Export functionality
- **Supported**: JavaScript, TypeScript, Python, Go, Rust

#### Async/Concurrency Snippets

**1. Async Function**

- **Prefix**: `async`, `afn`
- **Purpose**: Asynchronous function
- **Supported**: ✅ JavaScript, TypeScript, Python, C# (async/await), Rust, Swift
- **Not Supported**: ❌ C, C++ (std::async instead), Go (goroutines), Java (CompletableFuture)
- **Example**:
  ```typescript
  {
    name: 'async_function',
    prefix: 'async',
    description: 'Async function',
    body: [
      'async function ${1:name}(${2:params}) {',
      '\t${3:// body}',
      '}'
    ]
  }
  ```

**2. Promise/Future Handling**

- **Prefix**: `then`, `await`
- **Purpose**: Handle async results
- **Supported**: JavaScript, TypeScript, Python, C#, Rust

#### Language Support Matrix

| Snippet Type      | C   | C++ | C#  | Python | JavaScript | TypeScript | Go  | Rust | Java | Godot |
| ----------------- | --- | --- | --- | ------ | ---------- | ---------- | --- | ---- | ---- | ----- |
| **Function**      | ✅  | ✅  | ✅  | ✅     | ✅         | ✅         | ✅  | ✅   | ✅   | ✅    |
| **If/Else**       | ✅  | ✅  | ✅  | ✅     | ✅         | ✅         | ✅  | ✅   | ✅   | ✅    |
| **For Loop**      | ✅  | ✅  | ✅  | ✅     | ✅         | ✅         | ✅  | ✅   | ✅   | ✅    |
| **While Loop**    | ✅  | ✅  | ✅  | ✅     | ✅         | ✅         | ✅  | ✅   | ✅   | ✅    |
| **Class**         | ❌  | ✅  | ✅  | ✅     | ✅         | ✅         | ❌  | ❌   | ✅   | ✅    |
| **Struct**        | ✅  | ✅  | ✅  | ❌     | ❌         | ❌         | ✅  | ✅   | ❌   | ❌    |
| **Interface**     | ❌  | ❌  | ✅  | ❌     | ❌         | ✅         | ✅  | ✅   | ✅   | ❌    |
| **Enum**          | ✅  | ✅  | ✅  | 🟡     | ❌         | ✅         | ✅  | ✅   | ✅   | ✅    |
| **Try-Catch**     | ❌  | ✅  | ✅  | ✅     | ✅         | ✅         | ❌  | ❌   | ✅   | ✅    |
| **Async/Await**   | ❌  | 🟡  | ✅  | ✅     | ✅         | ✅         | 🟡  | ✅   | 🟡   | 🟡    |
| **Test Function** | ✅  | ✅  | ✅  | ✅     | ✅         | ✅         | ✅  | ✅   | ✅   | ✅    |

Legend:

- ✅ Fully supported with native syntax
- 🟡 Supported with different syntax/approach
- ❌ Not supported or not idiomatic

#### Snippet Guidelines

1. **Prefix Conventions**
   - Use lowercase for snippet prefixes
   - Keep prefixes short (2-6 characters) and memorable
   - Match common abbreviations in the language community
   - Examples: `class`, `fn`, `if`, `for`, `try`, `test`

2. **Body Structure**
   - Use array format for multi-line snippets (better readability)
   - Use string format for single-line snippets
   - Include proper indentation (use `\t` for tabs)
   - Add empty lines between logical blocks

3. **Tab Stops**
   - `${1}`, `${2}`, etc. for cursor positions
   - `${1:defaultValue}` for default values
   - `${1|option1,option2|}` for choice selections
   - Order tab stops logically (top to bottom, left to right)

4. **Descriptions**
   - Clear and concise (one sentence)
   - Describe what the snippet creates, not how to use it
   - Examples: "Define a class", "Create a for loop", "Async function with error handling"

5. **Language-Specific Variations**
   - Adjust syntax to match language conventions
   - Use language-appropriate naming (e.g., `def` for Python, `fn` for Rust)
   - Include language-specific features (e.g., type hints, decorators)
   - Follow community standards (PEP 8 for Python, StandardJS, etc.)

6. **Testing Snippets**
   - Match popular testing frameworks for the language
   - Python: pytest, unittest
   - JavaScript/TypeScript: Jest, Vitest, Mocha
   - Go: standard testing package
   - Rust: built-in test framework
   - C#: xUnit, NUnit

### Snippets Best Practices

1. **Useful Patterns**
   - Common language constructs (see Generic Snippets Reference above)
   - Boilerplate code (main functions, test templates)
   - Best practices (error handling, async patterns)
   - Framework-specific patterns (React hooks, Express routes, etc.)

2. **Good Prefixes**
   - Short and memorable (2-6 characters)
   - Match the snippet purpose (e.g., `class` for class definition)
   - Use common abbreviations (e.g., `fn` for function)
   - Avoid conflicts with language keywords where possible

3. **Tab Stops**
   - Use `${1}`, `${2}`, etc. for cursor positions
   - Use `${1:default}` for default values
   - Order tab stops logically

4. **Multi-line Snippets**
   - Use array format for readability
   - Proper indentation in body
   - Include empty lines where appropriate

Example:

```typescript
snippets: [
  {
    name: "async_function",
    prefix: "async",
    description: "Async function with error handling",
    body: [
      "async fn ${1:function_name}(${2:params}) -> Result<${3:ReturnType}, ${4:Error}> {",
      "    ${5:// Implementation}",
      "    Ok(${6:return_value})",
      "}",
    ],
  },
];
```

### Documentation Best Practices

1. **Setup Guide**
   - Prerequisites (tools, dependencies)
   - Installation steps
   - Quick start examples
   - Key features overview
   - Recommended workflow

2. **Troubleshooting**
   - Common problems with clear titles
   - Step-by-step solutions
   - Command examples
   - Links to external resources

3. **Markdown Formatting**
   - Use code blocks with language hints
   - Use headings for organization
   - Include links to official documentation
   - Use lists for steps

Example:

```typescript
documentation: {
  setup_guide: `# Setup Guide

## Prerequisites
- Node.js ≥ 18.0.0
- npm or yarn

## Installation
\`\`\`bash
npm install -g typescript
\`\`\`

## Quick Start
1. Create a new project
2. Install dependencies
3. Start coding
`,
  troubleshooting: `# Troubleshooting

## TypeScript not found

### Problem
Command 'tsc' not found

### Solution
\`\`\`bash
npm install -g typescript
\`\`\`
`,
}
```

---

## Build System

### Build Process Overview

```
1. Load Configuration
   ├─ ConfigLoader.load(ide, language)
   ├─ Dynamic import of config file
   └─ Zod validation

2. Determine Version
   ├─ Check existing package.json
   ├─ Parse version field
   └─ Fallback to 1.0.0

3. Generate Files
   ├─ Compile templates (cached)
   ├─ Build context object
   ├─ Render templates
   └─ Write files to disk

4. Copy Assets
   └─ Copy logo from logos/ to package directory

5. Package VSIX
   ├─ Run npm install in package directory
   ├─ Compile TypeScript (if needed)
   └─ Run vsce package
```

### Template Context

When rendering templates, the following context is available:

```typescript
{
  // Metadata
  ide: 'vscode',                    // or 'vscodium'
  language: 'rust',
  capitalizedIde: 'VSCode',         // Formatted name
  cliCommand: 'code',               // CLI command (code/codium)
  organization: 'templ-project',
  publisher: 'templ-project',
  repositoryUrl: 'https://github.com/templ-project/vscode-extensions',
  version: '1.0.0',
  configHash: '1234abcd...',        // Config content hash

  // Extension Information
  description: 'Essential Rust development...',
  keywords: ['rust', 'cargo', ...],
  allExtensions: [...],             // All extensions (required + optional)
  requiredExtensions: [...],        // Required only
  optionalExtensions: [...],        // Optional only
  totalExtensions: 5,

  // Configuration
  settings: { ... },                // Settings object
  keybindings: [ ... ],            // Keybindings array
  snippets: { ... },               // Snippets as object (key = name)

  // Documentation
  setupGuide: '# Setup Guide...',
  troubleshooting: '# Troubleshooting...',

  // Flags
  hasCommands: false,               // Whether extension has custom commands
}
```

### Version Preservation

The build system preserves versions from existing package.json files:

1. Check if `packages/{ide}/{language}/package.json` exists
2. If yes, extract version field
3. Use extracted version in new build
4. If no, use version 1.0.0

This means:

- First build: 1.0.0
- Subsequent builds: Preserve existing version
- Version bumps: Handled by CI/CD (dragoscops/bumpalicious)

### Custom Template Helpers

Available in all templates:

1. **json** - Serialize to JSON

   ```handlebars
   "value": {{{json someObject}}}
   ```

2. **hasKeys** - Check if object has keys

   ```handlebars
   {{#if (hasKeys settings)}}
     <!-- Render settings section -->
   {{/if}}
   ```

3. **capitalizedIde** - Capitalize IDE name

   ```handlebars
   {{capitalizedIde}} <!-- Outputs: VSCode or VSCodium -->
   ```

4. **cliCommand** - Get CLI command
   ```handlebars
   {{cliCommand}} --install-extension <!-- Outputs: code or codium -->
   ```

---

## Testing

### Test Structure

```
tests/
├── config/
│   ├── ConfigLoader.test.ts      # Config loading tests
│   └── validation.test.ts        # Zod validation tests
├── build/
│   ├── ExtensionPackBuilder.test.ts  # Builder tests
│   ├── TemplateGenerator.test.ts     # Template tests
│   ├── templates.test.ts             # Template rendering tests
│   └── version-utils.test.ts         # Version preservation tests
├── publish/
│   └── MarketplacePublisher.test.ts  # Publisher tests
├── integration/
│   └── build-workflow.test.ts        # End-to-end tests
└── setup.test.ts                     # Test setup
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/build/ExtensionPackBuilder.test.ts

# Run tests matching pattern
npm test -- --grep "should generate package.json"
```

### Writing Tests

Example test for a new feature:

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { ExtensionPackBuilder } from "../src/build/ExtensionPackBuilder";

describe("ExtensionPackBuilder", () => {
  let builder: ExtensionPackBuilder;

  beforeEach(() => {
    builder = new ExtensionPackBuilder();
  });

  it("should generate snippets file", async () => {
    const collection = {
      description: "Test pack",
      tags: ["test"],
      required_extensions: [],
      optional_extensions: [],
      settings: {},
      keybindings: [],
      snippets: [
        {
          name: "test",
          prefix: "test",
          description: "Test snippet",
          body: 'console.log("test");',
        },
      ],
      documentation: {
        setup_guide: "# Setup",
        troubleshooting: "# Troubleshooting",
      },
    };

    const result = await builder.build(collection, {
      ide: "vscode",
      language: "test",
      outputDir: "./temp",
      logosDir: "./logos",
    });

    expect(result.files).toContain("snippets/test.json");
  });
});
```

### Test Coverage

Aim for:

- **Overall**: >70%
- **Core modules** (ConfigLoader, Builder, Publisher): >80%
- **Critical paths**: 100%

Check coverage:

```bash
npm run test:coverage
open coverage/index.html
```

---

## Publishing

### Publishing to VSCode Marketplace

1. **Get Personal Access Token**
   - Visit https://marketplace.visualstudio.com/manage
   - Create new token with "Marketplace: Publish" scope

2. **Set Environment Variable**

   ```bash
   export VSCODE_TOKEN="your-token-here"
   ```

3. **Publish**

   ```bash
   # Publish all VSCode extensions
   task publish:vscode

   # Or publish specific extension
   node dist/index.js publish "dist/vscode/tpl-vscode-rust-*.vsix" --marketplace vscode
   ```

### Publishing to Open VSX

1. **Get Personal Access Token**
   - Visit https://open-vsx.org/user-settings/tokens
   - Create new token

2. **Set Environment Variable**

   ```bash
   export OPENVSX_TOKEN="your-token-here"
   ```

3. **Publish**

   ```bash
   # Publish all VSCodium extensions
   task publish:vscodium

   # Or publish specific extension
   node dist/index.js publish "dist/vscodium/tpl-vscodium-rust-*.vsix" --marketplace openvsx
   ```

### Publishing to Both Marketplaces

```bash
# Set both tokens
export VSCODE_TOKEN="..."
export OPENVSX_TOKEN="..."

# Publish to both
task publish:all
```

### Error Handling

The publisher only suppresses **version conflict errors** (already published). All other errors are reported:

- **Authentication errors**: Invalid or expired token
- **Network errors**: Connection issues
- **Validation errors**: Manifest problems, missing dependencies
- **API errors**: Marketplace API issues

Example error output:

```
❌ Error: Authentication failed: Invalid access token
   Cause: VSCODE_TOKEN environment variable is invalid or expired
   Fix: Generate new token at https://marketplace.visualstudio.com/manage/createpublisher
   Docs: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
```

---

## CI/CD Workflow

### GitHub Actions Workflow

The project uses GitHub Actions for automated builds and publishing:

**Workflow file**: `.github/workflows/build-and-publish.yml`

**Triggers**:

- Push to `main` branch
- Pull requests
- Manual workflow dispatch

**Steps**:

1. **Build for Version Detection** (main only)
   - Build all extension packs
   - Extract current versions

2. **Update Versions** (main only)
   - Uses dragoscops/bumpalicious
   - Based on conventional commits
   - Updates package.json versions

3. **Rebuild with New Versions** (main only)
   - Rebuild with bumped versions

4. **Run Tests**
   - TypeScript compilation
   - ESLint checking
   - Vitest test suite

5. **Publish** (main only, after tests pass)
   - Publish to VSCode Marketplace
   - Publish to Open VSX Registry

### Conventional Commits

The workflow uses conventional commits for version bumping:

**Patch version** (1.0.0 → 1.0.1):

```bash
git commit -m "fix: correct settings validation"
```

**Minor version** (1.0.0 → 1.1.0):

```bash
git commit -m "feat: add Rust extension pack"
```

**Major version** (1.0.0 → 2.0.0):

```bash
git commit -m "feat!: remove deprecated API"
# or
git commit -m "feat: breaking change" -m "BREAKING CHANGE: Old API removed"
```

### Required Secrets

Configure in repository settings:

- `VSCODE_MARKETPLACE_TOKEN`: VSCode Marketplace PAT
- `OPENVSX_TOKEN`: Open VSX Registry PAT

### Local CI Testing

Test the workflow locally:

```bash
# Run full validation
task validate

# This runs:
# - task build:extensions (build all)
# - npm run typecheck
# - npm run lint:check
# - npm run format:check
# - npm test
```

---

## Code Style and Standards

### TypeScript

- **Strict mode enabled**
- **ES2022 target**
- **ESM modules** (import/export)
- **No implicit any**
- **Consistent null checks**

### Formatting

**Prettier configuration**:

- 2 spaces indentation
- Single quotes
- Trailing commas
- 120 character line length
- Line endings: LF

Run:

```bash
npm run format       # Format all files
npm run format:check # Check formatting
```

### Linting

**ESLint configuration**:

- TypeScript ESLint recommended
- Import order enforcement
- No unused variables
- No console.log (use logger instead)

Run:

```bash
npm run lint         # Check for issues
npm run lint:fix     # Fix auto-fixable issues
```

### Commit Messages

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build system, dependencies, etc.

**Examples**:

```bash
feat(rust): add Rust extension pack
fix(build): correct template rendering for snippets
docs(contributing): update development guide
test(config): add validation tests
chore(deps): update vitest to 4.0.0
```

### File Naming

- **TypeScript files**: PascalCase for classes (`ExtensionPackBuilder.ts`)
- **Test files**: Match source file name with `.test.ts` suffix
- **Config files**: kebab-case (`eslint.config.mjs`)
- **Template files**: kebab-case with `.handlebars` extension

### Code Organization

1. **Imports**:

   ```typescript
   // Node.js built-ins
   import { readFile } from "fs/promises";

   // External dependencies
   import { z } from "zod";

   // Internal modules
   import { ConfigLoader } from "./ConfigLoader";
   ```

2. **Exports**:

   ```typescript
   // Export types
   export type { Extension, Collection };

   // Export classes
   export { ConfigLoader };
   ```

3. **Module structure**:

   ```typescript
   // Types and interfaces at top
   interface Context { ... }

   // Constants
   const DEFAULT_VERSION = '1.0.0';

   // Main class
   export class Builder { ... }
   ```

### Documentation

1. **JSDoc comments** for public APIs:

   ```typescript
   /**
    * Load and validate configuration file
    *
    * @param ide - Target IDE (vscode or vscodium)
    * @param language - Language identifier (e.g., 'rust', 'python')
    * @returns Validated collection object
    * @throws ConfigurationError if file not found or invalid
    */
   async load(ide: string, language: string): Promise<Collection> {
     // Implementation
   }
   ```

2. **Inline comments** for complex logic:

   ```typescript
   // Calculate config hash to detect changes
   const configContent = JSON.stringify(collection);
   const hash = createHash("sha256").update(configContent).digest("hex");
   ```

3. **README updates** for new features:
   - Update README.md with new configuration options
   - Update CONTRIBUTING.md with development guidelines
   - Update relevant .specs/ documentation

---

## Troubleshooting Development Issues

### Build Errors

#### Module Not Found

**Problem**: `Cannot find module './config/collections/vscode/rust.ts'`

**Solution**:

1. Ensure file exists at correct path
2. Check file extension (.ts not .js)
3. Verify export statement in file
4. Run `npm run build` to compile TypeScript

#### Validation Errors

**Problem**: `Validation failed: Collection must have at least one required extension`

**Solution**:

1. Check Zod schema in `src/config/schemas.ts`
2. Ensure your configuration matches interface requirements
3. Verify required_extensions array is not empty

#### Template Rendering Errors

**Problem**: `Template rendering failed: Missing helper 'someHelper'`

**Solution**:

1. Check registered helpers in `TemplateGenerator.ts`
2. Verify helper name in template matches registration
3. Ensure context object has required data

### Test Failures

#### Import Errors in Tests

**Problem**: `Cannot find module '@/src/config/ConfigLoader'`

**Solution**:

1. Check vitest.config.ts resolve.alias configuration
2. Use relative imports in tests: `'../src/config/ConfigLoader'`
3. Run `npm run build` before testing

#### Test Timeouts

**Problem**: Tests timeout after 5 seconds

**Solution**:

1. Increase timeout in vitest.config.ts:
   ```typescript
   test: {
     testTimeout: 30000, // 30 seconds
   }
   ```
2. Check for hanging promises or missing awaits
3. Mock expensive operations (file I/O, API calls)

### Runtime Errors

#### Logo Not Found

**Problem**: `Asset error: Logo not found: logos/rust-128.png`

**Solution**:

1. Ensure logo file exists in logos/ directory
2. Check filename matches exactly (case-sensitive)
3. Verify file format is PNG (not jpeg/jpg)
4. Check file permissions

#### Version Preservation Not Working

**Problem**: Version resets to 1.0.0 on every build

**Solution**:

1. Check if package.json exists in packages/{ide}/{language}/
2. Verify version field exists in package.json
3. Check file permissions (readable)
4. Run with debug logging: `LOG_LEVEL=debug npm run build`

### Publishing Errors

#### Authentication Failed

**Problem**: `Error: Authentication failed: Invalid access token`

**Solution**:

1. Verify token is set: `echo $VSCODE_TOKEN`
2. Generate new token (tokens expire)
3. Check token permissions/scopes
4. Try token in curl request to verify it works

#### Network Timeout

**Problem**: `Error: Connection timeout when reaching marketplace.visualstudio.com`

**Solution**:

1. Check internet connection
2. Check firewall/proxy settings
3. Verify marketplace status: https://www.vscodestatus.com/
4. Try again later (temporary outage)

### Performance Issues

#### Slow Builds

**Problem**: Building takes >30 seconds per extension

**Solution**:

1. Check template cache is working:
   ```typescript
   const stats = generator.getCacheStats();
   console.log(`Cache hit rate: ${stats.hitRate}%`);
   ```
2. Use parallel builds: `task build:extensions` (automatic)
3. Disable unnecessary features during development
4. Use incremental builds (only rebuild changed extensions)

#### High Memory Usage

**Problem**: Node.js process uses excessive memory

**Solution**:

1. Increase Node.js memory limit:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   ```
2. Clear template cache periodically
3. Build extensions one at a time for testing
4. Check for memory leaks in custom code

---

## Getting Help

### Resources

- **Project Documentation**: [.specs/](/.specs/) directory
- **Low-Level Design**: [.specs/00001-low-level-design-vscode-extensions/low-level-design.md](.specs/00001-low-level-design-vscode-extensions/low-level-design.md)
- **VSCode Extension API**: https://code.visualstudio.com/api
- **Open VSX Wiki**: https://github.com/eclipse/openvsx/wiki

### Asking Questions

When opening an issue:

1. **Search existing issues** first
2. **Provide context**:
   - What were you trying to do?
   - What did you expect to happen?
   - What actually happened?
3. **Include details**:
   - OS and Node.js version
   - Command you ran
   - Full error message
   - Relevant configuration files
4. **Minimal reproduction**:
   - Simplest case that shows the problem
   - Configuration file (if applicable)
   - Steps to reproduce

### Contributing Improvements

Found a way to improve this guide?

1. Open an issue to discuss the change
2. Submit a pull request with updates
3. Follow the same commit conventions
4. Update table of contents if needed

---

## Conclusion

This guide covered everything you need to contribute to the VSCode Extension Pack Builder project. Key takeaways:

1. **Project Structure**: Configuration files drive the build system
2. **Collection Interface**: Defines extensions, settings, snippets, and documentation
3. **Build Process**: Load config → Generate files → Package .vsix → Publish
4. **Testing**: Comprehensive test suite ensures quality
5. **CI/CD**: Automated versioning and publishing

When adding new features:

- Refer back to this document
- Check existing code for patterns
- Write tests
- Update documentation
- Follow code style guidelines

Happy coding! 🚀
