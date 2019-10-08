/*
 * File: Toolbar.vue
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 13th February 2019
 * Last Modified: 22nd May 2019
 */
<template>
  <v-toolbar
    id="toolbar"
    dark
    class="teal lighten-2 toolbar"
    fixed
    height="64"
    :flat="$store.getters.flatToolbar"
  >
    <template v-if="showMenu">
      <v-toolbar-side-icon @click="handleMenuClick" />
      <v-toolbar-title
        v-if="!searchBar"
        class="toolbar-title"
      >
        {{ header }}
      </v-toolbar-title>
    </template>
    <template v-else>
      <router-link
        :to="{ name: 'home' }"
        exact
        tag="div"
        class="toolbar-img-container"
      >
        <img
          src="../assets/img/ase.svg"
          alt="ase"
          class="toolbar-img"
        >
      </router-link>
      <v-toolbar-items
        v-if="!searchBar"
        class="toolbar-item"
      >
        <v-btn
          v-for="link in links"
          :key="link.id"
          flat
          exact
          ripple
          class="text-none subheading"
          :class="{currentLink: link.name === $store.getters.selector.routeName}"
          @click="goTo(link)"
        >
          {{ link.text }}
        </v-btn>
      </v-toolbar-items>
    </template>
    <v-spacer v-if="!searchBar" />
    <v-autocomplete
      v-if="searchBar"
      placeholder="Trouver un ergothérapeute"
      autofocus
      color="white"
      flat
      clearable
      :loading="false"
      hide-details
      style="margin-left: 20px"
      type="search"
    />
    <v-btn
      icon
      @click="showSearchBar"
    >
      <v-icon>search</v-icon>
    </v-btn>
    <AccessiblityMenu />
    <v-btn
      v-if="!this.$store.getters.authorization"
      icon
      @click="goTo({name: 'login'})"
    >
      <v-icon>perm_identity</v-icon>
    </v-btn>
    <UserMenu />
  </v-toolbar>
</template>

<script>
import AccessiblityMenu from './AccessiblityMenu'
import UserMenu from './UserMenu'
export default {
  name: 'Toolbar',
  components: {
    AccessiblityMenu,
    UserMenu
  },
  data() {
    return {
      links: [
        { id: 1, name: 'home', text: 'Accueil' },
        { id: 2, name: 'section', text: 'Section Genevoise' },
        { id: 3, name: 'therapist', text: 'Où trouver les ergothérapeutes' },
        { id: 4, name: 'contact', text: 'Contact' }
      ],
      searchBar: false,
      sliderValue: this.$store.getters.fontSizeMultiplier
    }
  },
  computed: {
    showMenu() {
      return this.$store.getters.windowSize.x < 880
    },
    header() {
      return this.$route.meta.header
    }
  },
  methods: {
    handleMenuClick() {
      this.$store.commit('toggleDrawer')
    },
    showSearchBar() {
      this.searchBar = !this.searchBar
    },
    goTo(link) {
      this.$router.push({ name: link.name })
      this.$store.commit('setHashSelector', null)
      this.$store.commit('setActiveLinkIndex', null)
    }
  }
}
</script>

<style scoped>
.toolbar {
  z-index: 2000;
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

.currentLink {
  color: #d81b60;
}

@media screen and (max-width: 495px) {
  .toolbar-title {
    display: none;
  }
}
</style>
