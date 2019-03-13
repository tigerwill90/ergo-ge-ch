/*
 * File: App.vue
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 26th February 2019
 * Last Modified: 13th March 2019
 */
<template>
  <v-app v-resize="onResize">
    <Nav />
    <Toolbar />
    <v-content class="app-main">
      <router-view />
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
