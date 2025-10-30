import templEslintConfig from '@templ-project/eslint';

export default [
  {
    ignores: [
      '.project.md',
      '**/node_modules/**/*',
      '**/venv/**/*.*',
      '**/vitest.config.js',
      '**/dist/**/*',
      '**/coverage/**/*',
      '*.vsix',
      'tmp.*',
      '**/tmp',
      '*.tmp',
    ],
  },
  ...templEslintConfig,
];
