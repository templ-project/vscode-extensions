import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';

/**
 * Logo Assets Validation Tests
 *
 * Ensures all required language logos exist in logos/ directory
 * with correct naming convention and format.
 */
describe('Logo Assets', () => {
  const logosDir = join(process.cwd(), 'logos');

  const requiredLogos = [
    'cpp-128.png',
    'csharp-128.png',
    'generic-essential-128.png',
    'generic-extended-128.png',
    'godot-128.png',
    'golang-128.png',
    'javascript-128.png',
    'python-128.png',
    'typescript-128.png',
  ];

  describe('Logo Files Existence', () => {
    it.each(requiredLogos)('should have logo file: %s', (logoFilename) => {
      const logoPath = join(logosDir, logoFilename);
      expect(existsSync(logoPath), `Logo file not found: ${logoPath}`).toBe(true);
    });
  });

  describe('Logo File Properties', () => {
    it.each(requiredLogos)('should have reasonable file size for %s', (logoFilename) => {
      const logoPath = join(logosDir, logoFilename);

      if (existsSync(logoPath)) {
        const stats = statSync(logoPath);
        const fileSizeKB = stats.size / 1024;

        // Logo should be under 100KB (VSCode extensions should be lightweight)
        expect(fileSizeKB).toBeLessThan(100);

        // Logo should be at least 1KB (ensures it's not empty/corrupt)
        expect(fileSizeKB).toBeGreaterThan(1);
      }
    });

    it.each(requiredLogos)('should be a PNG file: %s', (logoFilename) => {
      expect(logoFilename.endsWith('.png'), `Logo must be PNG format: ${logoFilename}`).toBe(true);
    });
  });

  describe('Naming Convention', () => {
    it('should follow {language}-128.png pattern', () => {
      for (const logoFilename of requiredLogos) {
        const pattern = /^[a-z]+(-[a-z]+)?-128\.png$/;
        expect(
          pattern.test(logoFilename),
          `Logo filename '${logoFilename}' does not match pattern {language}-128.png`,
        ).toBe(true);
      }
    });
  });

  describe('Fallback Logo', () => {
    it('should have generic fallback logo', () => {
      const genericLogoPath = join(logosDir, 'generic-128.png');
      expect(existsSync(genericLogoPath), 'Generic fallback logo (generic-128.png) not found').toBe(true);
    });
  });

  describe('Complete Language Coverage', () => {
    it('should have logos for all 9 language extension packs', () => {
      expect(requiredLogos.length).toBe(9);

      const languages = [
        'cpp',
        'csharp',
        'godot',
        'golang',
        'javascript',
        'python',
        'typescript',
        'generic-essential',
        'generic-extended',
      ];

      for (const language of languages) {
        const expectedLogoFilename = `${language}-128.png`;
        expect(
          requiredLogos.includes(expectedLogoFilename),
          `Logo for language '${language}' not in required list`,
        ).toBe(true);
      }
    });
  });
});
