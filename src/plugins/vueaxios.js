export default {
  install (Vue, axios) {
    Object.defineProperty(Vue.prototype, '$http', {
      get: () => axios
    })
  }
}
