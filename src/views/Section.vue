<template>
  <!-- selector in mixin -->
  <SubNav
    :selector="selector"
    :title="title"
    :links="links"
    sub-class="reduced"
  >
    <Geneva
      :id="links[0].to"
      :ref="links[0].to"
    />
    <Council
      :id="links[1].to"
      :ref="links[1].to"
    />
    <Group
      :id="links[2].to"
      :ref="links[2].to"
    />
  </SubNav>
</template>
<script>
import SubNav from '../components/SubNav'
import Geneva from '../components/Geneva'
import Council from '../components/Council'
import Group from '../components/Group'
import Scrolling from '../mixins/scrolling'
import HandleScroll from '../mixins/handleScroll'
import store from '../store'
export default {
  name: 'Section',
  components: {
    SubNav,
    Geneva,
    Council,
    Group
  },
  mixins: [Scrolling('section'), HandleScroll()],
  beforeRouteEnter (to, from, next) {
    if (!store.getters.authorization && store.getters.attempt <= 0) {
      store.dispatch('reconnect').then(user => {
        console.log('before section')
        store.commit('notification', { status: 200, message: `Bienvenue ${user.first_name} ${user.last_name}` })
        store.dispatch('setReconnectInterval')
        next()
      }).catch(() => {
        next()
      })
    } else {
      next()
    }
  },
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
