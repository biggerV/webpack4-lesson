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
    hot: true,
    noInfo: true,
    proxy: {
      '/v2': {
        target: 'https://api.douban.com', // 将本地http://localhost地址代理到此地址上
        changeOrigin: true, // 改变请求主机地址，设置为true变为target的地址，false则为localhost，一般设置为true，否则服务器可能会拒绝访问
        secure: false // https下如果证书无效时，需要设置为false，否则devServer会拒绝接收，但是如果证书有效的话设置true/false都可以
      }
    }
  }
})