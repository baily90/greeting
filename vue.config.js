const CompressionWebpackPlugin = require('compression-webpack-plugin')
const VConsolePlugin = require('vconsole-webpack-plugin')

module.exports = {
  pages: {
    home: {
      // page 的入口
      entry: './src/pages/focus/myFocus.js',
      // 在 dist/myFocus.html 的输出
      filename: 'myFocus.html',
      // 页面标题
      title: '我的关注'
    }
  },
  productionSourceMap: false,
  // 配置全局样式变量
  // css: {
  //   loaderOptions: {
  //     // 给 sass-loader 传递选项
  //     sass: {
  //       prependData: '@import "@/assets/styles/base.scss";'
  //     }
  //   }
  // },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        compressionOptions: {
          numiterations: 15
        },
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        threshold: 10240,
        minRatio: 0.8
      }),
      new VConsolePlugin({
        filter: [],
        enable: process.env.NODE_ENV !== 'production'
      })
    ]
  }
}
