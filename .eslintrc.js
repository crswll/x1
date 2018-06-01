module.exports = {
  root: true,

  env: {
    node: true,
  },

  "extends": [
    "plugin:vue/essential",
    "@vue/standard",
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'arrow-parens': [
      'error',
      'as-needed'
    ],
    'comma-dangle': [
      'error',
      'always-multiline'
    ],
    'html-closing-bracket-newline': [],
    'vue/html-self-closing': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/html-quotes': [
      'error',
      'double'
    ],
    'vue/order-in-components': 'error'
  },
  
  parserOptions: {
    parser: "babel-eslint",
  },
}
