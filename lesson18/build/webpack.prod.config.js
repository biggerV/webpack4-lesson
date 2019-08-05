const webpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common.config.js')
const webpack = require("webpack")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// package.json => build => + MEASURE=true
const smp = new SpeedMeasurePlugin({ disable: process.env.MEASURE === "false" });

module.exports = smp.wrap(webpackMerge(webpackCommonConfig, {
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
    }),

    new CompressionWebpackPlugin({
      filename: '[path].gz[query]', // 文件名，老版本1.x插件这里是asset,现在是filename
      algorithm: 'gzip', // 默认算法gzip
      minRatio: 0.8, // 压缩比，小于这个比例的才会处理，压缩比 = 压缩后大小/压缩前大小
      threshold: 10240, // 阈值 单位 bytes 1024b = 1kb 大于这个阈值的才压缩，默认0
      deleteOriginalAssets: false // 是否删除未gz压缩的原文件，默认false
    }),

    // 我在public下放了一些演示数据，这些文件不需要webpack处理
    // 把public目录下的文件直接拷贝到dist目录，如果需要放到子目录需设置 to 路径
    new CopyWebpackPlugin([
      { from: 'public', to: '' }
    ])
  ],
  optimization: {
    // 配置了minimizer压缩选项后，webpack不会启用内置压缩插件
    // 所以一定要把JS和CSS压缩插件都配置一下
    minimizer: [
      // JS压缩 Terser支持转换es6语法，替换webpack内置的uglifyJS
      // https://github.com/webpack-contrib/terser-webpack-plugin
      // 如果不需要转换es6语法，也可以用uglifyJS压缩，但也要配置在下面
      new TerserWebpackPlugin({
        parallel: true,
        // 如果要使用terser的配置需要放在terserOptions里面
        // https://github.com/terser-js/terser
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      // CSS压缩
      new OptimizeCSSAssetsPlugin()
    ]
  }
}))