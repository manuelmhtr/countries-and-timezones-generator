const config = {
  prettier: true,
  space: true,
  parser: '@typescript-eslint/parser', // Workaround for import attributes -- https://github.com/xojs/xo/issues/727
  globals: [
    // Chai/mocha
    'after',
    'afterEach',
    'before',
    'beforeEach',
    'describe',
    'expect',
    'it',

    // Countries-and-timezones-generator
    'TestUtils',
  ],
  rules: {
    'import/extensions': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          dst: true,
          Dst: true,
        },
      },
    ],
  },
};

export default config;
