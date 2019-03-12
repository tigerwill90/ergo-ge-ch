<template>
  <v-app v-resize="onResize">
    <Nav />
    <Toolbar />
    <v-content class="app-main">
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
import Nav from './components/Nav'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Toolbar,
    Footer,
    Nav
  },
  methods: {
    onResize() {
      this.$store.commit('windowSize', {
        x: window.innerWidth,
        y: window.innerHeight
      })
    }
  },
  mounted() {
    this.onResize()
    this.$store.commit('setRouteName', this.$router.currentRoute.name)
  },
  beforeUpdate() {
    this.$store.commit('setRouteName', this.$router.currentRoute.name)
  }
}
</script>
<style>
@import './assets/css/global.css';
</style>
