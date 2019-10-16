const fs = require('fs')
class AutoAddCssClassWebpackPlugin {
  // 将 `apply` 定义为其原型方法，此方法以 compiler 作为参数
  apply(compiler) {
    // 指定要附加到的事件钩子函数
    compiler.hooks.emit.tap(
      'AutoAddCssClassWebpackPlugin',
      (compilation) => {
        let log = fs.readFileSync('./log.txt')
        // console.log('开始处理。。欲处理的文本。');
        Object.keys(compilation.assets).forEach((data) => {
          let content = JSON.stringify(compilation.assets[data]) // 欲处理的文本
          // if (content instanceof Buffer) {
          //   let contentStr = content.toString('utf-8')
          //   log += contentStr
          // } else {
          //   log += content
          // }
          log += content
        })
        fs.writeFileSync('./log.txt', log)
        console.log("写入成功")
        // 使用 webpack 提供的 plugin API 操作构建结果
        // compilation.addModule(/* ... */);
      }
    );
  }
}

module.exports = AutoAddCssClassWebpackPlugin