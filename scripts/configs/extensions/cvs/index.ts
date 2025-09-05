import { Extension } from '../../shared/types';

export const gitlens: Extension = {
  id: 'eamodio.gitlens',
  name: 'GitLens',
  description: 'Git supercharged',
  publisher: 'Eric Amodio',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens',
  why_required: 'Enhanced Git integration and history visualization',
};

export const gitlensVSCodium: Extension = {
  ...gitlens,
  marketplace_url: 'https://open-vsx.org/extension/eamodio/gitlens',
};

// GitHub Integration
export const githubPullRequests: Extension = {
  id: 'github.vscode-pull-request-github',
  name: 'GitHub Pull Requests',
  description: 'Pull Request and Issue Provider for GitHub',
  publisher: 'GitHub',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=github.vscode-pull-request-github',
  why_required: 'Manage GitHub pull requests and issues directly in VS Code',
};

export const githubActions: Extension = {
  id: 'github.vscode-github-actions',
  name: 'GitHub Actions',
  description: 'GitHub Actions workflows and runs for github.com hosted repositories',
  publisher: 'GitHub',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=github.vscode-github-actions',
  why_required: 'GitHub Actions workflow support and syntax highlighting',
};

export const githubIssueNotebooks: Extension = {
  id: 'ms-vscode.vscode-github-issue-notebooks',
  name: 'GitHub Issue Notebooks',
  description: 'GitHub Issue Notebooks for VS Code',
  publisher: 'Microsoft',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-github-issue-notebooks',
  why_recommended: 'Work with GitHub issues in notebook format',
};

export const githubRepositories: Extension = {
  id: 'github.remotehub',
  name: 'GitHub Repositories',
  description: 'Remotely browse and edit any GitHub repository',
  publisher: 'GitHub',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=github.remotehub',
  why_recommended: 'Browse and edit GitHub repositories without cloning',
};

// Alternative GitHub tools
export const gitGraph: Extension = {
  id: 'mhutchie.git-graph',
  name: 'Git Graph',
  description: 'View a Git Graph of your repository, and perform Git actions from the graph',
  publisher: 'mhutchie',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph',
  why_recommended: 'Visualize Git history and perform Git actions',
};

export const gitHistory: Extension = {
  id: 'donjayamanne.githistory',
  name: 'Git History',
  description: 'View git log, file history, compare branches or commits',
  publisher: 'Don Jayamanne',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory',
  why_recommended: 'Enhanced Git history viewing and comparison',
};

// VSCodium alternatives - GitHub extensions might have limited functionality
export const githubPullRequestsVSCodium: Extension = {
  id: 'github.vscode-pull-request-github',
  name: 'GitHub Pull Requests',
  description: 'Pull Request and Issue Provider for GitHub',
  publisher: 'GitHub',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/github/vscode-pull-request-github',
  why_required: 'Manage GitHub pull requests and issues directly in VS Code (Open VSX compatible)',
};

export const githubActionsVSCodium: Extension = {
  id: 'github.vscode-github-actions',
  name: 'GitHub Actions',
  description: 'GitHub Actions workflows and runs for github.com hosted repositories',
  publisher: 'GitHub',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/github/vscode-github-actions',
  why_required: 'GitHub Actions workflow support and syntax highlighting (Open VSX compatible)',
};

export const gitGraphVSCodium: Extension = {
  id: 'mhutchie.git-graph',
  name: 'Git Graph',
  description: 'View a Git Graph of your repository, and perform Git actions from the graph',
  publisher: 'mhutchie',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/mhutchie/git-graph',
  why_recommended: 'Visualize Git history and perform Git actions (Open VSX compatible)',
};

// GitLab Integration
export const gitlabWorkflow: Extension = {
  id: 'gitlab.gitlab-workflow',
  name: 'GitLab Workflow',
  description: 'Official GitLab-maintained extension for Visual Studio Code',
  publisher: 'GitLab',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=gitlab.gitlab-workflow',
  why_required: 'Official GitLab integration with CI/CD pipeline support, merge requests, and issue management',
};

// Atlassian Integration (Bitbucket + Jira)
export const atlassianIntegration: Extension = {
  id: 'atlassian.atlascode',
  name: 'Atlassian: Jira & Bitbucket',
  description: 'Bringing the power of Jira and Bitbucket to VS Code',
  publisher: 'Atlassian',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=atlassian.atlascode',
  why_required: 'Jira issue management and Bitbucket pull requests integration',
};

// Generic Git/Forge Tools
export const openInGitHub: Extension = {
  id: 'ziyasal.vscode-open-in-github',
  name: 'Open in GitHub, Bitbucket, Gitlab, VisualStudio.com !',
  description: 'Jump to a source code line in Github, Bitbucket, Gitlab, VisualStudio.com',
  publisher: 'Ziyasal',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=ziyasal.vscode-open-in-github',
  why_recommended: 'Quick navigation to source code in various Git forges',
};

export const gitWebLinks: Extension = {
  id: 'reduckted.vscode-gitweblinks',
  name: 'Git Web Links for VS Code',
  description: 'Copy links to files in their online Git repositories',
  publisher: 'reduckted',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=reduckted.vscode-gitweblinks',
  why_recommended: 'Copy links to files in GitHub, GitLab, Bitbucket, and Azure DevOps',
};

export const gitBlame: Extension = {
  id: 'waderyan.gitblame',
  name: 'Git Blame',
  description: 'See git blame information in the status bar',
  publisher: 'Wade Anderson',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame',
  why_recommended: 'Git blame information in status bar for GitHub, GitLab, and Bitbucket',
};

// VSCodium alternatives
export const gitlabWorkflowVSCodium: Extension = {
  id: 'gitlab.gitlab-workflow',
  name: 'GitLab Workflow',
  description: 'Official GitLab-maintained extension for Visual Studio Code',
  publisher: 'GitLab',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/gitlab/gitlab-workflow',
  why_required:
    'Official GitLab integration with CI/CD pipeline support, merge requests, and issue management (Open VSX compatible)',
};

export const atlassianIntegrationVSCodium: Extension = {
  id: 'atlassian.atlascode',
  name: 'Atlassian: Jira & Bitbucket',
  description: 'Bringing the power of Jira and Bitbucket to VS Code',
  publisher: 'Atlassian',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/atlassian/atlascode',
  why_required: 'Jira issue management and Bitbucket pull requests integration (Open VSX compatible)',
};

export const openInGitHubVSCodium: Extension = {
  id: 'ziyasal.vscode-open-in-github',
  name: 'Open in GitHub, Bitbucket, Gitlab, VisualStudio.com !',
  description: 'Jump to a source code line in Github, Bitbucket, Gitlab, VisualStudio.com',
  publisher: 'Ziyasal',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/ziyasal/vscode-open-in-github',
  why_recommended: 'Quick navigation to source code in various Git forges (Open VSX compatible)',
};
