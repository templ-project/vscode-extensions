import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import Handlebars from 'handlebars';
import type { Logger } from 'pino';
import { BuildError } from '../errors.js';

/**
 * TemplateGenerator renders Handlebars templates with provided context data.
 *
 * Features:
 * - Template caching for performance
 * - File-based template loading from templates/ directory
 * - Structured error reporting with BuildError
 * - Pino logging for debug and error tracking
 *
 * @example
 * ```typescript
 * const generator = new TemplateGenerator(logger);
 * const output = await generator.render('package.json.handlebars', { name: 'my-ext' });
 * await generator.renderToFile('package.json.handlebars', context, './output/package.json');
 * ```
 */
/**
 * Cache statistics for tracking template cache performance.
 */
export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  hitRate: number;
}

export class TemplateGenerator {
  private readonly logger: Logger;
  private readonly templateCache = new Map<string, HandlebarsTemplateDelegate>();
  private readonly templatesDir: string;
  private cacheHits = 0;
  private cacheMisses = 0;

  /**
   * Creates a new TemplateGenerator instance.
   *
   * @param logger - Pino logger for debug and error logging
   * @param templatesDir - Directory containing Handlebars templates (default: 'templates/')
   */
  constructor(logger: Logger, templatesDir = 'templates') {
    this.logger = logger.child({ module: 'TemplateGenerator' });
    this.templatesDir = templatesDir;

    // Register Handlebars helpers
    this.registerHelpers();

    this.logger.debug({ templatesDir: this.templatesDir }, 'TemplateGenerator initialized');
  }

  /**
   * Registers custom Handlebars helpers for template rendering.
   */
  private registerHelpers(): void {
    // Helper: JSON stringify for use in templates
    Handlebars.registerHelper('json', (context) => {
      return JSON.stringify(context);
    });

    // Helper: Get publisher from extension ID (format: publisher.extension)
    Handlebars.registerHelper('getPublisher', (extensionId: string) => {
      return extensionId.split('.')[0] || 'Unknown';
    });

    // Helper: Capitalize first letter
    Handlebars.registerHelper('capitalize', (str: string) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    });

    // Helper: Check if value is a string
    Handlebars.registerHelper('isString', (value: unknown) => {
      return typeof value === 'string';
    });

    // Helper: Escape JSON for use in JSON files
    Handlebars.registerHelper('escapeJson', (str: string) => {
      if (!str) return '';
      return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    });

    // Helper: Trim whitespace
    Handlebars.registerHelper('trim', (str: string) => {
      if (!str) return '';
      return str.trim();
    });

    // Helper: Check if object has keys
    Handlebars.registerHelper('hasKeys', (obj: unknown) => {
      if (!obj || typeof obj !== 'object') return false;
      return Object.keys(obj).length > 0;
    });

    this.logger.debug('Handlebars helpers registered');
  }

  /**
   * Loads and compiles a Handlebars template from the templates directory.
   * Templates are cached after first load for performance.
   *
   * @param templateName - Name of the template file (e.g., 'package.json.handlebars')
   * @returns Compiled Handlebars template function
   * @throws {BuildError} If template file cannot be read or compiled
   */
  private async loadTemplate(templateName: string): Promise<HandlebarsTemplateDelegate> {
    // Check cache first
    const cached = this.templateCache.get(templateName);
    if (cached) {
      this.cacheHits++;
      this.logger.debug(
        { templateName, cacheHits: this.cacheHits, cacheMisses: this.cacheMisses },
        'Template loaded from cache (hit)',
      );
      return cached;
    }

    // Cache miss - load from file
    this.cacheMisses++;

    // Load template from file
    const templatePath = join(this.templatesDir, templateName);

    try {
      this.logger.debug({ templatePath, cacheMisses: this.cacheMisses }, 'Loading template from file (miss)');
      const templateContent = await readFile(templatePath, 'utf-8');

      // Compile template
      const compiled = Handlebars.compile(templateContent, {
        strict: true,
        noEscape: false,
      });

      // Cache compiled template
      this.templateCache.set(templateName, compiled);

      this.logger.debug({ templateName, cacheSize: this.templateCache.size }, 'Template compiled and cached');
      return compiled;
    } catch (error) {
      this.logger.error({ err: error, templatePath }, 'Failed to load or compile template');

      throw new BuildError(`Failed to load template: ${templateName}`, {
        templatePath,
        templatesDir: this.templatesDir,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Renders a Handlebars template with the provided context data.
   *
   * @param templateName - Name of the template file (e.g., 'package.json.handlebars')
   * @param context - Data to pass to the template for rendering
   * @returns Rendered template output as a string
   * @throws {BuildError} If template loading or rendering fails
   *
   * @example
   * ```typescript
   * const output = await generator.render('README.md.handlebars', {
   *   displayName: 'C++ Extensions',
   *   description: 'Essential C++ development tools'
   * });
   * ```
   */
  async render(templateName: string, context: Record<string, unknown>): Promise<string> {
    this.logger.debug({ templateName, contextKeys: Object.keys(context) }, 'Rendering template');

    try {
      const template = await this.loadTemplate(templateName);
      const output = template(context);

      this.logger.debug({ templateName, outputLength: output.length }, 'Template rendered successfully');

      return output;
    } catch (error) {
      // If error is already a BuildError from loadTemplate, re-throw it
      if (error instanceof BuildError) {
        throw error;
      }

      // Otherwise, wrap rendering error in BuildError
      this.logger.error({ err: error, templateName }, 'Template rendering failed');

      throw new BuildError(`Failed to render template: ${templateName}`, {
        templateName,
        contextKeys: Object.keys(context),
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Renders a template and writes the output to a file.
   *
   * @param templateName - Name of the template file (e.g., 'package.json.handlebars')
   * @param context - Data to pass to the template for rendering
   * @param outputPath - Absolute or relative path where the rendered output should be written
   * @throws {BuildError} If template rendering or file writing fails
   *
   * @example
   * ```typescript
   * await generator.renderToFile(
   *   'package.json.handlebars',
   *   { name: 'my-extension', version: '1.0.0' },
   *   './packages/vscode/cpp/package.json'
   * );
   * ```
   */
  async renderToFile(templateName: string, context: Record<string, unknown>, outputPath: string): Promise<void> {
    this.logger.debug({ templateName, outputPath }, 'Rendering template to file');

    try {
      const output = await this.render(templateName, context);
      await writeFile(outputPath, output, 'utf-8');

      this.logger.debug({ templateName, outputPath, size: output.length }, 'Template written to file successfully');
    } catch (error) {
      // If error is already a BuildError, re-throw it
      if (error instanceof BuildError) {
        throw error;
      }

      // Otherwise, wrap file writing error in BuildError
      this.logger.error({ err: error, templateName, outputPath }, 'Failed to write rendered template to file');

      throw new BuildError(`Failed to write template to file: ${outputPath}`, {
        templateName,
        outputPath,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Clears the template cache. Useful for testing or when templates change at runtime.
   * Also resets cache statistics.
   */
  clearCache(): void {
    const cacheSize = this.templateCache.size;
    this.templateCache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.logger.debug({ cacheSize }, 'Template cache and statistics cleared');
  }

  /**
   * Returns the number of cached templates.
   *
   * @deprecated Use getCacheStats() for detailed cache information
   */
  getCacheSize(): number {
    return this.templateCache.size;
  }

  /**
   * Returns detailed cache statistics including hits, misses, size, and hit rate.
   *
   * @returns Cache statistics object
   *
   * @example
   * ```typescript
   * const stats = generator.getCacheStats();
   * console.log(`Cache hit rate: ${stats.hitRate.toFixed(2)}%`);
   * console.log(`Total requests: ${stats.hits + stats.misses}`);
   * ```
   */
  getCacheStats(): CacheStats {
    const totalRequests = this.cacheHits + this.cacheMisses;
    const hitRate = totalRequests > 0 ? (this.cacheHits / totalRequests) * 100 : 0;

    const stats: CacheStats = {
      hits: this.cacheHits,
      misses: this.cacheMisses,
      size: this.templateCache.size,
      hitRate,
    };

    this.logger.debug(
      {
        hits: stats.hits,
        misses: stats.misses,
        size: stats.size,
        hitRate: stats.hitRate.toFixed(2) + '%',
      },
      'Cache statistics',
    );

    return stats;
  }
}
