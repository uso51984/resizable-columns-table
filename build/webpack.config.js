const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
  new HtmlWebpackPlugin({
    title: 'resizeable-columns',
    template: './build/index.template.html',
    filename: 'index.html',
    chunks: ['app', 'vendor'],
    inject: 'body'
  })
];

module.exports = {
  context: process.cwd(),
  entry: {
    vendor: ['react', 'react-dom'],
    app: ['./demo/app.jsx'],
  },
  plugins,
  resolve: {
    modules: [
      './src',
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.less']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['env', 'stage-2', 'react'],
          plugins: ['transform-runtime'],
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=8192&name=img/[hash].[ext]',
        exclude: /node_modules/
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  }
};
