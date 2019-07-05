# lesson 15 : 小结与回顾

lesson 11 - 14 主要涉及了优化打包和加载及引入样式预处理工具。这些优化对项目起到了非常好的写代码体验和用户体验。

## 小结

+ 把CSS样式抽取出来为单独文件，并压缩，我们使用了`mini-css-extract-plugin`，同时注意配置，开发环境文件名称不要加hash，否则无法热更新。

+ 同时，sytle-loader更改为`MiniCssExtractPlugin.loader`，因为样式已经被提取，同时我们开发环境需要样式热更新。

+ 生产环境，我们使用`optimize-css-assets-webpack-plugin`对CSS进行压缩处理，配置在`optimization.minimizer`下。

+ 用原生CSS当然没问题，但是不COOL，我们使用更现代的less并加入预处理工具转换代码，我们引入了`less`及`less-loader`。

+ 浏览器厂商对新版本样式的支持各不相同，CSS2,CSS3等都是在标准出来之前，厂商就自主对一些新特性进行了支持，不过添加了前缀以作区分。手动添加工作量太大，我们使用`postcss`的插件`autoprefixer`在`browserslist`的规则下帮我们自动添加。我们引入了`postcss-loader`。postcss真牛，他有自己的插件系统和生态，所以能做的事情很多，添加厂商前缀只是它的其中一个插件而已。

+ 我们使用es5以上版本的JS写代码已经习以为常，这是因为babel为我们做了无与伦比的转换工作。同样，我们引入`babel-loader`，对es6以上的代码进行转换为`browserslist`设置的适合浏览器规则运行的代码。同时我们把在`package.json`上添加了`browserslist`选项，已达到统一配置的目的。

+ 接着我们为babel添加了插件`@babel/plugin-transform-runtime`用于提取运行时，减少代码体积。

+ 但是babel只是转换es语法，对于原生接口比如`Promise，async`等并不会处理，于是我们需要polyfill以支持低版本浏览器运行，我们使用core-js作为polyfill，增加`@babel/preset-env`，用于设置预设环境（根据`browserslist`），`useBuiltIns`选项使polyfill能够在预设环境中进行**按需（浏览器规则列表）打包**以控制打包体积！

+ 最后，我们配置了多页面打包。多页面意味着多入口，于是entry增加了一个入口。

+ 增加一个页面就`new HtmlWebpackPlugin`多一个实例和配置，`HtmlWebpackPlugin`也做了相应的调整。开发环境和生产环境进行了不同的设置，最明显的就是chunks和hash的设置。

+ 因为多页面打包的原因，生产环境我们可以提取**重复的代码和** **不频繁修改的代码**为独立文件以优化客户端加载，这是缓存策略。同样我们到`optimization（优化）`配置下，添加`runtimeChunk`，`splitChunks`配置，分别提取运行时代码和node_modules下依赖代码。

---

至此webpack4的开发、生产打包配置相对来说比较完善了。常见的开发生产需求得到满足。后面我们将继续深入webpack4，探究它的更多功能，原理，工程化。