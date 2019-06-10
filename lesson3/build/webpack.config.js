const path = require('path')

module.exports = {
  // mode 模式不设置的话默认是production，会压缩优化代码，development不压缩但会优化代码，none不压缩不优化
  mode: 'development', //development, production, none
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  }
}