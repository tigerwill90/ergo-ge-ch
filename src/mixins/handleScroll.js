export default function() {
  return {
    methods: {
      handleScroll() {
        const offsetTop = window.pageYOffset || document.documentElement.scrollTop
        this.links.forEach((link, i) => {
          if (link.show) {
            if (offsetTop > this.$refs[link.to].$el.offsetTop - this.$store.getters.selector.options(this.$store.getters.windowSize.x).offset) {
              this.$store.commit('setActiveLinkIndex', i)
            }
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
