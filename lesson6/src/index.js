import './styles/style.css'
import avaterUrl from '@/assets/avatar.jpg'

var a = "coolllllllll! webpack-dev-server"
function b() {
  document.querySelector("#app").innerHTML = a
  document.querySelector("#app").classList = "red"
}
b()

var avatar = new Image()
avatar.src = avaterUrl
document.querySelector("body").appendChild(avatar)

console.warn('coolllllllll! webpack-dev-server !!!!')
