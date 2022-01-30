const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, '..', './.env.development'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
  })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '..', './dist'),
    hot: true,
    port: 8080,
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
};
