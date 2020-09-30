<template>
  <v-app v-resize="onResize">
    <Nav />
    <Toolbar />
    <v-main class="app-main">
      <router-view />
    </v-main>
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
  mounted() {
    this.onResize()
    this.$store.commit('setRouteName', this.$router.currentRoute.name)
  },
  beforeUpdate() {
    this.$store.commit('setRouteName', this.$router.currentRoute.name)
  },
  methods: {
    onResize() {
      this.$store.commit('windowSize', {
        x: window.innerWidth,
        y: window.innerHeight
      })
    }
  }
}
</script>
<style>
@import './assets/css/global.css';
</style>
