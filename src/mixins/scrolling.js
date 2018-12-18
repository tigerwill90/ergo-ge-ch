export default function (route) {
  return {
    data () {
      return {
        sharedStore: this.$store.state,
        updated: false
      }
    },
    asyncComputed: {
      selector () {
        if (this.updated && this.sharedStore.selector.routeName === route) {
          if (this.sharedStore.selector.hash !== null) {
            this.$vuetify.goTo(this.sharedStore.selector.hash, this.sharedStore.selector.options(this.sharedStore.windowSize.x)).then(() => {
              this.$store.setHashSelector(null)
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
