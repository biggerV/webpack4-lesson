import "core-js/stable"; // 提供垫片 polyfill
import "regenerator-runtime/runtime"; // 提供 async https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime
import 'whatwg-fetch'
import './styles/style.less'
import testCalss from './class'

const sayWhat = new testCalss()

document.querySelector('#app').innerHTML =
  sayWhat.say() + "<br>" +
  testCalss.sayHola() + "<br>" +
  "类访问私有属性：" + testCalss['#hi'] + "<br>" +
  "类实例访问私有属性：" + sayWhat['#hi'] + "<br>" +
  "通过类实例的方法访问类的静态属性：" + sayWhat.sayHi() + "<br>"


// 必须加上这段，否则会刷新页面
// 如果用了其他loader，这个是不用加的，比如vue-loader
// loader会自动给你加上
if (module.hot) {
  module.hot.accept()
}