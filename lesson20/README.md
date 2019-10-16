# lesson20 : 让class支持类属性和方法更优雅的写法 -> @babel/plugin-proposal-class-properties

## es6标准

按es6标准，目前要实现类属性和类方法及类静态属性，需要按照以下写法

```
class SayWhat {
  constructor() {
    this.hello = "你好"
  }

  say() {
    return this.hello
  }
}

SayWhat.hola = "您好hola"    // 静态属性 和类分离了，很不优雅也不方便管理
```

如果属性较多，全都写在constructor初始化方法里面，会显得很臃肿，不太好看，特别是当初始化时还需要根据传入的参数做一些逻辑处理时，更是臃肿。

当然，这种现象已经有人重视，并向标准化组织提出了意见，只是到采纳并发布还需要一些时间。这段时间内，借助babel的`@babel/plugin-proposal-class-properties`插件，我们可以提前使用！

如果你使用第三方包出现如下这种错误时，那么你就需要安装上面的插件了

```
SyntaxError: webpack-lesson\lesson20\src\class.js: Support for the experimental syntax 'classProperties' isn't currently enabled (6:9):
  4 |   }
  5 | 
> 6 |   hello = "你好"
    |         ^
```

## 安装并配置插件

babel-loader的options配置

webpack.common.config.js
```
{
  test: /\.m?js$/,
  exclude: ...,
  use: {
    loader: "babel-loader",
    options: {
      presets: [
        [
          ...
        ]
      ],
      plugins: [..., '@babel/plugin-proposal-class-properties']
    }
  }
}
```

## 使用新特性

现在，可以使用新的属性及方法书写方式了，并且，还能使用类的静态属性！

大大提升了属性的书写清晰度，并且静态属性的支持也提升了类的完整性和整体性。

```
class SayWhat {
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
}
```

## 私有属性和私有方法

私有属性和私有方法，已经有提案了，就是在属性和方法名前加`#`表示

什么是私有属性和私有方法？就是这个属性或方法只能在类内部调用，不能通过类或类的实例`直接`访问或调用。

但是可以通过类的实例的方法内部访问类的私有属性,但不能通过类的静态方法内调用或访问类的私有属性（编译可以通过，但chrome浏览器会提示Uncaught TypeError: attempted to get private field on non-instance，执行失败）！

```
class SayWhat {
  constructor() {
  }

  #hi = "你好呀hi"    // 支持私有属性，类或类的实例调用时为 undefined

  sayHi() {          // 通过类的实例的方法内部访问类的私有属性
    return this.#hi
  }

  #prvSayhi(){        // 暂不支持私有方法！
    return this.#hi
  }

  static stcSayHi() { // SayWhat.stcSayHi() 这样调用编译可以通过，但chrome会报错
    return this.#hi
  }
}
```
`"@babel/plugin-proposal-class-properties": "^7.5.5"`
但是经过我测试，私有属性是可以支持的，私有方法暂不支持！！


[home](https://github.com/biggerV/webpack4-lesson)

