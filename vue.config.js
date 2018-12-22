module.exports = {
  devServer: {
    port: 9000
  },
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/'
    : '/'
}
