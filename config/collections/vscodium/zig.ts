import { zigLanguageVSCodium, codeLLDBVSCodium, errorLensVSCodium } from '../../extensions/zig';
import { Collection } from '../../shared/types';
import { zig as zigVSCode } from '../vscode/zig';

export const zig: Collection = {
  ...zigVSCode,

  description:
    'Essential Zig development environment for VSCodium - comprehensive tooling for modern systems programming',

  required_extensions: [zigLanguageVSCodium, codeLLDBVSCodium],

  optional_extensions: [errorLensVSCodium],

  documentation: {
    ...zigVSCode.documentation,

    setup_guide: `# Zig Extension Pack Setup Guide (VSCodium)

${zigVSCode.documentation.setup_guide}

## VSCodium-Specific Notes

This extension pack is configured for VSCodium and uses Open VSX Registry instead of the Visual Studio Marketplace.

### Extension Sources

All extensions are installed from Open VSX Registry (https://open-vsx.org/):
- Zig Language: ziglang.vscode-zig
- CodeLLDB: vadimcn.vscode-lldb
- Error Lens: usernamehw.errorlens

### Compatibility

VSCodium is fully compatible with all Zig development tools and workflows. All features work identically to VSCode.
`,

    troubleshooting: `# Troubleshooting Zig Development (VSCodium)

${zigVSCode.documentation.troubleshooting}

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
   - Some extensions may have different versions

### Extension Updates

**Problem**: Extensions not updating automatically

**Solution**:
- VSCodium uses Open VSX Registry for updates
- Manually check for updates: Extensions → ... → Check for Extension Updates
`,
  },
};
