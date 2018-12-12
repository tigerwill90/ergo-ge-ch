<template>
  <SubNav :selector="selector" :title="title" :links="links" sub-class="reduced">
    <Geneva :id="links[0].to"/>
    <Conseil :id="links[1].to"/>
    <Group :id="links[2].to"/>
    <FlexContainer background-color="red">
      hello
    </FlexContainer>
  </SubNav>
</template>
<script>
import SubNav from '../components/SubNav'
import Geneva from '../components/Geneva'
import Conseil from '../components/Conseil'
import Group from '../components/Group'
import store from '../store'
export default {
  name: 'Section',
  components: {
    SubNav,
    Geneva,
    Conseil,
    Group
  },
  data () {
    return {
      title: 'La Section Genevoise',
      links: [
        { id: 0, to: 'geneva', title: 'Section Genevoise' },
        { id: 1, to: 'conseil', title: 'Comité' },
        { id: 2, to: 'groupe', title: 'Groupes de travail' }
      ],
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
    selector () {
      if (this.mounted) {
        if (this.sharedStore.currentSelector !== null) {
          this.$vuetify.goTo(this.sharedStore.currentSelector, this.options)
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
<style scoped>

</style>
