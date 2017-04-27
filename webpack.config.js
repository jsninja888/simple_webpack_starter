const { resolve, path } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');



const isProd = process.env.NODE_ENV === 'production';
const cssDev =  ['style-loader', 'css-loader', 'sass-loader'];
const cssProd =  ExtractTextPlugin.extract({
   fallback: "style-loader",
   use: ['css-loader', 'sass-loader']
});

const checkENV =  isProd ? cssProd: cssDev;

const extractCssPlugin = new ExtractTextPlugin({
  filename: 'app.css',
  disable: !isProd,
  allChunks: true
});


const extractHtmlPlugin = new HtmlWebpackPlugin({
  title: 'Demo Project',
  minify: {
    collapseWhitespace: true
  },
  hash: true,
  template: './index.pug'
});

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: './app.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    hot: true,
    stats: "errors-only",
    compress: true,
    open: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.sass/,
        use: checkENV
      },
      {
        test: /\.pug/,
        use: ['html-loader', 'pug-html-loader']
      }
    ]
  },
  plugins: [
    extractHtmlPlugin,
    extractCssPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]

};

// ExtractTextPlugin.extract({
//   fallback: "style-loader",
//   use: ['css-loader', 'sass-loader']
// })