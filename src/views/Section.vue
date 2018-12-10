<template>
  <SubNav :title="title" :links="links" sub-class="content" @go-to="(target, options) => $vuetify.goTo(target, options)">
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
        { id: 0, to: 'geneva', title: 'Section GE' },
        { id: 1, to: 'conseil', title: 'Comité' },
        { id: 2, to: 'groupe', title: 'Groupes de travail' }
      ]
    }
  }
}
</script>
<style scoped>

</style>
