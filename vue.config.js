const options = {
  devServer: {
    port: 9000
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
  configureWebpack: {}
}

if (process.env.NODE_ENV === 'development') {
  options.configureWebpack.devtool = 'source-map'
}

module.exports = options
