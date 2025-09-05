import templEslintConfig from '@templ-project/eslint';

export default [
  {
    ignores: ['**/node_modules/**/*', '**/venv/**/*.*', '**/vitest.config.js', 'tmp.*', '**/tmp', '*.tmp'],
  },
  ...templEslintConfig,
];
