import { Collection } from '../../shared/types';
import {
  goExtensionVSCodium as goExtension,
  goOutlinerVSCodium as goOutliner,
  goTestExplorerVSCodium as goTestExplorer,
  goFillStructVSCodium as goFillStruct,
  errorLensVSCodium as errorLens,
  goTemplateHighlighterVSCodium as goTemplateHighlighter
} from '../../extensions/golang';

import {golang as golangVSCode} from '../vscode/golang';

export const golang: Collection = {
  ...golangVSCode,
  description: "Essential Go development environment for VSCodium - comprehensive tooling for modern Go development using open-source alternatives",
  
  required_extensions: [
    goExtension,
    errorLens
  ],
  
  optional_extensions: [
    goOutliner,
    goTestExplorer,
    goFillStruct,
    goTemplateHighlighter
  ],

  documentation: {
    setup_guide: `# Go Extension Pack Setup (VSCodium)

## Quick Start
1. Install Go from https://golang.org/dl/
2. Install all required extensions from Open VSX Registry
3. Set up your Go workspace
4. Configure Go tools (golangci-lint, goimports)
5. Restart VSCodium to ensure all settings are applied

## Extensions Included

### Core Go Support
- **Go**: Official Go language support with IntelliSense, debugging, and testing
- **Better TOML**: TOML support for Go module files and configuration
- **Error Lens**: Enhanced error visibility for Go development

### Productivity Tools (Optional)
- **Go Test Explorer**: Visual test runner and explorer for Go tests
- **Go Fill Struct**: Automatically fill Go struct literals with zero values

## VSCodium Specific Notes

This collection is optimized for VSCodium and uses only open-source extensions available through the Open VSX Registry. All essential Go development capabilities are included through open-source alternatives.

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

    troubleshooting: `# Common Go Issues and Solutions (VSCodium)

## Go Extension Issues

### Go tools not installed
- Run Command Palette > "Go: Install/Update Tools"
- Or install manually: \`go install golang.org/x/tools/gopls@latest\`
- Ensure GOPATH and GOROOT are set correctly

### Language server not working
- Restart Go language server: Command Palette > "Go: Restart Language Server"
- Check gopls is installed: \`which gopls\`
- Update gopls: \`go install golang.org/x/tools/gopls@latest\`

## Extension Installation Issues

### Extensions not available
- Ensure you're using the Open VSX Registry: \`File > Preferences > Settings > Extensions: Gallery API URL\`
- Set to: \`https://open-vsx.org/vscode/gallery\`
- Some extensions may have different names or publishers compared to VSCode marketplace

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
- Enable coverage in VSCodium Go settings
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

## VSCodium Specific Tips

### Extension Marketplace
- Use Open VSX Registry for extension installations
- Some popular VSCode extensions may not be available
- Look for alternative extensions with similar functionality

### Performance
- VSCodium may perform differently than VSCode
- Disable unused extensions to improve performance
- Consider adjusting Go language server memory limits for large projects

## General Troubleshooting

### Extension conflicts
- Disable other Go extensions temporarily
- Check for conflicting settings
- Reset Go extension settings to default

### Settings not applying
- Check settings scope (user vs workspace)
- Restart VSCodium after major changes
- Verify JSON syntax in settings files

### Performance optimization
- Exclude large directories from Go extension
- Use .gitignore to exclude generated files
- Consider using remote development for large projects`
  }
};
