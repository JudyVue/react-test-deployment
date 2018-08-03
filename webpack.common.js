'use strict';

require('dotenv').config();

const { DefinePlugin } = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = module.exports = {};

webpackConfig.entry = `${__dirname}/src/main.js`;

webpackConfig.output = {
  filename: '[name].[hash].js',
  path: `${__dirname}/build`,
  publicPath: process.env.CDN_URL,
};

webpackConfig.plugins = [
  new HtmlWebpackPlugin({
    title: '37 Google OAuth',
  }),
  new DefinePlugin({
    API_URL: JSON.stringify(process.env.API_URL),
    GOOGLE_OAUTH_ID: JSON.stringify(process.env.GOOGLE_OAUTH_ID).trim(),
  }),
];

webpackConfig.optimization = {
  minimizer: [
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
    }),
  ],
};

webpackConfig.module = {};

webpackConfig.module.rules = [
  {
    test: /\.(png|svg|jpg|gif)$/i,
    use: ['file-loader'],
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-0', 'react'],
        plugins: ['transform-react-jsx-source', 'transform-object-rest-spread', 'transform-class-properties', 'transform-remove-console'],
        cacheDirectory: true,
      },
    },
  },
];
