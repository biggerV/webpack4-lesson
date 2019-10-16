const webpackMerge = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common.config.js')
const webpack = require("webpack")

module.exports = webpackCommonConfig.map(config => {
  return webpackMerge(config, {
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

      // noInfo 什么信息都不输出到控制台，不推荐
      // noInfo: true,

      // stats 可以控制什么信息输出到控制台，推荐！
      // 配置值 errors-only、errors-warnings、minimal、none、normal、verbose 输出的信息依次增多
      // 除了上面的预定值，还可以更细粒度的配置，详细： https://webpack.js.org/configuration/stats/
      // stats: 'minimal',

      proxy: {
        '/v2': {
          target: 'https://api.douban.com', // 将本地http://localhost地址代理到此地址上
          changeOrigin: true, // 改变请求主机地址，设置为true变为target的地址，false则为localhost，一般设置为true，否则服务器可能会拒绝访问
          secure: false, // https下如果证书无效时，需要设置为false，否则devServer会拒绝接收，但是如果证书有效的话设置true/false都可以
          // pathRewrite: {"^/v2": ""} // 地址重写 如果API地址和本地地址有所不同，可以通过这个替换地址中的匹配项
        }
      }
    }
  })
})