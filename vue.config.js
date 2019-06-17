const options = {
  devServer: {
    port: 9000
  },
  publicPath: '/',
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/],
  productionSourceMap: false
}

module.exports = options
