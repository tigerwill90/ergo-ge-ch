<template>
  <SubNav :selector="selector" :title="title" :links="links" sub-class="reduced">
    <Geneva :ref="links[0].to" :id="links[0].to" />
    <v-divider></v-divider>
    <Council :ref="links[1].to" :id="links[1].to" />
    <v-divider></v-divider>
    <Group :ref="links[2].to" :id="links[2].to" />
  </SubNav>
</template>
<script>
import SubNav from '../components/SubNav'
import Geneva from '../components/Geneva'
import Council from '../components/Council'
import Group from '../components/Group'
import Scrolling from '../mixins/scrolling'
import HandleScroll from '../mixins/handleScroll'
export default {
  name: 'Section',
  components: {
    SubNav,
    Geneva,
    Council,
    Group
  },
  mixins: [Scrolling('section'), HandleScroll()],
  data() {
    return {
      title: 'La Section Genevoise',
      links: [
        { to: 'geneva', title: 'Section Genevoise' },
        { to: 'conseil', title: 'Comité' },
        { to: 'groupe', title: 'Groupes de travail' }
      ]
    }
  }
}
</script>
