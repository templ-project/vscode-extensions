# Low Level Design: VSCode Extension Pack Builder — Delivery Plan

## Story S-001: Project Setup & Dependencies

- **Description**: Initialize project structure, install dependencies, and configure TypeScript build tooling
- **Source**: [Implementation Notes](low-level-design.md#implementation-notes), [Dependencies](low-level-design.md#dependencies)
- **Value**: high — Foundation for all subsequent development
- **Effort**: S
- **Risk**: low — Standard Node.js project setup
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: []
- **Acceptance Criteria**:
  - Given a fresh clone, when running `npm install`, then all dependencies install without errors
  - Given the project root, when running `npm run build`, then TypeScript compiles successfully to `dist/`
  - Given the dependencies list, when reviewing package.json, then pino, handlebars, @vscode/vsce, ovsx are present
  - Given test configuration, when running `npm test`, then the test framework executes (even with 0 tests)

  - **Task T-001a**: Initialize package.json with dependencies
    - **Effort**: XS
    - **Dependencies**: []
    - **Acceptance Criteria**:
      - package.json includes all core dependencies (pino, pino-pretty, handlebars, @vscode/vsce, ovsx, zod)
      - package.json includes dev dependencies (typescript, @types/node, jest or vitest)
      - Scripts defined: build, test, dev

  - **Task T-001b**: Configure TypeScript (tsconfig.json)
    - **Effort**: XS
    - **Dependencies**: [T-001a]
    - **Acceptance Criteria**:
      - tsconfig.json targets ES2020+ with Node.js module resolution
      - Output directory set to `dist/`
      - Source maps enabled for debugging

  - **Task T-001c**: Setup test framework
    - **Effort**: XS
    - **Dependencies**: [T-001a]
    - **Acceptance Criteria**:
      - Jest or Vitest configured with TypeScript support
      - Test script runs successfully
      - Coverage reporting enabled

  - **Task T-001d**: Create project directory structure
    - **Effort**: XS
    - **Dependencies**: []
    - **Acceptance Criteria**:
      - Directories created: src/config, src/build, src/publish, tests/config, tests/build, tests/publish
      - .gitignore excludes node_modules, dist, *.vsix

## Story S-002: Logging Infrastructure

- **Description**: Setup Pino logger with child logger support for all modules
- **Source**: [Logging Infrastructure](low-level-design.md#logging), [Module Implementation](low-level-design.md#module-implementation-details)
- **Value**: high — Required by all modules for debugging and monitoring
- **Effort**: S
- **Risk**: low — Pino is well-documented and straightforward
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: [S-001]
- **Acceptance Criteria**:
  - Given the main entry point, when initializing the logger, then pino-pretty formats output with colors
  - Given a module class, when creating a child logger, then logs include module context
  - Given LOG_LEVEL env var, when starting the app, then log level respects the setting
  - Given structured data, when logging errors, then context objects are included

  - **Task T-002a**: Create logger factory/configuration
    - **Effort**: XS
    - **Dependencies**: [S-001]
    - **Acceptance Criteria**:
      - Logger initialized with pino-pretty transport
      - LOG_LEVEL environment variable support
      - Default level set to 'info'

  - **Task T-002b**: Add logger to main entry point (src/index.ts)
    - **Effort**: XS
    - **Dependencies**: [T-002a]
    - **Acceptance Criteria**:
      - Root logger created in src/index.ts
      - Child loggers passed to module constructors
      - Startup log message displayed

## Story S-003: Error Classes & ErrorReporter

- **Description**: Implement custom error classes for 7 error categories and ErrorReporter for formatting
- **Source**: [Error Handling Strategy](low-level-design.md#error-handling-strategy), [ErrorReporter Module](low-level-design.md#3-publishing-system-module)
- **Value**: high — Enables transparent, actionable error reporting throughout system
- **Effort**: M
- **Risk**: low — Straightforward class definitions
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: [S-002]
- **Acceptance Criteria**:
  - Given any error type, when ErrorReporter.format() is called, then output includes problem/cause/fix/docs
  - Given structured error data, when logging with pino, then context is included
  - Given 7 error categories, when reviewing code, then all error classes exist and extend base Error
  - Given an AuthenticationError, when formatted, then output includes token generation URL

  - **Task T-003a**: Define custom error classes
    - **Effort**: S
    - **Dependencies**: []
    - **Acceptance Criteria**:
      - Classes: ConfigurationError, ValidationError, BuildError, AssetError, PublishError, NetworkError, VersionConflictError
      - Each extends Error with name, message, context properties

  - **Task T-003b**: Implement ErrorReporter class
    - **Effort**: S
    - **Dependencies**: [T-003a, S-002]
    - **Acceptance Criteria**:
      - format() method returns user-friendly string with ❌ icon, Problem, Cause, Fix, Docs sections
      - Pino child logger integration
      - Error-specific URL generation (VSCode Marketplace, Open VSX docs)

  - **Task T-003c**: Write ErrorReporter tests
    - **Effort**: S
    - **Dependencies**: [T-003b]
    - **Acceptance Criteria**:
      - Test formats AuthenticationError correctly (per LLD example)
      - Test includes marketplace.visualstudio.com URL
      - Test verifies structured logging

## Story S-004: ConfigLoader - Load Collections

- **Description**: Implement ConfigLoader to dynamically load TypeScript collection files
- **Source**: [ConfigLoader Module](low-level-design.md#1-configuration-loader-module), [Configuration File Locations](low-level-design.md#configuration-file-locations)
- **Value**: high — Core capability to read existing configs
- **Effort**: M
- **Risk**: medium — Dynamic imports and TypeScript module resolution
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: [S-002, S-003]
- **Acceptance Criteria**:
  - Given 'vscode' and 'cpp', when calling loadCollection(), then cpp Collection object is returned
  - Given 'vscodium' and 'typescript', when calling loadCollection(), then vscodium typescript Collection is returned
  - Given invalid path, when calling loadCollection(), then ConfigurationError is thrown with actionable message
  - Given no IDE specified, when calling listAvailableCollections(), then all languages are listed

  - **Task T-004a**: Implement loadCollection() method
    - **Effort**: M
    - **Dependencies**: [S-002]
    - **Acceptance Criteria**:
      - Uses dynamic import() to load scripts/configs/collections/{ide}/{language}.ts
      - Supports both default and named exports
      - Returns Collection object
      - Logs info on success, error on failure

  - **Task T-004b**: Implement collection caching
    - **Effort**: S
    - **Dependencies**: [T-004a]
    - **Acceptance Criteria**:
      - Collections cached in-memory after first load
      - Cache key: `${ide}:${language}`
      - Cache hit logged at debug level

  - **Task T-004c**: Implement listAvailableCollections()
    - **Effort**: S
    - **Dependencies**: []
    - **Acceptance Criteria**:
      - Scans scripts/configs/collections/{ide}/ directory
      - Returns array of language strings (e.g., ['cpp', 'typescript', 'python'])
      - Logs debug with found collections

  - **Task T-004d**: Write ConfigLoader load tests
    - **Effort**: M
    - **Dependencies**: [T-004a, T-004b, T-004c]
    - **Acceptance Criteria**:
      - Test: loads valid cpp collection for vscode (per LLD test example)
      - Test: cache prevents re-import
      - Test: throws ConfigurationError for non-existent file

## Story S-005: ConfigLoader - Validation

- **Description**: Implement Collection validation using Zod schema validator
- **Source**: [ConfigLoader Validation](low-level-design.md#1-configuration-loader-module), [Acceptance Criteria](low-level-design.md#acceptance-criteria)
- **Value**: high — Prevents invalid configs from causing runtime errors
- **Effort**: M
- **Risk**: low — Zod provides clear validation patterns
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: [S-004]
- **Acceptance Criteria**:
  - Given valid Collection, when calling validateCollection(), then { isValid: true, errors: [] } is returned
  - Given invalid extension ID 'invalid', when validating, then error includes "Extension ID must match pattern"
  - Given empty required_extensions array, when validating, then ValidationError is returned
  - Given non-serializable setting value, when validating, then error describes issue

  - **Task T-005a**: Define Zod schema for Collection interface
    - **Effort**: M
    - **Dependencies**: [S-001]
    - **Acceptance Criteria**:
      - Schema matches Collection, Extension, Setting, Snippet, Documentation interfaces
      - Extension ID validated with regex: /^[a-z0-9-]+\.[a-z0-9-]+$/
      - Required extensions array min length: 1
      - Documentation fields non-empty strings

  - **Task T-005b**: Implement validateCollection() method
    - **Effort**: S
    - **Dependencies**: [T-005a, S-002]
    - **Acceptance Criteria**:
      - Returns ValidationResult: { isValid: boolean, errors: string[] }
      - Logs warn for validation issues, error for critical failures
      - Uses Zod schema for validation

  - **Task T-005c**: Write validation tests
    - **Effort**: S
    - **Dependencies**: [T-005b]
    - **Acceptance Criteria**:
      - Test: validates collection with valid data (per LLD test)
      - Test: rejects invalid extension ID format (per LLD test)
      - Test: rejects empty required_extensions

## Story S-006: TemplateGenerator Implementation

- **Description**: Implement TemplateGenerator to render Handlebars templates
- **Source**: [TemplateGenerator Module](low-level-design.md#2-build-system-module), [Template Engine](low-level-design.md#template-engine)
- **Value**: high — Required for generating all extension pack files
- **Effort**: M
- **Risk**: low — Handlebars is well-established
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: [S-002]
- **Acceptance Criteria**:
  - Given 'package.json' template and context, when calling render(), then valid JSON string is returned
  - Given 'README.md' template and documentation, when rendering, then markdown includes setup_guide and troubleshooting
  - Given missing template file, when rendering, then BuildError is thrown
  - Given template syntax error, when rendering, then error includes template name and line number

  - **Task T-006a**: Implement TemplateGenerator class skeleton
    - **Effort**: S
    - **Dependencies**: [S-002]
    - **Acceptance Criteria**:
      - Constructor accepts parent logger, creates child logger
      - Template directory path configurable (defaults to ./templates)

  - **Task T-006b**: Implement render() method
    - **Effort**: M
    - **Dependencies**: [T-006a]
    - **Acceptance Criteria**:
      - Loads template from templates/{name}.hbs
      - Compiles with Handlebars
      - Passes context data to template
      - Returns rendered string
      - Logs debug for rendering, error for failures

  - **Task T-006c**: Add template caching
    - **Effort**: S
    - **Dependencies**: [T-006b]
    - **Acceptance Criteria**:
      - Compiled templates cached in memory
      - Cache hit logged at debug level

  - **Task T-006d**: Write TemplateGenerator tests
    - **Effort**: M
    - **Dependencies**: [T-006b]
    - **Acceptance Criteria**:
      - Test: renders package.json template (per LLD test)
      - Test: renders README template with documentation (per LLD test)
      - Test: throws BuildError for missing template

## Story S-007: ExtensionPackBuilder - Version Preservation

- **Description**: Implement version preservation logic to read existing package.json and maintain version field
- **Source**: [Version Preservation](low-level-design.md#2-build-system-module), [Build Pipeline Step 2](low-level-design.md#2-build-system-module)
- **Value**: high — Critical to prevent version loss on rebuild
- **Effort**: S
- **Risk**: low — File I/O and JSON parsing
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: [S-002, S-003]
- **Acceptance Criteria**:
  - Given existing package.json with version 1.2.3, when reading version, then 1.2.3 is returned
  - Given non-existent package.json, when reading version, then default "0.0.1" is returned
  - Given corrupt package.json, when reading version, then BuildError is thrown with file path
  - Given preserved version, when building, then new package.json includes that version

  - **Task T-007a**: Implement readExistingVersion() helper
    - **Effort**: S
    - **Dependencies**: [S-002]
    - **Acceptance Criteria**:
      - Checks if packages/{ide}/{language}/package.json exists
      - Reads and parses JSON
      - Returns version string or default "0.0.1"
      - Logs info with preserved version or debug with default

  - **Task T-007b**: Write version preservation tests
    - **Effort**: S
    - **Dependencies**: [T-007a]
    - **Acceptance Criteria**:
      - Test: preserves existing version when rebuilding (per LLD test)
      - Test: uses default version for new extensions (per LLD test)
      - Test: handles missing package.json gracefully

## Story S-008: ExtensionPackBuilder - File Generation

- **Description**: Implement core build pipeline to generate all extension pack files
- **Source**: [ExtensionPackBuilder Build Pipeline](low-level-design.md#2-build-system-module), [Output Structure](low-level-design.md#2-build-system-module)
- **Value**: high — Core build functionality
- **Effort**: L
- **Risk**: medium — Multiple file operations and transformations
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: [S-004, S-006, S-007]
- **Acceptance Criteria**:
  - Given 'vscode' and 'cpp', when calling build(), then packages/vscode/cpp/ contains all required files
  - Given Collection with snippets, when building, then snippets/{language}.json is generated
  - Given Collection with settings, when building, then settings.json is generated with contributions
  - Given build output, when reviewing files, then package.json, README.md, CHANGELOG.md, icon.png, src/extension.ts all exist

  - **Task T-008a**: Implement build() method skeleton
    - **Effort**: S
    - **Dependencies**: [S-002]
    - **Acceptance Criteria**:
      - Method signature: build(ide: string, language: string, outputDir: string): Promise<BuildResult>
      - Logs info at start/end, debug for each step
      - Returns BuildResult: { success: boolean, vsixPath?: string, errors: string[] }

  - **Task T-008b**: Generate package.json
    - **Effort**: M
    - **Dependencies**: [T-008a, S-006, S-007]
    - **Acceptance Criteria**:
      - Transforms Collection to VSCodePackageJson format
      - Uses TemplateGenerator to render package.json.hbs
      - Includes preserved version
      - extensionPack array contains all required + optional extension IDs
      - keywords array from Collection.tags

  - **Task T-008c**: Generate README.md
    - **Effort**: S
    - **Dependencies**: [T-008a, S-006]
    - **Acceptance Criteria**:
      - Uses TemplateGenerator to render README.md.hbs
      - Includes Collection.documentation.setup_guide
      - Includes Collection.documentation.troubleshooting
      - Contains extension list with descriptions

  - **Task T-008d**: Generate snippets file
    - **Effort**: S
    - **Dependencies**: [T-008a]
    - **Acceptance Criteria**:
      - Creates snippets/{language}.json
      - Transforms Collection.snippets[] to VSCode snippet format
      - Each snippet has prefix, body, description

  - **Task T-008e**: Generate settings.json (if needed)
    - **Effort**: S
    - **Dependencies**: [T-008a]
    - **Acceptance Criteria**:
      - Only generated if Collection.settings is non-empty
      - Transforms to VSCode configuration contribution format
      - Includes scope (user/workspace) for each setting

  - **Task T-008f**: Copy logo from logos/ directory
    - **Effort**: S
    - **Dependencies**: [T-008a, S-003]
    - **Acceptance Criteria**:
      - Copies logos/{language}-logo.png to icon.png
      - Throws AssetError if logo missing
      - Logs info with source/destination paths

  - **Task T-008g**: Generate CHANGELOG.md and LICENSE.md
    - **Effort**: S
    - **Dependencies**: [T-008a, S-006]
    - **Acceptance Criteria**:
      - Uses TemplateGenerator for both files
      - CHANGELOG includes version and date
      - LICENSE copied from template

  - **Task T-008h**: Generate src/extension.ts
    - **Effort**: XS
    - **Dependencies**: [T-008a, S-006]
    - **Acceptance Criteria**:
      - Minimal extension entry point (extension packs need little code)
      - Exports activate() and deactivate() functions
      - Uses TemplateGenerator to render extension.ts.hbs

  - **Task T-008i**: Write ExtensionPackBuilder file generation tests
    - **Effort**: L
    - **Dependencies**: [T-008b, T-008c, T-008d, T-008e, T-008f, T-008g, T-008h]
    - **Acceptance Criteria**:
      - Test: builds cpp extension pack successfully (per LLD test)
      - Test: copies logo from logos directory (per LLD test)
      - Test: generates valid package.json (per LLD test)
      - Test: creates all required files in output directory

## Story S-009: ExtensionPackBuilder - VSIX Packaging

- **Description**: Implement .vsix file packaging using @vscode/vsce
- **Source**: [Build Pipeline Step 10](low-level-design.md#2-build-system-module), [Acceptance Criteria](low-level-design.md#acceptance-criteria)
- **Value**: high — Required to produce distributable extension packs
- **Effort**: M
- **Risk**: medium — Integration with external tool (@vscode/vsce)
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: [S-008]
- **Acceptance Criteria**:
  - Given complete extension package directory, when calling package(), then .vsix file is created in dist/
  - Given invalid package.json, when packaging, then BuildError is thrown with vsce error details
  - Given successful packaging, when checking dist/, then .vsix filename includes name and version
  - Given packaging logs, when reviewing output, then vsce progress is visible

  - **Task T-009a**: Implement packageVSIX() method
    - **Effort**: M
    - **Dependencies**: [S-008]
    - **Acceptance Criteria**:
      - Uses @vscode/vsce createVSIX() API
      - Inputs: extension package directory
      - Output: .vsix file path in dist/{ide}/
      - Logs info with output path, error for failures

  - **Task T-009b**: Integrate packaging into build pipeline
    - **Effort**: S
    - **Dependencies**: [T-009a]
    - **Acceptance Criteria**:
      - build() method calls packageVSIX() after file generation
      - BuildResult includes vsixPath
      - Logs info: "Packaged {language} extension to {vsixPath}"

  - **Task T-009c**: Write VSIX packaging tests
    - **Effort**: M
    - **Dependencies**: [T-009b]
    - **Acceptance Criteria**:
      - Test: .vsix file created successfully
      - Test: .vsix filename format correct
      - Test: BuildError thrown for invalid package.json

## Story S-010: CLI Entry Point (src/index.ts)

- **Description**: Implement basic CLI to parse arguments and invoke build/publish commands
- **Source**: [CLI Interface](low-level-design.md#4-task-orchestration), [index.ts code example](low-level-design.md#4-task-orchestration)
- **Value**: medium — Enables manual execution and Taskfile integration
- **Effort**: M
- **Risk**: low — Simple argument parsing
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: [S-002, S-004, S-008]
- **Acceptance Criteria**:
  - Given `node src/index.js build vscode cpp`, when executing, then cpp extension pack is built
  - Given `--output ./custom-dist`, when building, then output goes to custom directory
  - Given invalid command, when executing, then usage help is displayed
  - Given no arguments, when executing, then usage help with examples is shown

  - **Task T-010a**: Implement argument parsing
    - **Effort**: S
    - **Dependencies**: [S-001]
    - **Acceptance Criteria**:
      - Uses minimist or yargs for parsing
      - Supports: build <ide> <language> [--output <dir>]
      - Supports: publish <vsix-pattern> --marketplace <name>
      - Displays help with --help or no args

  - **Task T-010b**: Implement build command handler
    - **Effort**: M
    - **Dependencies**: [T-010a, S-008]
    - **Acceptance Criteria**:
      - Parses ide and language from args
      - Creates ConfigLoader and ExtensionPackBuilder instances
      - Calls builder.build() with parsed args
      - Logs success or error
      - Exit code 0 on success, 1 on error

  - **Task T-010c**: Implement publish command handler (stub)
    - **Effort**: S
    - **Dependencies**: [T-010a]
    - **Acceptance Criteria**:
      - Parses vsix pattern and marketplace from args
      - Placeholder implementation (logs "Publish not yet implemented")
      - Will be completed in S-012

  - **Task T-010d**: Write CLI integration tests
    - **Effort**: M
    - **Dependencies**: [T-010b]
    - **Acceptance Criteria**:
      - Test: build command executes successfully
      - Test: --output flag changes output directory
      - Test: invalid command shows help

## Story S-011: Taskfile Configuration

- **Description**: Create Taskfile.yml with unitary and composite build/publish tasks
- **Source**: [Task Orchestration](low-level-design.md#4-task-orchestration), [Taskfile.yml example](low-level-design.md#4-task-orchestration)
- **Value**: medium — Enables convenient multi-language builds and CI/CD integration
- **Effort**: M
- **Risk**: low — Configuration file creation
- **Priority**: MEDIUM
- **Release**: R1
- **Dependencies**: [S-010]
- **Acceptance Criteria**:
  - Given `task build:cpp:vscode`, when executing, then C++ VSCode extension is built
  - Given `task build:all:vscode`, when executing, then all 9 VSCode extensions are built
  - Given `task build:all`, when executing, then all VSCode and VSCodium extensions are built
  - Given `task test`, when executing, then test suite runs

  - **Task T-011a**: Create Taskfile.yml skeleton
    - **Effort**: S
    - **Dependencies**: []
    - **Acceptance Criteria**:
      - File created at project root
      - Version: '3' specified
      - Clean, test tasks defined

  - **Task T-011b**: Define unitary build tasks
    - **Effort**: M
    - **Dependencies**: [T-011a, S-010]
    - **Acceptance Criteria**:
      - Tasks for each language + IDE combination (18 total: 9 languages × 2 IDEs)
      - Format: build:{language}:{ide}
      - Each calls: node src/index.js build {ide} {language} --output ./dist/{ide}

  - **Task T-011c**: Define composite build tasks
    - **Effort**: S
    - **Dependencies**: [T-011b]
    - **Acceptance Criteria**:
      - build:all:vscode depends on all vscode language tasks
      - build:all:vscodium depends on all vscodium language tasks
      - build:all depends on build:all:vscode and build:all:vscodium

  - **Task T-011d**: Define publish tasks (stubs)
    - **Effort**: S
    - **Dependencies**: [T-011a]
    - **Acceptance Criteria**:
      - publish:vscode, publish:vscodium, publish:all tasks defined
      - Call placeholder publish command (will be implemented in S-012)

  - **Task T-011e**: Test Taskfile execution
    - **Effort**: S
    - **Dependencies**: [T-011b, T-011c]
    - **Acceptance Criteria**:
      - Manual test: task build:cpp:vscode succeeds
      - Manual test: task build:all:vscode builds 9 extensions
      - Manual test: task clean removes dist/ and packages/

## Story S-012: MarketplacePublisher - VSCode Marketplace

- **Description**: Implement publishing to VSCode Marketplace using @vscode/vsce
- **Source**: [MarketplacePublisher Module](low-level-design.md#3-publishing-system-module), [CI/CD Workflow](low-level-design.md#cicd-pipeline-integration)
- **Value**: high — Core deployment capability
- **Effort**: L
- **Risk**: high — External API integration, authentication, network issues
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: [S-003, S-009]
- **Acceptance Criteria**:
  - Given valid VSCODE_TOKEN and .vsix file, when calling publish(), then extension is published successfully
  - Given invalid token, when publishing, then PublishError with token generation URL is thrown
  - Given network timeout, when publishing, then NetworkError with retry suggestion is thrown
  - Given already-published version, when publishing, then VersionConflictError is thrown

  - **Task T-012a**: Implement MarketplacePublisher class skeleton
    - **Effort**: S
    - **Dependencies**: [S-002]
    - **Acceptance Criteria**:
      - Constructor accepts parent logger
      - Child logger with module: 'MarketplacePublisher'
      - Configuration: reads VSCODE_TOKEN from env

  - **Task T-012b**: Implement publishToVSCode() method
    - **Effort**: L
    - **Dependencies**: [T-012a, S-003]
    - **Acceptance Criteria**:
      - Uses @vscode/vsce publish API
      - Validates .vsix file exists before attempting
      - Catches and wraps errors as PublishError, NetworkError, AuthenticationError, VersionConflictError
      - Logs info for progress, error for failures
      - Returns PublishResult: { success: boolean, marketplace: string, url?: string }

  - **Task T-012c**: Implement token validation
    - **Effort**: S
    - **Dependencies**: [T-012a]
    - **Acceptance Criteria**:
      - Checks VSCODE_TOKEN env var is present
      - Throws AuthenticationError if missing
      - Error message includes token generation URL

  - **Task T-012d**: Implement retry logic for network errors
    - **Effort**: M
    - **Dependencies**: [T-012b]
    - **Acceptance Criteria**:
      - Retries up to 3 times on network failure
      - Exponential backoff: 1s, 2s, 4s
      - Logs warn for each retry attempt

  - **Task T-012e**: Write VSCode Marketplace publisher tests
    - **Effort**: L
    - **Dependencies**: [T-012b, T-012c, T-012d]
    - **Acceptance Criteria**:
      - Test: validates vsix file exists before publish (per LLD test)
      - Test: throws AuthenticationError for missing token
      - Test: handles network timeout gracefully
      - Mock @vscode/vsce API for tests

## Story S-013: MarketplacePublisher - Open VSX

- **Description**: Implement publishing to Open VSX Registry using ovsx CLI
- **Source**: [MarketplacePublisher Supported Marketplaces](low-level-design.md#3-publishing-system-module), [CI/CD Environment](low-level-design.md#environment-setup)
- **Value**: high — Supports VSCodium extensions
- **Effort**: L
- **Risk**: high — External API integration, authentication
- **Priority**: HIGH
- **Release**: R1
- **Dependencies**: [S-012]
- **Acceptance Criteria**:
  - Given valid OPENVSX_TOKEN and .vsix file, when calling publish(), then extension is published to Open VSX
  - Given invalid token, when publishing, then PublishError with Open VSX token docs URL is thrown
  - Given both marketplaces, when publishing, then summary report shows success/failure for each
  - Given partial failure (one marketplace succeeds), when complete, then exit code is 1

  - **Task T-013a**: Implement publishToOpenVSX() method
    - **Effort**: M
    - **Dependencies**: [S-012]
    - **Acceptance Criteria**:
      - Uses ovsx publish command via child_process
      - Reads OPENVSX_TOKEN from env
      - Parses ovsx CLI output for success/failure
      - Wraps errors as PublishError, NetworkError, AuthenticationError
      - Logs info for progress, error for failures

  - **Task T-013b**: Implement publish() orchestrator method
    - **Effort**: M
    - **Dependencies**: [T-013a, S-012]
    - **Acceptance Criteria**:
      - Method signature: publish(vsixPath: string, marketplace: 'vscode' | 'openvsx' | 'both'): Promise<PublishResult[]>
      - Calls publishToVSCode() and/or publishToOpenVSX() based on marketplace param
      - Returns array of PublishResults
      - Logs summary report showing which marketplaces succeeded/failed

  - **Task T-013c**: Implement exit code logic
    - **Effort**: S
    - **Dependencies**: [T-013b]
    - **Acceptance Criteria**:
      - Exit code 0: all marketplaces succeeded
      - Exit code 1: partial failure (at least one marketplace failed)
      - Exit code 2: complete failure (all marketplaces failed)

  - **Task T-013d**: Write Open VSX publisher tests
    - **Effort**: M
    - **Dependencies**: [T-013a, T-013b]
    - **Acceptance Criteria**:
      - Test: publishes to Open VSX successfully
      - Test: handles ovsx CLI errors
      - Test: summary report includes both marketplaces
      - Mock ovsx CLI for tests

## Story S-014: CLI Publish Command Implementation

- **Description**: Complete publish command handler in src/index.ts to invoke MarketplacePublisher
- **Source**: [CLI Interface publish command](low-level-design.md#4-task-orchestration), [Publish Command Handler](low-level-design.md#4-task-orchestration)
- **Value**: medium — Enables manual and automated publishing
- **Effort**: M
- **Risk**: low — Integrates existing publisher
- **Priority**: MEDIUM
- **Release**: R1
- **Dependencies**: [S-013]
- **Acceptance Criteria**:
  - Given `node src/index.js publish dist/vscode/*.vsix --marketplace vscode`, when executing, then all matching .vsix files are published
  - Given glob pattern, when publishing, then all matching files are processed
  - Given --marketplace both, when publishing, then extensions go to VSCode and Open VSX
  - Given publish failure, when complete, then non-zero exit code is returned

  - **Task T-014a**: Implement VSIX glob resolution
    - **Effort**: S
    - **Dependencies**: [S-001]
    - **Acceptance Criteria**:
      - Uses glob library to expand patterns like dist/**/*.vsix
      - Returns array of matching file paths
      - Logs info with count of files found

  - **Task T-014b**: Complete publish command handler
    - **Effort**: M
    - **Dependencies**: [T-014a, S-013]
    - **Acceptance Criteria**:
      - Parses vsix-pattern and --marketplace args
      - Resolves glob to file list
      - Creates MarketplacePublisher instance
      - Calls publisher.publish() for each .vsix file
      - Logs summary: X successful, Y failed
      - Sets exit code based on results

  - **Task T-014c**: Update Taskfile publish tasks
    - **Effort**: S
    - **Dependencies**: [T-014b]
    - **Acceptance Criteria**:
      - publish:vscode calls: node src/index.js publish dist/vscode/*.vsix --marketplace vscode
      - publish:vscodium calls: node src/index.js publish dist/vscodium/*.vsix --marketplace openvsx
      - publish:all depends on both publish tasks

  - **Task T-014d**: Write publish command tests
    - **Effort**: M
    - **Dependencies**: [T-014b]
    - **Acceptance Criteria**:
      - Test: glob resolves multiple .vsix files
      - Test: --marketplace flag routes to correct publisher
      - Test: exit code reflects publish results

## Story S-015: GitHub Actions CI/CD Workflow

- **Description**: Implement GitHub Actions workflow for automated version update, build, test, and publish
- **Source**: [CI/CD Pipeline Integration](low-level-design.md#cicd-pipeline-integration), [GitHub Actions Workflow](low-level-design.md#github-actions-workflow)
- **Value**: high — Enables automated deployment
- **Effort**: L
- **Risk**: medium — Multi-job workflow with dependencies
- **Priority**: MEDIUM
- **Release**: R1
- **Dependencies**: [S-011, S-014]
- **Acceptance Criteria**:
  - Given push to main, when workflow runs, then versions are updated, extensions built, tests pass, and extensions published
  - Given PR, when workflow runs, then only build and test jobs execute (no version update or publish)
  - Given test failure, when workflow runs, then publish job is skipped
  - Given successful publish, when checking marketplace, then new versions are available

  - **Task T-015a**: Create workflow file skeleton
    - **Effort**: S
    - **Dependencies**: []
    - **Acceptance Criteria**:
      - File: .github/workflows/build-and-publish.yml
      - Triggers: push to main, pull_request, workflow_dispatch
      - Jobs defined: version, build, test, publish

  - **Task T-015b**: Implement version job
    - **Effort**: M
    - **Dependencies**: [T-015a]
    - **Acceptance Criteria**:
      - Runs only on push to main
      - Uses dragoscops/version-update@v3
      - Strategy: 'smart' (only bump changed extensions)
      - Requires fetch-depth: 0 for git history

  - **Task T-015c**: Implement build job
    - **Effort**: M
    - **Dependencies**: [T-015a, S-011]
    - **Acceptance Criteria**:
      - Depends on version job (needs: [version])
      - Runs always (if: always()) to execute on PRs too
      - Installs Node.js 20.x with npm cache
      - Installs Task CLI
      - Runs: task build:all
      - Uploads .vsix artifacts with retention: 30 days

  - **Task T-015d**: Implement test job
    - **Effort**: S
    - **Dependencies**: [T-015a]
    - **Acceptance Criteria**:
      - Installs Node.js 20.x
      - Runs: npm ci
      - Runs: npm test
      - Independent of other jobs (can run in parallel with build)

  - **Task T-015e**: Implement publish job
    - **Effort**: M
    - **Dependencies**: [T-015a, S-014]
    - **Acceptance Criteria**:
      - Depends on build and test jobs
      - Runs only on push to main
      - Downloads build artifacts
      - Installs Task CLI
      - Sets VSCODE_TOKEN and OPENVSX_TOKEN from secrets
      - Runs: task publish:all

  - **Task T-015f**: Configure repository secrets
    - **Effort**: XS
    - **Dependencies**: []
    - **Acceptance Criteria**:
      - VSCODE_MARKETPLACE_TOKEN secret created
      - OPENVSX_TOKEN secret created
      - Documentation in README for token creation

  - **Task T-015g**: Test workflow execution
    - **Effort**: M
    - **Dependencies**: [T-015b, T-015c, T-015d, T-015e]
    - **Acceptance Criteria**:
      - Manual test: workflow_dispatch triggers successfully
      - Manual test: PR trigger skips version and publish
      - Manual test: push to main executes full workflow
      - Monitor workflow logs for errors

## Story S-016: Documentation & README

- **Description**: Create comprehensive README with setup instructions, usage examples, and architecture overview
- **Source**: [Project Structure](low-level-design.md#project-structure), [Implementation Notes](low-level-design.md#implementation-notes), [Acceptance Criteria](low-level-design.md#acceptance-criteria)
- **Value**: medium — Onboarding and maintenance
- **Effort**: M
- **Risk**: low — Documentation writing
- **Priority**: MEDIUM
- **Release**: R1
- **Dependencies**: [S-015]
- **Acceptance Criteria**:
  - Given README, when reading, then setup, usage, architecture, and contributing sections are present
  - Given usage examples, when following instructions, then developers can build and publish extensions
  - Given architecture diagram, when reviewing, then matches LLD Mermaid diagram
  - Given troubleshooting section, when consulting, then common errors have solutions

  - **Task T-016a**: Write README skeleton
    - **Effort**: S
    - **Dependencies**: []
    - **Acceptance Criteria**:
      - Sections: Overview, Features, Setup, Usage, Architecture, Contributing, License
      - Project description and goals
      - Badges: build status, license

  - **Task T-016b**: Document setup instructions
    - **Effort**: M
    - **Dependencies**: [T-016a]
    - **Acceptance Criteria**:
      - Prerequisites: Node.js 20.x, Task CLI
      - Installation: npm install
      - Configuration: environment variables (VSCODE_TOKEN, OPENVSX_TOKEN)
      - First build: task build:cpp:vscode

  - **Task T-016c**: Document usage examples
    - **Effort**: M
    - **Dependencies**: [T-016a]
    - **Acceptance Criteria**:
      - CLI examples: build, publish commands
      - Taskfile examples: task build:all, task publish:vscode
      - Output examples: .vsix file locations

  - **Task T-016d**: Add architecture diagram and module descriptions
    - **Effort**: S
    - **Dependencies**: [T-016a]
    - **Acceptance Criteria**:
      - Copy Mermaid diagram from LLD
      - Describe ConfigLoader, ExtensionPackBuilder, TemplateGenerator, MarketplacePublisher, ErrorReporter
      - Link to LLD document for detailed specs

  - **Task T-016e**: Add troubleshooting section
    - **Effort**: S
    - **Dependencies**: [T-016a]
    - **Acceptance Criteria**:
      - Common errors: missing token, invalid config, network failures
      - Solutions aligned with ErrorReporter output
      - Links to VSCode Marketplace and Open VSX docs

## Story S-017: Template Files (Handlebars)

- **Description**: Create or update Handlebars templates for package.json, README, CHANGELOG, extension.ts
- **Source**: [TemplateGenerator](low-level-design.md#2-build-system-module), [Template Engine](low-level-design.md#template-engine)
- **Value**: medium — Required for file generation
- **Effort**: M
- **Risk**: low — Template creation
- **Priority**: MEDIUM
- **Release**: R1
- **Dependencies**: [S-006]
- **Acceptance Criteria**:
  - Given templates/ directory, when reviewing, then package.json.hbs, README.md.hbs, CHANGELOG.md.hbs, extension.ts.hbs exist
  - Given package.json.hbs, when rendered with context, then valid package.json is produced
  - Given README.md.hbs, when rendered with documentation, then markdown includes all sections
  - Given templates, when rendered, then Handlebars syntax is correct (no compilation errors)

  - **Task T-017a**: Review existing templates
    - **Effort**: S
    - **Dependencies**: []
    - **Acceptance Criteria**:
      - Check templates/ directory for existing files
      - Document which templates can be reused
      - Identify templates needing updates for new system

  - **Task T-017b**: Create/update package.json.hbs
    - **Effort**: M
    - **Dependencies**: [T-017a]
    - **Acceptance Criteria**:
      - Template includes: name, displayName, description, version, publisher, engines, categories, keywords, extensionPack
      - Uses Handlebars variables: {{name}}, {{version}}, {{#each extensionPack}}, etc.
      - Conditional contributes section: {{#if hasSettings}}
      - Valid JSON structure

  - **Task T-017c**: Create/update README.md.hbs
    - **Effort**: M
    - **Dependencies**: [T-017a]
    - **Acceptance Criteria**:
      - Template includes: title, description, installation, included extensions, settings, snippets, setup guide, troubleshooting
      - Uses {{documentation.setup_guide}}, {{documentation.troubleshooting}}
      - Lists extensions with {{#each required_extensions}}
      - Markdown formatting correct

  - **Task T-017d**: Create/update CHANGELOG.md.hbs
    - **Effort**: S
    - **Dependencies**: [T-017a]
    - **Acceptance Criteria**:
      - Template includes: version, date, changes list
      - Format: ## [{{version}}] - {{date}}
      - Placeholder changes list for initial releases

  - **Task T-017e**: Create/update extension.ts.hbs
    - **Effort**: S
    - **Dependencies**: [T-017a]
    - **Acceptance Criteria**:
      - Minimal extension entry point
      - Exports activate() and deactivate() functions
      - TypeScript syntax correct
      - Comments explaining extension pack behavior

  - **Task T-017f**: Test template rendering
    - **Effort**: M
    - **Dependencies**: [T-017b, T-017c, T-017d, T-017e, S-006]
    - **Acceptance Criteria**:
      - Render each template with sample data
      - Verify output structure
      - Check for Handlebars compilation errors
      - Validate JSON/Markdown/TypeScript syntax

## Story S-018: Logo Assets

- **Description**: Organize logo files in logos/ directory and ensure they exist for all languages
- **Source**: [Logo Management](low-level-design.md#acceptance-criteria), [Asset Management](low-level-design.md#2-build-system-module)
- **Value**: low — Visual branding for extensions
- **Effort**: S
- **Risk**: low — Asset organization
- **Priority**: LOW
- **Release**: R2
- **Dependencies**: []
- **Acceptance Criteria**:
  - Given logos/ directory, when listing files, then logo for each language exists (cpp, typescript, python, go, javascript, csharp, godot, generic-essential, generic-extended)
  - Given logo filename, when checking format, then naming convention is {language}-logo.png
  - Given logo dimensions, when measuring, then all are 128x128 pixels (VSCode standard)
  - Given missing logo, when building, then AssetError provides clear guidance

  - **Task T-018a**: Audit existing logos
    - **Effort**: S
    - **Dependencies**: []
    - **Acceptance Criteria**:
      - List existing logo files in logos/
      - Identify missing logos
      - Document any non-standard sizes or formats

  - **Task T-018b**: Create or source missing logos
    - **Effort**: M
    - **Dependencies**: [T-018a]
    - **Acceptance Criteria**:
      - Logo for each language: cpp-logo.png, typescript-logo.png, python-logo.png, golang-logo.png, javascript-logo.png, csharp-logo.png, godot-logo.png
      - Generic logos: generic-essential-logo.png, generic-extended-logo.png
      - All 128x128 PNG format

  - **Task T-018c**: Verify logo copying in build
    - **Effort**: S
    - **Dependencies**: [T-018b, S-008]
    - **Acceptance Criteria**:
      - Build test verifies icon.png exists in output
      - Manual test: check icon in generated .vsix
      - AssetError test verifies missing logo handling

## Story S-019: Integration Testing

- **Description**: End-to-end integration tests covering complete build and publish workflows
- **Source**: [Testing Strategy](low-level-design.md#testing-strategy), [Acceptance Criteria](low-level-design.md#acceptance-criteria)
- **Value**: high — Confidence in complete system
- **Effort**: L
- **Risk**: low — Test writing
- **Priority**: MEDIUM
- **Release**: R2
- **Dependencies**: [S-008, S-013]
- **Acceptance Criteria**:
  - Given integration test suite, when running, then complete build-to-vsix workflow is tested
  - Given test environment, when building all languages, then no failures occur
  - Given mock marketplace, when publishing, then auth and network flows are tested
  - Given test coverage report, when reviewing, then core modules have >80% coverage

  - **Task T-019a**: Setup integration test environment
    - **Effort**: M
    - **Dependencies**: [S-001]
    - **Acceptance Criteria**:
      - Separate test directory: tests/integration/
      - Test fixtures: sample collection configs
      - Mock marketplace APIs for publish tests

  - **Task T-019b**: Write end-to-end build test
    - **Effort**: L
    - **Dependencies**: [T-019a, S-008]
    - **Acceptance Criteria**:
      - Test loads cpp collection, builds complete extension, packages .vsix
      - Verifies all output files exist
      - Validates package.json structure
      - Checks .vsix file validity

  - **Task T-019c**: Write publish workflow test
    - **Effort**: L
    - **Dependencies**: [T-019a, S-013]
    - **Acceptance Criteria**:
      - Test publishes to mock VSCode Marketplace
      - Test publishes to mock Open VSX
      - Verifies authentication flow
      - Tests error scenarios: network failure, invalid token, version conflict

  - **Task T-019d**: Add test coverage reporting
    - **Effort**: S
    - **Dependencies**: [S-001]
    - **Acceptance Criteria**:
      - Jest/Vitest configured with coverage
      - npm test -- --coverage generates report
      - HTML coverage report in coverage/ directory
      - CI fails if coverage below threshold (70%)

  - **Task T-019e**: Run full integration test suite
    - **Effort**: M
    - **Dependencies**: [T-019b, T-019c, T-019d]
    - **Acceptance Criteria**:
      - All integration tests pass
      - Coverage report generated
      - No flaky tests
      - Tests complete in reasonable time (<5 minutes)

## Story S-020: Performance Optimization

- **Description**: Optimize build performance for parallel processing and caching
- **Source**: [Future Enhancements - Parallel Builds](low-level-design.md#future-enhancements), [Task Orchestration](low-level-design.md#4-task-orchestration)
- **Value**: low — Nice to have for faster builds
- **Effort**: M
- **Risk**: low — Optimization work
- **Priority**: LOW
- **Release**: R3
- **Dependencies**: [S-011]
- **Acceptance Criteria**:
  - Given parallel build execution, when running task build:all, then multiple extensions build simultaneously
  - Given cached templates, when building repeatedly, then subsequent builds are faster
  - Given build metrics, when comparing serial vs parallel, then parallel is 2-3x faster
  - Given CI/CD workflow, when building all extensions, then total time is under 10 minutes

  - **Task T-020a**: Enable Taskfile parallel execution
    - **Effort**: S
    - **Dependencies**: [S-011]
    - **Acceptance Criteria**:
      - Taskfile build:all:vscode uses parallel task execution
      - Tasks run concurrently (not sequentially with deps)
      - Logs show parallel execution

  - **Task T-020b**: Optimize template caching
    - **Effort**: M
    - **Dependencies**: [S-006]
    - **Acceptance Criteria**:
      - TemplateGenerator caches compiled templates
      - Template files watched for changes (invalidate cache)
      - Cache hit rate logged

  - **Task T-020c**: Add build performance metrics
    - **Effort**: S
    - **Dependencies**: []
    - **Acceptance Criteria**:
      - Log build duration for each extension
      - Log total build time
      - Compare serial vs parallel execution

  - **Task T-020d**: Benchmark and document
    - **Effort**: M
    - **Dependencies**: [T-020a, T-020b, T-020c]
    - **Acceptance Criteria**:
      - Benchmark builds on CI/CD environment
      - Document performance improvements
      - Update README with build time expectations

---

## Plan Summary

- **Total Stories**: 20
- **Release R1 (MVP)**: 17 stories (S-001 through S-017)
- **Release R2 (Polish)**: 2 stories (S-018, S-019)
- **Release R3 (Optimization)**: 1 story (S-020)

## Story Priority Breakdown

- **HIGH**: 14 stories
- **MEDIUM**: 5 stories
- **LOW**: 1 story

## Estimated Effort by Release

- **R1**: 2 XL + 7 L + 19 M + 16 S + 7 XS ≈ 8-10 weeks
- **R2**: 2 L + 3 M + 2 S ≈ 2-3 weeks
- **R3**: 1 M + 3 S ≈ 1 week

**Total**: ~11-14 weeks for complete implementation

## Dependencies Graph

```
S-001 (Setup)
  ├─→ S-002 (Logging)
  │    ├─→ S-003 (Errors)
  │    ├─→ S-004 (ConfigLoader - Load)
  │    │    ├─→ S-005 (ConfigLoader - Validation)
  │    │    └─→ S-008 (ExtensionPackBuilder)
  │    ├─→ S-006 (TemplateGenerator)
  │    │    └─→ S-008 (ExtensionPackBuilder)
  │    └─→ S-007 (Version Preservation)
  │         └─→ S-008 (ExtensionPackBuilder)
  │              ├─→ S-009 (VSIX Packaging)
  │              │    └─→ S-010 (CLI Entry Point)
  │              │         └─→ S-011 (Taskfile)
  │              │              └─→ S-015 (CI/CD)
  │              │                   └─→ S-016 (Documentation)
  │              └─→ S-019 (Integration Tests)
  └─→ S-009 (VSIX Packaging)
       └─→ S-012 (Marketplace - VSCode)
            └─→ S-013 (Marketplace - OpenVSX)
                 └─→ S-014 (CLI Publish)
                      ├─→ S-015 (CI/CD)
                      └─→ S-019 (Integration Tests)

S-017 (Templates) [parallel with development]
S-018 (Logos) [independent]
S-020 (Performance) [depends on S-011]
```

## Assumptions

1. Existing TypeScript collection configs (`scripts/configs/collections/`) are valid and complete
2. `dragoscops/version-update@v3` GitHub Action is available and documented
3. VSCode Marketplace and Open VSX API behaviors match current documentation
4. Handlebars templates in `templates/` directory are partially reusable
5. Test coverage threshold of 70% is acceptable for initial release
6. macOS development environment has access to all necessary tools

## Open Questions

1. Should template customization per language be supported in R1 or deferred to future?
2. What is the acceptable build time SLA for CI/CD (currently estimated 10 minutes)?
3. Should extension validation against marketplace APIs be part of build or separate tool?
4. Is manual approval required before publishing to marketplaces from CI/CD?
5. Should there be a separate staging environment/marketplace for testing?
