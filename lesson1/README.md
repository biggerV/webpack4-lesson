# lesson 1 : webpack基本用法

webpack安装

npm install webpack webpack-cli -D

你会得到最新版本的webpack

## webpack4可以不需要配置文件

也就是说，你可以使用默认的配置运行webpack，但是文件结构上你要注意不是随便乱写都可以，你可以参考本节课的源码结构，去掉配置运行webpack也是可以打包的，打包后的文件放在 dist/main.js


## 更多情况下配置文件是必备的

标准的做法是增加一个webpack.config.js配置文件，你可以把他放在任何位置，当然如果你需要根据项目环境添加不一样配置的话，可以建立一个专门的目录放置，如本项目，方便管理和拓展。

现在请打开本项目的build/webpack.config.js配置文件，其实配置文件就是一个Object对象，使用键值对的方式配置，最基本的你应该包含两个键值:entry入口文件 & output打包后的文件目录和名称，然后你就可以开始尝试webpack之旅了。

在本项目下执行npm run build尝试打包

默认情况下webpack会应用其内置的用于production的配置，所以你看到打包后的文件是经过了压缩和优化的。开发环境下我们可能需要的是未经压缩的方便调试，那么增加一个mode: "development" 或 mode: "none" 即可。

[home](https://github.com/biggerV/webpack4-lesson)