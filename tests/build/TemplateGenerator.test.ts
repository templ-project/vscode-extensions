import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm, writeFile, readFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createLogger } from "../../src/logger.js";
import { TemplateGenerator } from "../../src/build/TemplateGenerator.js";
import { BuildError } from "../../src/errors.js";

describe("TemplateGenerator", () => {
  let logger: ReturnType<typeof createLogger>;
  let tempDir: string;
  let templatesDir: string;

  beforeEach(async () => {
    logger = createLogger({ level: "silent" }); // Silent to avoid test output noise
    tempDir = await mkdtemp(join(tmpdir(), "template-test-"));
    templatesDir = join(tempDir, "templates");
    await mkdir(templatesDir);
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  describe("render()", () => {
    test("renders simple template with context", async () => {
      // Create a simple template
      const templatePath = join(templatesDir, "simple.handlebars");
      await writeFile(templatePath, "Hello {{name}}!");

      const generator = new TemplateGenerator(logger, templatesDir);
      const output = await generator.render("simple.handlebars", {
        name: "World",
      });

      expect(output).toBe("Hello World!");
    });

    test("renders template with complex context", async () => {
      // Create template with loops and conditionals
      const templateContent = `
Name: {{name}}
Version: {{version}}
{{#if description}}
Description: {{description}}
{{/if}}
Extensions:
{{#each extensions}}
- {{this}}
{{/each}}
`.trim();

      const templatePath = join(templatesDir, "complex.handlebars");
      await writeFile(templatePath, templateContent);

      const generator = new TemplateGenerator(logger, templatesDir);
      const output = await generator.render("complex.handlebars", {
        name: "my-extension",
        version: "1.0.0",
        description: "Test extension",
        extensions: ["ext1", "ext2", "ext3"],
      });

      expect(output).toContain("Name: my-extension");
      expect(output).toContain("Version: 1.0.0");
      expect(output).toContain("Description: Test extension");
      expect(output).toContain("- ext1");
      expect(output).toContain("- ext2");
      expect(output).toContain("- ext3");
    });

    test("renders package.json template", async () => {
      // Create a realistic package.json template
      const templateContent = `{
  "name": "{{name}}",
  "version": "{{version}}",
  "description": "{{description}}",
  "keywords": [
{{#each keywords}}
    "{{this}}"{{#unless @last}},{{/unless}}
{{/each}}
  ]
}`;

      const templatePath = join(templatesDir, "package.json.handlebars");
      await writeFile(templatePath, templateContent);

      const generator = new TemplateGenerator(logger, templatesDir);
      const output = await generator.render("package.json.handlebars", {
        name: "test-pack",
        version: "2.3.4",
        description: "Test extension pack",
        keywords: ["vscode", "extensions", "cpp"],
      });

      // Parse to verify valid JSON
      const parsed = JSON.parse(output);
      expect(parsed.name).toBe("test-pack");
      expect(parsed.version).toBe("2.3.4");
      expect(parsed.keywords).toEqual(["vscode", "extensions", "cpp"]);
    });

    test("caches compiled templates", async () => {
      const templatePath = join(templatesDir, "cached.handlebars");
      await writeFile(templatePath, "Cached: {{value}}");

      const generator = new TemplateGenerator(logger, templatesDir);

      // First render - template should be loaded and cached
      expect(generator.getCacheSize()).toBe(0);
      await generator.render("cached.handlebars", { value: "first" });
      expect(generator.getCacheSize()).toBe(1);

      // Second render - should use cached template
      await generator.render("cached.handlebars", { value: "second" });
      expect(generator.getCacheSize()).toBe(1); // Still 1, not reloaded
    });

    test("throws BuildError when template file not found", async () => {
      const generator = new TemplateGenerator(logger, templatesDir);

      await expect(
        generator.render("nonexistent.handlebars", {})
      ).rejects.toThrow(BuildError);

      await expect(
        generator.render("nonexistent.handlebars", {})
      ).rejects.toThrow("Failed to load template: nonexistent.handlebars");
    });

    test("throws BuildError on invalid template syntax", async () => {
      // Create template with invalid Handlebars syntax
      const templatePath = join(templatesDir, "invalid.handlebars");
      await writeFile(templatePath, "{{#each items}}{{/if}}"); // Mismatched tags

      const generator = new TemplateGenerator(logger, templatesDir);

      await expect(
        generator.render("invalid.handlebars", {})
      ).rejects.toThrow(BuildError);
    });

    test("throws BuildError when required context is missing in strict mode", async () => {
      // Create template that expects a field
      const templatePath = join(templatesDir, "strict.handlebars");
      await writeFile(templatePath, "Name: {{name}}");

      const generator = new TemplateGenerator(logger, templatesDir);

      // Handlebars strict mode throws when field is missing
      await expect(
        generator.render("strict.handlebars", {})
      ).rejects.toThrow(BuildError);
    });
  });

  describe("renderToFile()", () => {
    test("renders template and writes to file", async () => {
      const templatePath = join(templatesDir, "output.handlebars");
      await writeFile(templatePath, "Content: {{content}}");

      const outputPath = join(tempDir, "output.txt");
      const generator = new TemplateGenerator(logger, templatesDir);

      await generator.renderToFile(
        "output.handlebars",
        { content: "test data" },
        outputPath
      );

      const fileContent = await readFile(outputPath, "utf-8");
      expect(fileContent).toBe("Content: test data");
    });

    test("creates output file with correct content", async () => {
      const templatePath = join(templatesDir, "json.handlebars");
      await writeFile(
        templatePath,
        '{"name": "{{name}}", "version": "{{version}}"}'
      );

      const outputPath = join(tempDir, "package.json");
      const generator = new TemplateGenerator(logger, templatesDir);

      await generator.renderToFile(
        "json.handlebars",
        { name: "my-pkg", version: "1.0.0" },
        outputPath
      );

      const fileContent = await readFile(outputPath, "utf-8");
      const parsed = JSON.parse(fileContent);
      expect(parsed.name).toBe("my-pkg");
      expect(parsed.version).toBe("1.0.0");
    });

    test("throws BuildError when output directory does not exist", async () => {
      const templatePath = join(templatesDir, "test.handlebars");
      await writeFile(templatePath, "test");

      const nonExistentDir = join(tempDir, "nonexistent", "subdir");
      const outputPath = join(nonExistentDir, "output.txt");
      const generator = new TemplateGenerator(logger, templatesDir);

      await expect(
        generator.renderToFile("test.handlebars", {}, outputPath)
      ).rejects.toThrow(BuildError);
    });

    test("overwrites existing file", async () => {
      const templatePath = join(templatesDir, "overwrite.handlebars");
      await writeFile(templatePath, "New content: {{value}}");

      const outputPath = join(tempDir, "overwrite.txt");
      await writeFile(outputPath, "Old content");

      const generator = new TemplateGenerator(logger, templatesDir);
      await generator.renderToFile(
        "overwrite.handlebars",
        { value: "replaced" },
        outputPath
      );

      const fileContent = await readFile(outputPath, "utf-8");
      expect(fileContent).toBe("New content: replaced");
    });
  });

  describe("Handlebars Helpers", () => {
    test("json helper stringifies objects", async () => {
      const templatePath = join(templatesDir, "json-helper.handlebars");
      // Use triple braces to prevent HTML escaping
      await writeFile(templatePath, "{{{json data}}}");

      const generator = new TemplateGenerator(logger, templatesDir);
      const output = await generator.render("json-helper.handlebars", {
        data: { key: "value", number: 42 },
      });

      expect(output).toBe('{"key":"value","number":42}');
    });

    test("getPublisher helper extracts publisher from extension ID", async () => {
      const templatePath = join(templatesDir, "publisher.handlebars");
      await writeFile(
        templatePath,
        "Publisher: {{getPublisher extensionId}}"
      );

      const generator = new TemplateGenerator(logger, templatesDir);
      const output = await generator.render("publisher.handlebars", {
        extensionId: "microsoft.vscode-cpptools",
      });

      expect(output).toBe("Publisher: microsoft");
    });

    test("capitalize helper capitalizes first letter", async () => {
      const templatePath = join(templatesDir, "capitalize.handlebars");
      await writeFile(templatePath, "{{capitalize word}}");

      const generator = new TemplateGenerator(logger, templatesDir);
      const output = await generator.render("capitalize.handlebars", {
        word: "hello",
      });

      expect(output).toBe("Hello");
    });
  });

  describe("Cache Management", () => {
    test("clearCache removes all cached templates", async () => {
      const template1Path = join(templatesDir, "t1.handlebars");
      const template2Path = join(templatesDir, "t2.handlebars");
      await writeFile(template1Path, "Template 1");
      await writeFile(template2Path, "Template 2");

      const generator = new TemplateGenerator(logger, templatesDir);

      await generator.render("t1.handlebars", {});
      await generator.render("t2.handlebars", {});
      expect(generator.getCacheSize()).toBe(2);

      generator.clearCache();
      expect(generator.getCacheSize()).toBe(0);
    });

    test("getCacheSize returns correct count", async () => {
      const generator = new TemplateGenerator(logger, templatesDir);
      expect(generator.getCacheSize()).toBe(0);

      const t1 = join(templatesDir, "t1.handlebars");
      const t2 = join(templatesDir, "t2.handlebars");
      const t3 = join(templatesDir, "t3.handlebars");
      await writeFile(t1, "T1");
      await writeFile(t2, "T2");
      await writeFile(t3, "T3");

      await generator.render("t1.handlebars", {});
      expect(generator.getCacheSize()).toBe(1);

      await generator.render("t2.handlebars", {});
      expect(generator.getCacheSize()).toBe(2);

      await generator.render("t3.handlebars", {});
      expect(generator.getCacheSize()).toBe(3);
    });
  });

  describe("Edge Cases", () => {
    test("handles empty context", async () => {
      const templatePath = join(templatesDir, "empty.handlebars");
      await writeFile(templatePath, "Static content");

      const generator = new TemplateGenerator(logger, templatesDir);
      const output = await generator.render("empty.handlebars", {});

      expect(output).toBe("Static content");
    });

    test("handles template with no placeholders", async () => {
      const templatePath = join(templatesDir, "static.handlebars");
      const staticContent = "This is a static template with no variables.";
      await writeFile(templatePath, staticContent);

      const generator = new TemplateGenerator(logger, templatesDir);
      const output = await generator.render("static.handlebars", {
        unusedKey: "value",
      });

      expect(output).toBe(staticContent);
    });

    test("handles large template context", async () => {
      const templatePath = join(templatesDir, "large.handlebars");
      await writeFile(
        templatePath,
        "{{#each items}}{{name}},{{/each}}"
      );

      const largeContext = {
        items: Array.from({ length: 1000 }, (_, i) => ({
          name: `item${i}`,
        })),
      };

      const generator = new TemplateGenerator(logger, templatesDir);
      const output = await generator.render("large.handlebars", largeContext);

      expect(output).toContain("item0");
      expect(output).toContain("item999");
    });

    test("handles special characters in context", async () => {
      const templatePath = join(templatesDir, "special.handlebars");
      await writeFile(templatePath, "Message: {{message}}");

      const generator = new TemplateGenerator(logger, templatesDir);
      const output = await generator.render("special.handlebars", {
        message: 'Special chars: <>&"\'',
      });

      // Handlebars escapes HTML by default
      expect(output).toContain("Special chars:");
    });
  });
});
