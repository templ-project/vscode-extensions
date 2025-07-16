# Testing Guide for Generated VSCode Extensions

## Quick Testing with Extension Development Host

1. **Open the extension in VSCode:**
   ```bash
   cd packages/vscode/javascript
   code .
   ```

2. **Launch Extension Development Host:**
   - Press `F5` or `Ctrl/Cmd+F5`
   - Or: Open Command Palette (`Cmd+Shift+P`) → "Debug: Start Debugging"
   - A new VSCode window will open with your extension loaded

3. **Test Extension Features:**

   ### Test Settings Application:
   - Open Command Palette (`Cmd+Shift+P`)
   - Type: "Apply Vscode Javascript Extension Pack Settings"
   - Run the command
   - Check VSCode settings to see if they were applied

   ### Test Snippets:
   - Create a new `.js` file
   - Type snippet prefixes:
     - `cl` → should suggest "console.log('$1');"
     - `func` → should suggest function declaration
     - `af` → should suggest arrow function
     - `imp` → should suggest import statement
     - `expd` → should suggest export default

   ### Test Extension Pack:
   - The specified extensions should be automatically suggested for installation
   - Check Extensions view for recommended extensions

   ### Test Commands:
   - Command Palette → "Apply Vscode Javascript Extension Pack Settings"
   - Command Palette → "Reset Vscode Javascript Extension Pack Settings"

## Testing Individual Components

### Test Snippets Only:
1. Copy `snippets/javascript.json` to `~/.vscode/extensions/[some-folder]/snippets/`
2. Restart VSCode
3. Test snippets in a `.js` file

### Test Settings Only:
1. Manually apply settings from `settings.json` to your VSCode settings
2. Verify they take effect

### Test Keybindings:
1. Copy keybindings from `keybindings.json` to VSCode keybindings.json
2. Test the key combinations

## Debugging

### View Extension Logs:
- In Extension Development Host: Help → Toggle Developer Tools → Console
- Look for console.log messages from the extension

### Check Extension Activation:
- Extensions view → Show Running Extensions
- Your extension should appear in the list

### Verify File Generation:
```bash
# Check all generated files
ls -la packages/vscode/javascript/
ls -la packages/vscode/javascript/src/
ls -la packages/vscode/javascript/out/
ls -la packages/vscode/javascript/snippets/

# Validate JSON files
node -e "console.log(JSON.parse(require('fs').readFileSync('packages/vscode/javascript/package.json')))"
node -e "console.log(JSON.parse(require('fs').readFileSync('packages/vscode/javascript/snippets/javascript.json')))"
```

## Manual Installation for Production Testing

### Create Installable Package:
```bash
cd packages/vscode/javascript
# Remove problematic fields for packaging
sed -i '' 's/"icon": "logo.png",//g' package.json
vsce package --allow-missing-repository
```

### Install Locally:
```bash
# Install the generated .vsix file
code --install-extension javascript-vscode-extension-pack-1.0.0.vsix
```

### Uninstall:
```bash
code --uninstall-extension templ-project.javascript-vscode-extension-pack
```

## Troubleshooting

### Common Issues:
1. **Extension not activating**: Check `activationEvents` in package.json
2. **Snippets not working**: Verify JSON syntax in snippets file
3. **Settings not applying**: Check the settings object structure
4. **Commands not found**: Verify commands are registered in package.json contributes section

### Logs and Debugging:
- Extension Development Host Console
- VSCode Output panel → "Extension Host"
- File → Preferences → Settings → search for applied settings
