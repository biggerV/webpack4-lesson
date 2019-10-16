// https://github.com/biggerV/webpack4-lesson
import "core-js/stable"; // 提供垫片 polyfill
import "regenerator-runtime/runtime"; // 提供 async https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime
import './styles/style.less'
import './styles/style2.css'
import avaterUrl from '@/assets/avatar.jpg'
import '@/pollyfill.js'
import { hello, TestClass } from '@/test.js'

// 这里使用了 hello 方法，意味着需要保留这个导出的方法
// 而 world 方法，没有被使用，也没有被引用，它将会被压缩工具删除
hello()


var a = "<div class='red'>hot module replacement! 99</div>"
var b = "<div class='pink'>pink?!</div>"
function f() {
  document.querySelector("#app").innerHTML = a + b
}
f()

var avatar = new Image()
avatar.src = avaterUrl
document.querySelector("body").appendChild(avatar)

console.warn('hot module replacement! ')

alert(process.env.NODE_ENV)

const es6Func = () => {
  alert("es6Func")
}

es6Func()

const testClass = new TestClass

testClass.test()


const sayWhat = (param) => {
  return new Promise((resolve, reject) => {
    if (param === true) {
      resolve("say what promise!!")
    } else {
      reject("say reject promise")
    }
  })
}

// sayWhat(true)
//   .then(res => {
//     alert(res)
//   })
//   .catch(err => {
//     alert(err)
//   })

async function hiAsync() {
  const what = await sayWhat(true)
  alert(what)
  alert("hi, async")
}

hiAsync()

// 必须加上这段，否则会刷新页面
// 如果用了其他loader，这个是不用加的，比如vue-loader
// loader会自动给你加上
if (module.hot) {
  module.hot.accept()
}