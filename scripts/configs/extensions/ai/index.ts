import { Extension } from '../../shared/types';

export const githubCopilotVSCode: Extension = {
  id: "github.copilot",
  name: "GitHub Copilot",
  description: "Your AI pair programmer",
  publisher: "GitHub",
  license: "GitHub Copilot License",
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=github.copilot",
  why_required: "AI-powered code completion and assistance"
};

export const continueAIVSCodium: Extension = {
  id: "continue.continue",
  name: "Continue - open-source AI code assistant",
  description: "The leading open-source AI code assistant",
  publisher: "Continue",
  license: "Apache-2.0",
  marketplace_url: "https://open-vsx.org/extension/Continue/continue",
  why_required: "Open-source AI-powered code completion and assistance (GitHub Copilot alternative)"
};

export const codeiumVSCodium: Extension = {
  id: "codeium.codeium",
  name: "Codeium: AI Coding Autocomplete",
  description: "Free AI code acceleration plugin",
  publisher: "Codeium",
  license: "See extension page",
  marketplace_url: "https://open-vsx.org/extension/Codeium/codeium",
  why_recommended: "Alternative AI coding assistant with free tier"
};
