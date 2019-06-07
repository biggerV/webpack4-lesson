import './styles/style.css'

var a = "hello webpack4!"
function b() {
  document.querySelector("#app").innerHTML = a
  document.querySelector("#app").classList = "red"
}
b()