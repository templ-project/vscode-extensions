#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';
import { ConfigurationFile, Collection, Extension, Setting } from '../shared/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Convert TypeScript configuration to YAML format
 */
class ConfigurationBuilder {
  private outputDir: string;

  constructor(outputDir: string) {
    this.outputDir = outputDir;
  }

  /**
   * Build configuration for a specific IDE
   */
  async buildConfiguration(ide: 'vscode' | 'vscodium'): Promise<void> {
    console.log(`🔧 Building configuration for ${ide}...`);
    
    const collections: Record<string, Collection> = {};
    const collectionsDir = path.join(__dirname, 'collections', ide);
    
    // Dynamically import all collections
    const collectionFiles = fs.readdirSync(collectionsDir).filter(file => file.endsWith('.js'));
    
    for (const file of collectionFiles) {
      const collectionName = path.basename(file, '.js');
      const collectionModule = await import(path.join(collectionsDir, file));
      
      // Look for default export or named export matching the collection name
      const collection = collectionModule.default || 
                       collectionModule[collectionName] ||
                       collectionModule[Object.keys(collectionModule)[0]];
      
      if (collection) {
        collections[collectionName] = collection;
        console.log(`  ✅ Loaded collection: ${collectionName}`);
      } else {
        console.warn(`  ⚠️  Could not load collection from ${file}`);
      }
    }

    // Build the configuration file
    const config: ConfigurationFile = {
      metadata: {
        name: `${ide.charAt(0).toUpperCase() + ide.slice(1)} Development Collections`,
        description: `Curated extension collections for development in ${ide}`,
        version: "1.0.0",
        maintainer: "developer@templ-project.com",
        organization: "templ-project",
        publisher: "templ-project",
        repositoryUrl: "https://github.com/templ-project/vscode-extensions",
        ide: ide,
        created: new Date().toISOString().split('T')[0],
        updated: new Date().toISOString().split('T')[0]
      },
      collections: collections
    };

    // Convert to YAML format expected by existing scripts
    const yamlConfig = this.convertToYamlFormat(config);
    
    // Write to file
    const outputPath = path.join(this.outputDir, `${ide}-collections.yaml`);
    fs.writeFileSync(outputPath, yaml.stringify(yamlConfig, { indent: 2 }));
    
    console.log(`  📁 Configuration written to: ${outputPath}`);
    console.log(`  🎉 Built ${Object.keys(collections).length} collections for ${ide}`);
  }

  /**
   * Convert our TypeScript format to the YAML format expected by existing scripts
   */
  private convertToYamlFormat(config: ConfigurationFile): any {
    const yamlConfig: any = {
      metadata: config.metadata,
      collections: {}
    };

    // Convert each collection
    for (const [name, collection] of Object.entries(config.collections)) {
      yamlConfig.collections[name] = {
        description: collection.description,
        tags: collection.tags,
        required_extensions: collection.required_extensions.map(ext => ({
          id: ext.id,
          name: ext.name,
          description: ext.description,
          marketplace_url: ext.marketplace_url,
          publisher: ext.publisher,
          license: ext.license,
          why_required: ext.why_required
        })),
        optional_extensions: collection.optional_extensions.map(ext => ({
          id: ext.id,
          name: ext.name,
          description: ext.description,
          marketplace_url: ext.marketplace_url,
          publisher: ext.publisher,
          license: ext.license,
          why_recommended: ext.why_recommended
        })),
        settings: this.convertSettings(collection.settings),
        keybindings: collection.keybindings,
        snippets: collection.snippets,
        documentation: collection.documentation
      };
    }

    return yamlConfig;
  }

  /**
   * Convert settings from TypeScript format to YAML format
   */
  private convertSettings(settings: Record<string, Setting>): any {
    const yamlSettings: any = {};
    
    for (const [key, setting] of Object.entries(settings)) {
      yamlSettings[key] = {
        value: setting.value,
        description: setting.description,
        scope: setting.scope
      };
    }
    
    return yamlSettings;
  }

  /**
   * Build all configurations
   */
  async buildAll(): Promise<void> {
    console.log('🚀 Building all configurations...');
    
    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    try {
      await this.buildConfiguration('vscode');
      await this.buildConfiguration('vscodium');
      
      console.log('\n✅ All configurations built successfully!');
      console.log(`📁 Output directory: ${this.outputDir}`);
    } catch (error) {
      console.error('❌ Build failed:', error);
      process.exit(1);
    }
  }
}

// Main execution
async function main() {
  const outputDir = path.join(__dirname, '..', 'generated');
  const builder = new ConfigurationBuilder(outputDir);
  
  await builder.buildAll();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ConfigurationBuilder };
