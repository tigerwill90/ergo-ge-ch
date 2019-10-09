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
