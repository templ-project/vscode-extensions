import { calva, clojureLSP, parinfer, rainbowBrackets, clojureSnippets } from '../../extensions/clojure';
import { Collection } from '../../shared/types';

export const clojure: Collection = {
  description:
    'Essential Clojure & ClojureScript development environment for VSCode - comprehensive REPL-driven development tooling',

  tags: ['clojure', 'clojurescript', 'lisp', 'repl', 'functional-programming', 'interactive-development'],

  required_extensions: [calva, clojureLSP],

  optional_extensions: [parinfer, rainbowBrackets, clojureSnippets],

  settings: {
    // Calva Settings
    'calva.autoConnectRepl': {
      value: true,
      description: 'Automatically connect to REPL when project is opened',
      scope: 'workspace',
    },
    'calva.connectSequence': {
      value: 'ask',
      description: 'How to select connect sequence (ask, default, or custom name)',
      scope: 'workspace',
    },
    'calva.paredit.defaultKeyMap': {
      value: 'original',
      description: 'Default Paredit key bindings (original, strict, or none)',
      scope: 'workspace',
    },
    'calva.paredit.hijackVSCodeDefaults': {
      value: true,
      description: 'Let Paredit override some default VS Code keybindings for better structural editing',
      scope: 'workspace',
    },
    'calva.fmt.formatOnSave': {
      value: true,
      description: 'Format Clojure code on save',
      scope: 'workspace',
    },
    'calva.fmt.align': {
      value: true,
      description: 'Align map values and function arguments',
      scope: 'workspace',
    },
    'calva.fmt.indents': {
      value: {},
      description: 'Custom indentation rules for specific forms',
      scope: 'workspace',
    },
    'calva.fmt.newIndentEngine': {
      value: true,
      description: 'Use the new indentation engine for better formatting',
      scope: 'workspace',
    },
    'calva.evalOnSave': {
      value: false,
      description: 'Automatically evaluate file on save',
      scope: 'workspace',
    },
    'calva.showDocstringInParameterHelp': {
      value: true,
      description: 'Show function docstrings in parameter hints',
      scope: 'workspace',
    },
    'calva.autoOpenREPLWindow': {
      value: true,
      description: 'Automatically open REPL window when connecting',
      scope: 'workspace',
    },
    'calva.prettyPrintingOptions': {
      value: {
        enabled: true,
        printEngine: 'pprint',
        width: 80,
      },
      description: 'Pretty printing configuration for REPL output',
      scope: 'workspace',
    },
    'calva.referencesCodeLens.enabled': {
      value: true,
      description: 'Show references code lens above symbols',
      scope: 'workspace',
    },
    'calva.enableJSCompletions': {
      value: true,
      description: 'Enable JavaScript completions in ClojureScript files',
      scope: 'workspace',
    },
    'calva.jackInEnv': {
      value: {},
      description: 'Environment variables for jack-in process',
      scope: 'workspace',
    },
    'calva.customREPLCommandSnippets': {
      value: [],
      description: 'Custom REPL command snippets',
      scope: 'workspace',
    },

    // Clojure-LSP Settings
    'clojure-lsp.enable': {
      value: true,
      description: 'Enable clojure-lsp integration',
      scope: 'workspace',
    },
    'clojure-lsp.server-path': {
      value: '',
      description: 'Path to clojure-lsp executable (empty = use bundled)',
      scope: 'workspace',
    },
    'clojure-lsp.trace.server': {
      value: 'off',
      description: 'Trace communication between VS Code and clojure-lsp (off, messages, verbose)',
      scope: 'workspace',
    },
    'clojure-lsp.semantic-tokens?': {
      value: true,
      description: 'Enable semantic tokens for better syntax highlighting',
      scope: 'workspace',
    },
    'clojure-lsp.clean.ns.on-save?': {
      value: true,
      description: 'Clean namespace form on save (remove unused requires, sort)',
      scope: 'workspace',
    },
    'clojure-lsp.use-source-paths-from-classpath?': {
      value: true,
      description: 'Use source paths from classpath for analysis',
      scope: 'workspace',
    },
    'clojure-lsp.lens.enable?': {
      value: true,
      description: 'Enable code lenses',
      scope: 'workspace',
    },
    'clojure-lsp.lens.show-references?': {
      value: true,
      description: 'Show references code lens',
      scope: 'workspace',
    },

    // Editor Settings for Clojure
    '[clojure]': {
      value: {
        'editor.defaultFormatter': 'betterthantomorrow.calva',
        'editor.formatOnSave': true,
        'editor.autoClosingBrackets': 'never',
        'editor.autoClosingQuotes': 'never',
        'editor.autoIndent': 'full',
        'editor.parameterHints.enabled': true,
        'editor.quickSuggestions': {
          other: true,
          comments: false,
          strings: true,
        },
        'editor.wordSeparators': '`()[]{}",\'',
        'editor.rulers': [80, 100],
        'editor.semanticHighlighting.enabled': true,
      },
      description: 'Editor configuration for Clojure files',
      scope: 'workspace',
    },

    // Editor Settings for ClojureScript
    '[clojurescript]': {
      value: {
        'editor.defaultFormatter': 'betterthantomorrow.calva',
        'editor.formatOnSave': true,
        'editor.autoClosingBrackets': 'never',
        'editor.autoClosingQuotes': 'never',
        'editor.autoIndent': 'full',
        'editor.parameterHints.enabled': true,
        'editor.quickSuggestions': {
          other: true,
          comments: false,
          strings: true,
        },
        'editor.wordSeparators': '`()[]{}",\'',
        'editor.rulers': [80, 100],
        'editor.semanticHighlighting.enabled': true,
      },
      description: 'Editor configuration for ClojureScript files',
      scope: 'workspace',
    },

    // File Associations
    'files.associations': {
      value: {
        '*.clj': 'clojure',
        '*.cljs': 'clojurescript',
        '*.cljc': 'clojure',
        '*.edn': 'clojure',
        '*.bb': 'clojure',
        'deps.edn': 'clojure',
        'shadow-cljs.edn': 'clojure',
      },
      description: 'File associations for Clojure files',
      scope: 'workspace',
    },

    // Rainbow Brackets Settings
    'rainbowBrackets.activeScopeCSS': {
      value: ['borderColor: {color}; borderWidth: 1px; borderStyle: solid;'],
      description: 'CSS for active bracket scope highlighting',
      scope: 'workspace',
    },
    'rainbowBrackets.forceUniqueOpeningColor': {
      value: true,
      description: 'Force different colors for each bracket level',
      scope: 'workspace',
    },
  },

  keybindings: [
    {
      key: 'ctrl+alt+c enter',
      command: 'calva.jackIn',
      description: 'Jack-in: Start REPL and connect',
      when: 'editorLangId == clojure || editorLangId == clojurescript',
    },
    {
      key: 'ctrl+alt+c ctrl+alt+c',
      command: 'calva.connect',
      description: 'Connect to running REPL',
      when: 'editorLangId == clojure || editorLangId == clojurescript',
    },
    {
      key: 'ctrl+enter',
      command: 'calva.evaluateCurrentTopLevelForm',
      description: 'Evaluate top-level form',
      when: 'editorLangId == clojure || editorLangId == clojurescript',
    },
    {
      key: 'ctrl+alt+c space',
      command: 'calva.evaluateSelection',
      description: 'Evaluate selection or current form',
      when: 'editorLangId == clojure || editorLangId == clojurescript',
    },
    {
      key: 'ctrl+alt+c ctrl+alt+n',
      command: 'calva.loadFile',
      description: 'Load/evaluate current file',
      when: 'editorLangId == clojure || editorLangId == clojurescript',
    },
    {
      key: 'ctrl+alt+c t',
      command: 'calva.runNamespaceTests',
      description: 'Run tests in current namespace',
      when: 'editorLangId == clojure || editorLangId == clojurescript',
    },
    {
      key: 'ctrl+alt+c ctrl+t',
      command: 'calva.runAllTests',
      description: 'Run all tests',
      when: 'editorLangId == clojure || editorLangId == clojurescript',
    },
  ],

  snippets: [
    {
      name: 'Namespace declaration',
      prefix: 'ns',
      description: 'Create namespace declaration',
      body: ['(ns ${1:namespace-name}', '  (:require [${2:dependency}]))', '', '${0}'],
    },
    {
      name: 'Function definition',
      prefix: 'defn',
      description: 'Define a function',
      body: ['(defn ${1:function-name}', '  "${2:docstring}"', '  [${3:args}]', '  ${0:body})'],
    },
    {
      name: 'Private function',
      prefix: 'defn-',
      description: 'Define a private function',
      body: ['(defn- ${1:function-name}', '  "${2:docstring}"', '  [${3:args}]', '  ${0:body})'],
    },
    {
      name: 'Def',
      prefix: 'def',
      description: 'Define a var',
      body: ['(def ${1:name}', '  ${0:value})'],
    },
    {
      name: 'Let binding',
      prefix: 'let',
      description: 'Let binding',
      body: ['(let [${1:binding} ${2:value}]', '  ${0:body})'],
    },
    {
      name: 'If expression',
      prefix: 'if',
      description: 'If conditional',
      body: ['(if ${1:test}', '  ${2:then}', '  ${0:else})'],
    },
    {
      name: 'If-let binding',
      prefix: 'if-let',
      description: 'If with let binding',
      body: ['(if-let [${1:binding} ${2:test}]', '  ${3:then}', '  ${0:else})'],
    },
    {
      name: 'When expression',
      prefix: 'when',
      description: 'When conditional',
      body: ['(when ${1:test}', '  ${0:body})'],
    },
    {
      name: 'When-let binding',
      prefix: 'when-let',
      description: 'When with let binding',
      body: ['(when-let [${1:binding} ${2:test}]', '  ${0:body})'],
    },
    {
      name: 'Cond expression',
      prefix: 'cond',
      description: 'Cond conditional',
      body: ['(cond', '  ${1:test1} ${2:expr1}', '  ${3:test2} ${4:expr2}', '  :else ${0:default})'],
    },
    {
      name: 'Condp expression',
      prefix: 'condp',
      description: 'Condp conditional with predicate',
      body: [
        '(condp ${1:pred} ${2:expr}',
        '  ${3:value1} ${4:result1}',
        '  ${5:value2} ${6:result2}',
        '  ${0:default})',
      ],
    },
    {
      name: 'Case expression',
      prefix: 'case',
      description: 'Case conditional',
      body: ['(case ${1:expr}', '  ${2:value1} ${3:result1}', '  ${4:value2} ${5:result2}', '  ${0:default})'],
    },
    {
      name: 'For comprehension',
      prefix: 'for',
      description: 'For list comprehension',
      body: ['(for [${1:item} ${2:coll}]', '  ${0:body})'],
    },
    {
      name: 'Doseq',
      prefix: 'doseq',
      description: 'Side-effecting iteration',
      body: ['(doseq [${1:item} ${2:coll}]', '  ${0:body})'],
    },
    {
      name: 'Dotimes',
      prefix: 'dotimes',
      description: 'Numeric iteration',
      body: ['(dotimes [${1:i} ${2:n}]', '  ${0:body})'],
    },
    {
      name: 'Thread first',
      prefix: '->',
      description: 'Thread-first macro',
      body: ['(-> ${1:expr}', '    ${2:form1}', '    ${0:form2})'],
    },
    {
      name: 'Thread last',
      prefix: '->>',
      description: 'Thread-last macro',
      body: ['(->> ${1:expr}', '     ${2:form1}', '     ${0:form2})'],
    },
    {
      name: 'Defrecord',
      prefix: 'defrecord',
      description: 'Define a record',
      body: ['(defrecord ${1:RecordName} [${2:field1} ${3:field2}]', '  ${0:protocol-impl})'],
    },
    {
      name: 'Defprotocol',
      prefix: 'defprotocol',
      description: 'Define a protocol',
      body: [
        '(defprotocol ${1:ProtocolName}',
        '  "${2:docstring}"',
        '  (${3:method-name} [${4:this} ${5:args}] "${6:method-doc}"))',
      ],
    },
    {
      name: 'Defmulti',
      prefix: 'defmulti',
      description: 'Define a multimethod',
      body: ['(defmulti ${1:name}', '  "${2:docstring}"', '  ${0:dispatch-fn})'],
    },
    {
      name: 'Defmethod',
      prefix: 'defmethod',
      description: 'Define a method implementation',
      body: ['(defmethod ${1:multimethod} ${2:dispatch-value}', '  [${3:args}]', '  ${0:body})'],
    },
    {
      name: 'Deftest',
      prefix: 'deftest',
      description: 'Define a test',
      body: ['(deftest ${1:test-name}', '  (testing "${2:description}"', '    (is (= ${3:expected} ${0:actual}))))'],
    },
    {
      name: 'Is assertion',
      prefix: 'is',
      description: 'Test assertion',
      body: ['(is (= ${1:expected} ${0:actual}))'],
    },
    {
      name: 'Testing block',
      prefix: 'testing',
      description: 'Testing context',
      body: ['(testing "${1:description}"', '  ${0:assertions})'],
    },
    {
      name: 'Comment',
      prefix: 'comment',
      description: 'Comment form for REPL experiments',
      body: ['(comment', '  ${0:;; REPL experiments}', '  )'],
    },
  ],

  documentation: {
    setup_guide: `# Clojure Extension Pack Setup Guide

## Prerequisites

Before using this extension pack, ensure you have the following installed:

1. **Java Development Kit (JDK)** (version 11 or higher)
   - Download from: https://adoptium.net/
   - Or use package manager:
     - macOS: \`brew install openjdk@11\`
     - Linux: \`sudo apt install openjdk-11-jdk\` or \`sudo dnf install java-11-openjdk\`
     - Windows: \`choco install openjdk11\`

2. **Clojure CLI tools**
   - Download from: https://clojure.org/guides/install_clojure
   - macOS: \`brew install clojure/tools/clojure\`
   - Linux: Follow installation script from clojure.org
   - Windows: \`scoop install clojure\` or use PowerShell installer

3. **Leiningen** (optional, for Leiningen projects)
   - Download from: https://leiningen.org/
   - macOS: \`brew install leiningen\`
   - Linux/Unix: Follow installation script
   - Windows: \`scoop install leiningen\`

## Quick Start

### 1. Verify Installation

Open a terminal and verify your installations:

\`\`\`bash
# Check Java version
java -version

# Check Clojure CLI
clj --version

# Check Leiningen (if using)
lein version
\`\`\`

### 2. Create a New Project

**Using Clojure CLI (deps.edn):**

\`\`\`bash
# Create project directory
mkdir my-clojure-app
cd my-clojure-app

# Create deps.edn
cat > deps.edn << 'EOF'
{:paths ["src" "resources"]
 :deps {org.clojure/clojure {:mvn/version "1.11.1"}}
 :aliases
 {:dev {:extra-paths ["dev"]
        :extra-deps {nrepl/nrepl {:mvn/version "1.0.0"}
                     cider/cider-nrepl {:mvn/version "0.30.0"}}}
  :test {:extra-paths ["test"]
         :extra-deps {org.clojure/test.check {:mvn/version "1.1.1"}}}}}
EOF

# Create source directory and file
mkdir -p src/my_clojure_app
cat > src/my_clojure_app/core.clj << 'EOF'
(ns my-clojure-app.core)

(defn greet
  "A friendly greeting."
  [name]
  (str "Hello, " name "!"))

(defn -main
  [& args]
  (println (greet "World")))
EOF
\`\`\`

**Using Leiningen:**

\`\`\`bash
lein new app my-clojure-app
cd my-clojure-app
\`\`\`

### 3. Open in VSCode

Open the project folder in VSCode. Calva will automatically detect the project type.

### 4. Start REPL (Jack-in)

- Press \`Ctrl+Alt+C Enter\` (or \`Cmd+Alt+C Enter\` on macOS)
- Select project type (deps.edn, Leiningen, shadow-cljs, etc.)
- Select alias/profile if prompted
- Wait for REPL to start

The REPL window will open automatically with connection info.

## Extension Overview

### Required Extensions

#### Calva (betterthantomorrow.calva)
- **Purpose**: Interactive Clojure/ClojureScript development
- **Features**:
  - REPL integration (nREPL)
  - Structural editing (Paredit)
  - Interactive code evaluation
  - Code navigation and refactoring
  - Syntax highlighting
  - Test runner integration

#### Clojure LSP (betterthantomorrow.clojure-lsp)
- **Purpose**: Language Server Protocol support
- **Features**:
  - Go to definition
  - Find references
  - Rename symbol
  - Code lenses
  - Semantic highlighting
  - Automatic namespace cleaning

### Optional Extensions

#### Parinfer (shaunlebron.vscode-parinfer)
- **Purpose**: Simplified parentheses management
- **Features**:
  - Automatic bracket balancing
  - Indent-based editing
  - Great for beginners

#### Rainbow Brackets (2gua.rainbow-brackets)
- **Purpose**: Visual bracket matching
- **Features**:
  - Color-coded nested brackets
  - Active scope highlighting
  - Easier to read deeply nested code

#### Clojure Snippets (rafaeldelboni.clojure-snippets)
- **Purpose**: Common code patterns
- **Features**:
  - Quick insertion of forms
  - Namespace templates
  - Test templates

## Configuration

### REPL Connection

Calva automatically configures REPL connections for common project types:

1. **deps.edn projects**: Uses Clojure CLI
2. **Leiningen projects**: Uses Leiningen
3. **shadow-cljs projects**: Uses shadow-cljs
4. **Custom projects**: Can be configured via \`.calva/config.edn\`

### Custom REPL Configuration

Create \`.calva/config.edn\` in your project root:

\`\`\`clojure
{:connectSequence "My Custom REPL"
 :cljsType "figwheel-main"
 :openREPLWindow true
 :customREPLCommandLine ["clj" "-M:dev:test"]}
\`\`\`

### Formatting

Calva uses cljfmt for formatting. Customize in \`.cljfmt.edn\`:

\`\`\`clojure
{:indents {my-macro [[:block 1]]}}
\`\`\`

## Usage Tips

### Structural Editing (Paredit)

Calva includes Paredit for structural editing:

- **Slurp**: \`Ctrl+Alt+Right\` - Extend form forward
- **Barf**: \`Ctrl+Alt+Left\` - Contract form backward
- **Wrap**: \`Ctrl+Alt+S\` - Wrap selection in parens
- **Splice**: \`Ctrl+Alt+S\` - Remove parens, keep content
- **Raise**: \`Ctrl+Alt+P\` then \`R\` - Replace parent with current form

### REPL Evaluation

- **Evaluate form**: \`Ctrl+Enter\` - Evaluate current top-level form
- **Evaluate selection**: \`Ctrl+Alt+C Space\` - Evaluate selected code
- **Load file**: \`Ctrl+Alt+C Ctrl+Alt+N\` - Load entire file
- **Show result inline**: Results appear next to code
- **Send to REPL**: \`Ctrl+Alt+C E\` - Send to REPL window

### Testing

- **Run namespace tests**: \`Ctrl+Alt+C T\`
- **Run all tests**: \`Ctrl+Alt+C Ctrl+T\`
- **Run failing tests**: Re-run only failed tests
- **Test results**: Appear in REPL window and inline

### Navigation

- **Go to definition**: \`F12\`
- **Peek definition**: \`Alt+F12\`
- **Find references**: \`Shift+F12\`
- **Symbol search**: \`Ctrl+T\`
- **Go to symbol**: \`Ctrl+Shift+O\`

## Common Commands

\`\`\`bash
# Start REPL (deps.edn)
clj -M:dev

# Start REPL with nREPL (for Calva)
clj -M:dev -m nrepl.cmdline

# Run tests
clj -M:test -m clojure.test

# Build uberjar (deps.edn with tools.build)
clj -T:build uber

# Leiningen commands
lein repl       # Start REPL
lein test       # Run tests
lein uberjar    # Build standalone JAR
lein run        # Run -main function
\`\`\`

## ClojureScript Setup

### Figwheel Main

\`\`\`bash
# Add to deps.edn :aliases
:fig {:extra-deps {com.bhauman/figwheel-main {:mvn/version "0.2.18"}
                    com.bhauman/rebel-readline-cljs {:mvn/version "0.1.4"}}
      :extra-paths ["target" "test"]}

# Start Figwheel
clj -M:fig --build dev --repl
\`\`\`

### Shadow-CLJS

\`\`\`bash
# Install shadow-cljs
npm install --save-dev shadow-cljs

# Create shadow-cljs.edn
npx shadow-cljs init

# Start with watch
npx shadow-cljs watch app

# Jack-in with Calva and select shadow-cljs
\`\`\`

## Best Practices

### 1. REPL-Driven Development

- Start REPL early, keep it running
- Evaluate forms frequently as you write
- Use Rich Comments for experiments
- Load namespace after changes

### 2. Project Structure

\`\`\`
my-app/
├── deps.edn              # Dependencies
├── .calva/
│   └── config.edn       # Calva configuration
├── src/
│   └── my_app/
│       ├── core.clj     # Main code
│       └── util.clj     # Utilities
├── test/
│   └── my_app/
│       └── core_test.clj # Tests
└── resources/           # Resources
\`\`\`

### 3. Testing Workflow

- Write tests in \`test/\` directory
- Use \`clojure.test\` for unit tests
- Run tests frequently
- Use REPL for exploratory testing

### 4. Code Style

- Follow community style guide
- Use 2-space indentation
- Keep lines under 80 characters
- Write docstrings for public functions
- Use meaningful names

### 5. REPL Hygiene

- Restart REPL when classpath changes
- Use \`(require :reload)\` to reload namespaces
- Clean REPL state regularly
- Don't rely on mutable state

## Learning Resources

### Official Documentation

- **Clojure**: https://clojure.org/
- **ClojureScript**: https://clojurescript.org/
- **Calva**: https://calva.io/
- **clojure-lsp**: https://clojure-lsp.io/

### Books

- "Clojure for the Brave and True" (free online)
- "Programming Clojure" by Alex Miller
- "The Joy of Clojure" by Michael Fogus
- "Clojure Applied" by Ben Vandgrift

### Interactive Learning

- **Clojure Koans**: https://github.com/functional-koans/clojure-koans
- **4Clojure**: https://4clojure.oxal.org/
- **Exercism Clojure Track**: https://exercism.org/tracks/clojure

### Community

- **Clojurians Slack**: https://clojurians.net/
- **ClojureVerse**: https://clojureverse.org/
- **r/Clojure**: https://reddit.com/r/Clojure
`,

    troubleshooting: `# Troubleshooting Clojure Development

## Common Issues

### REPL Not Connecting

**Problem**: Jack-in fails or REPL doesn't connect

**Solutions**:

1. **Check Java Installation**:
   \`\`\`bash
   java -version
   # Should show Java 11 or higher
   \`\`\`

2. **Verify Project Configuration**:
   - deps.edn projects: Check \`deps.edn\` syntax
   - Leiningen: Check \`project.clj\` syntax
   - Ensure nREPL middleware is configured

3. **Check Firewall/Ports**:
   - nREPL typically uses random port
   - Check if port is blocked
   - Try specifying port in \`.nrepl-port\` file

4. **Clear Cache**:
   \`\`\`bash
   # Clear Maven cache
   rm -rf ~/.m2/repository

   # Clear deps.edn cache
   rm -rf ~/.clojure/.cpcache

   # Clear Leiningen cache
   rm -rf ~/.lein
   \`\`\`

5. **Check Calva Output**:
   - View → Output → Select "Calva" from dropdown
   - Look for error messages

6. **Manual REPL Start**:
   \`\`\`bash
   # Start nREPL manually
   clj -M:dev -m nrepl.cmdline

   # Note the port, then Connect (Ctrl+Alt+C C)
   # Enter localhost:<port>
   \`\`\`

### Evaluation Not Working

**Problem**: Code evaluation doesn't produce results

**Solutions**:

1. **Check REPL Connection**:
   - Look for "nREPL" in status bar
   - Green = connected, Red = disconnected
   - Reconnect if needed

2. **Load File First**:
   - Press \`Ctrl+Alt+C Ctrl+Alt+N\` to load file
   - Then try evaluation

3. **Check Namespace**:
   - Ensure namespace matches file path
   - \`src/my_app/core.clj\` → \`(ns my-app.core)\`

4. **Clear REPL State**:
   - Restart REPL
   - Reload all namespaces

5. **Check for Syntax Errors**:
   - Look for red underlines
   - Check parentheses balance
   - Use \`Ctrl+Shift+P\` → "Paredit: Infer Parens"

### Formatting Issues

**Problem**: Code formatting not working or incorrect

**Solutions**:

1. **Enable Format on Save**:
   \`\`\`json
   {
     "calva.fmt.formatOnSave": true,
     "[clojure]": {
       "editor.formatOnSave": true
     }
   }
   \`\`\`

2. **Manual Format**:
   - \`Shift+Alt+F\` (Windows/Linux)
   - \`Shift+Option+F\` (macOS)

3. **Custom Indentation**:
   - Create \`.cljfmt.edn\` in project root
   - Define custom indents for macros

4. **Check File Association**:
   - Ensure \`.clj\` files recognized as Clojure
   - Check status bar language mode

### Paredit Issues

**Problem**: Structural editing behaving unexpectedly

**Solutions**:

1. **Disable Paredit Temporarily**:
   - \`Ctrl+Shift+P\` → "Calva Paredit: Toggle Mode"
   - Test without Paredit

2. **Fix Unbalanced Parens**:
   - Use \`Ctrl+Shift+P\` → "Paredit: Infer Parens"
   - Manually balance with Paredit off

3. **Learn Paredit Commands**:
   - Slurp: \`Ctrl+Alt+Right\`
   - Barf: \`Ctrl+Alt+Left\`
   - Practice in scratch file

4. **Use Parinfer Instead**:
   - Install Parinfer extension
   - Easier for beginners
   - Toggle between modes

### Performance Issues

**Problem**: Slow completions or laggy editor

**Solutions**:

1. **Disable Unused Features**:
   \`\`\`json
   {
     "calva.referencesCodeLens.enabled": false,
     "clojure-lsp.semantic-tokens?": false
   }
   \`\`\`

2. **Limit clojure-lsp Analysis**:
   - Create \`.lsp/config.edn\`
   - Exclude large directories
   - Configure source paths

3. **Increase Memory**:
   - Add to \`.bashrc\` or \`.zshrc\`:
   \`\`\`bash
   export CLJ_JVM_OPTS="-Xmx4g"
   \`\`\`

4. **Clear caches**:
   \`\`\`bash
   rm -rf .lsp/.cache
   rm -rf .calva
   \`\`\`

### Dependency Issues

**Problem**: Dependencies not resolving or conflicts

**Solutions**:

1. **Check deps.edn**:
   \`\`\`clojure
   {:deps {org.clojure/clojure {:mvn/version "1.11.1"}}}
   \`\`\`

2. **Force Update**:
   \`\`\`bash
   # deps.edn
   clj -Sforce -P

   # Leiningen
   lein clean
   lein deps
   \`\`\`

3. **Check for Conflicts**:
   \`\`\`bash
   # deps.edn
   clj -Stree

   # Leiningen
   lein deps :tree
   \`\`\`

4. **Use Exclusions**:
   \`\`\`clojure
   {:deps {my-lib/my-lib {:mvn/version "1.0.0"
                          :exclusions [conflicting/dep]}}}
   \`\`\`

### ClojureScript Issues

**Problem**: ClojureScript compilation or REPL problems

**Solutions**:

1. **Check Node.js**:
   \`\`\`bash
   node --version
   # Should be 12 or higher
   \`\`\`

2. **Clear Compiled Output**:
   \`\`\`bash
   # shadow-cljs
   rm -rf .shadow-cljs
   rm -rf target

   # Figwheel
   rm -rf target/public
   \`\`\`

3. **Check Browser Console**:
   - Open DevTools in browser
   - Look for JavaScript errors
   - Check WebSocket connection

4. **Verify ClojureScript Version**:
   - Ensure compatible with tooling
   - Update to latest stable

### Test Runner Issues

**Problem**: Tests not running or failing unexpectedly

**Solutions**:

1. **Check Test Namespace**:
   - Must end with \`-test\`
   - Must require \`clojure.test\`
   \`\`\`clojure
   (ns my-app.core-test
     (:require [clojure.test :refer [deftest is testing]]
               [my-app.core :as core]))
   \`\`\`

2. **Load Test File**:
   - Press \`Ctrl+Alt+C Ctrl+Alt+N\` in test file
   - Then run tests

3. **Check Test Configuration**:
   - Ensure test paths in deps.edn
   - Verify test dependencies loaded

4. **Run from Command Line**:
   \`\`\`bash
   clj -M:test -m clojure.test
   \`\`\`

### clojure-lsp Issues

**Problem**: LSP features not working

**Solutions**:

1. **Check clojure-lsp Installation**:
   - Calva bundles clojure-lsp
   - Check version: View → Output → Clojure LSP

2. **Restart LSP Server**:
   - \`Ctrl+Shift+P\` → "Clojure: Restart LSP Server"

3. **Check Project Analysis**:
   - Wait for initial analysis to complete
   - Look for "clojure-lsp" in status bar

4. **Configure Source Paths**:
   - Create \`.lsp/config.edn\`
   \`\`\`clojure
   {:source-paths ["src" "test"]}
   \`\`\`

5. **Update clojure-lsp**:
   - Update Calva extension
   - Or download latest from GitHub

## Getting Help

If you're still experiencing issues:

1. **Check Logs**:
   - View → Output → Calva
   - View → Output → Clojure LSP

2. **Calva Documentation**: https://calva.io/
3. **Calva GitHub Issues**: https://github.com/BetterThanTomorrow/calva/issues
4. **Clojurians Slack**: #calva, #clojure-lsp, #beginners channels
5. **ClojureVerse**: https://clojureverse.org/

When reporting issues, include:
- VS Code version
- Calva version
- Java version (\`java -version\`)
- Clojure version
- Project type (deps.edn, Leiningen, shadow-cljs)
- Error messages from Output panel
- Minimal reproduction steps
`,
  },
};
