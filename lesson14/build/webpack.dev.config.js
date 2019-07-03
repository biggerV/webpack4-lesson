const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common.config.js')
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = webpackMerge(webpackCommonConfig, {
  // mode 模式不设置的话默认是production，会压缩优化代码，development不压缩但会优化代码，none不压缩不优化
  mode: 'development', //development, production, none
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    // 多页面配置 每 new HtmlWebpackPlugin 一个为一个页面并配置
    // filename 必须设置为不同的名称，否则会被默认的index.html覆盖
    // chunks 指定插入的包
    new HtmlWebpackPlugin({
      title: 'lesson 14',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      chunks: ['app'],
      hash: true
    }),
    new HtmlWebpackPlugin({
      title: 'home',
      filename: 'home.html',
      template: path.resolve(__dirname, '../src/index.html'),
      chunks: ['home'],
      hash: true
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: false,
    hot: true
  }
})