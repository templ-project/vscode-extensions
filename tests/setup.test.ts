import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Project Setup', () => {
  it('should have all required dependencies in package.json', () => {
    // Use process.cwd() to get the workspace root
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    // Verify package.json structure is loaded
    expect(packageJson).toBeDefined();
    expect(packageJson.dependencies).toBeDefined();

    // Core dependencies
    expect(packageJson.dependencies).toHaveProperty('pino');
    expect(packageJson.dependencies).toHaveProperty('pino-pretty');
    expect(packageJson.dependencies).toHaveProperty('handlebars');
    expect(packageJson.dependencies).toHaveProperty('@vscode/vsce');
    expect(packageJson.dependencies).toHaveProperty('ovsx');
    expect(packageJson.dependencies).toHaveProperty('zod');

    // Dev dependencies (may be in dependencies or devDependencies)
    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    expect(allDeps).toHaveProperty('typescript');
    expect(allDeps).toHaveProperty('@types/node');
    expect(allDeps).toHaveProperty('vitest');
    expect(allDeps).toHaveProperty('@vitest/coverage-v8');
  });

  it('should have required npm scripts', () => {
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    expect(packageJson.scripts).toHaveProperty('build:new');
    expect(packageJson.scripts).toHaveProperty('test');
    expect(packageJson.scripts).toHaveProperty('test:coverage');
    expect(packageJson.scripts).toHaveProperty('test:watch');
    expect(packageJson.scripts).toHaveProperty('dev');
  });

  it('should have correct Node.js engine requirement', () => {
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    expect(packageJson.engines.node).toBe('>=20.0.0');
  });
});
