/*
 * File: handleScroll.js
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 12th March 2019
 * Last Modified: 31st March 2019
 */
export default function() {
  return {
    methods: {
      handleScroll() {
        let offsetTop = window.pageYOffset || document.documentElement.scrollTop
        this.links.forEach((link, i) => {
          if (offsetTop > this.$refs[link.to].$el.offsetTop - this.$store.getters.selector.options(this.$store.getters.windowSize.x).offset) {
            this.$store.commit('setActiveLinkIndex', i)
          }
        })
      }
    },
    created() {
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
}
