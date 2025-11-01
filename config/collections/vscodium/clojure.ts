import {
  calvaVSCodium,
  clojureLSPVSCodium,
  parinferVSCodium,
  rainbowBracketsVSCodium,
  clojureSnippetsVSCodium,
} from '../../extensions/clojure';
import { Collection } from '../../shared/types';
import { clojure as clojureVSCode } from '../vscode/clojure';

export const clojure: Collection = {
  ...clojureVSCode,

  description:
    'Essential Clojure & ClojureScript development environment for VSCodium - comprehensive REPL-driven development tooling',

  required_extensions: [calvaVSCodium, clojureLSPVSCodium],

  optional_extensions: [parinferVSCodium, rainbowBracketsVSCodium, clojureSnippetsVSCodium],

  documentation: {
    ...clojureVSCode.documentation,

    setup_guide: `# Clojure Extension Pack Setup Guide (VSCodium)

${clojureVSCode.documentation.setup_guide}

## VSCodium-Specific Notes

This extension pack is configured for VSCodium and uses Open VSX Registry instead of the Visual Studio Marketplace.

### Extension Sources

All extensions are installed from Open VSX Registry (https://open-vsx.org/):
- Calva: betterthantomorrow.calva
- Clojure LSP: betterthantomorrow.clojure-lsp
- Parinfer: shaunlebron.vscode-parinfer
- Rainbow Brackets: 2gua.rainbow-brackets
- Clojure Snippets: rafaeldelboni.clojure-snippets

### Compatibility

VSCodium is fully compatible with all Clojure development tools and workflows. All features work identically to VSCode.

### Installation Notes

Extensions are installed from Open VSX, which may have slightly different update schedules than the VS Code Marketplace. All core functionality remains the same.
`,

    troubleshooting: `# Troubleshooting Clojure Development (VSCodium)

${clojureVSCode.documentation.troubleshooting}

## VSCodium-Specific Issues

### Extensions Not Installing

**Problem**: Extensions fail to install from Open VSX

**Solutions**:

1. **Verify Open VSX Access**:
   - Check internet connection
   - Ensure Open VSX Registry is accessible: https://open-vsx.org/

2. **Manual Installation**:
   - Download .vsix files from Open VSX
   - Install via: Extensions → ... → Install from VSIX

3. **Check Extension Compatibility**:
   - Verify extensions are available on Open VSX
   - Some extensions may have different versions than VS Code Marketplace

4. **Clear Extension Cache**:
   \`\`\`bash
   rm -rf ~/.vscode-oss/extensions
   \`\`\`

### Extension Updates

**Problem**: Extensions not updating automatically

**Solution**:
- VSCodium uses Open VSX Registry for updates
- Manually check for updates: Extensions → ... → Check for Extension Updates
- Updates may be slightly delayed compared to VS Code Marketplace

### Calva Installation

**Problem**: Calva not installing or outdated version

**Solution**:
- Calva is actively published to Open VSX
- If issues persist, download from Open VSX website
- Install manually via VSIX file
`,
  },
};
