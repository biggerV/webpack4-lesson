// https://github.com/biggerV/webpack4-lesson
import './styles/style.css'
import avaterUrl from '@/assets/avatar.jpg'

var a = "hot module replacement! 999"
function b() {
  document.querySelector("#app").innerHTML = a
  document.querySelector("#app").classList = "red"
}
b()

var avatar = new Image()
avatar.src = avaterUrl
document.querySelector("body").appendChild(avatar)

console.warn('hot module replacement! 1')

// 必须加上这段，否则会刷新页面
// 如果用了其他loader，这个是不用加的，比如vue-loader
// loader会自动给你加上
if (module.hot) {
  module.hot.accept()
}