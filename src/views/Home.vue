<template>
  <SubNav
    :selector="selector"
    :links="links"
    :title="title"
    :subtitle="subtitle"
    sub-class="extended"
  >
    <Description
      :ref="links[0].to"
      :id="links[0].to"
    />
    <v-divider></v-divider>
    <Actuality
      :ref="links[1].to"
      :id="links[1].to"
    />
    <v-divider></v-divider>
    <Agenda
      v-if="links[2]"
      :ref="links[2].to"
      :id="links[2].to"
    />
  </SubNav>
</template>

<script>
import SubNav from '../components/SubNav'
import Description from '../components/Description'
import Agenda from '../components/Agenda'
import Actuality from '../components/Actuality'
import Scrolling from '../mixins/scrolling'
import HandleScroll from '../mixins/handleScroll'
export default {
  name: 'Home',
  components: {
    SubNav,
    Description,
    Agenda,
    Actuality
  },
  mixins: [Scrolling('home'), HandleScroll()],
  data() {
    return {
      title: 'Ergo-ge-independants.ch',
      subtitle: "La section genevoise de l'Association Suisse des Ergothérapeutes\xa0!"
    }
  },
  computed: {
    links() {
      if (this.$store.getters.windowSize.x > 500) {
        return [
          { to: 'desc', title: "L'érgothérapie" },
          { to: 'actu', title: 'Actualité' },
          { to: 'agenda', title: 'Agenda' }
        ]
      } else {
        return [
          { to: 'desc', title: "L'ergothérapie" },
          { to: 'actu', title: 'Actualité' }
        ]
      }
    }
  }
}
</script>
