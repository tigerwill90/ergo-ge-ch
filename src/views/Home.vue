<template>
  <SubNav :links="links" :title="title" :subtitle="subtitle" sub-class="main" @go-to="(target, options) => $vuetify.goTo(target, options)">
    <Description :id="links[0].to"/>
    <v-divider></v-divider>
    <Actuality :id="links[1].to"/>
    <v-divider></v-divider>
    <Agenda :id="links[2].to"/>
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
      title: 'Ergotherapie-ge.ch',
      subtitle: 'La section genevoise de l\'Association Suisse des Ergothérapeutes !',
      links: [
        { id: 0, to: 'desc', title: 'L\'ergothérapie' },
        { id: 1, to: 'actu', title: 'Actualité' },
        { id: 2, to: 'agenda', title: 'Agenda' }
      ]
    }
  }
}
</script>
