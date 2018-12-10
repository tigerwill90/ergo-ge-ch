<template>
  <v-navigation-drawer v-if="forceHide" absolute temporary v-model="drawer">
  </v-navigation-drawer>
</template>

<script>
import store from '../store'
export default {
  name: 'Nav',
  data () {
    return {
      sharedStore: store.state
    }
  },
  computed: {
    drawer: {
      get: function () {
        return this.sharedStore.drawer
      },
      set: function (newState) {
        store.setDrawer(newState)
      }
    },
    forceHide () {
      return this.sharedStore.windowSize.x < 830
    }
  }
}
</script>

<style scoped>

</style>
