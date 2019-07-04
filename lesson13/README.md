# lesson 13 : 应用babel转换JS代码及添加polyfill

我们可以用ES6、ES7或更高版本写JS代码，但是它们不一定能够在不同版本浏览器运行，低版本的浏览器同样有一定的用户群，这就需要转换代码到ES5并添加polyfill以适应更多版本浏览器。

```
npm install -D babel-loader @babel/core @babel/preset-env @babel/runtime @babel/plugin-transform-runtime core-js
```

## 在package.json中添加 browserslist

我们之前在postcss-loader的插件autoprefixer中添加了配置选项overrideBrowserslist，用于指定浏览器列表进行添加厂商样式前缀。

现在我们把它提取出来，在package.json中统一添加浏览器列表选项browserslist，这样做的好处是所有使用了浏览器列表的插件都可以读取到配置，包括babel，免去了一一配置的麻烦。

这个配置项是开源项目`browserslist`的通用规定：[browserslist: github](https://github.com/browserslist/browserslist#full-list)

## babel-loader和它的小伙伴

babel7开始，它的库都是@babel/xxx

+ @babel/preset-env 根据指定的浏览器列表`browserslist`进行自动转换适合浏览器的代码

以往我们需要安装 babel-preset-es2015 和 babel-preset-stage-3 等插件指定环境进行转换代码，这很不OK，不是吗？

要使用哪个stage我经常搞懵，现在不需要了，而且@babel/preset-env不支持stage-x的插件了。一切都是智能的。

```
presets: [
  [
    '@babel/preset-env',
    {
      // useBuiltIns polyfill设置 使用内建？
      // 将polyfill应用于@babel/preset-env中的方法
      'useBuiltIns': 'entry', //"usage" | "entry" | false, defaults to false.
      'corejs': 3 // 使用core-js不能缺少的配置
    }
  ]
],
```
polyfill
```
// polyfill 以下代码应置于入口文件顶端
import "core-js/stable";// 提供 polyfill
import "regenerator-runtime/runtime"; // 提供 async
```

`useBuiltIns` 可以让插件根据`browserslist`配置的浏览器列表进行打包**需要用到的**core-js提供的polyfill，减少不必要的polyfill代码。

**不推荐使用babel-polyfill了**！因为这个插件已经不再更新，而且它最后版本也是指向上面两行代码而已了。

### 以上配置实现了自动根据`browserslist`**转换JS代码**和**加入需要的polyfill**。


+ @babel/plugin-transform-runtime

用于将babel的运行时提取为公共代码，而不是在所有被babel转换的代码里面嵌入运行时代码，减少代码体积。

---

有了babel和polyfill，我们写代码更爽了！

