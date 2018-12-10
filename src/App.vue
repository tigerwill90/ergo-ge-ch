<template>
  <v-app>
    <Toolbar/>
    <v-content class="main">
      <router-view></router-view>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Toolbar,
    Footer
  }
}
</script>
<style scoped>
  .main {
    padding-top: 64px!important;
  }
</style>
