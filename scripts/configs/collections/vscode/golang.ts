import {
  goAsm,
  goCritic,
  goDoc,
  goExtension,
  goFillStruct,
  goOutliner,
  goTemplateHighlighter,
  goTestExplorer,
} from '../../extensions/golang';
import { errorLens } from '../../extensions/productivity';
import { Collection } from '../../shared/types';

export const golang: Collection = {
  description: 'Essential Go development environment for VSCode - comprehensive tooling for modern Go development',
  tags: ['golang', 'go', 'backend', 'development', 'testing', 'microservices'],

  required_extensions: [goExtension, errorLens],

  optional_extensions: [goOutliner, goTestExplorer, goFillStruct, goTemplateHighlighter, goDoc, goCritic, goAsm],

  settings: {
    // Go Language Settings
    'go.useLanguageServer': {
      value: true,
      description: 'Use the Go language server (gopls) for enhanced features',
      scope: 'workspace',
    },
    'go.formatTool': {
      value: 'goimports',
      description: 'Use goimports for formatting (handles imports automatically)',
      scope: 'workspace',
    },
    'go.lintTool': {
      value: 'golangci-lint',
      description: 'Use golangci-lint for comprehensive linting',
      scope: 'workspace',
    },
    'go.lintOnSave': {
      value: 'workspace',
      description: 'Run linter on save for workspace files',
      scope: 'workspace',
    },
    'go.vetOnSave': {
      value: 'workspace',
      description: 'Run go vet on save for workspace files',
      scope: 'workspace',
    },
    'go.buildOnSave': {
      value: 'workspace',
      description: 'Build on save for workspace files',
      scope: 'workspace',
    },
    'go.testOnSave': {
      value: false,
      description: 'Disable automatic test running on save (performance)',
      scope: 'workspace',
    },
    'go.coverOnSave': {
      value: false,
      description: 'Disable automatic coverage on save (performance)',
      scope: 'workspace',
    },
    'go.gocodeAutoBuild': {
      value: true,
      description: 'Enable automatic building for autocompletion',
      scope: 'workspace',
    },

    // Editor Settings for Go
    '[go]': {
      value: {
        'editor.formatOnSave': true,
        'editor.codeActionsOnSave': {
          'source.organizeImports': 'explicit',
        },
        'editor.tabSize': 4,
        'editor.insertSpaces': false,
        'editor.detectIndentation': false,
      },
      description: 'Go-specific editor settings following Go conventions',
      scope: 'workspace',
    },
    '[go.mod]': {
      value: {
        'editor.formatOnSave': true,
        'editor.tabSize': 4,
        'editor.insertSpaces': false,
      },
      description: 'Go module file specific settings',
      scope: 'workspace',
    },
    '[go.sum]': {
      value: {
        'editor.formatOnSave': false,
        'editor.tabSize': 4,
        'editor.insertSpaces': false,
      },
      description: 'Go sum file specific settings (no formatting)',
      scope: 'workspace',
    },

    // Testing Settings
    'go.testFlags': {
      value: ['-v', '-race'],
      description: 'Default flags for go test (verbose and race detection)',
      scope: 'workspace',
    },
    'go.testTimeout': {
      value: '30s',
      description: 'Test timeout duration',
      scope: 'workspace',
    },
    'go.coverageDecorator': {
      value: {
        type: 'gutter',
        coveredHighlightColor: 'rgba(64,128,128,0.5)',
        uncoveredHighlightColor: 'rgba(128,64,64,0.25)',
      },
      description: 'Test coverage visualization settings',
      scope: 'workspace',
    },
  },

  keybindings: [
    {
      key: 'ctrl+shift+t',
      command: 'go.test.package',
      when: 'editorTextFocus && editorLangId == go',
      description: 'Run tests in current package',
    },
    {
      key: 'ctrl+shift+f',
      command: 'editor.action.formatDocument',
      when: 'editorTextFocus && editorLangId == go',
      description: 'Format Go code',
    },
    {
      key: 'ctrl+shift+r',
      command: 'go.test.file',
      when: 'editorTextFocus && editorLangId == go',
      description: 'Run tests in current file',
    },
    {
      key: 'f12',
      command: 'editor.action.revealDefinition',
      when: 'editorTextFocus && editorLangId == go',
      description: 'Go to definition',
    },
    {
      key: 'shift+f12',
      command: 'editor.action.goToReferences',
      when: 'editorTextFocus && editorLangId == go',
      description: 'Find all references',
    },
  ],

  snippets: [
    // Core Language Constructs
    {
      name: 'Function Declaration',
      prefix: 'fn',
      description: 'Go function declaration',
      body: ['func ${1:functionName}(${2:params}) ${3:returnType} {', '\t${4:// function body}', '}'],
    },
    {
      name: 'Method Declaration',
      prefix: 'cm',
      description: 'Go method declaration',
      body: [
        'func (${1:receiver} ${2:Type}) ${3:methodName}(${4:params}) ${5:returnType} {',
        '\t${6:// method body}',
        '}',
      ],
    },
    {
      name: 'Struct Declaration',
      prefix: 'cl',
      description: 'Go struct definition',
      body: ['type ${1:StructName} struct {', '\t${2:Field} ${3:Type}', '}'],
    },
    {
      name: 'Interface Declaration',
      prefix: 'inf',
      description: 'Go interface definition',
      body: ['type ${1:InterfaceName} interface {', '\t${2:MethodName}(${3:params}) ${4:returnType}', '}'],
    },

    // Control Flow
    {
      name: 'If Statement',
      prefix: 'if',
      description: 'Simple if statement',
      body: ['if ${1:condition} {', '\t${2:// if body}', '}'],
    },
    {
      name: 'If-Else Statement',
      prefix: 'ifel',
      description: 'If-else statement',
      body: ['if ${1:condition} {', '\t${2:// if body}', '} else {', '\t${3:// else body}', '}'],
    },
    {
      name: 'For Loop',
      prefix: 'for',
      description: 'Standard for loop',
      body: ['for ${1:i} := 0; ${1:i} < ${2:length}; ${1:i}++ {', '\t${3:// loop body}', '}'],
    },
    {
      name: 'Range Loop',
      prefix: 'forr',
      description: 'Range loop for slices/maps',
      body: ['for ${1:index}, ${2:value} := range ${3:slice} {', '\t${4:// loop body}', '}'],
    },
    {
      name: 'Switch Statement',
      prefix: 'sw',
      description: 'Switch statement',
      body: [
        'switch ${1:expression} {',
        'case ${2:value1}:',
        '\t${3:// case 1}',
        'case ${4:value2}:',
        '\t${5:// case 2}',
        'default:',
        '\t${6:// default case}',
        '}',
      ],
    },

    // Error Handling
    {
      name: 'Error Check',
      prefix: 'err',
      description: 'Standard Go error checking',
      body: ['if err != nil {', '\t${1:return err}', '}'],
    },
    {
      name: 'Error Check with Log',
      prefix: 'errl',
      description: 'Error checking with logging',
      body: ['if err != nil {', '\tlog.Printf("${1:error message}: %v", err)', '\t${2:return err}', '}'],
    },

    // Package and Imports
    {
      name: 'Package Declaration',
      prefix: 'pkg',
      description: 'Package declaration',
      body: 'package ${1:main}',
    },
    {
      name: 'Import Statement',
      prefix: 'im',
      description: 'Import statement',
      body: 'import "${1:package}"',
    },
    {
      name: 'Import Block',
      prefix: 'imb',
      description: 'Import block with multiple packages',
      body: ['import (', '\t"${1:package1}"', '\t"${2:package2}"', ')'],
    },

    // Testing
    {
      name: 'Test Function',
      prefix: 'test',
      description: 'Go test function',
      body: ['func Test${1:FunctionName}(t *testing.T) {', '\t${2:// test body}', '}'],
    },
    {
      name: 'Benchmark Function',
      prefix: 'bench',
      description: 'Go benchmark function',
      body: [
        'func Benchmark${1:FunctionName}(b *testing.B) {',
        '\tfor i := 0; i < b.N; i++ {',
        '\t\t${2:// benchmark body}',
        '\t}',
        '}',
      ],
    },

    // Development/Debugging
    {
      name: 'Print Statement',
      prefix: 'log',
      description: 'Print statement',
      body: 'fmt.Println(${1:value})',
    },
    {
      name: 'Printf Statement',
      prefix: 'logf',
      description: 'Printf statement with formatting',
      body: 'fmt.Printf("${1:format}\\n", ${2:args})',
    },
    {
      name: 'Log Statement',
      prefix: 'logl',
      description: 'Log statement',
      body: 'log.Println(${1:value})',
    },
    {
      name: 'Debug Print',
      prefix: 'debug',
      description: 'Debug logging with context',
      body: 'log.Printf("DEBUG ${1:context}: %+v", ${2:variable})',
    },
    {
      name: 'TODO Comment',
      prefix: 'todo',
      description: 'TODO comment marker',
      body: '// TODO: ${1:description}',
    },

    // Common Patterns
    {
      name: 'HTTP Handler',
      prefix: 'handler',
      description: 'HTTP handler function',
      body: ['func ${1:handlerName}(w http.ResponseWriter, r *http.Request) {', '\t${2:// handler body}', '}'],
    },
    {
      name: 'Go Routine',
      prefix: 'go',
      description: 'Go routine call',
      body: 'go ${1:functionCall}(${2:args})',
    },
    {
      name: 'Channel Declaration',
      prefix: 'ch',
      description: 'Channel declaration',
      body: '${1:ch} := make(chan ${2:type}${3:, buffer})',
    },
  ],

  documentation: {
    setup_guide: `# Go Extension Pack Setup

## Quick Start
1. Install Go from https://golang.org/dl/
2. Install all required extensions
3. Set up your Go workspace
4. Configure Go tools (golangci-lint, goimports)
5. Restart VSCode to ensure all settings are applied

## Extensions Included

### Core Go Support
- **Go**: Official Go language support with IntelliSense, debugging, and testing
- **Error Lens**: Enhanced error visibility for Go development

### Productivity Tools (Optional)
- **Go Outliner**: Navigate Go code structure with enhanced outline view
- **Go Test Explorer**: Visual test runner and explorer for Go tests
- **Go Fill Struct**: Automatically fill Go struct literals with zero values
- **Go Template Highlighter**: Enhanced syntax highlighting for Go template files
- **Go Coverage Viewer**: View Go code coverage results directly in the editor
- **Go Doc**: Quick access to Go documentation for symbols and packages
- **Go Critic**: Advanced Go linting with go-critic integration
- **Go Asm**: Syntax highlighting and autocomplete for Go assembly language

## Prerequisites

### Install Go
Download and install Go from https://golang.org/dl/

### Verify Installation
\`\`\`bash
go version
\`\`\`

### Set Up Go Tools
The Go extension will prompt you to install required tools. Or install manually:
\`\`\`bash
go install golang.org/x/tools/gopls@latest
go install golang.org/x/tools/cmd/goimports@latest
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
go install golang.org/x/tools/cmd/godoc@latest
go install github.com/go-delve/delve/cmd/dlv@latest
\`\`\`

## Project Setup

### Initialize Go Module
\`\`\`bash
go mod init your-project-name
\`\`\`

### Workspace Structure
\`\`\`
your-project/
├── go.mod              # Module definition
├── go.sum              # Module checksums
├── main.go             # Main application
├── cmd/                # Application binaries
├── internal/           # Private application code
├── pkg/                # Public library code
└── test/               # Test files
\`\`\`

### Sample main.go
\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

## Configuration Files

### .golangci.yml (Optional)
\`\`\`yaml
linters-settings:
  govet:
    check-shadowing: true
  gocyclo:
    min-complexity: 15
  maligned:
    suggest-new: true
  dupl:
    threshold: 100

linters:
  enable:
    - megacheck
    - govet
    - gocyclo
    - maligned
    - dupl
    - ineffassign
    - misspell
    - unconvert
    - typecheck
    - errcheck
    - gosimple
    - staticcheck
    - unused
    - varcheck
    - deadcode
    - structcheck
\`\`\`

## Usage Tips

### Keyboard Shortcuts
- **Ctrl+Shift+T**: Run tests in current package
- **Ctrl+Shift+R**: Run tests in current file
- **Ctrl+Shift+F**: Format Go code
- **F12**: Go to definition
- **Shift+F12**: Find all references
- **F2**: Rename symbol

### Code Snippets
- Type \`fn\` + Tab for function declaration
- Type \`cl\` + Tab for struct declaration
- Type \`inf\` + Tab for interface declaration
- Type \`test\` + Tab for test function
- Type \`err\` + Tab for error checking
- Type \`log\` + Tab for print statement

### Testing
- Run tests: \`go test ./...\`
- Run with coverage: \`go test -cover ./...\`
- Run specific test: \`go test -run TestFunctionName\`
- Benchmark: \`go test -bench=.\`

### Building and Running
- Run: \`go run main.go\`
- Build: \`go build\`
- Build for different OS: \`GOOS=linux go build\`
- Install: \`go install\`

## Best Practices

### Code Organization
- Use meaningful package names
- Keep packages focused and cohesive
- Follow Go naming conventions
- Use interfaces for abstraction

### Error Handling
- Always check errors explicitly
- Wrap errors with context when appropriate
- Use panic only for truly exceptional cases
- Return errors as the last return value

### Testing
- Write tests for all public functions
- Use table-driven tests for multiple test cases
- Follow naming convention: TestFunctionName
- Use testify for assertions (optional)

### Performance
- Use go vet and golangci-lint regularly
- Profile with pprof when needed
- Be mindful of goroutine leaks
- Use benchmarks for performance-critical code`,

    troubleshooting: `# Common Go Issues and Solutions

## Go Extension Issues

### Go tools not installed
- Run Command Palette > "Go: Install/Update Tools"
- Or install manually: \`go install golang.org/x/tools/gopls@latest\`
- Ensure GOPATH and GOROOT are set correctly

### Language server not working
- Restart Go language server: Command Palette > "Go: Restart Language Server"
- Check gopls is installed: \`which gopls\`
- Update gopls: \`go install golang.org/x/tools/gopls@latest\`

## Build and Import Issues

### Module not found errors
- Ensure you're in a Go module: \`go mod init module-name\`
- Run \`go mod tidy\` to clean up dependencies
- Check go.mod file syntax

### Import path issues
- Use full import paths for external packages
- Internal packages should use module-relative paths
- Run \`go mod download\` to fetch dependencies

### GOPROXY issues
- Set GOPROXY: \`go env -w GOPROXY=https://proxy.golang.org,direct\`
- For private repos: \`go env -w GOPRIVATE=your-domain.com\`

## Testing Issues

### Tests not running
- Ensure test files end with \`_test.go\`
- Test functions must start with \`Test\`
- Import \`testing\` package
- Check file is in the same package as code under test

### Coverage not showing
- Enable coverage in VSCode Go settings
- Run tests with coverage: \`go test -cover\`
- Check coverage profile: \`go test -coverprofile=coverage.out\`

## Performance Issues

### Slow IntelliSense
- Increase gopls memory: add \`"go.languageServerFlags": ["-rpc.trace"]\`
- Exclude large directories from workspace
- Use build constraints to exclude unnecessary files

### Slow builds
- Use go mod vendor for dependency management
- Exclude vendor directory from file watcher
- Use build cache: ensure GOCACHE is set

## Debugging Issues

### Debugger not working
- Install Delve: \`go install github.com/go-delve/delve/cmd/dlv@latest\`
- Ensure CGO_ENABLED=1 for debugging
- Check launch.json configuration
- Build with debug symbols: \`go build -gcflags="all=-N -l"\`

### Breakpoints not hit
- Ensure source maps are correct
- Check if code is optimized out
- Verify file paths in debugger
- Try setting breakpoint on function entry

## Environment Issues

### GOPATH vs Go Modules
- Use Go modules (go.mod) for new projects
- Set GO111MODULE=on (default in Go 1.16+)
- Don't mix GOPATH and modules in same project

### Cross-platform builds
- Set GOOS and GOARCH: \`GOOS=windows GOARCH=amd64 go build\`
- Use build tags for platform-specific code
- Test on target platform when possible

## General Troubleshooting

### Extension conflicts
- Disable other Go extensions temporarily
- Check for conflicting settings
- Reset Go extension settings to default

### Settings not applying
- Check settings scope (user vs workspace)
- Restart VSCode after major changes
- Verify JSON syntax in settings files

### Performance optimization
- Exclude large directories from Go extension
- Use .gitignore to exclude generated files
- Consider using remote development for large projects`,
  },
};
