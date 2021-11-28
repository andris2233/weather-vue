module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  rules: {
    'no-console': 'warn',
    'no-plusplus': 0,
    'no-debugger': 'warn',
    'vue/attributes-order': 1,
    'vue/no-confusing-v-for-v-if': 2,
    "linebreak-style": 0,
    "no-restricted-syntax": 0,
    "import/no-cycle": 0,
    'no-param-reassign': ["error", { "props": false }]
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],

  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ]
};
