module.exports = {
  devServer: {
    port: 9000
  },
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  transpileDependencies: [/node_modules[/\\\\]vuetify[/\\\\]/]
};
