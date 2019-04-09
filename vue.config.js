
module.exports = {
  // 打包后的文件名称
  outputDir: 'dist',

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
