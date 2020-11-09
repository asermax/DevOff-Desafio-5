module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  plugins: [
    'react',
    'react-hooks',
  ],
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx'],
        map: [
          ['~', './'],
        ],
      },
    },
  },
  rules: {
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    'no-underscore-dangle': ['error', { allow: ['__'] }], // ramda's placeholder
    indent: ['error', 2, { ignoredNodes: ['TemplateLiteral'] }], // babel-eslint error
    'template-curly-spacing': 'off', // babel-eslint error
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off', // new jsx transform
    'react/react-in-jsx-scope': 'off', // new jsx transform
  },
};
