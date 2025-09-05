#!/usr/bin/env node

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

/**
 * Package all generated VSCode extensions using vsce
 * This creates .vsix files that can be installed locally for testing
 */

function ensureVsceInstalled() {
  try {
    execSync('vsce --version', { stdio: 'pipe' });
    console.log('✓ vsce is installed');
  } catch {
    console.log('📦 Installing vsce globally...');
    try {
      execSync('npm install -g @vscode/vsce', { stdio: 'inherit' });
      console.log('✅ vsce installed successfully');
    } catch {
      console.error('❌ Failed to install vsce. Please run: npm install -g @vscode/vsce');
      process.exit(1);
    }
  }
}

function getExtensionDirectories() {
  const packagesDir = path.join(__dirname, '..', 'packages');
  if (!fs.existsSync(packagesDir)) {
    console.log('❌ No packages directory found. Run npm run generate first.');
    return [];
  }

  const extensions = [];
  const ides = fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const ide of ides) {
    const idePath = path.join(packagesDir, ide);
    const languages = fs
      .readdirSync(idePath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const language of languages) {
      const extensionPath = path.join(idePath, language);
      const packageJsonPath = path.join(extensionPath, 'package.json');

      if (fs.existsSync(packageJsonPath)) {
        extensions.push({
          ide,
          language,
          path: extensionPath,
          name: `${language}-${ide}-extension-pack`,
        });
      }
    }
  }

  return extensions;
}

function compileExtension(extensionPath, extensionName) {
  console.log(`🔨 Compiling ${extensionName}...`);
  try {
    execSync('npm run compile', {
      cwd: extensionPath,
      stdio: 'pipe',
    });
    console.log(`✅ Compiled ${extensionName}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to compile ${extensionName}:`);
    console.error(error.stdout?.toString() || error.message);
    return false;
  }
}

async function packageExtension(extensionPath, extensionName) {
  console.log(`📦 Packaging ${extensionName}...`);
  try {
    // Start packaging process
    execSync('vsce package --no-dependencies', {
      cwd: extensionPath,
      stdio: 'pipe',
      encoding: 'utf8',
    });

    console.log(`✅ Packaged ${extensionName}`);

    // Wait for .vsix file to appear (with timeout)
    console.log(`⏳ Waiting for .vsix file to be created...`);
    const vsixFile = await waitForVsixFile(extensionPath, 10000, 500); // 10 second timeout, check every 500ms
    console.log(`📄 Found .vsix file: ${vsixFile}`);

    return vsixFile;
  } catch (error) {
    if (error.message && error.message.includes('Timeout')) {
      console.error(`❌ Timeout waiting for .vsix file for ${extensionName}`);
      console.error(error.message);
    } else {
      console.error(`❌ Failed to package ${extensionName}:`);
      console.error(error.stdout?.toString() || error.stderr?.toString() || error.message);
    }
    return null;
  }
}

function createPackagesDirectory() {
  const packagesOutputDir = path.join(__dirname, '..', 'dist');
  if (!fs.existsSync(packagesOutputDir)) {
    fs.mkdirSync(packagesOutputDir, { recursive: true });
    console.log(`📁 Created dist directory: ${packagesOutputDir}`);
  }
  return packagesOutputDir;
}

function waitForVsixFile(extensionPath, maxWaitTime = 30000, checkInterval = 1000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkForVsix = () => {
      try {
        const files = fs.readdirSync(extensionPath);
        const vsixFiles = files.filter((file) => file.endsWith('.vsix'));

        if (vsixFiles.length > 0) {
          resolve(vsixFiles[0]); // Return the first .vsix file found
          return;
        }

        const elapsed = Date.now() - startTime;
        if (elapsed >= maxWaitTime) {
          reject(new Error(`Timeout: No .vsix file found in ${extensionPath} after ${maxWaitTime}ms`));
          return;
        }

        setTimeout(checkForVsix, checkInterval);
      } catch (error) {
        reject(error);
      }
    };

    checkForVsix();
  });
}

function movePackageToOutput(extensionPath, vsixFile, outputDir) {
  const sourcePath = path.join(extensionPath, vsixFile);
  const targetPath = path.join(outputDir, vsixFile);

  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    fs.unlinkSync(sourcePath); // Remove from extension directory
    console.log(`📦 Moved ${vsixFile} to dist/`);
    return targetPath;
  } else {
    console.warn(`⚠️  Could not find ${vsixFile} in ${extensionPath}`);
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const targetIde = args[0]; // optional: specific IDE to package
  const targetLanguage = args[1]; // optional: specific language to package

  console.log('🚀 Starting VSCode Extension packaging...\n');

  // Ensure vsce is installed
  ensureVsceInstalled();

  // Create output directory
  const outputDir = createPackagesDirectory();

  // Get all extension directories
  const extensions = getExtensionDirectories();

  if (extensions.length === 0) {
    console.log('❌ No extensions found. Run npm run generate first.');
    return;
  }

  // Filter extensions if specific IDE/language requested
  const filteredExtensions = extensions.filter((ext) => {
    if (targetIde && ext.ide !== targetIde) return false;
    if (targetLanguage && ext.language !== targetLanguage) return false;
    return true;
  });

  if (filteredExtensions.length === 0) {
    console.log(`❌ No extensions found matching: ${targetIde || 'any'}/${targetLanguage || 'any'}`);
    return;
  }

  console.log(`📋 Found ${filteredExtensions.length} extension(s) to package:\n`);

  const results = [];
  let successCount = 0;
  let failureCount = 0;

  for (const extension of filteredExtensions) {
    console.log(`\n🔄 Processing ${extension.ide}/${extension.language}...`);

    // Compile the extension
    const compiled = compileExtension(extension.path, extension.name);
    if (!compiled) {
      console.log(`⏭️  Skipping packaging of ${extension.name} due to compilation failure\n`);
      failureCount++;
      continue;
    }

    // Package the extension (now async with timeout)
    const vsixFile = await packageExtension(extension.path, extension.name);
    if (!vsixFile) {
      console.log(`❌ Failed to package ${extension.name}\n`);
      failureCount++;
      continue;
    }

    // Move to output directory
    const finalPath = movePackageToOutput(extension.path, vsixFile, outputDir, extension.name);
    if (finalPath) {
      results.push({
        extension: `${extension.ide}/${extension.language}`,
        file: vsixFile,
        path: finalPath,
      });
      successCount++;
    } else {
      failureCount++;
    }
  }

  // Summary
  console.log('\n📊 Packaging Summary:');
  console.log('========================');

  if (successCount > 0) {
    console.log(`✅ Successfully packaged (${successCount}):`);
    results.forEach((result) => {
      console.log(`   • ${result.extension} → ${result.file}`);
    });
  }

  if (failureCount > 0) {
    console.log(`❌ Failed to package: ${failureCount}`);
  }

  console.log(`\n📁 Packaged extensions are in: ${outputDir}`);

  if (results.length > 0) {
    console.log('\n🚀 To install an extension locally:');
    console.log('   code --install-extension dist/<filename>.vsix');
    console.log('\n🗑️  To uninstall:');
    console.log('   code --uninstall-extension <extension-id>');
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Packaging failed:', error.message);
    process.exit(1);
  });
}

module.exports = { main };
