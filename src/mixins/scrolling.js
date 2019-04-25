/*
 * File: scrolling.js
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 22nd December 2018
 * Last Modified: 13th March 2019
 */
export default function (route) {
  return {
    data () {
      return {
        updated: false
      }
    },
    asyncComputed: {
      selector () {
        if (this.updated && this.$store.getters.selector.routeName === route) {
          if (this.$store.getters.selector.hash !== null) {
            this.$vuetify.goTo(this.$store.getters.selector.hash, this.$store.getters.selector.options(this.$store.getters.windowSize.x)).then(() => {
              this.$store.commit('setHashSelector', null)
            })
          }
        }
      }
    },
    updated () {
      this.updated = true
    }
  }
}
