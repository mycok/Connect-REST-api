module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-underscore-dangle": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "no-useless-escape": "off",
    "prefer-arrow-callback": "off",
    "consistent-return": "off",
    "no-restricted-syntax": "off",
    "class-methods-use-this": "off",
    "eqeqeq": "off"
  },
};
