
module.exports = {
  // 打包后的文件名称
  outputDir: 'dist',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // 代理配置
  devServer: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8888',
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true
      }
    }
  }
}
