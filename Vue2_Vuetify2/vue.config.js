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
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL || 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
} 