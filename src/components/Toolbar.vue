<template>
  <v-app-bar
    id="toolbar"
    dark
    fixed
    class="teal lighten-2 toolbar"
    height="64"
    :flat="$store.getters.flatToolbar"
  >
    <template v-if="showMenu">
      <v-app-bar-nav-icon @click="handleMenuClick" />
      <v-toolbar-title
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
        class="toolbar-item"
      >
        <v-btn
          v-for="link in links"
          :key="link.id"
          text
          exact
          ripple
          class="text-none subtitle-1"
          :class="{currentLink: link.name === $store.getters.selector.routeName}"
          @click="goTo(link)"
        >
          {{ link.text }}
        </v-btn>
      </v-toolbar-items>
    </template>
    <v-spacer />
    <v-btn
      v-if="!this.$store.getters.authorization"
      icon
      @click="goTo({name: 'login'})"
    >
      <v-icon>perm_identity</v-icon>
    </v-btn>
    <UserMenu />
  </v-app-bar>
</template>

<script>
import UserMenu from './UserMenu'
export default {
  name: 'Toolbar',
  components: {
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
    goTo(link) {
      this.$router.push({ name: link.name }).catch(() => {})
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
