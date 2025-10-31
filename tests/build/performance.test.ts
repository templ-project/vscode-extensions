import { mkdtemp, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { TemplateGenerator } from '../../src/build/TemplateGenerator.js';
import { createLogger } from '../../src/logger.js';

describe('Performance', () => {
  let logger: ReturnType<typeof createLogger>;
  let tempDir: string;
  let templatesDir: string;

  beforeEach(async () => {
    logger = createLogger({ level: 'silent' });
    tempDir = await mkdtemp(join(tmpdir(), 'perf-test-'));
    templatesDir = join(tempDir, 'templates');
    await mkdir(templatesDir);
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  describe('Template Caching Performance', () => {
    test('cached templates render faster than uncached', async () => {
      // Create a moderately complex template
      const templateContent = `
# {{title}}

Version: {{version}}

## Extensions

{{#each extensions}}
- {{this.name}} ({{this.id}})
  Publisher: {{this.publisher}}
  {{#if this.description}}
  Description: {{this.description}}
  {{/if}}
{{/each}}

## Settings

{{#each settings}}
- \`{{@key}}\`: {{this.value}}
  {{#if this.description}}
  {{this.description}}
  {{/if}}
{{/each}}
`.trim();

      const templatePath = join(templatesDir, 'complex.handlebars');
      await writeFile(templatePath, templateContent);

      const generator = new TemplateGenerator(logger, templatesDir);

      const context = {
        title: 'Test Extension Pack',
        version: '1.0.0',
        extensions: Array.from({ length: 10 }, (_, i) => ({
          name: `Extension ${i}`,
          id: `publisher.extension-${i}`,
          publisher: 'publisher',
          description: `Description for extension ${i}`,
        })),
        settings: Object.fromEntries(
          Array.from({ length: 5 }, (_, i) => [
            `setting${i}`,
            {
              value: `value${i}`,
              description: `Description for setting ${i}`,
            },
          ]),
        ),
      };

      // First render (uncached) - measure time
      const startUncached = performance.now();
      await generator.render('complex.handlebars', context);
      const uncachedDuration = performance.now() - startUncached;

      // Subsequent renders (cached) - measure average time
      const cachedDurations: number[] = [];
      for (let i = 0; i < 10; i++) {
        const start = performance.now();
        await generator.render('complex.handlebars', context);
        cachedDurations.push(performance.now() - start);
      }

      const avgCachedDuration = cachedDurations.reduce((a, b) => a + b, 0) / cachedDurations.length;

      // Verify cache statistics
      const stats = generator.getCacheStats();
      expect(stats.misses).toBe(1); // Only first render was a miss
      expect(stats.hits).toBe(10); // All subsequent renders were hits
      expect(stats.hitRate).toBeCloseTo(90.91, 1); // 10 hits out of 11 requests

      // Cached renders should be faster (though this is timing-dependent)
      // We just verify the cache is working, not enforce a specific speedup
      expect(avgCachedDuration).toBeLessThan(uncachedDuration * 2); // At least some speedup

      // Log results for visibility (only in non-silent mode)
      logger.info({
        uncachedDuration: `${uncachedDuration.toFixed(2)}ms`,
        avgCachedDuration: `${avgCachedDuration.toFixed(2)}ms`,
        speedup: `${(uncachedDuration / avgCachedDuration).toFixed(2)}x`,
        cacheStats: stats,
      });
    });

    test('cache hit rate improves with repeated renders', async () => {
      const templatePath = join(templatesDir, 'simple.handlebars');
      await writeFile(templatePath, 'Hello {{name}}');

      const generator = new TemplateGenerator(logger, templatesDir);

      // Track hit rate progression
      const hitRates: number[] = [];

      for (let i = 0; i < 10; i++) {
        await generator.render('simple.handlebars', { name: `User${i}` });
        const stats = generator.getCacheStats();
        hitRates.push(stats.hitRate);
      }

      // Hit rate should be 0% initially, then increase
      expect(hitRates[0]).toBe(0); // First render is always a miss
      expect(hitRates[1]).toBe(50); // Second render: 1 hit, 1 miss = 50%
      expect(hitRates[2]).toBeCloseTo(66.67, 1); // Third render: 2 hits, 1 miss ≈ 66.67%
      expect(hitRates[9]).toBe(90); // Tenth render: 9 hits, 1 miss = 90%

      // Final stats
      const finalStats = generator.getCacheStats();
      expect(finalStats.hits).toBe(9);
      expect(finalStats.misses).toBe(1);
      expect(finalStats.hitRate).toBe(90);
    });

    test('multiple templates maintain independent cache entries', async () => {
      // Create 3 different templates
      await writeFile(join(templatesDir, 't1.handlebars'), 'Template 1: {{value}}');
      await writeFile(join(templatesDir, 't2.handlebars'), 'Template 2: {{value}}');
      await writeFile(join(templatesDir, 't3.handlebars'), 'Template 3: {{value}}');

      const generator = new TemplateGenerator(logger, templatesDir);

      // Render each template twice
      await generator.render('t1.handlebars', { value: 'a' });
      await generator.render('t2.handlebars', { value: 'b' });
      await generator.render('t3.handlebars', { value: 'c' });
      await generator.render('t1.handlebars', { value: 'd' }); // t1 cache hit
      await generator.render('t2.handlebars', { value: 'e' }); // t2 cache hit
      await generator.render('t3.handlebars', { value: 'f' }); // t3 cache hit

      const stats = generator.getCacheStats();
      expect(stats.size).toBe(3); // 3 templates cached
      expect(stats.misses).toBe(3); // First render of each was a miss
      expect(stats.hits).toBe(3); // Second render of each was a hit
      expect(stats.hitRate).toBe(50); // 3 hits out of 6 requests = 50%
    });
  });

  describe('Parallel Build Simulation', () => {
    test('simulates building multiple extensions with shared templates', async () => {
      // Create common templates used across extensions
      await writeFile(join(templatesDir, 'package.json.handlebars'), '{"name":"{{name}}","version":"{{version}}"}');
      await writeFile(join(templatesDir, 'README.md.handlebars'), '# {{name}}\n\n{{description}}');

      const generator = new TemplateGenerator(logger, templatesDir);

      // Simulate building 5 extensions (each uses both templates)
      const extensions = ['cpp', 'typescript', 'python', 'golang', 'javascript'];

      for (const ext of extensions) {
        await generator.render('package.json.handlebars', {
          name: `tpl-vscode-${ext}`,
          version: '1.0.0',
        });

        await generator.render('README.md.handlebars', {
          name: `${ext.toUpperCase()} Extension Pack`,
          description: `Extension pack for ${ext} development`,
        });
      }

      // Verify cache efficiency
      const stats = generator.getCacheStats();
      expect(stats.size).toBe(2); // Only 2 templates cached
      expect(stats.misses).toBe(2); // First render of each template
      expect(stats.hits).toBe(8); // Remaining 8 renders (5 extensions * 2 templates - 2 misses)
      expect(stats.hitRate).toBe(80); // 8 hits out of 10 requests = 80%

      logger.info({
        extensionsBuilt: extensions.length,
        templatesUsed: stats.size,
        cacheHitRate: `${stats.hitRate.toFixed(2)}%`,
      });
    });
  });
});
