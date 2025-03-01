module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true,
    public: '0.0.0.0:3000',
    publicPath: '/',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
} 