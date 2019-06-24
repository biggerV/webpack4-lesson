# lesson 11 : 抽取CSS样式为单独文件并压缩

截至目前为止，我们的CSS样式都是被打包进JS文件中的，这不是什么错误的做法，甚至于这样做有利于减少http请求，加快网页加载速度。

但是当项目比较大的时候，这样打包出来的JS文件体积会很大，可能会超过5MB甚至10MB，这真的太大了，初次加载这么大的文件会非常耗时。提取CSS到单独文件并压缩是个不错的主义。

也就是说，提取CSS样式不是必须的，小项目（打包后1MB以内，I think）没必要提取，大的项目才有必要。

## mini-css-extract-plugin VS extract-text-webpack-plugin

`extract-text-webpack-plugin`不再支持webpack4，而且不再更新，所以，我们使用替代方案`mini-css-extract-plugin`。

首先，我们不再使用style-loader来插入CSS到页面，而是用MiniCssExtractPlugin.loader来替代

### module.rules配置

```
{
  // 这里不再用style-loader
  // 虽然提取了CSS到独立文件，但是此插件支持CSS热更新，
  // 非常方便（注意事项看下面的插件MiniCssExtractPlugin配置）
  loader: MiniCssExtractPlugin.loader,
  options: {
    // 支持热更新
    hmr: devMod,
    // if hmr does not work, this is a forceful method.
    reloadAll: true
  },
}
```

### plugins配置

```
new MiniCssExtractPlugin({
  // 注意，在下面的配置*开发环境*的文件名应该使用[name].css，不要加hash
  // 加了hash不能热更新CSS，所以只在生产环境加hash
  filename: devMod ? '[name].css' : '[name].[hash].css',
  chunkFilename: devMod ? '[id].css' : '[id].[hash].css'
})
```

到此，CSS已经被抽取成一个独立的文件了。这对于开发环境来说，已经没问题了。

## 生产环境压缩CSS

### optimize-css-assets-webpack-plugin

webpack提供了一个设置选项optimization来配置压缩工具，而不是在plugins里面配置！

```
optimization: {
  // 配置了minimizer压缩选项后，webpack不会启用内置压缩插件
  // 所以一定要把JS和CSS压缩插件都配置一下
  minimizer: [
    // CSS压缩
    new OptimizeCSSAssetsPlugin(),

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

  ]
}
```

至此，CSS的抽取和压缩就完成了。

###  terser-webpack-plugin

同时上面也加入了一个压缩JS的插件`terser`，原因就如注释里面所说，这个是比uglifyJS更优化的插件。事实上如果你查看它的文档也会看到，terser继承自uglifyJS，所以很多接口都是相同的。

### one more thing

```
// 注意，这里使用process.env.NODE_ENV之前，需要在package.json的scripts命令里面
// 添加 NODE_ENV=development / production 才能获取到process.env.NODE_ENV的值
// 否则默认在webpack的配置文件里面是获取不到的
// 因为通过webpack.DefinePlugin设置的，在这里还没设置上
const devMod = process.env.NODE_ENV === "development"
```
```
"start": "cross-env NODE_ENV=development webpack-dev-server --config ./build/webpack.dev.config.js --open",
"build": "cross-env NODE_ENV=production webpack --config ./build/webpack.prod.config.js
```

这里又添加了一个新的包cross-env，用于命令的跨平台。





