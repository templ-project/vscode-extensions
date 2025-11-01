# VSCode Extension Pack Builder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue)](https://www.typescriptlang.org/)

A modern build and deployment system for generating VSCode and VSCodium extension packs from TypeScript configuration files. Automatically builds, versions, packages, and publishes extension packs to VSCode Marketplace and Open VSX Registry with transparent error reporting.

## Features

- 🎯 **TypeScript Configuration**: Define extension packs in clean TypeScript config files
- 🏗️ **Automated Build Pipeline**: Generate all extension pack files (package.json, README, snippets, settings)
- 📦 **VSIX Packaging**: Create distributable .vsix files using @vscode/vsce
- 🚀 **Dual Marketplace Publishing**: Publish to both VSCode Marketplace and Open VSX Registry
- 🔄 **Smart Versioning**: Automatic version management with dragoscops/bumpalicious based on conventional commits
- 🎨 **Template Engine**: Handlebars-based file generation for consistency
- 🐛 **Transparent Error Reporting**: Actionable error messages with problem/cause/fix/docs
- 📊 **Structured Logging**: Pino-based logging with child loggers for all modules
- ✅ **Comprehensive Testing**: Vitest test suite with >70% coverage
- 🔧 **Task Orchestration**: Task CLI for convenient build and publish workflows
- 🤖 **CI/CD Ready**: GitHub Actions workflow for automated deployment

## Architecture

### System Components

```mermaid
graph TB
    subgraph "Configuration Layer"
        A[TypeScript Configs]
        B[ConfigLoader]
        C[Zod Validation]
    end

    subgraph "Build Layer"
        D[ExtensionPackBuilder]
        E[TemplateGenerator]
        F[Version Preservation]
        G[@vscode/vsce]
    end

    subgraph "Publishing Layer"
        H[MarketplacePublisher]
        I[VSCode Marketplace]
        J[Open VSX Registry]
    end

    subgraph "Error Handling"
        K[ErrorReporter]
        L[7 Error Categories]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    D --> F
    E --> D
    D --> G
    G --> H
    H --> I
    H --> J
    K --> L
```

### Core Modules

1. **ConfigLoader** (`src/config/`) - Loads and validates TypeScript configuration files
   - Dynamic imports from `scripts/configs/collections/`
   - Zod schema validation for Collection interface
   - In-memory caching for performance

2. **ExtensionPackBuilder** (`src/build/`) - Orchestrates extension pack generation
   - Reads existing package.json versions (preserves during rebuild)
   - Generates all required files using templates
   - Copies logos from `logos/` directory
   - Packages into .vsix files

3. **TemplateGenerator** (`src/build/`) - Renders Handlebars templates
   - Template caching for performance
   - Context-aware rendering for package.json, README, CHANGELOG, etc.

4. **MarketplacePublisher** (`src/publish/`) - Publishes .vsix files
   - VSCode Marketplace via @vscode/vsce
   - Open VSX Registry via ovsx
   - Batch publishing with progress indicators
   - Glob pattern support for multiple files

5. **ErrorReporter** (`src/`) - Formats errors with actionable guidance
   - 7 error categories (Configuration, Validation, Build, Asset, Publish, Network, VersionConflict)
   - Structured output: Problem/Cause/Fix/Docs
   - Integration with pino structured logging

## Prerequisites

- **Node.js**: ≥20.0.0 (LTS recommended)
- **Task CLI**: [Installation guide](https://taskfile.dev/installation/)
- **VSCode Marketplace Token**: [How to generate](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token)
- **Open VSX Token**: [How to generate](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions)

## Installation

```bash
# Clone the repository
git clone https://github.com/templ-project/vscode-extensions.git
cd vscode-extensions

# Install dependencies
npm install

# Build the CLI
npm run build
```

## Configuration

### Environment Variables

```bash
# VSCode Marketplace publishing (optional, only needed for publishing)
export VSCODE_TOKEN="your-vscode-marketplace-pat"

# Open VSX Registry publishing (optional, only needed for publishing)
export OPENVSX_TOKEN="your-openvsx-pat"

# Logging level (optional, default: info)
export LOG_LEVEL="debug"  # trace|debug|info|warn|error|fatal
```

### Extension Pack Configuration

Extension packs are defined in TypeScript files under `scripts/configs/collections/{ide}/{language}.ts`:

```typescript
// Example: scripts/configs/collections/vscode/cpp.ts
import { Collection } from "../../shared/types.js";
import { clangd, cmake, clangFormat } from "../../extensions/cpp/index.js";

export const cpp: Collection = {
  description: "Essential C/C++ development environment",
  publisher: "templ-project",
  required_extensions: [clangd, cmake, clangFormat],
  optional_extensions: [],
  settings: { ... },
  snippets: [ ... ],
  documentation: {
    setup_guide: "...",
    troubleshooting: "..."
  }
};
```

## Usage

### Using Task CLI (Recommended)

```bash
# Build a single extension pack
task build:extension EXTENSION=cpp              # Builds for both VSCode and VSCodium
task build:extension:vscode EXTENSION=cpp       # VSCode only
task build:extension:vscodium EXTENSION=cpp     # VSCodium only

# Build all extensions
task build:extensions                            # All VSCode + VSCodium extensions
task build:extensions:vscode                     # All VSCode extensions only
task build:extensions:vscodium                   # All VSCodium extensions only

# List available extensions
task build:extensions:list

# Clean build artifacts
task clean

# Run tests
task test
task test:watch
task test:coverage

# Type checking and linting
task typecheck
task lint
task lint:fix

# Publish extensions (requires tokens)
task publish:vscode                              # Publish all VSCode extensions
task publish:vscodium                            # Publish all VSCodium extensions
task publish:all                                 # Publish to both marketplaces

# Validate everything
task validate                                    # Build, typecheck, lint, format, test
```

### Using the CLI Directly

```bash
# Build an extension pack
node dist/index.js build vscode cpp --output ./packages

# Publish to a specific marketplace
node dist/index.js publish "dist/vscode/*.vsix" --marketplace vscode

# Publish to both marketplaces
node dist/index.js publish "dist/vscode/*.vsix" --marketplace both

# Get help
node dist/index.js --help
node dist/index.js build --help
node dist/index.js publish --help
```

### Build Output

After building, find your extension packs here:

```
dist/
├── vscode/
│   ├── tpl-vscode-cpp-1.0.0.vsix
│   ├── tpl-vscode-typescript-1.0.0.vsix
│   └── ...
└── vscodium/
    ├── tpl-vscodium-cpp-1.0.0.vsix
    ├── tpl-vscodium-typescript-1.0.0.vsix
    └── ...
```

Generated package files:

```
packages/
├── vscode/
│   └── cpp/
│       ├── package.json
│       ├── README.md
│       ├── CHANGELOG.md
│       ├── LICENSE.md
│       ├── icon.png
│       ├── settings.json
│       ├── keybindings.json
│       ├── snippets/
│       │   └── cpp.json
│       └── src/
│           └── extension.ts
└── vscodium/
    └── ... (similar structure)
```

## CI/CD with GitHub Actions

The project includes a complete CI/CD workflow (`.github/workflows/build-and-publish.yml`) that automatically:

1. **Builds extensions for version detection** (main branch only)
2. **Updates versions** using dragoscops/bumpalicious based on conventional commits
3. **Rebuilds extensions** with updated versions
4. **Runs tests** (typecheck, lint, test suite)
5. **Publishes to marketplaces** (main branch only, after tests pass)

### Workflow Triggers

- **Push to main**: Full workflow (build → version → build → test → publish)
- **Pull Request**: Build and test only (no versioning or publishing)
- **Manual**: `workflow_dispatch` for manual triggers

### Required GitHub Secrets

Configure these secrets in your repository settings:

- `VSCODE_MARKETPLACE_TOKEN`: VSCode Marketplace Personal Access Token
- `OPENVSX_TOKEN`: Open VSX Registry Personal Access Token

### Conventional Commits for Versioning

The workflow uses conventional commits to determine version bumps:

```bash
# Patch version bump (1.0.0 → 1.0.1)
git commit -m "fix: correct button alignment"

# Minor version bump (1.0.0 → 1.1.0)
git commit -m "feat: add new authentication method"

# Major version bump (1.0.0 → 2.0.0)
git commit -m "feat!: remove deprecated API"
# or
git commit -m "feat: breaking change" -m "BREAKING CHANGE: Old API removed"
```

## Project Structure

```
vscode-extensions/
├── .github/
│   └── workflows/
│       └── build-and-publish.yml    # CI/CD workflow
├── src/
│   ├── index.ts                     # CLI entry point
│   ├── logger.ts                    # Pino logger factory
│   ├── errors.ts                    # Custom error classes
│   ├── error-reporter.ts            # Error formatting
│   ├── config/
│   │   ├── ConfigLoader.ts          # Load TypeScript configs
│   │   ├── schemas.ts               # Zod validation schemas
│   │   └── types.ts                 # TypeScript interfaces
│   ├── build/
│   │   ├── ExtensionPackBuilder.ts  # Build orchestration
│   │   ├── TemplateGenerator.ts     # Handlebars rendering
│   │   └── version-utils.ts         # Version preservation
│   └── publish/
│       ├── MarketplacePublisher.ts  # Marketplace publishing
│       └── types.ts                 # Publishing interfaces
├── tests/                           # Test suite (Vitest)
├── scripts/
│   └── configs/
│       ├── collections/             # Extension pack definitions
│       │   ├── vscode/              # VSCode marketplace configs
│       │   └── vscodium/            # VSCodium/Open VSX configs
│       └── extensions/              # Individual extension definitions
├── templates/                       # Handlebars templates
├── logos/                           # Extension pack logos
├── packages/                        # Generated extension packs
├── dist/                            # Build output (.vsix files)
├── Taskfile.yml                     # Task CLI configuration
├── tsconfig.json                    # TypeScript configuration
├── vitest.config.ts                 # Test framework configuration
└── package.json                     # Dependencies and scripts
```

## Troubleshooting

### Build Errors

#### Missing Configuration File

```
❌ Error: Configuration file not found
   Cause: scripts/configs/collections/vscode/cpp.ts does not exist
   Fix: Verify the file path and ensure the config is properly exported
   Docs: See scripts/configs/collections/vscode/ for examples
```

**Solution**: Check that the language and IDE parameters are correct and the config file exists.

#### Invalid Extension ID Format

```
❌ Error: Invalid extension ID format
   Cause: Extension ID must match pattern: publisher.extension-name
   Fix: Update extension IDs in the configuration file
   Docs: See https://code.visualstudio.com/api/references/extension-manifest
```

**Solution**: Ensure all extension IDs follow the `publisher.name` format.

#### Missing Logo File

```
❌ Error: Logo not found: logos/cpp-logo.png
   Cause: Asset file does not exist in expected location
   Fix: Add logo file to logos/ directory (128x128 PNG)
   Docs: See logos/ directory for existing examples
```

**Solution**: Add the missing logo file to the `logos/` directory.

### Publishing Errors

#### Authentication Failed

```
❌ Error: Authentication failed: Invalid access token
   Cause: VSCODE_TOKEN environment variable is invalid or expired
   Fix: Generate new token at https://marketplace.visualstudio.com/manage/createpublisher
   Docs: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token
```

**Solution**: Generate a new Personal Access Token and update the environment variable.

#### Network Timeout

```
❌ Error: Connection timeout when reaching marketplace.visualstudio.com
   Cause: Network connectivity issue or marketplace is down
   Fix: Check internet connection and marketplace status
   Docs: https://www.vscodestatus.com/
```

**Solution**: Verify network connectivity and check if the marketplace is operational.

#### Version Already Published

```
❌ Error: Version 1.0.0 already exists on VSCode Marketplace
   Cause: Version conflict detected
   Fix: This error should not occur in normal CI/CD workflow
   Note: Version managed by dragoscops/bumpalicious@v3 GitHub Action
```

**Solution**: This typically only occurs during manual publishing. The CI/CD workflow handles versioning automatically.

### Common Issues

#### Tests Failing

```bash
# Run tests in watch mode to see failures
npm run test:watch

# Run with coverage to identify untested code
npm run test:coverage

# Check for type errors
npm run typecheck

# Check for linting issues
npm run lint:check
```

#### Build Performance

```bash
# Clean build artifacts and rebuild
task clean
task build:extensions

# Build only what you need
task build:extension EXTENSION=cpp

# Use parallel builds (automatic in Task CLI)
task build:extensions:vscode  # Builds 9 extensions in parallel
task build:extensions:vscodium  # Parallel builds for VSCodium

# Benchmark build performance
task perf:benchmark:build  # Benchmark 3 extensions
task perf:benchmark:parallel  # Compare serial vs parallel builds
```

**Performance Features**:

- **Template Caching**: Templates are compiled once and cached for reuse across multiple builds
- **Parallel Execution**: Task CLI automatically parallelizes independent build tasks
- **Cache Statistics**: Track cache hit rates and performance metrics
- **Efficient Builds**: Only changed extensions need rebuilding (version management via CI/CD)

```typescript
// Check template cache statistics
import { TemplateGenerator } from "./build";

const stats = generator.getCacheStats();
console.log(`Cache hit rate: ${stats.hitRate.toFixed(2)}%`);
console.log(`Templates cached: ${stats.size}`);
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for comprehensive development guidelines, including:

- **Development Environment Setup**: Install dependencies and configure your environment
- **Understanding the Codebase**: Architecture, data flow, and key concepts
- **Adding a New Language Extension Pack**: Complete step-by-step guide
- **Configuration Reference**: Collection, Extension, Setting, Snippet interfaces
- **Build System**: How templates work and version preservation
- **Testing**: Writing and running tests
- **Publishing**: How to publish to marketplaces
- **Code Style and Standards**: TypeScript, formatting, and commit conventions

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow conventional commits for version management
4. Ensure tests pass (`npm test`)
5. Ensure code quality checks pass (`task validate`)
6. Submit a pull request

### Development Workflow

```bash
# Install dependencies
npm install

# Start development mode (watch for changes)
npm run dev

# Run tests in watch mode
npm run test:watch

# Format and lint code
task lint:fix
npm run format

# Validate everything before commit
task validate
```

For detailed information on adding new languages, working with extensions, and understanding the build system, please refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- **Documentation**: [Low-Level Design](.specs/00001-low-level-design-vscode-extensions/low-level-design.md)
- **VSCode Marketplace**: https://marketplace.visualstudio.com/
- **Open VSX Registry**: https://open-vsx.org/
- **Task CLI**: https://taskfile.dev/
- **Conventional Commits**: https://www.conventionalcommits.org/

## Support

For issues, questions, or contributions, please:

- Open an issue on GitHub
- Check existing documentation in `.specs/` directory
- Review troubleshooting section above

---

Built with ❤️ by the templ-project team
