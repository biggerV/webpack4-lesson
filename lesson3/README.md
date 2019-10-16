# lesson 3 : webpack处理图片资源


## file-loader

这个也是必备的loader，它用于处理图片等文件资源。

```
它会处理import进JS文件和通过 url(xxx) 引入CSS中的图片
它会重命名图片，并把图片复制到output目录，并替换引用改图片的地址为处理后的URL
```

## 配置处理器到module中
```
{
  entry: ...,
  output: ...,
  module: {
    rules: [
      ... ...
      {
        test: /\.(png|jpg|gif)/,
        use: ["file-loader"]
      }
    ]
  }
}
```

在本项目下执行npm run build尝试打包

打开dist/index.html页面看到了文字下的背景图片（平铺）和一个单独一行的图片，成功了。

---
one more thing...

如果你发现了这里图片资源的引入地址里面，有一个@符号，那么恭喜你，你多学了一个知识。

在webpack.config.js配置文件里面，我们有这么一个配置

```
module: { ... },
resolve: {
  alias: {
    "@": path.resolve(__dirname, '../src')
  }
}
```
resolve 是设置webpack如何解析模块，它有很多配置选项，这里我们只看alias（别名）

通过alias我们可以设置一个路径的别名，可以看作是快捷路径，写更少的代码去引用模块，减少出错几率。我真的非常喜欢这个功能，你也可以看到vue.js的模板项目也使用了这个功能。

JS文件内

使用前：import avaterUrl from '../assets/avatar.jpg'
使用后：import avaterUrl from '@/assets/avatar.jpg'

CSS文件内：

使用前：url(../assets/avatar.jpg)
使用后：url(~@/assets/avatar.jpg)

没什么大不了，不是吗？

但是CSS内使用你应该这样 ~@ 写，而不是直接写 @ , ~这个符号让css-loader不要解析这个资源为 ./@/xxx，而是保持原样@/xx以便webpack去处理这个别名。否则会报错提示css-loader找不到此（./@/xxx）模块，是的，的确是这样。我想这一段才是本文的重点。

我们又向前迈近了一步。

[home](https://github.com/biggerV/webpack4-lesson)