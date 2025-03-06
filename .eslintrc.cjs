const { configure, presets } = require('eslint-kit')

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',

  presets: [
    presets.imports({
      sort: {
        newline: true,
      },
      alias: {
        paths: {
          '@': './src',
        },
      },
    }),
    presets.node(),
    presets.prettier({
      endOfLine: 'auto',
    }),
    presets.typescript(),
    presets.react(),
    presets.effector(),
  ],

  extend: {
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
})
