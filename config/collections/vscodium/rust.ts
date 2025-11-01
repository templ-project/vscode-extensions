import {
  rustAnalyzerVSCodium,
  codeLLDBVSCodium,
  cratesVSCodium,
  evenBetterTOMLVSCodium,
  errorLensVSCodium,
} from '../../extensions/rust';
import { Collection } from '../../shared/types';

import { rust as rustVSCode } from '../vscode/rust';

export const rust: Collection = {
  ...rustVSCode,
  description:
    'Essential Rust development environment for VSCodium - comprehensive tooling for modern systems programming',

  required_extensions: [rustAnalyzerVSCodium, codeLLDBVSCodium],

  optional_extensions: [cratesVSCodium, evenBetterTOMLVSCodium, errorLensVSCodium],

  documentation: {
    setup_guide: `# Rust Extension Pack Setup (VSCodium)

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
   - All required extensions will be installed automatically from Open VSX Registry
   - Optional extensions can be enabled based on your needs

2. **Create or open a Rust project**
   \`\`\`bash
   # Create new binary project
   cargo new my-project

   # Create new library project
   cargo new --lib my-library

   # Open in VSCodium
   codium my-project
   \`\`\`

3. **Wait for rust-analyzer to initialize**
   - First-time setup may take a few moments
   - rust-analyzer will index your project and download dependencies
   - Check status in the bottom status bar

4. **Start coding!**
   - IntelliSense and code completion work automatically
   - Inline errors and warnings appear as you type
   - Use code lenses to run/debug/test your code

## VSCodium Specific Notes

This collection is optimized for VSCodium and uses only open-source extensions available through the Open VSX Registry. All essential Rust development capabilities are included.

${rustVSCode.documentation.setup_guide.split('\n').slice(rustVSCode.documentation.setup_guide.indexOf('## Extensions Included')).join('\n')}`,

    troubleshooting: `# Troubleshooting Rust Development (VSCodium)

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
   - Restart VSCodium

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
   - Update VSCodium

3. **Check Cargo.toml features**
   - Ensure rust-analyzer uses correct features
   - Set \`rust-analyzer.cargo.features\` if needed

## Extension Installation Issues

### Extensions not available
**Problem**: Cannot find extensions in marketplace

**Solutions**:
- Ensure you're using the Open VSX Registry
- Check Open VSX for extension availability
- Some extensions may have different names or publishers

## VSCodium Specific Tips

### Extension Marketplace
- Use Open VSX Registry for extension installations
- All Rust extensions in this pack are available on Open VSX
- Performance may differ slightly from VSCode

${rustVSCode.documentation.troubleshooting
  .split('\n')
  .slice(rustVSCode.documentation.troubleshooting.indexOf('## rust-analyzer Issues'))
  .join('\n')
  .replace(/VSCode/g, 'VSCodium')}`,
  },
};
