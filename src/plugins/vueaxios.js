/*
 * File: vueaxios.js
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 21st December 2018
 * Last Modified: 13th March 2019
 */
export default {
  install (Vue, axios) {
    Object.defineProperty(Vue.prototype, '$http', {
      get: () => axios
    })
  }
}
