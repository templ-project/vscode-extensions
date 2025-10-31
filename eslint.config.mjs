import templEslintConfig from '@templ-project/eslint';

export default [
  {
    ignores: [
      '.project.md',
      '**/.specs/**/*',
      '**/node_modules/**/*',
      '**/venv/**/*.*',
      '**/vitest.config.js',
      '**/dist/**/*',
      '**/coverage/**/*',
      '*.vsix',
      'tmp.*',
      '**/tmp',
      '*.tmp',
      '*.md',
    ],
  },
  ...templEslintConfig,
];
