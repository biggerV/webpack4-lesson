# lesson19 : webpack国际化方案 -> i18n-webpack-plugin

webpack提供的国际化方案`i18n-webpack-plugin`，是“静态化”方案，其最终会打出不用语言的包，也就意味着，如果要手动切换语言，必须要刷新页面，这点和其他“动态化”国际化方案（如vue-i18n）不同。

## 建立语言包

单独一个文件夹存放语言包，lang，和src平行。

```
lang
 -- index.js // 集合导出
 -- langType.js // 语言类型对应的显示于页面上的文字
 -- en.js
 -- zh-CN.js
```

 en.js
 ```
 module.exports = {
  "你好": "Hello",
  "世界": "World",
  "，": ",",
  "！": "!",
  "很有趣的一个国际化方案，不是吗？": "this is a intresting international solution, isn't it?"
}
 ```

 zh-CN.js
 ```
 module.exports = {}
 ```

 因为我们编码时页面上是以中文作为基础语言的，所以，我们只要把中文翻译成英文或其他语言即可，中文的语言包留空就可以了，虽然`i18n-webpack-plugin`会提示缺少对应语言，这个可不理会，插件会在缺少对应语言时直接输出语言占位符，也就是我们的中文。

## 修改打包配置

我们需要对之前的打包配置进行修改。

webpack.common.config.js
```
// 引入
const I18nPlugin = require("i18n-webpack-plugin");
const Langs = require("../lang/index.js");


// 插件增加filename
// 页面以语言区分
new HtmlWebpackPlugin({
  ... ...
  filename: `index_${lang}.html`
}),


// 把语言类型添加到全局 process.env.LANG
// 方便我们在src/文件下取值（当前包的语言类型）
new webpack.DefinePlugin({
  'process.env.LANG': JSON.stringify(lang)
}),


// 暂时去掉CleanWebpackPlugin，因为他会影响到我们多次打包
// （现在导出的打包配置是个数组，这个会把上一次打包的内容清除掉，造成我们只能得到一个语言的打包结果）
// new CleanWebpackPlugin(),
```

## 开发使用

此插件只能处理静态内容的翻译
```
// webpack会对__(" ")包裹的以下“静态内容”进行翻译，如果找不到对应内容，则直接输出字符串
const sayhi = document.createElement('div')
sayhi.innerHTML = `
  <div class="red">${__("你好")}${__("，")}${__("世界")}${__("！")}${__("很有趣的一个国际化方案，不是吗？")}</div>
`
document.querySelector('#app').appendChild(sayhi)
```

如果是ajax获取的内容，需要后端配合，前端只需发起带有语言类型标识的请求。如
```
fetch(`/data-${process.env.LANG}.json`)
```

至此，一个国际化方案的落地就完成了。

至于在切换语言时，会刷新页面我觉得并不是问题。

至于是编译时进行翻译和运行时翻译方案哪个好，哪个熟悉用哪个吧，这只是一个可选的方案。

## TIPS！

事实上，同一个项目不同语言带来的挑战远不止上面提到的这些。

我们可能还需要关注更多因为不同语言带来的问题，如不同语言占用的空间不同，如有时候中文翻译成英文，英文会比中文长，反正亦然，这就造成了**样式**的适配问题；还有图片，不同语言，**图片**可能也需要切换，意味着要准备多套图片，也就是更多的工作量；如果还需要关注到无障碍的话，就是更多细致的工作了。

无论如何，这都是进步，值得花时间去学习和应用。

[home](https://github.com/biggerV/webpack4-lesson)