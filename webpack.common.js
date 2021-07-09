const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PnpPlugin = require('pnp-webpack-plugin');
const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const getPath = (_path) => path.resolve(__dirname, _path);

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './src/index.html',
  title: 'hello!',
});

const copyWebpackPlugin = new CopyWebpackPlugin({ patterns: [{ from: getPath('./assets') }] });

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2020',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [PnpPlugin],
  },
  output: {
    filename: 'bundle.[contenthash].js',
    path: getPath('dist'),
    clean: true,
  },
  plugins: [htmlWebpackPlugin, copyWebpackPlugin],
  optimization: {
    minimizer: [new ESBuildMinifyPlugin({ target: 'es2020' })],
  },
};
