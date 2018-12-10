<template>
  <v-toolbar class="teal lighten-2 toolbar" app height="64">
    <router-link :to="{name: 'home'}" exact tag="div" class="toolbar-img-container">
      <img src="../assets/img/ase.svg" alt="ase" class="toolbar-img"/>
    </router-link>
    <v-toolbar-items class="toolbar-item">
      <v-btn v-for="link in links" :key="link.id" :to="{name: link.name}" flat exact ripple>{{link.text}}</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>
    <v-btn icon :to="{name: 'contact'}">
      <v-icon>perm_identity</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      links: [
        { id: 1, name: 'home', text: 'Accueil' },
        { id: 2, name: 'section', text: 'Section Genevoise' },
        { id: 3, name: 'therapist', text: 'Ou trouver les ergothérapeutes' }
      ]
    }
  }
}
</script>

<style scoped>
  .toolbar {
    z-index: 1000;
  }

  .toolbar-item {
    display: flex;
  }

  .toolbar-img-container {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .toolbar-img {
    max-height: 40px;
  }
</style>
