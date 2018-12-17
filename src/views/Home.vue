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
      title: 'Ergo-ge-independants.ch',
      subtitle: 'La section genevoise de l\'Association Suisse des Ergothérapeutes\xa0!',
      sharedStore: this.$store.state,
      updated: false
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
    }
  },
  asyncComputed: {
    selector () {
      if (this.updated && this.sharedStore.selector.routeName === 'home') {
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
</script>
