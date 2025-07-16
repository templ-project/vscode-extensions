#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Validate generated extensions
 */
function validateGenerated() {
  console.log('🧪 Validating generated extensions...\n');
  
  const packagesDir = path.join(__dirname, '..', 'packages');
  
  if (!fs.existsSync(packagesDir)) {
    console.error('❌ No packages directory found. Run npm run generate first.');
    return false;
  }
  
  let allValid = true;
  
  // Find all extension directories
  const ides = fs.readdirSync(packagesDir);
  
  for (const ide of ides) {
    const idePath = path.join(packagesDir, ide);
    if (!fs.statSync(idePath).isDirectory()) continue;
    
    const languages = fs.readdirSync(idePath);
    
    for (const language of languages) {
      const extensionPath = path.join(idePath, language);
      if (!fs.statSync(extensionPath).isDirectory()) continue;
      
      console.log(`🔍 Validating ${ide}/${language}...`);
      
      const valid = validateExtension(extensionPath, ide, language);
      if (!valid) {
        allValid = false;
      } else {
        console.log(`✅ ${ide}/${language} is valid\n`);
      }
    }
  }
  
  if (allValid) {
    console.log('🎉 All generated extensions are valid!');
  } else {
    console.log('❌ Some extensions have validation errors.');
  }
  
  return allValid;
}

function validateExtension(extensionPath, ide, language) {
  let valid = true;
  
  // Check required files
  const requiredFiles = [
    'package.json',
    'src/extension.ts',
    'tsconfig.json',
    'README.md',
    'CHANGELOG.md',
    '.vscodeignore'
  ];
  
  for (const file of requiredFiles) {
    const filePath = path.join(extensionPath, file);
    if (!fs.existsSync(filePath)) {
      console.error(`  ❌ Missing required file: ${file}`);
      valid = false;
    }
  }
  
  // Validate package.json
  try {
    const packageJsonPath = path.join(extensionPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check required fields
    const requiredFields = ['name', 'version', 'engines', 'activationEvents', 'main', 'contributes'];
    for (const field of requiredFields) {
      if (!packageJson[field]) {
        console.error(`  ❌ Missing required package.json field: ${field}`);
        valid = false;
      }
    }
    
    // Check activation events
    if (!packageJson.activationEvents || !packageJson.activationEvents.includes('onStartupFinished')) {
      console.error(`  ❌ Missing activation event: onStartupFinished`);
      valid = false;
    }
    
    // Check extension pack
    if (!packageJson.extensionPack || packageJson.extensionPack.length === 0) {
      console.error(`  ❌ No extensions in extension pack`);
      valid = false;
    }
    
    console.log(`  ✅ Package.json valid (${packageJson.extensionPack.length} extensions)`);
    
  } catch (error) {
    console.error(`  ❌ Invalid package.json: ${error.message}`);
    valid = false;
  }
  
  // Validate snippets if they exist
  const snippetsPath = path.join(extensionPath, 'snippets', `${language}.json`);
  if (fs.existsSync(snippetsPath)) {
    try {
      const snippets = JSON.parse(fs.readFileSync(snippetsPath, 'utf8'));
      const snippetCount = Object.keys(snippets).length;
      console.log(`  ✅ Snippets valid (${snippetCount} snippets)`);
    } catch (error) {
      console.error(`  ❌ Invalid snippets JSON: ${error.message}`);
      valid = false;
    }
  }
  
  // Validate settings if they exist
  const settingsPath = path.join(extensionPath, 'settings.json');
  if (fs.existsSync(settingsPath)) {
    try {
      const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      const settingsCount = Object.keys(settings).length;
      console.log(`  ✅ Settings valid (${settingsCount} settings)`);
    } catch (error) {
      console.error(`  ❌ Invalid settings JSON: ${error.message}`);
      valid = false;
    }
  }
  
  // Check TypeScript compilation
  const outPath = path.join(extensionPath, 'out', 'extension.js');
  if (fs.existsSync(outPath)) {
    console.log(`  ✅ TypeScript compiled successfully`);
  } else {
    console.error(`  ❌ TypeScript not compiled (missing out/extension.js)`);
    valid = false;
  }
  
  return valid;
}

// Run validation if this script is executed directly
if (require.main === module) {
  const success = validateGenerated();
  process.exit(success ? 0 : 1);
}

module.exports = { validateGenerated, validateExtension };
