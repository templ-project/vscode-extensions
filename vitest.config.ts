import templVitestConfig from '@templ-project/vitest';

export default templVitestConfig({
  include: ['tests/**/*.test.ts', 'src/**/*.spec.ts'],
  reporters: ['verbose'],
  coverage: {
    provider: 'v8',
    reporter: ['text', 'json', 'html'],
    include: ['src/**/*.ts'],
    exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    thresholds: {
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70,
    },
  },
});
