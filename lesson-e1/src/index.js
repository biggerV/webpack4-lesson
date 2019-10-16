import "core-js/stable"; // 提供垫片 polyfill
import "regenerator-runtime/runtime"; // 提供 async https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime
import 'whatwg-fetch'
import './styles/style.less'
const langTypes = require("../lang/langType.js");


document.querySelector('#app').innerHTML = ""

// 语言切换
// 其实就是切换打好的包，需要刷新页面
let langsList = ""
Object.keys(langTypes).map(lang => {
  langsList += `<a href="/index_${lang}.html" class="${process.env.LANG === lang ? 'blue' : ''}">${langTypes[lang]}</a>&nbsp;&nbsp;`
})
const langsWrap = document.createElement('div')
langsWrap.innerHTML = `
  <div>${langsList}</div>
`
document.querySelector('#app').appendChild(langsWrap)

// static 
// webpack会对__(" ")包裹的以下“静态内容”进行翻译，如果找不到对应内容，则直接输出字符串
const sayhi = document.createElement('div')
sayhi.innerHTML = `
  <div class="red">${__("你好")}${__("，")}${__("世界")}${__("！")}${__("很有趣的一个国际化方案，不是吗？")}</div>
`
document.querySelector('#app').appendChild(sayhi)

// ajax
const getMovies = () => {
  // api也可以根据语言进行区分，后端按一定规则返回内容
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