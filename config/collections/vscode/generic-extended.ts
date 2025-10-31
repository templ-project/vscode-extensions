// API/OpenAPI Extensions
import { restClient, swaggerEditor } from '../../extensions/api';

// CVS Extensions
import { gitGraph, githubActions, githubIssueNotebooks, githubPullRequests } from '../../extensions/cvs';

// Docker Extensions
import { betterDockerfile, dockerOfficial } from '../../extensions/docker';

// Kubernetes Extensions
import {
  helmIntellisense,
  kubernetesSnippets,
  kubernetesTools,
  kubernetesYamlFormatter,
} from '../../extensions/kubernetes';

// Productivity Extensions
import { codeRunner, sonarLint } from '../../extensions/productivity';
import { Collection } from '../../shared/types';

export const genericExtended: Collection = {
  description: 'Extended developer tools for API development, containerization, and Git forge integration in VSCode',
  tags: [
    'api',
    'swagger',
    'openapi',
    'rest',
    'docker',
    'kubernetes',
    'github',
    'gitlab',
    'bitbucket',
    'forge',
    'extended',
  ],

  required_extensions: [
    // api
    swaggerEditor,
    restClient,

    // docker
    dockerOfficial,
    // TODO: (keep in code), not sure if needed
    // devContainers,

    // Kubernetes - Core
    kubernetesTools,
    helmIntellisense,

    // CVS
    // TODO: (keep in code), not sure if needed
    // gitlabWorkflow,
    // TODO: (keep in code), not sure if needed
    // atlassianIntegration,
    githubPullRequests,
    githubActions,
  ],

  optional_extensions: [
    // API/OpenAPI - Optional
    // TODO: (keep in code), not sure if needed
    // redoclyOpenAPI,
    // TODO: (keep in code), not sure if needed
    // thunderClient,

    // Docker - Optional
    betterDockerfile,

    // Kubernetes - Optional
    kubernetesSnippets,
    kubernetesYamlFormatter,

    // CVS - Optional
    githubIssueNotebooks,
    gitGraph,
    // TODO: (keep in code), not sure if needed
    // openInGitHub

    // Productivity
    codeRunner,
    sonarLint,
  ],

  settings: {
    // API/OpenAPI specific settings
    'openapi.completion.enable': {
      value: true,
      description: 'Enable OpenAPI completion suggestions',
      scope: 'workspace',
    },
    'openapi.validation.enable': {
      value: true,
      description: 'Enable OpenAPI validation',
      scope: 'workspace',
    },
    'openapi.preview.enable': {
      value: true,
      description: 'Enable OpenAPI preview',
      scope: 'workspace',
    },
    'rest-client.enableTelemetry': {
      value: false,
      description: 'Disable REST Client telemetry',
      scope: 'user',
    },
    'rest-client.showResponseInDifferentTab': {
      value: true,
      description: 'Show REST Client response in separate tab',
      scope: 'workspace',
    },

    // Docker specific settings
    'docker.attachShellCommand.linuxContainer': {
      value: '/bin/bash',
      description: 'Default shell command for Linux containers',
      scope: 'workspace',
    },
    'docker.attachShellCommand.windowsContainer': {
      value: 'cmd.exe',
      description: 'Default shell command for Windows containers',
      scope: 'workspace',
    },
    'docker.showStartPage': {
      value: false,
      description: 'Hide Docker start page',
      scope: 'user',
    },

    // Kubernetes specific settings
    'vs-kubernetes.vs-kubernetes.namespace': {
      value: '',
      description: 'Default Kubernetes namespace',
      scope: 'workspace',
    },
    'vs-kubernetes.outputFormat': {
      value: 'yaml',
      description: 'Default output format for Kubernetes resources',
      scope: 'workspace',
    },
    'vs-kubernetes.autoCleanupOnDebugTerminate': {
      value: true,
      description: 'Auto cleanup Kubernetes debug resources',
      scope: 'workspace',
    },

    // GitHub specific settings
    'github.pullRequests.createOnPublishBranch': {
      value: 'never',
      description: 'Never create pull requests on publish branch',
      scope: 'workspace',
    },
    'github.pullRequests.pullBranch': {
      value: 'never',
      description: 'Never pull branch on pull request',
      scope: 'workspace',
    },
    'github.pullRequests.showInTimeline': {
      value: true,
      description: 'Show pull requests in timeline view',
      scope: 'workspace',
    },
    'githubActions.workflows.pinned.workflows': {
      value: [],
      description: 'Pinned GitHub Actions workflows',
      scope: 'workspace',
    },
    'githubActions.workflows.pinned.refresh.enabled': {
      value: true,
      description: 'Enable automatic refresh of pinned workflows',
      scope: 'workspace',
    },

    // Git/Forge specific settings
    'git.enableSmartCommit': {
      value: true,
      description: 'Enable smart commit (stage all changes when committing)',
      scope: 'workspace',
    },
    'git.autofetch': {
      value: true,
      description: 'Enable automatic git fetch',
      scope: 'workspace',
    },
    'git.autofetchPeriod': {
      value: 180,
      description: 'Auto fetch period in seconds (3 minutes)',
      scope: 'workspace',
    },
    'git.confirmSync': {
      value: false,
      description: 'Disable confirmation for git sync',
      scope: 'workspace',
    },
    'git.enableStatusBarSync': {
      value: true,
      description: 'Enable git sync status in status bar',
      scope: 'workspace',
    },

    // YAML/Configuration
    'yaml.schemas': {
      value: {
        'https://json.schemastore.org/github-workflow.json': '.github/workflows/*',
        'https://json.schemastore.org/github-action.json': '.github/actions/*/action.yml',
        'https://json.schemastore.org/docker-compose.json': ['docker-compose.yml', 'docker-compose.yaml'],
        'https://json.schemastore.org/kustomization.json': ['kustomization.yaml', 'kustomization.yml'],
        'https://raw.githubusercontent.com/instrumenta/kubernetes-json-schema/master/v1.18.0-standalone-strict/all.json':
          ['k8s/**/*.yaml', 'k8s/**/*.yml', 'kubernetes/**/*.yaml', 'kubernetes/**/*.yml'],
      },
      description: 'YAML schema mappings for various file types',
      scope: 'workspace',
    },
    'yaml.format.enable': {
      value: true,
      description: 'Enable YAML formatting',
      scope: 'workspace',
    },
    'yaml.validate': {
      value: true,
      description: 'Enable YAML validation',
      scope: 'workspace',
    },
    'yaml.hover': {
      value: true,
      description: 'Enable YAML hover information',
      scope: 'workspace',
    },
    'yaml.completion': {
      value: true,
      description: 'Enable YAML completion',
      scope: 'workspace',
    },
  },

  keybindings: [
    // API/REST specific keybindings
    {
      key: 'ctrl+alt+r',
      command: 'rest-client.request',
      description: 'Execute REST request',
      when: "editorTextFocus && editorLangId == 'http'",
    },
    {
      key: 'ctrl+alt+e',
      command: 'rest-client.request-last',
      description: 'Execute last REST request',
      when: 'editorTextFocus',
    },

    // Docker specific keybindings
    {
      key: 'ctrl+shift+d ctrl+shift+b',
      command: 'docker.images.build',
      description: 'Build Docker image',
      when: "resourceExtname == '.dockerfile' || resourceFilename == 'Dockerfile'",
    },
    {
      key: 'ctrl+shift+d ctrl+shift+r',
      command: 'docker.containers.run',
      description: 'Run Docker container',
      when: "focusedView == 'dockerContainers'",
    },

    // Kubernetes specific keybindings
    {
      key: 'ctrl+shift+k ctrl+shift+a',
      command: 'kubernetes.portForward',
      description: 'Kubernetes port forward',
      when: "focusedView == 'extension.vsKubernetesExplorer'",
    },
    {
      key: 'ctrl+shift+k ctrl+shift+l',
      command: 'kubernetes.logs',
      description: 'Show Kubernetes logs',
      when: "focusedView == 'extension.vsKubernetesExplorer'",
    },

    // GitHub specific keybindings
    {
      key: 'ctrl+shift+g ctrl+shift+p',
      command: 'github.pullRequests.refresh',
      description: 'Refresh GitHub pull requests',
      when: "focusedView == 'github:pullRequests'",
    },
    {
      key: 'ctrl+shift+g ctrl+shift+i',
      command: 'github.pullRequests.openQuery',
      description: 'Open GitHub pull request query',
      when: "focusedView == 'github:pullRequests'",
    },
  ],

  snippets: [],

  documentation: {
    setup_guide: `# Generic Extended Extension Pack Setup for VSCode

## Quick Start
1. Install all required extensions from Microsoft Marketplace
2. Configure your development environment for API, Docker, and Kubernetes
3. Set up GitHub/GitLab/Bitbucket authentication
4. Configure your Git settings
5. Restart VSCode to ensure all settings are applied

## Extensions Included

### API Development
- **OpenAPI (Swagger) Editor**: Complete OpenAPI/Swagger editing with validation and preview
- **REST Client**: Create .http files to test APIs directly in VSCode
- **Thunder Client**: GUI-based REST client (optional)
- **Redocly OpenAPI**: Professional OpenAPI authoring (optional)

### Docker & Containerization
- **Docker**: Official Docker extension with language support and container management
- **Dev Containers**: Develop inside Docker containers with full VSCode experience
- **shell-format**: Format Dockerfiles and shell scripts
- **Better DockerFile Syntax**: Enhanced Dockerfile syntax highlighting (optional)

### Kubernetes
- **Kubernetes**: Official Kubernetes extension with YAML support and cluster management
- **Helm Intellisense**: Helm template intellisense and validation
- **Kubernetes Support**: Kubernetes YAML snippets (optional)

### GitHub Integration
- **GitHub Pull Requests**: Manage GitHub pull requests and issues directly in VSCode
- **GitHub Actions**: GitHub Actions workflow support and syntax highlighting
- **GitHub Issue Notebooks**: Work with GitHub issues in notebook format (optional)
- **Git Graph**: Visualize Git history and perform Git actions (optional)

### Git Forge Integration
- **GitLab Workflow**: Official GitLab integration with CI/CD pipeline support
- **Atlassian: Jira & Bitbucket**: Jira issue management and Bitbucket pull requests
- **Open in GitHub/GitLab/Bitbucket**: Quick navigation to source code in various Git forges (optional)

### Supporting Tools
- **YAML**: Enhanced YAML support with schema validation
- **Version Lens**: Version information for package dependencies
- **shell-format**: Format shell scripts and Dockerfiles

## Configuration

### API Development
- REST Client configured for better tab management
- OpenAPI validation and preview enabled
- Telemetry disabled for privacy

### Docker
- Default shell commands configured for Linux/Windows containers
- Start page disabled for cleaner experience

### Kubernetes
- YAML output format by default
- Auto-cleanup on debug terminate
- Namespace configuration ready

### GitHub
- Pull request creation settings optimized
- Timeline integration enabled
- Workflow pinning available

### Git/Forge
- Smart commit enabled
- Auto-fetch every 3 minutes
- Sync confirmation disabled for smoother workflow

## Authentication Setup

### GitHub
1. Use Command Palette: "GitHub: Sign in"
2. Follow browser authentication flow
3. Grant necessary permissions for repositories and issues

### GitLab
1. Generate Personal Access Token in GitLab
2. Use Command Palette: "GitLab: Set GitLab Personal Access Token"
3. Configure GitLab instance URL if using self-hosted

### Bitbucket/Jira (Atlassian)
1. Install Atlassian extension
2. Use Command Palette: "Atlassian: Connect to Bitbucket"
3. Follow OAuth flow for authentication

## Workspace Configuration

### API Development
Create \`.http\` files for REST API testing:
\`\`\`http
GET https://api.example.com/users
Authorization: Bearer {{token}}
\`\`\`

### Docker
Configure \`.devcontainer/devcontainer.json\` for containerized development:
\`\`\`json
{
  "name": "Development Container",
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
  }
}
\`\`\`

### Kubernetes
Configure \`kubectl\` context and namespace:
\`\`\`bash
kubectl config use-context your-cluster
kubectl config set-context --current --namespace=your-namespace
\`\`\`

### GitHub Actions
Create \`.github/workflows/\` directory for CI/CD workflows with full syntax support and validation.`,

    troubleshooting: `# Common Issues and Solutions

## REST Client Issues
- **Request not executing**: Check file extension is \`.http\` or \`.rest\`
- **Authentication problems**: Verify token variables are properly set
- **Response not showing**: Check "rest-client.showResponseInDifferentTab" setting

## Docker Issues
- **Docker not found**: Ensure Docker Desktop is installed and running
- **Permission issues**: Add user to docker group on Linux: \`sudo usermod -aG docker $USER\`
- **Build failures**: Check Dockerfile syntax and context path

## Kubernetes Issues
- **Cluster not connecting**: Verify \`kubectl\` configuration and cluster access
- **YAML validation errors**: Check schema associations in settings
- **Namespace not found**: Verify namespace exists and is accessible

## GitHub Integration Issues
- **Authentication failed**: Re-authenticate using Command Palette
- **Repository not found**: Check repository permissions and access
- **Pull requests not loading**: Verify internet connection and GitHub status

## GitLab Integration Issues
- **Personal Access Token errors**: Ensure token has correct scopes (api, read_user)
- **Self-hosted GitLab**: Configure correct instance URL in settings
- **Pipeline not showing**: Check project permissions and CI/CD access

## Bitbucket/Jira Issues
- **OAuth authentication failed**: Clear browser cookies and retry
- **Issues not syncing**: Check Jira project permissions
- **Pull requests not showing**: Verify Bitbucket repository access

## YAML/Configuration Issues
- **Schema validation errors**: Check \`yaml.schemas\` settings for correct URLs
- **Formatting issues**: Verify YAML format settings are enabled
- **Kubernetes schema not working**: Update schema URLs to latest versions

## Performance Issues
- **Slow extension loading**: Disable unused optional extensions
- **High memory usage**: Check for large files in workspace
- **Slow Git operations**: Configure Git auto-fetch period appropriately`,
  },
};
