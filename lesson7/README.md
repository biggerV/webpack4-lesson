# lesson 7 : 模块热更新

你也发现了，之前的自动编译更新都会刷新页面，如果是页面内容比较多那是非常不好的调试体验。

热更新是更优化的开发体验，我们修改代码，页面只更新修改的部分，这真的太棒了，幸运的是，webpack很轻松的做到了。

马上开始！

## 很简单的开启了热更新

```
devServer: {
  ...
  hot: true
},
plugins: [
  ...
  new webpack.NamedModulesPlugin(), // 显示热更新模块名称，让你知道什么模块更新了
  new webpack.HotModuleReplacementPlugin() // 热更新插件
]
```

## 还有一个要注意

入口文件 src/index.js：

```
// 必须加上这段，否则会刷新页面
// 如果用了其他loader，这个是不用加的，比如vue-loader
// loader会自动给你加上
if (module.hot) {
  module.hot.accept()
}
```
---

好了，一个简单的热更新配置就开启了，现在，免刷新页面的更新开发体验真的太棒了。

当然，我觉得有必要去了解一下热更新的插件和原理的，有空去看看吧。

后面这里也会补上一些原理说明。