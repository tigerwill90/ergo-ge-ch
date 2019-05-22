export default function () {
  return {
    methods: {
      isAdmin() {
        if (this.$store.getters.authorization) {
          return this.$store.getters.authorization.scope.includes('admin')
        }
        return false
      }
    },
    computed: {
      admin() {
        return this.isAdmin()
      }
    }
  }
}
