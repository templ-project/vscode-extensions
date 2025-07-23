# [templ-project-1753309652332] Generic Extended Extension Pack

Extended developer tools for API development, containerization, and Git forge integration in VSCode

## 📦 What's Included

This extension pack includes **14 carefully selected extensions** to enhance your generic-extended development experience in vscode.

### ✅ Core Extensions (7)

These extensions are essential for generic-extended development:

- **[OpenAPI (Swagger) Editor](https://marketplace.visualstudio.com/items?itemName&#x3D;42crunch.vscode-openapi)** - OpenAPI editing, validation and preview in VS Code
- **[REST Client](https://marketplace.visualstudio.com/items?itemName&#x3D;humao.rest-client)** - REST Client for Visual Studio Code
- **[Docker](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-azuretools.vscode-docker)** - Makes it easy to create, manage, and debug containerized applications
- **[Kubernetes](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-kubernetes-tools.vscode-kubernetes-tools)** - Develop, deploy and debug Kubernetes applications
- **[Helm Intellisense](https://marketplace.visualstudio.com/items?itemName&#x3D;tim-koehler.helm-intellisense)** - This extension provides intellisense for helm templates
- **[GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName&#x3D;github.vscode-pull-request-github)** - Pull Request and Issue Provider for GitHub
- **[GitHub Actions](https://marketplace.visualstudio.com/items?itemName&#x3D;github.vscode-github-actions)** - GitHub Actions workflows and runs for github.com hosted repositories

### 💡 Additional Extensions (7)

These extensions provide extra functionality and convenience:

- **[Better DockerFile Syntax](https://marketplace.visualstudio.com/items?itemName&#x3D;jeff-hykin.better-dockerfile-syntax)** - An update to the syntax of Dockerfile
- **[Kubernetes Support](https://marketplace.visualstudio.com/items?itemName&#x3D;ipedrazas.kubernetes-snippets)** - Code snippets of kubernetes for Visual Studio Code
- **[Better YAML Formatter](https://marketplace.visualstudio.com/items?itemName&#x3D;kennylong.kubernetes-yaml-formatter)** - A better YAML formatter
- **[GitHub Issue Notebooks](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.vscode-github-issue-notebooks)** - GitHub Issue Notebooks for VS Code
- **[Git Graph](https://marketplace.visualstudio.com/items?itemName&#x3D;mhutchie.git-graph)** - View a Git Graph of your repository, and perform Git actions from the graph
- **[Code Runner](https://marketplace.visualstudio.com/items?itemName&#x3D;formulahendry.code-runner)** - Run code snippets or code files for multiple languages
- **[SonarLint](https://marketplace.visualstudio.com/items?itemName&#x3D;SonarSource.sonarlint-vscode)** - Detects bugs, vulnerabilities and code smells for multiple languages

## 🚀 Installation

### Method 1: Install from Marketplace
1. Open Vscode
2. Go to Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "[templ-project-1753309652332] Generic Extended Extension Pack"
4. Click "Install"

### Method 2: Install via Command Line
```bash
code --install-extension @templ-project/generic-extended-extension-pack
```

### Method 3: Install from VSIX
1. Download the latest `.vsix` file from [Releases](https://github.com/templ-project/vscode-extensions/releases)
2. Open Vscode
3. Run `Extensions: Install from VSIX...` command
4. Select the downloaded file

## ⚙️ Configuration

After installation, you may want to configure some settings for optimal generic-extended development:

### openapi.completion.enable
```json
"openapi.completion.enable": true
```
> Enable OpenAPI completion suggestions

### openapi.validation.enable
```json
"openapi.validation.enable": true
```
> Enable OpenAPI validation

### openapi.preview.enable
```json
"openapi.preview.enable": true
```
> Enable OpenAPI preview

### rest-client.enableTelemetry
```json
"rest-client.enableTelemetry": false
```
> Disable REST Client telemetry

### rest-client.showResponseInDifferentTab
```json
"rest-client.showResponseInDifferentTab": true
```
> Show REST Client response in separate tab

### docker.attachShellCommand.linuxContainer
```json
"docker.attachShellCommand.linuxContainer": &quot;/bin/bash&quot;
```
> Default shell command for Linux containers

### docker.attachShellCommand.windowsContainer
```json
"docker.attachShellCommand.windowsContainer": &quot;cmd.exe&quot;
```
> Default shell command for Windows containers

### docker.showStartPage
```json
"docker.showStartPage": false
```
> Hide Docker start page

### vs-kubernetes.vs-kubernetes.namespace
```json
"vs-kubernetes.vs-kubernetes.namespace": &quot;&quot;
```
> Default Kubernetes namespace

### vs-kubernetes.outputFormat
```json
"vs-kubernetes.outputFormat": &quot;yaml&quot;
```
> Default output format for Kubernetes resources

### vs-kubernetes.autoCleanupOnDebugTerminate
```json
"vs-kubernetes.autoCleanupOnDebugTerminate": true
```
> Auto cleanup Kubernetes debug resources

### github.pullRequests.createOnPublishBranch
```json
"github.pullRequests.createOnPublishBranch": &quot;never&quot;
```
> Never create pull requests on publish branch

### github.pullRequests.pullBranch
```json
"github.pullRequests.pullBranch": &quot;never&quot;
```
> Never pull branch on pull request

### github.pullRequests.showInTimeline
```json
"github.pullRequests.showInTimeline": true
```
> Show pull requests in timeline view

### githubActions.workflows.pinned.workflows
```json
"githubActions.workflows.pinned.workflows": []
```
> Pinned GitHub Actions workflows

### githubActions.workflows.pinned.refresh.enabled
```json
"githubActions.workflows.pinned.refresh.enabled": true
```
> Enable automatic refresh of pinned workflows

### git.enableSmartCommit
```json
"git.enableSmartCommit": true
```
> Enable smart commit (stage all changes when committing)

### git.autofetch
```json
"git.autofetch": true
```
> Enable automatic git fetch

### git.autofetchPeriod
```json
"git.autofetchPeriod": 180
```
> Auto fetch period in seconds (3 minutes)

### git.confirmSync
```json
"git.confirmSync": false
```
> Disable confirmation for git sync

### git.enableStatusBarSync
```json
"git.enableStatusBarSync": true
```
> Enable git sync status in status bar

### yaml.schemas
```json
"yaml.schemas": {
  &quot;https://json.schemastore.org/github-workflow.json&quot;: &quot;.github/workflows/*&quot;,
  &quot;https://json.schemastore.org/github-action.json&quot;: &quot;.github/actions/*/action.yml&quot;,
  &quot;https://json.schemastore.org/docker-compose.json&quot;: [
    &quot;docker-compose.yml&quot;,
    &quot;docker-compose.yaml&quot;
  ],
  &quot;https://json.schemastore.org/kustomization.json&quot;: [
    &quot;kustomization.yaml&quot;,
    &quot;kustomization.yml&quot;
  ],
  &quot;https://raw.githubusercontent.com/instrumenta/kubernetes-json-schema/master/v1.18.0-standalone-strict/all.json&quot;: [
    &quot;k8s/**/*.yaml&quot;,
    &quot;k8s/**/*.yml&quot;,
    &quot;kubernetes/**/*.yaml&quot;,
    &quot;kubernetes/**/*.yml&quot;
  ]
}
```
> YAML schema mappings for various file types

### yaml.format.enable
```json
"yaml.format.enable": true
```
> Enable YAML formatting

### yaml.validate
```json
"yaml.validate": true
```
> Enable YAML validation

### yaml.hover
```json
"yaml.hover": true
```
> Enable YAML hover information

### yaml.completion
```json
"yaml.completion": true
```
> Enable YAML completion


## ⌨️ Recommended Keybindings

- **Execute REST request**: `ctrl+alt+r`
- **Execute last REST request**: `ctrl+alt+e`
- **Build Docker image**: `ctrl+shift+d ctrl+shift+b`
- **Run Docker container**: `ctrl+shift+d ctrl+shift+r`
- **Kubernetes port forward**: `ctrl+shift+k ctrl+shift+a`
- **Show Kubernetes logs**: `ctrl+shift+k ctrl+shift+l`
- **Refresh GitHub pull requests**: `ctrl+shift+g ctrl+shift+p`
- **Open GitHub pull request query**: `ctrl+shift+g ctrl+shift+i`

## 📝 Extension Details

| Extension | Publisher | Description |
|-----------|-----------|-------------|
| [OpenAPI (Swagger) Editor](https://marketplace.visualstudio.com/items?itemName&#x3D;42crunch.vscode-openapi) | 42Crunch | OpenAPI editing, validation and preview in VS Code |
| [REST Client](https://marketplace.visualstudio.com/items?itemName&#x3D;humao.rest-client) | Huachao Mao | REST Client for Visual Studio Code |
| [Docker](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-azuretools.vscode-docker) | Microsoft | Makes it easy to create, manage, and debug containerized applications |
| [Kubernetes](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-kubernetes-tools.vscode-kubernetes-tools) | Microsoft | Develop, deploy and debug Kubernetes applications |
| [Helm Intellisense](https://marketplace.visualstudio.com/items?itemName&#x3D;tim-koehler.helm-intellisense) | Tim Koehler | This extension provides intellisense for helm templates |
| [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName&#x3D;github.vscode-pull-request-github) | GitHub | Pull Request and Issue Provider for GitHub |
| [GitHub Actions](https://marketplace.visualstudio.com/items?itemName&#x3D;github.vscode-github-actions) | GitHub | GitHub Actions workflows and runs for github.com hosted repositories |
| [Better DockerFile Syntax](https://marketplace.visualstudio.com/items?itemName&#x3D;jeff-hykin.better-dockerfile-syntax) | jeff-hykin | An update to the syntax of Dockerfile |
| [Kubernetes Support](https://marketplace.visualstudio.com/items?itemName&#x3D;ipedrazas.kubernetes-snippets) | Iván Pedrazas | Code snippets of kubernetes for Visual Studio Code |
| [Better YAML Formatter](https://marketplace.visualstudio.com/items?itemName&#x3D;kennylong.kubernetes-yaml-formatter) | kennylong | A better YAML formatter |
| [GitHub Issue Notebooks](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.vscode-github-issue-notebooks) | Microsoft | GitHub Issue Notebooks for VS Code |
| [Git Graph](https://marketplace.visualstudio.com/items?itemName&#x3D;mhutchie.git-graph) | mhutchie | View a Git Graph of your repository, and perform Git actions from the graph |
| [Code Runner](https://marketplace.visualstudio.com/items?itemName&#x3D;formulahendry.code-runner) | Jun Han | Run code snippets or code files for multiple languages |
| [SonarLint](https://marketplace.visualstudio.com/items?itemName&#x3D;SonarSource.sonarlint-vscode) | SonarSource | Detects bugs, vulnerabilities and code smells for multiple languages |

## 🏷️ Categories



## 📄 License

### Extension Pack License
This extension pack is licensed under the **MIT License** - see [LICENSE.md](https://github.com/templ-project/vscode-extensions/blob/main/packages/vscode/generic-extended/LICENSE.md) for details.

### Third-Party Extension Licenses
**Important**: Each extension included in this pack has its own license terms. templ-project is not responsible for the licensing, functionality, or security of third-party extensions.

| Extension | Publisher | License | Description |
|-----------|-----------|---------|-------------|
| [OpenAPI (Swagger) Editor](https://marketplace.visualstudio.com/items?itemName&#x3D;42crunch.vscode-openapi) | 42Crunch | MIT | OpenAPI editing, validation and preview in VS Code |
| [REST Client](https://marketplace.visualstudio.com/items?itemName&#x3D;humao.rest-client) | Huachao Mao | MIT | REST Client for Visual Studio Code |
| [Docker](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-azuretools.vscode-docker) | Microsoft | MIT | Makes it easy to create, manage, and debug containerized applications |
| [Kubernetes](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-kubernetes-tools.vscode-kubernetes-tools) | Microsoft | MIT | Develop, deploy and debug Kubernetes applications |
| [Helm Intellisense](https://marketplace.visualstudio.com/items?itemName&#x3D;tim-koehler.helm-intellisense) | Tim Koehler | MIT | This extension provides intellisense for helm templates |
| [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName&#x3D;github.vscode-pull-request-github) | GitHub | MIT | Pull Request and Issue Provider for GitHub |
| [GitHub Actions](https://marketplace.visualstudio.com/items?itemName&#x3D;github.vscode-github-actions) | GitHub | MIT | GitHub Actions workflows and runs for github.com hosted repositories |
| [Better DockerFile Syntax](https://marketplace.visualstudio.com/items?itemName&#x3D;jeff-hykin.better-dockerfile-syntax) | jeff-hykin | MIT | An update to the syntax of Dockerfile |
| [Kubernetes Support](https://marketplace.visualstudio.com/items?itemName&#x3D;ipedrazas.kubernetes-snippets) | Iván Pedrazas | MIT | Code snippets of kubernetes for Visual Studio Code |
| [Better YAML Formatter](https://marketplace.visualstudio.com/items?itemName&#x3D;kennylong.kubernetes-yaml-formatter) | kennylong | MIT | A better YAML formatter |
| [GitHub Issue Notebooks](https://marketplace.visualstudio.com/items?itemName&#x3D;ms-vscode.vscode-github-issue-notebooks) | Microsoft | MIT | GitHub Issue Notebooks for VS Code |
| [Git Graph](https://marketplace.visualstudio.com/items?itemName&#x3D;mhutchie.git-graph) | mhutchie | MIT | View a Git Graph of your repository, and perform Git actions from the graph |
| [Code Runner](https://marketplace.visualstudio.com/items?itemName&#x3D;formulahendry.code-runner) | Jun Han | MIT | Run code snippets or code files for multiple languages |
| [SonarLint](https://marketplace.visualstudio.com/items?itemName&#x3D;SonarSource.sonarlint-vscode) | SonarSource | LGPL-3.0 | Detects bugs, vulnerabilities and code smells for multiple languages |

### Disclaimer
- We **do not guarantee** the functionality, security, or compatibility of included extensions
- We **are not responsible** for any issues caused by third-party extensions
- Users install and use extensions **at their own risk**
- Please review each extension's license and privacy policy before use

## 🤝 Contributing

Found an issue or want to suggest an extension? Please [open an issue](https://github.com/templ-project/vscode-extensions/issues) or submit a pull request.

## 📊 Extension Pack Stats

- **Total Extensions**: 14
- **Required Extensions**: 7
- **Optional Extensions**: 7
- **Target IDE**: vscode
- **Language Focus**: generic-extended

---

*This extension pack is maintained by [templ-project](https://github.com/templ-project) and updated regularly to include the most useful generic-extended development extensions.*
