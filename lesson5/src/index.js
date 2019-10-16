// https://github.com/biggerV/webpack4-lesson
import './styles/style.css'
import avaterUrl from '@/assets/avatar.jpg'

var a = "hello webpack4!"
function b() {
  document.querySelector("#app").innerHTML = a
  document.querySelector("#app").classList = "red"
}
b()

var avatar = new Image()
avatar.src = avaterUrl
document.querySelector("body").appendChild(avatar)

cosnole.error('test source map!')
