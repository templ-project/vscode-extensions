// Generated Godot Extensions
import { Extension } from '../../shared/types';

// Main Godot development extension
const baseGodotTools: Omit<Extension, 'marketplace_url'> = {
  id: "geequlim.godot-tools",
  name: "Godot Tools",
  description: "Complete Godot development support with LSP, GDScript syntax highlighting, and debugging",
  publisher: "geequlim",
  license: "MIT",
  why_required: "Essential extension providing comprehensive Godot development support including language server, debugging, and project management"
};

// GDScript syntax highlighting and IntelliSense
const baseGdscript: Omit<Extension, 'marketplace_url'> = {
  id: "jjkim.gdscript",
  name: "GDScript",
  description: "Syntax highlighting and code completion for GDScript",
  publisher: "jjkim",
  license: "MIT",
  why_required: "Provides additional GDScript syntax highlighting and IntelliSense features"
};

// Additional file format support
const baseGodotFiles: Omit<Extension, 'marketplace_url'> = {
  id: "alfish.godot-files",
  name: "Godot Files",
  description: "Syntax highlighting for Godot files (.tres, .tscn, .godot, etc.)",
  publisher: "alfish",
  license: "MIT",
  why_recommended: "Adds syntax support for various Godot file formats like .tres, .tscn, .godot project files"
};

// Shader development support
const baseGodotShaders: Omit<Extension, 'marketplace_url'> = {
  id: "arkii.godot-shaders",
  name: "Godot Shaders",
  description: "Syntax highlighting and support for Godot shader files",
  publisher: "arkii",
  license: "MIT",
  why_recommended: "Essential for shader development in Godot with syntax highlighting for .gdshader files"
};

// Code snippets for Godot
const baseGodotSnippets: Omit<Extension, 'marketplace_url'> = {
  id: "razoric.gdscript-snippets",
  name: "Godot Snippets",
  description: "Code snippets for GDScript and Godot development",
  publisher: "razoric",
  license: "MIT",
  why_recommended: "Provides useful code snippets for common GDScript patterns and Godot API usage"
};

// Todo highlighting
const baseTodoHighlight: Omit<Extension, 'marketplace_url'> = {
  id: "wayou.vscode-todo-highlight",
  name: "TODO Highlight",
  description: "Highlight TODOs, FIXMEs, and other annotations in your code",
  publisher: "wayou",
  license: "MIT",
  why_recommended: "Helps track TODO comments and other annotations in game development code"
};

// Rainbow brackets for better code reading
const baseRainbowBrackets: Omit<Extension, 'marketplace_url'> = {
  id: "2gua.rainbow-brackets",
  name: "Rainbow Brackets",
  description: "Provide rainbow colors for the round brackets, the square brackets and the squiggly brackets",
  publisher: "2gua",
  license: "MIT",
  why_recommended: "Improves code readability by color-coding bracket pairs"
};

// VSCode marketplace versions
export const godotToolsVSCode: Extension = {
  ...baseGodotTools,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=geequlim.godot-tools"
};

export const gdscriptVSCode: Extension = {
  ...baseGdscript,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=jjkim.gdscript"
};

export const godotFilesVSCode: Extension = {
  ...baseGodotFiles,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=alfish.godot-files"
};

export const godotShadersVSCode: Extension = {
  ...baseGodotShaders,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=arkii.godot-shaders"
};

export const godotSnippetsVSCode: Extension = {
  ...baseGodotSnippets,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=razoric.gdscript-snippets"
};

export const todoHighlightVSCode: Extension = {
  ...baseTodoHighlight,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight"
};

export const rainbowBracketsVSCode: Extension = {
  ...baseRainbowBrackets,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=2gua.rainbow-brackets"
};

// VSCodium marketplace versions
export const godotToolsVSCodium: Extension = {
  ...baseGodotTools,
  marketplace_url: "https://open-vsx.org/extension/geequlim/godot-tools"
};

export const gdscriptVSCodium: Extension = {
  ...baseGdscript,
  marketplace_url: "https://open-vsx.org/extension/jjkim/gdscript"
};

export const godotFilesVSCodium: Extension = {
  ...baseGodotFiles,
  marketplace_url: "https://open-vsx.org/extension/alfish/godot-files"
};

export const godotShadersVSCodium: Extension = {
  ...baseGodotShaders,
  marketplace_url: "https://open-vsx.org/extension/arkii/godot-shaders"
};

export const godotSnippetsVSCodium: Extension = {
  ...baseGodotSnippets,
  marketplace_url: "https://open-vsx.org/extension/razoric/gdscript-snippets"
};

export const todoHighlightVSCodium: Extension = {
  ...baseTodoHighlight,
  marketplace_url: "https://open-vsx.org/extension/wayou/vscode-todo-highlight"
};

export const rainbowBracketsVSCodium: Extension = {
  ...baseRainbowBrackets,
  marketplace_url: "https://open-vsx.org/extension/2gua/rainbow-brackets"
};
