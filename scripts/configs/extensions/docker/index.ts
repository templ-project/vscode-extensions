import { Extension } from '../../shared/types';

// Docker Support
export const dockerOfficial: Extension = {
  id: 'ms-azuretools.vscode-docker',
  name: 'Docker',
  description: 'Makes it easy to create, manage, and debug containerized applications',
  publisher: 'Microsoft',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker',
  why_required: 'Official Docker extension with language support and container management',
};

export const devContainers: Extension = {
  id: 'ms-vscode-remote.remote-containers',
  name: 'Dev Containers',
  description: 'Open any folder or repository inside a Docker container',
  publisher: 'Microsoft',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers',
  why_required: 'Develop inside Docker containers with full VS Code experience',
};

export const shellFormat: Extension = {
  id: 'foxundermoon.shell-format',
  name: 'shell-format',
  description: 'A formatter for shell scripts, Dockerfile, gitignore, dotenv, /etc/hosts and other file types',
  publisher: 'foxundermoon',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=foxundermoon.shell-format',
  why_required: 'Format Dockerfiles and shell scripts',
};

export const betterDockerfile: Extension = {
  id: 'jeff-hykin.better-dockerfile-syntax',
  name: 'Better DockerFile Syntax',
  description: 'An update to the syntax of Dockerfile',
  publisher: 'jeff-hykin',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=jeff-hykin.better-dockerfile-syntax',
  why_recommended: 'Enhanced Dockerfile syntax highlighting',
};

export const hadolint: Extension = {
  id: 'exiasr.hadolint',
  name: 'hadolint',
  description: 'Integrates hadolint, a Dockerfile linter, into VS Code',
  publisher: 'exiasr',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=exiasr.hadolint',
  why_recommended: 'Dockerfile linting and best practices',
};

// VSCodium alternatives - Docker support in Open VSX
export const dockerVSCodium: Extension = {
  id: 'ms-azuretools.vscode-docker',
  name: 'Docker',
  description: 'Makes it easy to create, manage, and debug containerized applications',
  publisher: 'Microsoft',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/ms-azuretools/vscode-docker',
  why_required: 'Official Docker extension with language support and container management (Open VSX compatible)',
};

export const devContainersVSCodium: Extension = {
  id: 'ms-vscode-remote.remote-containers',
  name: 'Dev Containers',
  description: 'Open any folder or repository inside a Docker container',
  publisher: 'Microsoft',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/ms-vscode-remote/remote-containers',
  why_required: 'Develop inside Docker containers with full VS Code experience (Open VSX compatible)',
};

export const shellFormatVSCodium: Extension = {
  id: 'foxundermoon.shell-format',
  name: 'shell-format',
  description: 'A formatter for shell scripts, Dockerfile, gitignore, dotenv, /etc/hosts and other file types',
  publisher: 'foxundermoon',
  license: 'MIT',
  marketplace_url: 'https://open-vsx.org/extension/foxundermoon/shell-format',
  why_required: 'Format Dockerfiles and shell scripts (Open VSX compatible)',
};
