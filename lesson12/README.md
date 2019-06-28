# lesson 12 : 应用样式预编译器less、postcss

事实上，我们要说的是基于它们的loader。

## less-loader

需要安装less 和 less-loader。

less是我一直非常喜欢的CSS预编译器，它非常简单好用，具体怎么用不在这里的解说范围。

它的功能就是把less编译成CSS。注意它的位置。

```
mudule: {
  rules: [
    ...
    // 把less编译成CSS
    'less-loader'
  ]
}
```

## postcss-loader

postcss依靠各种插件处理CSS，它基本是前端项目的必备CSS预处理模块

但这里只用到了它最简单的功能，对于它我们后面也许会深入的探索*

less-loader把less编译为css后，就进入了postcss-loader的处理

我们这里只是让它和它的插件autoprefixer帮我们自动添加厂商前缀。

```
{
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
```

------

它们都是loader，使用也非常简单，但是注意要把`package.json`里面的`sideEffects`选项添加上*.less适配

起初我应用less时，打包后less文件内写的内容都被删除了，无法打包进去，后来我意识到，是sideEffects里面没有配置less为副作用文件，所以他被webpack认为无用而被标记并被压缩工具删除了。

我得记得这个配置吖！
