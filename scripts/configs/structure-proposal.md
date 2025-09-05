# Modular Configuration Structure Proposal

## Current Problems with YAML

- 1000+ line files are unreadable
- No code reuse or modularity
- Hard to maintain and extend
- No IntelliSense or type safety
- Difficult to share common configurations

## Proposed Solution: TypeScript Configuration

### New Structure

```
configs/
├── shared/
│   ├── types.ts              # TypeScript interfaces
│   ├── common-extensions.ts  # Shared extension definitions
│   ├── common-settings.ts    # Common settings
│   └── common-keybindings.ts # Common keybindings
├── extensions/
│   ├── ai/
│   │   ├── github-copilot.ts
│   │   ├── continue.ts
│   │   └── codeium.ts
│   ├── git/
│   │   ├── gitlens.ts
│   │   └── git-graph.ts
│   ├── productivity/
│   │   ├── bookmarks.ts
│   │   ├── todo-tree.ts
│   │   └── better-comments.ts
│   └── languages/
│       ├── javascript.ts
│       ├── python.ts
│       └── typescript.ts
├── collections/
│   ├── vscode/
│   │   ├── generic-essential.ts
│   │   ├── generic-extended.ts
│   │   ├── javascript.ts
│   │   └── python.ts
│   └── vscodium/
│       ├── generic-essential.ts
│       ├── generic-extended.ts
│       ├── javascript.ts
│       └── python.ts
├── build.ts                  # Build script to generate YAML
└── index.ts                  # Main entry point
```

### Benefits

1. **Modularity**: Each extension defined once, reused everywhere
2. **Type Safety**: Full TypeScript support with IntelliSense
3. **Code Reuse**: Share common configurations
4. **Maintainability**: Small, focused files
5. **Extensibility**: Easy to add new extensions/collections
6. **Validation**: Compile-time checks for configuration correctness

### Example Implementation

#### shared/types.ts

```typescript
export interface Extension {
  id: string;
  name: string;
  description: string;
  publisher: string;
  license: string;
  marketplace_url?: string;
  why_required?: string;
  why_recommended?: string;
}

export interface Collection {
  description: string;
  tags: string[];
  required_extensions: Extension[];
  optional_extensions: Extension[];
  settings: Record<string, unknown>;
  keybindings: Keybinding[];
  snippets: Snippet[];
  documentation: Documentation;
}
```

#### extensions/ai/github-copilot.ts

```typescript
import {Extension} from "../../shared/types";

export const githubCopilot: Extension = {
  id: "github.copilot",
  name: "GitHub Copilot",
  description: "Your AI pair programmer",
  publisher: "GitHub",
  license: "GitHub Copilot License",
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=github.copilot",
  why_required: "AI-powered code completion and assistance",
};
```

#### extensions/ai/continue.ts

```typescript
import {Extension} from "../../shared/types";

export const continueAI: Extension = {
  id: "continue.continue",
  name: "Continue - open-source AI code assistant",
  description: "The leading open-source AI code assistant",
  publisher: "Continue",
  license: "Apache-2.0",
  marketplace_url: "https://open-vsx.org/extension/Continue/continue",
  why_required: "Open-source AI-powered code completion and assistance (GitHub Copilot alternative)",
};
```

#### collections/vscode/generic-essential.ts

```typescript
import {githubCopilot} from "../../extensions/ai/github-copilot";
import {gitlens} from "../../extensions/git/gitlens";
import {bookmarks} from "../../extensions/productivity/bookmarks";
import {commonKeybindings} from "../../shared/common-keybindings";
import {commonSettings} from "../../shared/common-settings";
import {Collection} from "../../shared/types";

export const genericEssential: Collection = {
  description: "Essential productivity extensions for general development in VSCode",
  tags: ["productivity", "general", "essential", "git", "debugging", "editing"],
  required_extensions: [
    githubCopilot,
    gitlens,
    bookmarks,
    // ... other extensions
  ],
  optional_extensions: [
    // ... optional extensions
  ],
  settings: {
    ...commonSettings,
    // Collection-specific settings
  },
  keybindings: commonKeybindings,
  snippets: [],
  documentation: {
    setup_guide: `# Generic Essential Extension Pack Setup...`,
    troubleshooting: `# Common Issues and Solutions...`,
  },
};
```

#### collections/vscodium/generic-essential.ts

```typescript
import {continueAI} from "../../extensions/ai/continue";
import {gitlens} from "../../extensions/git/gitlens";
import {bookmarks} from "../../extensions/productivity/bookmarks";
import {commonSettings} from "../../shared/common-settings";
import {Collection} from "../../shared/types";
import {vscodiumSettings} from "../../shared/vscodium-settings";

export const genericEssential: Collection = {
  description: "Essential productivity extensions for general development in VSCodium",
  tags: ["productivity", "general", "essential", "git", "debugging", "editing", "open-source"],
  required_extensions: [
    continueAI, // Use Continue instead of GitHub Copilot
    gitlens,
    bookmarks,
    // ... other extensions
  ],
  optional_extensions: [
    // ... optional extensions
  ],
  settings: {
    ...commonSettings,
    ...vscodiumSettings, // VSCodium-specific settings
  },
  keybindings: commonKeybindings,
  snippets: [],
  documentation: {
    setup_guide: `# Generic Essential Extension Pack Setup for VSCodium...`,
    troubleshooting: `# Common Issues and Solutions...`,
  },
};
```

### Migration Plan

1. **Phase 1**: Create TypeScript structure and migrate one collection
2. **Phase 2**: Migrate all collections to TypeScript
3. **Phase 3**: Update build scripts to generate YAML from TypeScript
4. **Phase 4**: Remove old YAML files

### Immediate Benefits

- **DRY Principle**: Define extensions once, use everywhere
- **IDE Support**: Full IntelliSense, refactoring, find references
- **Validation**: Compile-time checks prevent configuration errors
- **Modularity**: Easy to add new IDEs, languages, or extensions
- **Maintainability**: Small, focused files instead of monolithic YAML
