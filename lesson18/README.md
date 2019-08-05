# lesson 18 : 打包各阶段耗时统计 -> speed-measure-webpack-plugin

webpack打包所需要经历的环节较多，随着工程的增大，插件的使用增多，打包耗时也会增加，特别是团队协作的工程。所以，我们需要知道打包过程的具体情况，以便进行针对性优化。`speed-measure-webpack-plugin`插件就是用于此目的。

## 使用方法

```
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap( webpackConfig )
```

## 打印结果示例

如果`时间`显示红色表示相对当前打包总体时间耗时较长，需要特别分析调优，黄色次之，绿色相对较好。

```
 SMP  ⏱  
General output time took 12.031 secs

 SMP  ⏱  Plugins
TerserPlugin took 3.5 secs
HtmlWebpackPlugin took 3.034 secs
OptimizeCssAssetsWebpackPlugin took 1.99 secs
MiniCssExtractPlugin took 0.093 secs
CleanWebpackPlugin took 0.084 secs
CompressionPlugin took 0.044 secs
CopyPlugin took 0.038 secs
DefinePlugin took 0.001 secs

 SMP  ⏱  Loaders
modules with no loaders took 3.19 secs
  module count = 356
D:\lesson18\node_modules\babel-loader\lib\index.js took 2.35 secs
  module count = 1
D:\lesson18\node_modules\mini-css-extract-plugin\dist\loader.js, and 
D:\lesson18\node_modules\css-loader\dist\cjs.js, and 
D:\lesson18\node_modules\postcss-loader\src\index.js, and 
D:\lesson18\node_modules\less-loader\dist\cjs.js took 1.25 secs
  module count = 1
D:\lesson18\node_modules\css-loader\dist\cjs.js, and 
D:\lesson18\node_modules\postcss-loader\src\index.js, and 
D:\lesson18\node_modules\less-loader\dist\cjs.js took 1.015 secs
  module count = 1
D:\lesson18\node_modules\html-webpack-plugin\lib\loader.js took 0.045 secs
  module count = 1
```

## 定制参数

通过 `process.env.MEASURE` 判断是否需要启用此插件，方便切换。

```
package.json: 
"build": "cross-env NODE_ENV=production MEASURE=true 

webpack.prod.config.js:
// 上面 MEASURE=true 传入的值true其实是string类型
const smp = new SpeedMeasurePlugin({ disable: process.env.MEASURE === "false" });
```