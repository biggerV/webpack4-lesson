# lesson 9 : 多环境配置

我们的项目通常运行在开发环境、测试环境、生产环境等不同的环境中，对于不同的环境必定需要不同的打包配置。

下面我们来做到在开发、生产环境进行区分。

## webpack-merge插件

请安装此插件，用于快速智能的合并配置。

```
npm install webpack-merge -D
```

## 配置文件拆分

现在我们将build目录下的配置文件分为三个:

```
common：共有的配置
dev：   开发环境才有的
prod：  生产环境才有的
```

通常我们在开发环境需要调试相关的功能，所以我们会有热更新、sourceMap、web服务器等功能。

而在生产环境，我们不需要上面提到的，我们希望得到的是优化压缩后的代码，那么我们用到了webpack内置的插件DefinePlugin：

```
new webpack.DefinePlugin({
  // 一定要在生产环境设置下面这个参数，打包会自动删除css sourceMap
  // 而不需要设置css-loader的option.sourceMap为false，
  // 这让我们可以只在common配置里面配置css相关loader，并只在dev环境有sourceMap，
  // 简化了我们的配置
  // 事实上所有插件都会检查这个参数，如果是production将会生成适用于生产环境的代码，精简是其中之一特点
  'process.env.NODE_ENV': "production"
})
```

最后，剩下的都是公共的配置，我们把公共的配置引入开发和生产配置，并通过webpack-merge插件进行merge配置。

## 配置package.json的scripts

现在配置一下打包脚本，如下：

```
"start": "webpack-dev-server --config ./build/webpack.dev.config.js --open",
"build": "webpack --config ./build/webpack.prod.config.js"
```

现在我们成功的区分了开发和生产环境，webpack打包配置更加完善了。

[home](https://github.com/biggerV/webpack4-lesson)





