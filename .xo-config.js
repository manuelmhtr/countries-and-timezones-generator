module.exports = {
  prettier: true,
  space: true,
  globals: [
    // chai/mocha
    "after",
    "afterEach",
    "before",
    "beforeEach",
    "describe",
    "expect",
    "it",

    // countries-and-timezones-generator
    "TestUtils",
  ],
  rules: {
    "import/extensions": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/prefer-module": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        "allowList": {
          "dst": true,
          "Dst": true,
        }
      }
    ]
  }
};
