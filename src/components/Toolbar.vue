<template>
  <v-toolbar dark class="teal lighten-2 toolbar" fixed height="64">
    <template  v-if="showMenu">
      <v-toolbar-side-icon @click="handleMenuClick"></v-toolbar-side-icon>
      <v-toolbar-title v-if="!searchBar" class="toolbar-title">{{header}}</v-toolbar-title>
    </template>
    <template v-else>
      <router-link :to="{name: 'home'}" exact tag="div" class="toolbar-img-container">
        <img src="../assets/img/ase.svg" alt="ase" class="toolbar-img"/>
      </router-link>
      <v-toolbar-items v-if="!searchBar" class="toolbar-item">
        <v-btn v-for="link in links" :key="link.id" @click="goTo(link.name)" flat exact ripple>{{link.text}}</v-btn>
      </v-toolbar-items>
    </template>
    <v-spacer v-if="!searchBar"></v-spacer>
    <v-autocomplete v-if="searchBar"
                    autofocus
                    color="white"
                    flat
                    clearable
                    :loading="false"
                    hide-details
                    style="margin-left: 20px"
    >

    </v-autocomplete>
    <v-btn icon @click="showSearchBar">
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
      ],
      sharedStore: this.$store.state,
      searchBar: false
    }
  },
  methods: {
    handleMenuClick () {
      this.$store.setDrawer(!this.sharedStore.drawer)
    },
    showSearchBar () {
      this.searchBar = !this.searchBar
    },
    goTo (link, to) {
      this.$router.push({ name: link })
      this.$store.setRouteSelector(link)
      this.$store.setHashSelector(to === undefined ? null : '#' + to)
    }
  },
  computed: {
    showMenu () {
      return this.sharedStore.windowSize.x < 830
    },
    header () {
      return this.$route.meta.header
    }
  }
}
</script>

<style scoped>
  .toolbar {
    z-index: 1000;
  }

  @media screen and (max-width: 495px) {
    .toolbar-title {
      display: none;
    }
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
