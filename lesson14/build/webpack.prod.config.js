const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common.config.js')
const webpack = require("webpack")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    }),
    // 多页面配置 每 new HtmlWebpackPlugin 一个为一个页面并配置
    // filename 必须设置为不同的名称，否则会被默认的index.html覆盖
    // chunks 指定插入的包，公共包必须要加入并放在前面
    new HtmlWebpackPlugin({
      title: 'lesson 14',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      chunks: ['runtime', 'vendor', 'app'],
      // 生产环境在上面的output.filename中应用了contenthash后，这里不需要再添加hash
      // hash: true
    }),
    new HtmlWebpackPlugin({
      title: 'home',
      filename: 'home.html',
      template: path.resolve(__dirname, '../src/index.html'),
      chunks: ['runtime', 'vendor', 'home']
    }),
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
    ],
    runtimeChunk: 'single', // 提取运行时代码为独立文件
    moduleIds: 'hashed', // vendor没有变化时名称上的哈希不变
    // 把引用node_modules下的模块单独提取打包成一个文件
    // 一般来说node_modules下的模块不会频繁发生更改，这样我们就可以提取出来，客户浏览器可以缓存这个文件，加速加载
    // 如果还有其他目录的模块可以提取，按下面设置
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
})