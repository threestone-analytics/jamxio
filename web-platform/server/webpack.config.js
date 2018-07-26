const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: `index.js`,
    publicPath: 'https://localhost:4000',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-raw-loader',
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, './src/.env')
    })],
  devtool: 'source-map',
  resolve: {
    mainFields: ['main', 'module'],
    extensions: ['.js', '.mjs'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  target: 'node',
  externals: [nodeExternals()],
};
