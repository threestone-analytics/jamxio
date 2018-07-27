const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const eslintFormatter = require('react-dev-utils/eslintFormatter');
const baseConfig = require('./base.config.js');

const prodEnv = {
  MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN),
  IDENTITY_POOL_NAME: JSON.stringify(process.env.IDENTITY_POOL_NAME),
  IDENTITY_POOL_ID: JSON.stringify(process.env.IDENTITY_POOL_ID),
  IDENTITY_POOL_REGION: JSON.stringify(process.env.IDENTITY_POOL_REGION),
  DOCUMENTS_BUCKET_NAME: JSON.stringify(process.env.DOCUMENTS_BUCKET_NAME),
  NODE_ENV: JSON.stringify('production'),
  PLATFORM_ENV: JSON.stringify('web'),
  GRAPHQL_SERVER_URL: JSON.stringify(
    'https://cbjnbxp93j.execute-api.us-east-1.amazonaws.com/prod/graphql'
  ),
  SERVER_URL: JSON.stringify('https://server.com/api')
};

const stagingEnv = {
  NODE_ENV: JSON.stringify('staging'),
  PLATFORM_ENV: JSON.stringify('web'),
  GRAPHQL_SERVER_URL: JSON.stringify('http://localhost:4000/graphql'),
  SERVER_URL: JSON.stringify('https://staging-server.com/api')
};

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../dist'),
    chunkFilename: 'static/js/[name]-[chunkhash].bundle.js',
    filename: 'static/js/[name].[chunkhash].js'
  },
  devtool: 'none',
  stats: {
    // Less Verbose
    entrypoints: false,
    children: false
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint')
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: path.join(__dirname, '../src')
      },
      {
        oneOf: [
          {
            test: /\.(png|svg|jpg|ico|gif)$/,
            include: path.join(__dirname, '../src'),
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:8].[ext]',
              publicPath: '/static/media',
              outputPath: '/static/media'
            }
          },
          {
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, '../src'),
            loader: require.resolve('babel-loader'),
            exclude: /node_modules/,
            options: {
              compact: true
            }
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader',
            options: {
              limit: 10000,
              publicPath: '/static/media',
              outputPath: '/static/media'
            }
          },
          {
            test: /\.css$/,
            use: [
              ExtractCssChunks.loader,
              { loader: 'css-loader' },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    postcssPresetEnv(),
                    require('postcss-flexbugs-fixes'), // eslint-disable-line
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9' // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                      grid: true
                    })
                  ]
                }
              }
            ]
          },
          {
            test: /\.(scss)$/,
            include: path.resolve(__dirname, '../src'),
            exclude: /node_modules/,
            use: [
              ExtractCssChunks.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true,
                  publicPath: path.resolve(__dirname, '../dist')
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'), // eslint-disable-line
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9' // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              },
              {
                loader: require.resolve('sass-loader')
              }
            ]
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          ecma: 6,
          output: {
            comments: false
          },
          compress: {
            dead_code: true,
            comparisons: false,
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: process.cwd() }),
    new webpack.DefinePlugin({
      'process.env': process.env.NODE_ENV === 'production' ? prodEnv : stagingEnv
    }),
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime/runtime'
    }),
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      filename: './index.html',
      hash: true,
      inlineSource: '/static/js/runtime~.+\\.js',
      favicon: path.join(__dirname, '../public/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifySCSS: true,
        minifyURLs: true
      }
    }),
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundles to index.html
      filename: '[name]_[hash].js',
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
    new SWPrecacheWebpackPlugin(),
    new InlineSourcePlugin(),
    new ExtractCssChunks({
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[id].[hash].css'
    }),
    new WebpackPwaManifest({
      name: 'Boilerplate Web Client',
      short_name: 'Boilerplate',
      inject: 'true',
      description: 'My awesome Progressive Web App!',
      start_url: './index.html',
      display: 'standalone',
      theme_color: '#000000',
      background_color: '#ffffff',
      icons: [
        {
          src: path.resolve('public/ios-icon.png'),
          sizes: [120, 152, 167, 180, 1024],
          destination: 'static/icons/ios',
          ios: true
        },
        {
          src: path.resolve('public/ios-icon.png'),
          size: 1024,
          destination: 'static/icons/ios',
          ios: 'startup'
        },
        {
          src: path.resolve('public/android-icon.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
          destination: 'static/icons/android'
        }
      ]
    })
  ]
});
