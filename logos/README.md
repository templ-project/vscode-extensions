# Extension Pack Logos

This directory contains logo files for VSCode/VSCodium extension packs.

## Requirements

- **Format**: PNG (128x128 pixels)
- **Naming Convention**: `{language}-128.png`
- **File Size**: Keep under 50KB for reasonable extension package sizes
- **Transparency**: Recommended for better integration with VSCode themes

## Required Logos

The following logo files are required for all language extension packs:

| Language          | Filename                    | Status |
| ----------------- | --------------------------- | ------ |
| C++               | `cpp-128.png`               | ✅     |
| C#                | `csharp-128.png`            | ✅     |
| Godot             | `godot-128.png`             | ✅     |
| Go                | `golang-128.png`            | ✅     |
| JavaScript        | `javascript-128.png`        | ✅     |
| Python            | `python-128.png`            | ✅     |
| TypeScript        | `typescript-128.png`        | ✅     |
| Generic Essential | `generic-essential-128.png` | ✅     |
| Generic Extended  | `generic-extended-128.png`  | ✅     |

## Build Integration

During the extension pack build process (`ExtensionPackBuilder`):

1. The builder looks for `{language}-128.png` in this directory
2. If not found, falls back to `generic-128.png`
3. Logo is copied to the extension package as `logo.png`
4. Logo appears in VSCode Extensions view and marketplace

## Adding New Logos

When adding support for a new language:

1. Create a 128x128 PNG logo
2. Name it `{language}-128.png` (use the same name as in config files)
3. Place it in this directory
4. Verify by running: `npm test tests/build/logos.test.ts`

## Source Files

- `logo.xcf` - GIMP source file for logo editing (not used in builds)
- `javascript.png` - Legacy file (not used, can be removed)

## Copyright & Licensing

Logos should be:

- Original creations, or
- Used with permission, or
- Open source / public domain

Do not commit copyrighted images without proper licensing.
