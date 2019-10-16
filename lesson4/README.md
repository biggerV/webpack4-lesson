# lesson 4 : webpack插件自动添加打包后的资源到页面模板

webpack的配置中plugins选项让你可以添加插件帮助处理打包后各种资源的自动引用。

## html-webpack-plugin

此插件也是必备的，用于帮助我们把打包后的资源自动插入到页面模板中，避免了简单的重复劳动。see
[github文档](https://github.com/jantimon/html-webpack-plugin#configuration)

## 配置插件
```
{
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'lesson 4 - html-webpack-plugin',
      template: path.resolve(__dirname, '../src/index.html'),
      hash: true
    })
  ]
}
```

可以看到我们在src目录下提供了一个index.html模板页面，里面不再手动引入打包后的js文件，而是让插件帮我们去做。

在模板中我们可以通过 `htmlWebpackPlugin.options ` 读取配置信息显示于页面。

如果我们有多个入口文件，那么在打包输出文件时可以通过 `[name]` 自动生成对应入口配置的key为文件名前缀。

`hash`设置为true意味着我们每次打包后插入页面的资源都会自动带上哈希值，以刷确保浏览器访问的时候是最新的文件，而不是缓存。

更多用法后面逐步加入。

## clean-webpack-plugin 清除dist目录

事实上，dist目录如果一直不做清除意味着垃圾文件可能不断增长。这个插件来帮忙了。

```
plugins: [
  new CleanWebpackPlugin()
  ...
]
```

0配置的插件使用体验非常好，插件会自动清除output配置下的path指向的目录，也就是dist目录，这样我们就能得到一个干净的产品。

要注意的是，webpack官方文档的指南用例已经过期了，新的插件按照他的方式使用将会报错，无法使用哟。因为引入插件要这样：

`const { CleanWebpackPlugin } = require('clean-webpack-plugin')` 

而不是

const CleanWebpackPlugin = require('clean-webpack-plugin')

值得一提的是，plugins里面的插件放置的顺序并没有先后之分，和loader的有些不一样。因为插件内部处理的方式是通过监听webpack的打包生命周期的钩子来处理的。所以，是和Webpack的生命周期有关，和插件放置顺序无关。

[home](https://github.com/biggerV/webpack4-lesson)