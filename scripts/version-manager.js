#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

/**
 * Version Management System for Extension Packs
 *
 * This script manages version persistence across package.json regeneration:
 * - Stores current versions before generation
 * - Restores versions after generation
 * - Handles version increments when needed
 * - Supports semantic versioning operations
 */

const VERSION_STORE_FILE = path.join(__dirname, '..', '.version-store.json');
const PACKAGES_DIR = path.join(__dirname, '..', 'packages');

class VersionManager {
  constructor() {
    this.versionStore = this.loadVersionStore();
  }

  /**
   * Load existing version store or create empty one
   */
  loadVersionStore() {
    try {
      if (fs.existsSync(VERSION_STORE_FILE)) {
        const content = fs.readFileSync(VERSION_STORE_FILE, 'utf8');
        return JSON.parse(content);
      }
    } catch (error) {
      console.warn(`⚠️  Warning: Could not load version store: ${error.message}`);
    }

    return {
      versions: {},
      lastUpdated: new Date().toISOString(),
      metadata: {
        description: 'Version store for VSCode/VSCodium extension packs',
        format: '1.0.0',
      },
    };
  }

  /**
   * Save version store to file
   */
  saveVersionStore() {
    try {
      this.versionStore.lastUpdated = new Date().toISOString();
      fs.writeFileSync(VERSION_STORE_FILE, JSON.stringify(this.versionStore, null, 2));
      console.log(`✅ Version store saved to ${VERSION_STORE_FILE}`);
    } catch (error) {
      console.error(`❌ Error saving version store: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get package key for version storage
   */
  getPackageKey(ide, language) {
    return `${ide}/${language}`;
  }

  /**
   * Get package.json path for a specific extension
   */
  getPackageJsonPath(ide, language) {
    return path.join(PACKAGES_DIR, ide, language, 'package.json');
  }

  /**
   * Store current versions from existing package.json files
   * Only stores versions that don't already exist in the store
   */
  storeCurrentVersions() {
    console.log('🔄 Storing current extension versions...');

    let storedCount = 0;
    let skippedCount = 0;

    // Scan packages directory for existing package.json files
    if (fs.existsSync(PACKAGES_DIR)) {
      const ides = fs
        .readdirSync(PACKAGES_DIR)
        .filter((item) => fs.statSync(path.join(PACKAGES_DIR, item)).isDirectory());

      for (const ide of ides) {
        const ideDir = path.join(PACKAGES_DIR, ide);
        const languages = fs.readdirSync(ideDir).filter((item) => fs.statSync(path.join(ideDir, item)).isDirectory());

        for (const language of languages) {
          const packageJsonPath = this.getPackageJsonPath(ide, language);
          const packageKey = this.getPackageKey(ide, language);

          if (fs.existsSync(packageJsonPath)) {
            try {
              const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

              // Only store if not already in store or if explicitly forcing update
              if (!this.versionStore.versions[packageKey]) {
                this.versionStore.versions[packageKey] = {
                  version: packageJson.version || '1.0.0',
                  name: packageJson.name,
                  displayName: packageJson.displayName,
                  storedAt: new Date().toISOString(),
                  lastGenerated: null,
                };

                console.log(`  📦 ${packageKey}: stored ${packageJson.version || '1.0.0'}`);
                storedCount++;
              } else {
                console.log(`  📦 ${packageKey}: already stored (${this.versionStore.versions[packageKey].version})`);
                skippedCount++;
              }
            } catch (error) {
              console.warn(`⚠️  Warning: Could not read ${packageJsonPath}: ${error.message}`);
            }
          }
        }
      }
    }

    // Always save the version store, even if no new versions were stored
    this.saveVersionStore();

    console.log(`✅ Stored ${storedCount} new versions, skipped ${skippedCount} existing versions`);
  }

  /**
   * Restore versions to regenerated package.json files
   */
  restoreVersions() {
    console.log('🔄 Restoring extension versions...');

    let restoredCount = 0;

    for (const [packageKey, versionData] of Object.entries(this.versionStore.versions)) {
      const [ide, language] = packageKey.split('/');
      const packageJsonPath = this.getPackageJsonPath(ide, language);

      if (fs.existsSync(packageJsonPath)) {
        try {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

          // Restore version
          packageJson.version = versionData.version;

          // Update metadata
          this.versionStore.versions[packageKey].lastGenerated = new Date().toISOString();

          // Write back to file
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

          console.log(`  📦 ${packageKey}: restored to ${versionData.version}`);
          restoredCount++;
        } catch (error) {
          console.error(`❌ Error restoring version for ${packageKey}: ${error.message}`);
        }
      } else {
        console.warn(`⚠️  Warning: Package.json not found for ${packageKey}`);
      }
    }

    this.saveVersionStore();
    console.log(`✅ Restored ${restoredCount} extension versions`);
  }

  /**
   * Set version for a specific package (used by CI/CD)
   */
  setVersion(ide, language, version) {
    const packageKey = this.getPackageKey(ide, language);

    if (!this.versionStore.versions[packageKey]) {
      this.versionStore.versions[packageKey] = {
        name: `${language}-${ide}-extension-pack`,
        displayName: `${ide} ${language} Extension Pack`,
        storedAt: new Date().toISOString(),
        lastGenerated: null,
      };
    }

    const oldVersion = this.versionStore.versions[packageKey].version;
    this.versionStore.versions[packageKey].version = version;
    this.versionStore.versions[packageKey].lastVersionUpdate = {
      from: oldVersion,
      to: version,
      timestamp: new Date().toISOString(),
    };

    console.log(`� ${packageKey}: version set to ${version}`);

    this.saveVersionStore();
    return version;
  }

  /**
   * Get current version for a package
   */
  getVersion(ide, language) {
    const packageKey = this.getPackageKey(ide, language);
    const versionData = this.versionStore.versions[packageKey];
    return versionData ? versionData.version : '1.0.0';
  }

  /**
   * List all stored versions
   */
  listVersions() {
    console.log('\n📋 Stored Extension Versions:');
    console.log('================================');

    if (Object.keys(this.versionStore.versions).length === 0) {
      console.log('No versions stored yet.');
      return;
    }

    for (const [packageKey, versionData] of Object.entries(this.versionStore.versions)) {
      const lastGenerated = versionData.lastGenerated
        ? new Date(versionData.lastGenerated).toLocaleDateString()
        : 'Never';

      console.log(`  📦 ${packageKey.padEnd(20)} v${versionData.version.padEnd(8)} (Generated: ${lastGenerated})`);
    }

    console.log(`\n📊 Total: ${Object.keys(this.versionStore.versions).length} extensions`);
    console.log(`🕐 Last updated: ${new Date(this.versionStore.lastUpdated).toLocaleString()}`);
  }

  /**
   * Clean up version store (remove entries for non-existent packages)
   */
  cleanup() {
    console.log('🧹 Cleaning up version store...');

    const toRemove = [];

    for (const packageKey of Object.keys(this.versionStore.versions)) {
      const [ide, language] = packageKey.split('/');
      const packageJsonPath = this.getPackageJsonPath(ide, language);

      if (!fs.existsSync(packageJsonPath)) {
        toRemove.push(packageKey);
      }
    }

    for (const packageKey of toRemove) {
      delete this.versionStore.versions[packageKey];
      console.log(`  🗑️  Removed ${packageKey} (package no longer exists)`);
    }

    if (toRemove.length > 0) {
      this.saveVersionStore();
      console.log(`✅ Cleaned up ${toRemove.length} obsolete version entries`);
    } else {
      console.log('✅ No cleanup needed');
    }
  }

  /**
   * Remove version store file completely
   */
  removeVersionStore() {
    console.log('🧹 Removing version store file...');

    try {
      if (fs.existsSync(VERSION_STORE_FILE)) {
        fs.unlinkSync(VERSION_STORE_FILE);
        console.log('✅ Removed .version-store.json');
      } else {
        console.log('✅ Version store file does not exist');
      }
    } catch (error) {
      console.error(`❌ Error removing version store: ${error.message}`);
      throw error;
    }
  }
}

// CLI interface
function main() {
  const command = process.argv[2];
  const versionManager = new VersionManager();

  switch (command) {
    case 'store':
      versionManager.storeCurrentVersions();
      break;

    case 'restore':
      versionManager.restoreVersions();
      break;

    case 'set': {
      const setIde = process.argv[3];
      const setLanguage = process.argv[4];
      const setVersion = process.argv[5];

      if (!setIde || !setLanguage || !setVersion) {
        console.error('❌ Usage: npm run version:set <ide> <language> <version>');
        process.exit(1);
      }

      versionManager.setVersion(setIde, setLanguage, setVersion);
      break;
    }

    case 'list':
      versionManager.listVersions();
      break;

    case 'cleanup':
      versionManager.cleanup();
      break;

    case 'remove':
      versionManager.removeVersionStore();
      break;

    case 'get': {
      const getIde = process.argv[3];
      const getLanguage = process.argv[4];

      if (!getIde || !getLanguage) {
        console.error('❌ Usage: npm run version:get <ide> <language>');
        process.exit(1);
      }

      const version = versionManager.getVersion(getIde, getLanguage);
      console.log(version);
      break;
    }

    default:
      console.log(`
🔧 Version Manager for VSCode/VSCodium Extension Packs

Usage:
  node scripts/version-manager.js <command> [options]

Commands:
  store                           Store current versions from package.json files
  restore                         Restore versions to regenerated package.json files
  set <ide> <language> <version>  Set version for a specific package
  get <ide> <language>           Get current version for a package
  list                           List all stored versions
  cleanup                        Remove obsolete version entries
  remove                         Remove version store file completely

Examples:
  node scripts/version-manager.js store
  node scripts/version-manager.js restore
  node scripts/version-manager.js set vscode javascript 1.2.0
  node scripts/version-manager.js get vscode javascript
  node scripts/version-manager.js list
  node scripts/version-manager.js cleanup
  node scripts/version-manager.js remove
`);
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = VersionManager;
