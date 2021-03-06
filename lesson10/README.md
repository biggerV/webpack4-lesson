# lesson 10 : 小结与回顾

到此为止，我们已经使用webpack实现了常见的需求，让我们来总结并回顾一下我们到目前为止所学到的。

## 小结

就像我最开始说的，webpack是一个工具，他能帮助我们实现前端的工程化，自动化，我们要做的就是学会使用它，而核心就是如何配置它。

webpack模块化的结构，让它的扩展性非常强，所以有了各种loader，plugin，而这些有官方的，也有第三方开发者提供的，这也标志者配置工作将会变得非常繁琐，**你需要做的就是找到要用的loader、plugin，查看它们的文档**，以用于满足自己的需求。

## 回顾

+ 我们的前端项目面临着日益增长的代码量，所以我们需要模块化，所以我们使用`node+webpack`帮我们处理模块依赖关系和打包。

+ webpack可以不需要任何配置，你可以直接使用`webpack`命令打包，它会应用默认的配置，但是通常配置文件是必备的，默认的配置不可能满足我们所有的需求。

+ 于是我们建立了配置文件，设置了`入口、出口`，然后我们配置了mode，告诉webpack我们所处的项目环境。

+ 通常样式是前端必须的，于是我们在`module.rules`下配置规则及loader，我们使用了`css-loader`用于支持import样式到js中，`style-loader`用于创建style标签并插入到网页head中。注意它们的执行顺序和代码放置顺序是相反的。

+ 当然我们还有图片、字体等资源会用在项目中，于是我们需要`file-loader`帮我们处理它们。

+ 当项目目录增多变深时，引用模块或资源的路径会变得麻烦，比如 `../../xxx.js` 这样的路径就非常麻烦，通常我们要非常小心。于是`resolve.alias` 让我们可以以别名方式去缩短路径，非常实用。

+ sourceMap能让代码出错后，找到源码的位置，这个绝对设置不能错过。我们用`devtool:'inline-source-map'`配置开启了js的sourceMap。css的sourceMap需要到laoder里面的配置中开启。

+ 在开发时为了方便调试我们需要一个web服务器，于是我们使用了`webpack-dev-server`，开启了一个本地的服务器运行我们的项目。

+ 如果你需要运行一个静态目录内的项目，那么你可以设置`devServe.contentBase: 'folder path'`，如果你需要运行实时修改实时刷新页面查看效果的话，那么设置为 false ，并设置`devServer.hot:true` 开启热更新吧。

+ 热更新当然很方便，但是当页面模块很多时，每次更改文件都刷新页面就非常不方便，我们需要模块热更新而不是页面热更新，那么就需要使用到webpack内置插件`webpack.HotModuleReplacementPlugin`来处理。顺便把`webpack.NamedModulesPlugin`也加上吧，它会显示热更新模块的名称。

+ 为了防止每次打包都会遗留以前打包的文件，我们需要`CleanWebpackPlugin`来清除dist目录内的文件，以保证每次打包的都是只有最新的文件。

+ 当然我们不可能手动去设置HTML页面每次打包后新的JS\CSS资源名称，我们需要自动化，那么就用到了插件`HtmlWebpackPlugin`，他可以指定模板，自动更新资源路径名称和版本号，还有其他有用设置。

+ 顺便我们学习了一下什么是tree shake 摇树算法，并明白这是webpack内置标记算法，而且需要开启压缩工具如`UglifyJSPlugin`才能在打包后真正删除死代码（未引用）的代码。

+ 除了死代码需要在打包时清理掉，在生产环境，sourceMap也应该清除掉以减少代码体积以及优化运行效率，以及调试用的设置都不应该在生产环境开启，为了方便我们拆分了配置文件，分为了公共配置，开发环境配置和生产环境配置文件。在生产环境我们删除了`devtool: "inline-source-map"`，JS的sourceMap不再出现了，但是CSS的还在，于是我们又加上了一个插件`webpack.DefinePlugin`用来设置`process.env.NODE_ENV: "production"`，这样打包后CSS的sourceMap也没有了(这个设置是全局性的，插件会使用**生产环境**的默认配置)。

---
到此，webpack的使用已经走上了一个阶段。接下来我们可以更加深入的玩转webpack啦！

[home](https://github.com/biggerV/webpack4-lesson)