# lesson 8 : tree shaking

即摇树算法，摇动一颗有绿叶和黄叶的树，目的是把没用的黄叶摇下来，保留有用的绿叶，让树变得更轻更健康！

webpack摇树后，目的是优化打包后文件的大小，把`没有引用`的模块删除掉！

注意，这是优化打包体积最简单有效的方式！

## 一个很核心的概念

摇树算法只能对ES2015的静态模块有用，即通过 `import` 或 `export`， 导入或导出的包有效！

## 简单设置

事实上，使用摇树不需要特别的设置，它是webpack内置功能，你唯一要做的是`开启压缩工具`即可。

```
打包的时候加上 -p 参数，表示production，开启压缩
"build": "webpack --config ./build/webpack.config.js -p"
```
```
或者在配置文件webpack.config.js内设置mode为production，开启压缩
```

现在，npm run build 后，test.js里面的world方法被删除了，因为它没有被引用或使用过！

注意，即使你import了world方法，但是并没有在代码中使用过这个方法，它最终也会被删除！
```
import { hello, world } from '@/test.js'

代码中只有hello被使用了，所以打包后它被保留下来
```

## 关于sideEffects

webpack提供了一个package.json配置选项sideEffects来设置哪些文件是有副作用的，是不可以被识别为无用并删除掉的。

比如全局pollyfill文件，它可能会有一些默认的行为，通常是自动执行的作用于全局的，那么它是不能被删除的。

```
pollyfill.js：hola是Object原型链上的一个方法，它是全局的，可能并没有被使用过，但也不能删除掉，因为谁也不知道它会在什么时候什么地方被使用

Object.prototype.hola = function () {
  alert("hola")
}
```

这种文件你需要显式的声明告知webpack

另外一个就是通过css-loader导入(import './xx.css')处理的css样式，也需要声明排除，防止被删除掉

```
sideEffects:[
  './pollyfill.js',
  '*.css'
]
```

`事实上，我在测试时没有声明sideEffects（不在package.json中出现），也是正常的，并没有出现异常删除行为`

`但是，如果你设置了sideEffects，那么就应该声明全部的、不能被删除的模块，否则就会出现异常删除行为`

比如下面这样写，pollyfill.js里面定义的代码都被删除了

```
sideEffects:[
  '*.css'
]
```

比如下面这样写一个空的配置，pollyfill.js和css里面定义的代码都被删除了

```
sideEffects:[]
```
这相当于告诉webpack，没有模块有副作用，都是可以安全的把未使用的导入的模块删除掉的！

但是如果不写这个配置，我想这将由压缩工具的默认行为进行处理，通常压缩功能能很好的处理这些问题。

`所以，要么不写，要么写全！！！`
