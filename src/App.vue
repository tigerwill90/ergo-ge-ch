<template>
  <v-app>
    <Nav/>
    <Toolbar/>
    <v-content class="main">
      <router-view></router-view>
    </v-content>
    <Footer/>
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
<style scoped>
  .main {
    padding-top: 64px!important;
  }
</style>
