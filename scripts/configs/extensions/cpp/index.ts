import { Extension } from '../../shared/types';

// Base extension definitions (shared properties)
const baseClangd: Omit<Extension, 'marketplace_url'> = {
  id: "llvm-vs-code-extensions.vscode-clangd",
  name: "clangd",
  description: "C/C++ completion, navigation, and insights",
  publisher: "LLVM Extensions",
  license: "Apache-2.0",
  why_required: "Provides excellent C/C++ language server with clang-based IntelliSense, code completion, and error detection"
};

const baseCMake: Omit<Extension, 'marketplace_url'> = {
  id: "twxs.cmake",
  name: "CMake",
  description: "CMake language support for Visual Studio Code",
  publisher: "twxs",
  license: "MIT",
  why_required: "Essential CMake language support with syntax highlighting and IntelliSense"
};

const baseCMakeTools: Omit<Extension, 'marketplace_url'> = {
  id: "ms-vscode.cmake-tools",
  name: "CMake Tools",
  description: "Extended CMake support in Visual Studio Code",
  publisher: "Microsoft",
  license: "MIT",
  why_required: "Advanced CMake integration with build system support, configuration management, and debugging"
};

const baseXMake: Omit<Extension, 'marketplace_url'> = {
  id: "tboox.xmake-vscode",
  name: "XMake",
  description: "Extended XMake support in Visual Studio Code",
  publisher: "tboox",
  license: "Apache-2.0",
  why_required: "Modern build system support for XMake with build configuration and project management"
};

const baseClangFormat: Omit<Extension, 'marketplace_url'> = {
  id: "xaver.clang-format",
  name: "Clang-Format",
  description: "Use Clang-Format in Visual Studio Code",
  publisher: "xaver",
  license: "MIT",
  why_required: "Essential code formatting for C/C++ using clang-format with customizable style options"
};

const baseErrorLens: Omit<Extension, 'marketplace_url'> = {
  id: "usernamehw.errorlens",
  name: "Error Lens",
  description: "Improve highlighting of errors, warnings and other language diagnostics",
  publisher: "Alexander",
  license: "MIT",
  why_required: "Enhanced error visibility and inline diagnostics for better development experience"
};

const baseBetterCppSyntax: Omit<Extension, 'marketplace_url'> = {
  id: "jeff-hykin.better-cpp-syntax",
  name: "Better C++ Syntax",
  description: "The bleeding edge of the C++ syntax",
  publisher: "Jeff Hykin",
  license: "MIT",
  why_recommended: "Enhanced C++ syntax highlighting with modern C++ features support"
};

const baseDoxygen: Omit<Extension, 'marketplace_url'> = {
  id: "cschlosser.doxdocgen",
  name: "Doxygen Documentation Generator",
  description: "Let me generate Doxygen documentation from your source code for you",
  publisher: "Christoph Schlosser",
  license: "MIT",
  why_recommended: "Automated documentation generation for C/C++ projects using Doxygen standards"
};

const baseNativeDebug: Omit<Extension, 'marketplace_url'> = {
  id: "webfreak.debug",
  name: "Native Debug",
  description: "GDB, LLDB & Mago-MI Debugger support for VSCode",
  publisher: "WebFreak",
  license: "Unlicense",
  why_recommended: "Advanced debugging support for C/C++ with GDB and LLDB integration"
};

// VSCode Extensions (Microsoft Marketplace URLs)
export const clangd: Extension = {
  ...baseClangd,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.vscode-clangd"
};

export const cmake: Extension = {
  ...baseCMake,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=twxs.cmake"
};

export const cmakeTools: Extension = {
  ...baseCMakeTools,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools"
};

export const xmake: Extension = {
  ...baseXMake,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=tboox.xmake-vscode"
};

export const clangFormat: Extension = {
  ...baseClangFormat,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=xaver.clang-format"
};

export const errorLens: Extension = {
  ...baseErrorLens,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens"
};

export const betterCppSyntax: Extension = {
  ...baseBetterCppSyntax,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=jeff-hykin.better-cpp-syntax"
};

export const doxygen: Extension = {
  ...baseDoxygen,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=cschlosser.doxdocgen"
};

export const nativeDebug: Extension = {
  ...baseNativeDebug,
  marketplace_url: "https://marketplace.visualstudio.com/items?itemName=webfreak.debug"
};

// VSCodium Extensions (Open VSX Registry URLs)
export const clangdVSCodium: Extension = {
  ...baseClangd,
  marketplace_url: "https://open-vsx.org/extension/llvm-vs-code-extensions/vscode-clangd"
};

export const cmakeVSCodium: Extension = {
  ...baseCMake,
  marketplace_url: "https://open-vsx.org/extension/twxs/cmake"
};

export const cmakeToolsVSCodium: Extension = {
  ...baseCMakeTools,
  marketplace_url: "https://open-vsx.org/extension/ms-vscode/cmake-tools"
};

export const xmakeVSCodium: Extension = {
  ...baseXMake,
  marketplace_url: "https://open-vsx.org/extension/tboox/xmake-vscode"
};

export const clangFormatVSCodium: Extension = {
  ...baseClangFormat,
  marketplace_url: "https://open-vsx.org/extension/xaver/clang-format"
};

export const errorLensVSCodium: Extension = {
  ...baseErrorLens,
  marketplace_url: "https://open-vsx.org/extension/usernamehw/errorlens"
};

export const betterCppSyntaxVSCodium: Extension = {
  ...baseBetterCppSyntax,
  marketplace_url: "https://open-vsx.org/extension/jeff-hykin/better-cpp-syntax"
};

export const doxygenVSCodium: Extension = {
  ...baseDoxygen,
  marketplace_url: "https://open-vsx.org/extension/cschlosser/doxdocgen"
};

export const nativeDebugVSCodium: Extension = {
  ...baseNativeDebug,
  marketplace_url: "https://open-vsx.org/extension/webfreak/debug"
};
