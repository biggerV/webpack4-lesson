# lesson 14 : 多页面打包及公共代码提取和缓存策略

迄今为止，单页面应用打包非常不错，但有时我们可能会有多页面打包的需求，下面是多页面打包的步骤和优化。

## 多页面打包配置

```
entry: {
  // 多入口
  app: './src/index.js',
  home: './src/home.js'
},
output: {
  ... ...
  // 生产环境下 [contenthash] 用文件的哈希值可以在只有文件发生改变时才改变文件名
  // 未改变时可以在客户端缓存文件，加速加载页面
  // 开发环境不要设置contenthash，否则不能热更新
  filename: devMod ? '[name].bundle.js' : '[name].[contenthash].js'
},
```
`HtmlWebpackPlugin` 从公共配置提取到开发和生产分别配置
```
开发环境

plugins: [
  ... ...

  // 多页面配置 每 new HtmlWebpackPlugin 一个为一个页面并配置
  // filename 必须设置为不同的名称，否则会被默认的index.html覆盖
  // chunks 指定插入的包
  new HtmlWebpackPlugin({
    title: 'lesson 14',
    filename: 'index.html',
    template: path.resolve(__dirname, '../src/index.html'),
    chunks: ['app'],
    hash: true
  }),
  new HtmlWebpackPlugin({
    title: 'home',
    filename: 'home.html',
    template: path.resolve(__dirname, '../src/index.html'),
    chunks: ['home'],
    hash: true
  })

  ... ...
]
```
```
生产环境

plugins: [
  ... ...

  // 多页面配置 每 new HtmlWebpackPlugin 一个为一个页面并配置
  // filename 必须设置为不同的名称，否则会被默认的index.html覆盖
  // chunks 指定插入的包，公共包必须要加入并放在前面
  new HtmlWebpackPlugin({
    ...
    chunks: ['runtime', 'vendor', 'app'], // 和开发环境区别
    // 生产环境在上面的output.filename中应用了contenthash后，这里不需要再添加hash
    // hash: true
  }),
  new HtmlWebpackPlugin({
    ...
    chunks: ['runtime', 'vendor', 'home'] // 和开发环境区别
  }),

  ... ...
]
```
#### 以上配置的不同之处在于chunks和hash的配置，因为在开发环境没有做splitChunks和runtimeChunk的提取，而且直接打包成一个文件，所以只要配置app或home的chunk即可，生产环境则做了提取，需要分别配置三个chunk

## 公共代码提取 通常用在【生产环境】

**多页面打包**的优化方法之一就是提取公共部分的代码，这样同样的代码不同页面浏览器可以只加载一次。

公共代码指的是一些不经常变动的代码，应用与全局的代码，如运行时代码，工具类，公共依赖包，垫片polyfill等。

提取为独立文件后，客户端可以缓存这部分内容，以达到加速加载页面。

`webpack4不再使用CommonsChunkPlugin做提取`

### optimization 优化

webpack4的优化，单独立了一个选项，这点太棒了。优化项目，首先想到的应该就是optimization这个配置。

optimization这个选项我们之前已经用过了，optimization.minimizer 下配置了压缩CSS和JS的插件，现在我们继续**优化**项目。

### optimization.runtimeChunk 提取运行时代码为独立文件

```
runtimeChunk: 'single', // 提取运行时代码为独立文件
```

### splitChunks 提取指定的目录文件

```
moduleIds: 'hashed', // vendor没有变化时名称上的哈希不变

// 把引用node_modules下的模块单独提取打包成一个文件
// 一般来说node_modules下的模块不会频繁发生更改，这样我们就可以提取出来，客户浏览器可以缓存这个文件，加速加载
// 如果还有其他目录的模块可以提取，按下面设置
splitChunks: {
  cacheGroups: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendor',
      chunks: 'all'
    }
  }
}
```
以上设置后打包出来的有四个JS的Chunk：runtime, vendor, app, home，其中runtime, vendor是公共部分，index和home页面只需将它们从服务器拉取一次，后面走浏览器缓存，节省了时间和带宽，同时app和home两个chunk也被瘦身了很多，从118K减到了4K。

上面设置对一般项目已经够用，对大型项目来说，可以更细致的进行切割出更多的chunk。