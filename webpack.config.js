/**
 * Webpack config file to create bundle and place it in the dist folder based on the node environment
 * 
 * @file webpack.config.js
 * @author Sam George
 * @since: 1.0.0
 */

const path = require('path'),
  HTMLWebpackPlugin = require('html-webpack-plugin'),
  DEVELOPMENT = 'development';

let config = {
  mode: DEVELOPMENT,
  context: path.join(__dirname, 'app'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts.js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app'),
    ],
    extensions: ['.js','.jsx'],
    enforceExtension: false
  },
  devServer: {
    inline: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    })
  ]
};

module.exports = config;