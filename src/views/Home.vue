<template>
  <!-- selector in mixin -->
  <SubNav
    :selector="selector"
    :links="links"
    :title="title"
    :subtitle="subtitle"
    sub-class="extended"
  >
    <Description
      :id="links[0].to"
      :ref="links[0].to"
    />
    <v-divider />
    <Prescription
      :id="links[1].to"
      :ref="links[1].to"
    />
    <v-divider />
    <Actuality
      :id="links[2].to"
      :ref="links[2].to"
    />
    <v-divider />
    <Agenda
      v-if="links[3]"
      :id="links[3].to"
      :ref="links[3].to"
    />
  </SubNav>
</template>

<script>
import SubNav from '../components/SubNav'
import Description from '../components/Description'
import Agenda from '../components/Agenda'
import Actuality from '../components/Actuality'
import Prescription from '../components/Prescription'
import Scrolling from '../mixins/scrolling'
import HandleScroll from '../mixins/handleScroll'
export default {
  name: 'Home',
  components: {
    SubNav,
    Description,
    Agenda,
    Actuality,
    Prescription
  },
  mixins: [Scrolling('home'), HandleScroll()],
  data() {
    return {
      title: 'Ergo-ge-independants.ch',
      subtitle: "La section genevoise de l'Association Suisse des Ergothérapeutes\xa0!"
    }
  },
  computed: {
    // TODO refactor links
    links() {
      if (this.$store.getters.windowSize.x > 500) {
        return [
          { to: 'desc', title: "L'ergothérapie" },
          { to: 'prescription', title: "L'ordonnance" },
          { to: 'actu', title: 'Actualité' },
          { to: 'agenda', title: 'Agenda' }
        ]
      } else {
        return [
          { to: 'desc', title: "L'ergothérapie" },
          { to: 'prescription', title: "L'ordonnance" },
          { to: 'actu', title: 'Actualité' }
        ]
      }
    }
  }
}
</script>
