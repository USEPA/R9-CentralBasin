const ArcGISPlugin = require('@arcgis/webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
// const stencil = require('@stencil/webpack');

const path = require('path');

module.exports = function build(env, arg) {
  const config = {
    entry: {
      index: ['./src/css/index.css', '@babel/polyfill', './src/index.ts'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      chunkFilename: 'chunks/[id].js',
      publicPath: ''
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3001,
      writeToDisk: true,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.html$/,
          type: 'asset/resource',
          exclude: /node_modules/,
        },
        {
          test: /\.(ttf|eot|svg|png|jpg|gif|ico|wsv|otf|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            }
          ],
        },
      ],
    },
    optimization: {
      minimize: arg.mode === 'production',
      splitChunks: { minChunks: Infinity, chunks: 'all' },
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
        new CssMinimizerPlugin()
      ],
      runtimeChunk: {
        name: 'runtime',
      },
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css',
      }),

      new ArcGISPlugin({
        locales: ['en']
      }),

      new HtmlWebPackPlugin({
        title: 'ArcGIS Template Application',
        template: './src/index.ejs',
        filename: './index.html',
        favicon: './src/assets/favicon.ico',
        chunksSortMode: 'none',
        inlineSource: '.(css)$',
        mode: arg.mode,
        minify: false,
      }),

      new HtmlWebPackPlugin({
        template: './src/oauth-callback.html',
        filename: './oauth-callback.html',
        chunksSortMode: 'none',
        inject: false,
      }),

      // new stencil.StencilPlugin(),
    ],
    resolve: {
      modules: [
        path.resolve(__dirname, '/src'),
        path.resolve(__dirname, 'node_modules/')
      ],
      extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
    },
  };

  if (arg.mode === 'production') {
    config.devtool = 'source-map';
    config.plugins.push(
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
    );
  }

  if (arg.mode === "development") {
    config.devtool = "source-map";
  }
  return config;
};
