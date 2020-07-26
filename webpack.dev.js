const { resolve } = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [resolve(__dirname, './entry.js')],
  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
        exclude: /node_modules/ },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Boilerplate",
      template: resolve(__dirname, './index.html'),
    }),
  ],
  // devtool: 'inline-source-map',
mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    hot: false,
    historyApiFallback: false
  },
}
