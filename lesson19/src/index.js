import "core-js/stable"; // 提供垫片 polyfill
import "regenerator-runtime/runtime"; // 提供 async https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime
import 'whatwg-fetch'
import './styles/style.less'


document.querySelector('#app').innerHTML = `
  <div class="red">${__("你好")}${__("，")}${__("世界")}${__("！")}${__("很有趣的一个国际化方案，不是吗？")}</div>
`

const getMovies = () => {
  fetch(`/data-${process.env.LANG}.json`)
    .then(res => res.json())
    .then(res => {
      let div = document.createElement('div')
      div.innerHTML = `<div><img src="${res.image}" class="pic"><h2>${res.alt_title}</h2><h3>${res.summary}</h3></div>`
      document.querySelector('#app').appendChild(div)
    })
}

getMovies()

// 必须加上这段，否则会刷新页面
// 如果用了其他loader，这个是不用加的，比如vue-loader
// loader会自动给你加上
if (module.hot) {
  module.hot.accept()
}