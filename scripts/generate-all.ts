#!/usr/bin/env ts-node

import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

console.log('🎯 TypeScript generate-all script is working!');
console.log('📋 Arguments:', process.argv.slice(2));

const args = process.argv.slice(2);
const targetIde = args[0];
const targetLanguage = args[1];

console.log(`🎯 Target IDE: ${targetIde || 'all'}`);
console.log(`🎯 Target Language: ${targetLanguage || 'all'}`);

async function runScript(script: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, script);
    const isTypeScript = script.endsWith('.ts');
    
    const command = isTypeScript ? 'npx' : 'node';
    const commandArgs = isTypeScript ? ['ts-node', '--transpile-only', scriptPath, ...args] : [scriptPath, ...args];
    
    console.log(`🔄 Running: ${command} ${commandArgs.join(' ')}`);
    
    const child = spawn(command, commandArgs, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
      shell: true // Enable shell mode for Windows compatibility
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script ${script} exited with code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function main(): Promise<void> {
  const ide = targetIde;
  const language = targetLanguage;
  
  // Define available IDE/language combinations
  const combinations: {ide: string, language: string}[] = [];
  
  if (ide && language) {

    combinations.push({ ide, language });
  } else if (ide) {
    combinations.push({ ide, language: 'generic-essential' });
    combinations.push({ ide, language: 'generic-extended' });
  } else if (language) {
    combinations.push({ ide: 'vscode', language });
    combinations.push({ ide: 'vscodium', language });
  } else {
    // Generate all combinations
    ['vscode', 'vscodium'].forEach((ide) => {
      fs.readdirSync(path.join(__dirname, 'configs', 'collections', ide)).forEach((file) => {
        combinations.push({ ide, language: file.split('.')[0] });
      });
    });
  }
  
  console.log(`🚀 Generating extension packs for ${combinations.length} combination(s)...`);
  
  // Check for version store file
  const versionStorePath = path.join(__dirname, '..', '.version-store.json');
  if (!fs.existsSync(versionStorePath)) {
    console.error('❌ Error: No version store found!');
    console.error('');
    console.error('The generation process requires a version store to manage package versions.');
    console.error('Please run the version store command first:');
    console.error('');
    console.error('  npm run version:store');
    console.error('');
    console.error('This will create a .version-store.json file with current package versions.');
    console.error('Then you can run the generation process again.');
    process.exit(1);
  }
  
  // Store current versions before generation
  console.log('\n💾 Storing current extension versions...');
  try {
    await runScript('version-manager.js', ['store']);
  } catch (error) {
    console.log(`⚠️  Warning: Could not store versions: ${error}`);
  }
  
  // Generate each combination
  let successCount = 0;
  let failCount = 0;
  
  for (const { ide, language } of combinations) {
    console.log(`\n🔄 Generating ${ide}/${language}...`);
    try {
      await runScript('generate-extension.ts', [ide, language]);
      console.log(`✅ Generated ${ide}/${language} successfully`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to generate ${ide}/${language}: ${error}`);
      failCount++;
    }
  }
  
  console.log(`\n📊 Generation Summary:`);
  console.log(`✅ Successfully generated: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  
  // Restore versions after generation
  console.log('\n🔄 Restoring extension versions...');
  try {
    await runScript('version-manager.js', ['restore']);
  } catch (error) {
    console.log(`⚠️  Warning: Could not restore versions: ${error}`);
  }
  
  // Clean up version store file
  console.log('\n🧹 Cleaning up version store...');
  try {
    const versionStorePath = path.join(__dirname, '..', '.version-store.json');
    if (fs.existsSync(versionStorePath)) {
      fs.unlinkSync(versionStorePath);
      console.log('✅ Removed .version-store.json');
    }
  } catch (error) {
    console.log(`⚠️  Warning: Could not remove version store: ${error}`);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}
