const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');

config.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('dev')
    }
  })
);

module.exports = Object.assign({}, config, {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
});