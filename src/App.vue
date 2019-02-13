<template>
  <v-app>
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
  }
}
</script>
<style>
@import './assets/css/global.css';
</style>
