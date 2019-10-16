// https://github.com/biggerV/webpack4-lesson
import "core-js/stable"; // 提供垫片 polyfill
import "regenerator-runtime/runtime"; // 提供 async https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime
import './styles/style.less'


const getMovies = () => {
  fetch("/v2/movie/imdb/tt0111161?apikey=0df993c66c0c636e29ecbb5344252a4a")
    .then(res => res.json())
    .then(res => {
      document.querySelector('#app').innerHTML = `<div><img src="${res.image}" class="pic"><h2>${res.alt_title}</h2><h3>${res.summary}</h3></div>`
    })
}

getMovies()


// 必须加上这段，否则会刷新页面
// 如果用了其他loader，这个是不用加的，比如vue-loader
// loader会自动给你加上
if (module.hot) {
  module.hot.accept()
}