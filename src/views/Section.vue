<template>
  <SubNav :selector="selector" :title="title" :links="links" sub-class="reduced">
    <Geneva :id="links[0].to"/>
    <v-divider></v-divider>
    <Council :id="links[1].to"/>
    <v-divider></v-divider>
    <Group :id="links[2].to"/>
  </SubNav>
</template>
<script>
import SubNav from '../components/SubNav'
import Geneva from '../components/Geneva'
import Council from '../components/Council'
import Group from '../components/Group'
export default {
  name: 'Section',
  components: {
    SubNav,
    Geneva,
    Council,
    Group
  },
  data () {
    return {
      title: 'La Section Genevoise',
      links: [
        { to: 'geneva', title: 'Section Genevoise' },
        { to: 'conseil', title: 'Comité' },
        { to: 'groupe', title: 'Groupes de travail' }
      ],
      sharedStore: this.$store.state,
      updated: false
    }
  },
  asyncComputed: {
    selector () {
      if (this.updated && this.sharedStore.selector.routeName === 'section') {
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
