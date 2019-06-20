const webpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common.config.js')
const webpack = require("webpack")

module.exports = webpackMerge(webpackCommonConfig, {
  // mode 模式不设置的话默认是production，会压缩优化代码，development不压缩但会优化代码，none不压缩不优化
  mode: 'production', //development, production, none
  plugins: [
    new webpack.DefinePlugin({
      // 一定要在生产环境设置下面这个参数，打包会自动删除css sourceMap
      // 而不需要设置css-loader的option.sourceMap为false，
      // 这让我们可以只在common配置里面配置css相关loader，并只在dev环境有sourceMap，
      // 简化了我们的配置
      // 事实上所有插件都会检查这个参数，如果是production将会生成适用于生产环境的代码，精简是其中之一特点

      //注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。
      // 通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production')。
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})