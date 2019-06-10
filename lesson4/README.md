# lesson 4 : webpack插件自动添加打包后的资源到页面模板

webpack的配置中plugins选项让你可以添加插件帮助处理打包后各种资源的自动引用。

## html-webpack-plugin

此插件也是必备的，用于帮助我们把打包后的资源自动插入到页面模板中，避免了简单的重复劳动。see
[github文档](https://github.com/jantimon/html-webpack-plugin#configuration)

## 配置处理器
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