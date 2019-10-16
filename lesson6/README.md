# lesson 6 : webpack-dev-server 本地开发服务器

这个是webpack必备的模块！他真的太强悍了。

## 我要动态更新的

它有很多配置选项，我这里只配置一个选项，告诉webpack-dev-serser我不需要服务器运行我的静态文件！我要的自动编译更新代码到浏览器！

相反，如果你想要服务器读取静态文件并运行（比如已经打包好的dist目录文件！），给contentBase设置一个目录即可！

```
devServer: {
  contentBase: false
}
```

## package.json 添加运行脚本

```
"start": "webpack-dev-server --config ./build/webpack.config.js --open"
```

--open 配置意味着首次运行脚本会自动打开浏览器运行你的项目！

现在，npm start 开始跑起来，然后修改js或css，看看浏览器是不是自动更新生效了！

webpack-dev-server拥有非常多的配置选项，see [文档](https://www.webpackjs.com/configuration/dev-server/)

更多用法后面慢慢加。

[home](https://github.com/biggerV/webpack4-lesson)