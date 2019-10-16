# lesson 5 : 使用 source map 快速调试代码

source map 让代码在chrome中调试更容易！

错误信息将指向`源码`位置而不是打包后的位置！

## JS source map

在webpack配置文件中添加，最好对比一下添加和不添加打包的区别哟！

```
devtool: 'inline-source-map'
```

## css/less source map

css/less 要另外设置了，如下：

```
{
  loader: 'css-loader',
  options: {
    sourceMap: true
  }
}
```
设置后样式不再以style标签插入到head里面，而是插入link文件到head里面。但是现在页面的样式审查时指向的是源文件了！

开发环境使用sourceMap，生产环境不要用！

[home](https://github.com/biggerV/webpack4-lesson)