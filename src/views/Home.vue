<template>
  <SubNav :selector="selector" :links="links" :title="title" :subtitle="subtitle" sub-class="extended">
    <Description :id="links[0].to"/>
    <v-divider></v-divider>
    <Actuality :id="links[1].to"/>
    <v-divider></v-divider>
    <Agenda v-if="links[2]" :id="links[2].to"/>
  </SubNav>
</template>

<script>
import SubNav from '../components/SubNav'
import Description from '../components/Description'
import Agenda from '../components/Agenda'
import Actuality from '../components/Actuality'
import store from '../store'
export default {
  name: 'Home',
  components: {
    SubNav,
    Description,
    Agenda,
    Actuality
  },
  data () {
    return {
      title: 'Ergotherapie-ge.ch',
      subtitle: 'La section genevoise de l\'Association Suisse des Ergothérapeutes\xa0!',
      sharedStore: store.state,
      mounted: false,
      options: {
        duration: 200,
        offset: 50,
        easing: 'easeInOutCubic'
      }
    }
  },
  computed: {
    links () {
      if (this.sharedStore.windowSize.x > 500) {
        return [
          { to: 'desc', title: 'L\'ergothérapie' },
          { to: 'actu', title: 'Actualité' },
          { to: 'agenda', title: 'Agenda' }
        ]
      } else {
        return [
          { to: 'desc', title: 'L\'ergothérapie' },
          { to: 'actu', title: 'Actualité' }
        ]
      }
    },
    selector () {
      if (this.mounted && this.sharedStore.selector.routeName === 'home') {
        if (this.sharedStore.selector.hash !== null) {
          return this.$vuetify.goTo(this.sharedStore.selector.hash, this.options)
        }
      }
      return null
    }
  },
  mounted () {
    this.mounted = true
  },
  updated () {
    this.options.offset = -100
  }
}
</script>
