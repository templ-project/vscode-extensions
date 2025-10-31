// API/OpenAPI Extensions (VSCodium compatible)
import { restClientVSCodium, swaggerEditorVSCodium } from '../../extensions/api';

// CVS Extensions (VSCodium compatible)
import { gitGraphVSCodium, githubActionsVSCodium, githubPullRequestsVSCodium } from '../../extensions/cvs';

// Docker Extensions (VSCodium compatible)
import { betterDockerfile, dockerVSCodium } from '../../extensions/docker';

// Kubernetes Extensions (VSCodium compatible)
import {
  helmIntellisenseVSCodium,
  kubernetesSnippetsVSCodium,
  kubernetesToolsVSCodium,
} from '../../extensions/kubernetes';

// Productivity Extensions
import { codeRunnerVSCodium, sonarLintVSCodium } from '../../extensions/productivity';
import { Collection } from '../../shared/types';

import { genericExtended as genericExtendedVSCode } from '../vscode/generic-extended';

export const genericExtended: Collection = {
  ...genericExtendedVSCode,
  description:
    'Extended developer tools for API development, containerization, and Git forge integration in VSCodium (Open VSX compatible)',

  required_extensions: [
    // API/OpenAPI - Core
    swaggerEditorVSCodium,
    restClientVSCodium,

    // Docker - Core
    dockerVSCodium,
    // devContainersVSCodium,

    // Kubernetes - Core
    kubernetesToolsVSCodium,
    helmIntellisenseVSCodium,

    // GitHub - Core
    githubPullRequestsVSCodium,
    githubActionsVSCodium,

    // Multi-language development tools
    codeRunnerVSCodium,

    // // Forge - Core
    // gitlabWorkflowVSCodium,
    // atlassianIntegrationVSCodium,
  ],

  optional_extensions: [
    // Docker - Optional
    betterDockerfile,

    // Kubernetes - Optional
    kubernetesSnippetsVSCodium,

    // GitHub - Optional
    gitGraphVSCodium,

    // Advanced code analysis
    sonarLintVSCodium,

    // // Forge - Optional
    // openInGitHubVSCodium
  ],

  documentation: {
    setup_guide: `# Generic Extended Extension Pack Setup for VSCodium

## Quick Start
1. Install all required extensions from Open VSX Registry
2. Configure your development environment for API, Docker, and Kubernetes
3. Set up GitHub/GitLab/Bitbucket authentication
4. Configure your Git settings
5. Restart VSCodium to ensure all settings are applied

## Extensions Included

### API Development
- **OpenAPI (Swagger) Editor**: Complete OpenAPI/Swagger editing with validation and preview
- **REST Client**: Create .http files to test APIs directly in VSCodium

### Docker & Containerization
- **Docker**: Official Docker extension with language support and container management
- **Dev Containers**: Develop inside Docker containers with full VSCodium experience
- **shell-format**: Format Dockerfiles and shell scripts
- **Better DockerFile Syntax**: Enhanced Dockerfile syntax highlighting (optional)

### Kubernetes
- **Kubernetes**: Official Kubernetes extension with YAML support and cluster management
- **Helm Intellisense**: Helm template intellisense and validation
- **Kubernetes Support**: Kubernetes YAML snippets (optional)

### GitHub Integration
- **GitHub Pull Requests**: Manage GitHub pull requests and issues directly in VSCodium
- **GitHub Actions**: GitHub Actions workflow support and syntax highlighting
- **Git Graph**: Visualize Git history and perform Git actions (optional)

### Git Forge Integration
- **GitLab Workflow**: Official GitLab integration with CI/CD pipeline support
- **Atlassian: Jira & Bitbucket**: Jira issue management and Bitbucket pull requests
- **Open in GitHub/GitLab/Bitbucket**: Quick navigation to source code in various Git forges (optional)

### Supporting Tools
- **YAML**: Enhanced YAML support with schema validation
- **Better JSON5**: JSON5 syntax support for configuration files
- **shell-format**: Format shell scripts and Dockerfiles

## VSCodium vs VSCode
- VSCodium uses Open VSX Registry instead of Microsoft Marketplace
- Some Microsoft-specific features may be limited
- Telemetry is disabled by default
- Open source alternative to VSCode
- All extensions are verified for Open VSX compatibility

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

## Open VSX Registry
- All extensions are sourced from Open VSX Registry
- Community-maintained alternative to Microsoft Marketplace
- Privacy-focused with no telemetry tracking
- Support for most popular extensions`,

    troubleshooting: `# Common Issues and Solutions

## Extension Not Found in Open VSX
- Check if extension is available in Open VSX Registry
- Look for alternative extensions with similar functionality
- Consider manual installation from .vsix files
- Report missing extensions to Open VSX community

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
- **Limited functionality**: Some GitHub features may be restricted in VSCodium
- **Repository not found**: Check repository permissions and access

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
- **Slow Git operations**: Configure Git auto-fetch period appropriately

## VSCodium Specific Issues
- **Marketplace compatibility**: Use Open VSX Registry instead of Microsoft Marketplace
- **Missing extensions**: Check Open VSX availability or find alternatives
- **Telemetry errors**: Telemetry is disabled by default in VSCodium`,
  },
};
