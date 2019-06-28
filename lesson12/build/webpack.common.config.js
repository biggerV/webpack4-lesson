const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 注意，这里使用process.env.NODE_ENV之前，需要在package.json的scripts命令里面
// 添加 NODE_ENV=development / production 才能获取到process.env.NODE_ENV的值
// 否则默认在webpack的配置文件里面是获取不到的
// 因为通过webpack.DefinePlugin设置的，在这里还没设置上
const devMod = process.env.NODE_ENV === "development"

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  module: {
    // rules加入的处理模块顺序绝对不能搞错，否则无法运行！
    // 遵循的是left out，右进左出：数组下标越低则越接近最终结果
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            // 这里不再用style-loader
            // 虽然提取了CSS到独立文件，但是此插件支持CSS热更新，非常方便（注意事项看下面的插件MiniCssExtractPlugin配置）
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 支持热更新
              hmr: devMod,
              // if hmr does not work, this is a forceful method.
              reloadAll: true
            },
          },
          // 把CSS编译成commonJS模块
          'css-loader',
          {
            // postcss依靠各种插件处理CSS，它基本是前端项目的必备CSS预处理模块
            // 但这里只用到了它最简单的功能，对于它我们后面也许会深入的探索*
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // 添加厂商样式前缀插件
                require('autoprefixer')({
                  // browserslist 根据can i use网站的数据作为规则进行添加厂商前缀
                  // 它可以根据浏览器使用率、覆盖率、版本范围、发布时间等规则进行设置，真的太强大了
                  // https://github.com/browserslist/browserslist#full-list
                  overrideBrowserslist: ['Chrome > 20', 'Firefox > 20', 'Safari >= 6', 'ie > 8']
                })
              ]
            }
          },
          // 把less编译成CSS
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 0配置，插件会自动清除output配置下的path指向的目录
    new HtmlWebpackPlugin({
      title: 'lesson 11',
      template: path.resolve(__dirname, '../src/index.html'),
      hash: true
    }),
    new MiniCssExtractPlugin({
      // 注意，在下面的配置*开发环境*的文件名应该使用[name].css，不要加hash
      // 加了hash不能热更新CSS，所以只在生产环境加hash
      filename: devMod ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMod ? '[id].css' : '[id].[hash].css'
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, '../src')
    }
  }
}