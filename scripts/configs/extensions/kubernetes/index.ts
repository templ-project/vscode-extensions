import { Extension } from '../../shared/types';

// Kubernetes Support
export const kubernetesTools: Extension = {
  id: 'ms-kubernetes-tools.vscode-kubernetes-tools',
  name: 'Kubernetes',
  description: 'Develop, deploy and debug Kubernetes applications',
  publisher: 'Microsoft',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools',
  why_required: 'Official Kubernetes extension with YAML support, cluster management, and debugging',
};

export const helmIntellisense: Extension = {
  id: 'tim-koehler.helm-intellisense',
  name: 'Helm Intellisense',
  description: 'This extension provides intellisense for helm templates',
  publisher: 'Tim Koehler',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=tim-koehler.helm-intellisense',
  why_required: 'Helm template intellisense and validation',
};

export const kubernetesSnippets: Extension = {
  id: 'ipedrazas.kubernetes-snippets',
  name: 'Kubernetes Support',
  description: 'Code snippets of kubernetes for Visual Studio Code',
  publisher: 'Iván Pedrazas',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=ipedrazas.kubernetes-snippets',
  why_recommended: 'Kubernetes YAML snippets for faster development',
};

export const kubernetesTemplates: Extension = {
  id: 'lunuan.kubernetes-templates',
  name: 'Kubernetes Templates',
  description: 'Kubernetes Templates',
  publisher: 'lunuan',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=lunuan.kubernetes-templates',
  why_recommended: 'Pre-built Kubernetes YAML templates',
};

export const kubernetesYamlFormatter: Extension = {
  id: 'kennylong.kubernetes-yaml-formatter',
  name: 'Better YAML Formatter',
  description: 'A better YAML formatter',
  publisher: 'kennylong',
  license: 'MIT',
  marketplace_url: 'https://marketplace.visualstudio.com/items?itemName=kennylong.kubernetes-yaml-formatter',
  why_recommended: 'Enhanced YAML formatting for Kubernetes manifests',
};

// VSCodium alternatives - most K8s extensions should work in Open VSX
export const kubernetesToolsVSCodium: Extension = {
  ...kubernetesTools,
  marketplace_url: 'https://open-vsx.org/extension/ms-kubernetes-tools/vscode-kubernetes-tools',
};

export const helmIntellisenseVSCodium: Extension = {
  ...helmIntellisense,
  marketplace_url: 'https://open-vsx.org/extension/tim-koehler/helm-intellisense',
};

export const kubernetesSnippetsVSCodium: Extension = {
  ...kubernetesSnippets,
  marketplace_url: 'https://open-vsx.org/extension/ipedrazas/kubernetes-snippets',
};
