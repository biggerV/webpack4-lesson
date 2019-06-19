const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 0配置，插件会自动清除output配置下的path指向的目录
    new HtmlWebpackPlugin({
      title: 'lesson 9',
      template: path.resolve(__dirname, '../src/index.html'),
      hash: true
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, '../src')
    }
  }
}