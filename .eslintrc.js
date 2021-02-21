module.exports = {
  plugins: [
    "react-hooks"
  ],
  parser: 'babel-eslint',
  extends: [
    'airbnb',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    'react/prefer-stateless-function': ['error', {'ignorePureComponents': true}],
    'react/forbid-prop-types': 'off',
    'no-underscore-dangle': 'off',
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
    'react/no-multi-comp': 'off',
    'no-return-assign': 'off',
    'no-use-before-define': 'off',
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  overrides: [
    {
      files: [ 'src/**' ],
      rules: {
        'unicorn/filename-case': 'off',
        'no-return-assign': 'off',
        'react/jsx-wrap-multilines': 'off',
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
      }
    }
  ]
}