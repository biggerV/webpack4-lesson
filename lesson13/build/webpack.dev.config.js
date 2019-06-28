const webpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common.config.js')
const webpack = require("webpack")

module.exports = webpackMerge(webpackCommonConfig, {
  // mode 模式不设置的话默认是production，会压缩优化代码，development不压缩但会优化代码，none不压缩不优化
  mode: 'development', //development, production, none
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: false,
    hot: true
  }
})