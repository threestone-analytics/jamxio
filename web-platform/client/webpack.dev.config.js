const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackNotifier = require('webpack-notifier');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  cache: true, // for rebuilding faster
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'static/js/bundle.js',
    publicPath: '/',
    pathinfo: true,
  },
  module: {
    noParse: [/.*(fs\.js).*/],
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|gif|ttf|woff|woff2)$/,
        use: ['url-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { name: 'image/[name]-[hash:8].[ext]' },
          },
        ],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: 'dist',
    port: 3000,
    hot: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    compress: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime/runtime',
    }),
    new Dotenv({
      path: path.resolve(__dirname, './src/.env'),
    }),
    new webpackNotifier(), // eslint-disable-line
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        PLATFORM_ENV:  JSON.stringify('web'),
        GRAPHQL_SERVER_URL:  JSON.stringify('http://localhost:4000/graphql'),
        SERVER_URL:  JSON.stringify('http://localhost:3001/api'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
});
