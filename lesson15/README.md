# lesson 15 : 使用proxy代理模式以实现跨域API调试

开发过程中，一个前端人员往往要对接多个后台开发人员的开发的接口，以及前后端本地debug的需求，往往需要我们能连接对方的本地服务器进行调试

使用代理能大大简化我们远程跨越调试API的问题，而且代码是无侵入的，非常方便

webpack-dev-server提供了proxy模式帮助我们能够跨域调试API，在背后，使用的是[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

## 开发模式下使用proxy

devServer.proxy

我这里以豆瓣的开放API为例子

```
proxy: {
  '/v2': {
    target: 'https://api.douban.com', // 将本地http://localhost地址代理到此地址上
    changeOrigin: true, // 改变请求主机地址，设置为true变为target的地址，false则为localhost，一般设置为true，否则服务器可能会拒绝访问
    secure: false // https下如果证书无效时，需要设置为false，否则devServer会拒绝接收，但是如果证书有效的话设置true/false都可以
  }
}
```

设置了代理后，我们的请求http://localhost:8081/v2/movie/imdb/tt0111161?apikey=0df993c66c0c636e29ecbb5344252a4a就被转发到了豆瓣地址上

```
fetch("/v2/movie/imdb/tt0111161?apikey=0df993c66c0c636e29ecbb5344252a4a")
  .then(res => res.json())
  .then(res => {
    document.querySelector('#app').innerHTML = `<div><img src="${res.image}" class="pic"><h2>${res.alt_title}</h2><h3>${res.summary}</h3></div>`
  })
```

以此类推，不同的接口我们可以设置不一样的代理进行转发。

------

这个功能本身不复杂，但是要理解其中的原理就需要花点时间。

[home](https://github.com/biggerV/webpack4-lesson)