
/* Utils */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

/* Webpack Plugins */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const OUTPUT_PATH = path.resolve(__dirname, './static');
const IS_PRODUCTION = (process.env.NODE_ENV === 'production');

/**
 * Common Webpack Config
 */
const common = {
  entry: './src/client/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      }, {
        test: /\.(css)$/,
        use: [{
          loader: IS_PRODUCTION
            ? MiniCssExtractPlugin.loader : 'style-loader',
        }, {
          loader: 'css-loader',
          options: { sourceMap: true, importLoaders: 1 },
        }],
      }, {
        test: /\.(woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[hash:12].[ext]',
            outputPath: OUTPUT_PATH,
            useRelativePath: true,
          },
        }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),
    new HtmlWebpackPlugin({
      template: './static/index.html',
      filename: 'index.html',
      minify: false,
    }),
  ],
  resolve: {
    modules: ['node_modules'],
  },
};

const development = {
  mode: 'development',
  output: {
    path: OUTPUT_PATH,
    publicPath: 'http://localhost:3000/',
    filename: '[name].bundle.min.js',
    chunkFilename: '[name].chunk.min.js',
    pathinfo: true,
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3000,
    overlay: true,
  },
};

/* Production Webpack Config */
const production = {
  mode: 'production',
  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
    filename: '[name].bundle.min.js',
    chunkFilename: '[name].chunk.min.js',
    pathinfo: true,
  },
  devtool: false,
  performance: { hints: false },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          output: { comments: false },
          compress: { drop_console: true },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'async',
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minSize: 15000, // bytes
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].style.min.css',
    }),
  ],
};

module.exports = (IS_PRODUCTION)
  ? merge(common, production)
  : merge(common, development);
