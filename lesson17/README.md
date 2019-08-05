# lesson 17 : gzip预压缩 -> compression-webpack-plugin

尽管我们采用了各种优化手段对打包文件进行优化以减少体积，但无奈地的是当由于项目不断膨胀的情况下，打包后的文件体积还是比我们想象的要大很多。

大家都知道nginx和apache有即时gzip压缩功能，但是这需要耗费服务器计算资源，当访问量大的时候这不是最优解。如果能提前生成gz文件的话，那就太好了。

## 插件：compression-webpack-plugin

webpack插件[compression-webpack-plugin · github](https://github.com/webpack-contrib/compression-webpack-plugin)可以预打包出gz文件。

配合nginx服务器，我们可以让支持gz压缩文件的浏览器加载此类文件。

```
new CompressionWebpackPlugin({
  filename: '[path].gz[query]', // 文件名，老版本1.x插件这里是asset,现在是filename
  algorithm: 'gzip', // 默认算法gzip
  minRatio: 0.8, // 压缩比，小于这个比例的才会处理，压缩比 = 压缩后大小/压缩前大小
  threshold: 10240, // 阈值 单位 bytes 1024b = 1kb 大于这个阈值的才压缩，默认0
  deleteOriginalAssets: false // 是否删除未gz压缩的原文件，默认false
})
```

**nginx设置：nginx.conf**

如果在根目录下

```
location / {
    ...
    # 打开gzip静态文件的支持，服务器会优先查找资源同名的.gz文件，如果没有则加载原文件
    gzip_static on;
}
```

如果在其他目录下

```
location ~ ^/dist/ {
    ...
    gzip_static on;
}
```

打包效果: gz压缩后体积只有原来的30%，节省了相当多的带宽，提升加载速度3倍。

```
app.b57c2cbb8dc0ee403635.js      122 KiB    
app.b57c2cbb8dc0ee403635.js.gz   38.9 KiB   
```

事实上，文件越大gz压缩效果越明显，2M多的文件压缩后只有400Kb左右。

小投入大回报，这个优化方法非常值得一试。当然这个是终极方案，前面的该优化的还是要优化。

经测试, IE9以上浏览器均支持.gz文件加载渲染，可以放心使用。

`TODO: apache服务器怎么设置呢？暂时还没找到和nginx相同的方案。`


