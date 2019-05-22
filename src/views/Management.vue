<template>
  <SubNav
    :selector="selector"
    :title="title"
    :links="links"
    sub-class="reduced"
  >
    <div class="">
      yolo
    </div>
  </SubNav>
</template>
<script>
import SubNav from '../components/SubNav'
import Scrolling from '../mixins/scrolling'
import HandleScroll from '../mixins/handleScroll'
export default {
  name: 'Management',
  components: {
    SubNav
  },
  mixins: [Scrolling('section'), HandleScroll()],
  data () {
    return {
      title: 'Plateform de gestion',
      links: [
        { to: 'offices', title: 'Cabinets' },
        { to: 'therapists', title: 'Ergothérapeutes' },
        { to: 'users', title: 'Utilisateurs' },
        { to: 'categories', title: 'Catégories' }
      ]
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'authorization' && this.$router.currentRoute.name === 'management') {
        if (mutation.payload === null) {
          this.$router.push({ name: 'login' })
        }
      }
    })
    if (this.$store.getters.authorization === null) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style scoped>

</style>
