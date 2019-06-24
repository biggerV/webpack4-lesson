import './styles/style.css'
import './styles/style2.css'
import avaterUrl from '@/assets/avatar.jpg'
import '@/pollyfill.js'
import { hello, TestClass } from '@/test.js'

// 这里使用了 hello 方法，意味着需要保留这个导出的方法
// 而 world 方法，没有被使用，也没有被引用，它将会被压缩工具删除
hello()


var a = "hot module replacement! mi"
function b() {
  document.querySelector("#app").innerHTML = a
  document.querySelector("#app").classList = "red"
}
b()

var avatar = new Image()
avatar.src = avaterUrl
document.querySelector("body").appendChild(avatar)

console.warn('hot module replacement! 1')

alert(process.env.NODE_ENV)

const es6Func = () => {
  alert("es6Func")
}

es6Func()

const testClass = new TestClass

testClass.test()

// 必须加上这段，否则会刷新页面
// 如果用了其他loader，这个是不用加的，比如vue-loader
// loader会自动给你加上
if (module.hot) {
  module.hot.accept()
}