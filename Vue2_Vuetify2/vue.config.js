module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  // Disable source maps in production for better performance
  productionSourceMap: false,
  // Configure webpack to handle older browsers
  configureWebpack: {
    performance: {
      hints: false
    }
  },
  // Configure the dev server
  devServer: {
    allowedHosts: [
      'localhost','localhost'
    ],
    port: process.env.PORT || 8082,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL || 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 设置基本路径，以便在 /v2/ 路径下正确加载资源
  publicPath: process.env.NODE_ENV === 'production' ? '/v2/' : '/'
} 