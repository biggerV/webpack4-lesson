# lesson 2 : webpack模块module配置样式处理器


## style-loader & css-loader

你可能一直再用这两个处理器，但是可能不知道他们的作用？

```
css-loader：用于处理JS中import进来的css   
style-loader：创建style标签并把前面处理过的Css添加到页面head里面
```

## 配置处理器到module中
```
{
  entry: ...,
  output: ...,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```
配置完毕。

注意的是style-loader要放在css-loader前面，因为webpack会从数组的 `右边-》左边` 执行处理器，这点非常重要，这是webpack的规则。所以，先执行css-loader，再执行style-loader，这样才能达到我们的目的。

运行本项目，打开页面看到的文字是红色的，成功。