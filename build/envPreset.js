const presets = require('babel-preset-latest');

const BABEL_ENV = process.env.BABEL_ENV;

module.exports = {
  presets: [
    [presets, {
      es2015: {
        loose: true,
        modules: BABEL_ENV === 'es' ? false : 'commonjs'
      }
    }]
  ]
};