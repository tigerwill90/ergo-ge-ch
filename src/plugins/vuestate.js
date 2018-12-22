export default {
  install (Vue, store) {
    Object.defineProperty(Vue.prototype, '$storage', {
      get: () => store
    })
  }
}
