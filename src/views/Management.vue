<template>
  <SubNav
    :selector="selector"
    :title="title"
    :links="links"
    sub-class="reduced"
  >
    <OfficesManagement
      :id="links[0].to"
      :ref="links[0].to"
    />
    <TherapistsManagement
      :id="links[1].to"
      :ref="links[1].to"
    />
    <UsersManagement
      :id="links[2].to"
      :ref="links[2].to"
    />
    <CategoriesManagement
      :id="links[3].to"
      :ref="links[3].to"
    />
  </SubNav>
</template>
<script>
import SubNav from '../components/SubNav'
import Scrolling from '../mixins/scrolling'
import HandleScroll from '../mixins/handleScroll'
import OfficesManagement from '../components/OfficesManagement'
import TherapistsManagement from '../components/TherapistsManagement'
import UsersManagement from '../components/UsersManagement'
import CategoriesManagement from '../components/CategoriesManagement'
export default {
  name: 'Management',
  components: {
    SubNav,
    OfficesManagement,
    TherapistsManagement,
    UsersManagement,
    CategoriesManagement
  },
  mixins: [Scrolling('management'), HandleScroll()],
  data () {
    return {
      title: 'Gestion des données utilisateurs',
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
