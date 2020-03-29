
/* Utils */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

/* Webpack Plugins */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const ROOT = path.resolve(__dirname, ".");
const CACHE_DIR_PATH = path.resolve(ROOT, ".", "node_modules", ".cache");
const POSTCSS_CONFIG_PATH = path.resolve(ROOT, "./postcss.config.js");

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
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {cacheDirectory: path.resolve(CACHE_DIR_PATH, "babel")}
        }],
      }, {
        test: /\.(css|scss|sass)$/,
        use: [{
          loader: IS_PRODUCTION
            ? MiniCssExtractPlugin.loader : "style-loader",
        }, {
          loader: "css-loader",
          options: {sourceMap: true, importLoaders: 1},
        }, {
          loader: "postcss-loader",
          options: {sourceMap: true, config: {path: POSTCSS_CONFIG_PATH}},
        }, {
          loader: "resolve-url-loader",
          options: {sourceMap: true},
        }, {
          loader: "sass-loader",
          options: {sourceMap: true}
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
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {name: "[hash:12].[ext]", outputPath: `${OUTPUT_PATH}/img`},
        }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: ['node_modules'],
    alias: {
      "components": path.resolve(ROOT, "./src/client/components"),
      "common": path.resolve(ROOT, "./src/client/common"),
    }
  },
};

const development = {
  mode: 'development',
  output: {
    path: OUTPUT_PATH,
    publicPath: 'http://localhost:3000/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    pathinfo: true,
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3000,
    hot: true,
    overlay: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './static/index.html',
      filename: 'index.html',
      minify: false,
    }),
  ],
};

/* Production Webpack Config */
const production = {
  mode: 'production',
  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
    filename: `[name].bundle.min.js`,
    chunkFilename: `[name].chunk.min.js`,
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
    moduleIds: "hashed",
    splitChunks: {
      chunks: 'async',
      maxInitialRequests: Infinity,
      minSize: 0,
      automaticNameDelimiter: ".",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
  plugins: [
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name].style.min.css`,
    }),
    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: "static",
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: `bundle.report.html`,
    }),
  ],
};

module.exports = (IS_PRODUCTION)
  ? merge(common, production)
  : merge(common, development);
