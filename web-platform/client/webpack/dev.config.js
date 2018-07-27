const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const AutoDllPlugin = require('autodll-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const baseConfig = require('./base.config.js');

const developmentEnv = {
  NODE_ENV: JSON.stringify('development'),
  PLATFORM_ENV: JSON.stringify('web'),
  GRAPHQL_SERVER_URL: JSON.stringify('http://localhost:4000/graphql'),
  SERVER_URL: JSON.stringify('https://server.com/api')
};

module.exports = merge(baseConfig, {
  cache: true,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'static/js/bundle.js',
    publicPath: '/',
    pathinfo: true
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../dist'),
    port: 3000,
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    },
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: ['url-loader']
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      },
      {
        test: /\.(png|svg|jpg|ico|gif)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': developmentEnv
    }),
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime/runtime'
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../src/.env')
    }),
    new WebpackNotifierPlugin(),
    new HtmlWebPackPlugin({
      inject: true,
      favicon: path.join(__dirname, '../public/favicon.ico'),
      template: path.join(__dirname, '../public/index.html'),
      filename: './index.html'
    }),
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundles to index.html
      filename: 'main.js',
      path: './dll',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'redux',
          'immutable',
          'react-router-dom',
          'react-loadable',
          'connected-react-router',
          'react-apollo',
          'styled-components',
          'react-intl-redux'
        ]
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
