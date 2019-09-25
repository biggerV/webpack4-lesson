export default class SayWhat {
  constructor() {
  }

  hello = "你好"

  say = () => {
    return this.hello
  }

  static hola = "您好hola"

  static sayHola = () => {
    return this.hola
  }

  #hi = "你好呀hi"

  sayHi() {
    return this.#hi
  }

  static stcSayHi() {
    return this.#hi
  }
}