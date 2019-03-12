<template>
  <v-toolbar
    dark
    class="teal lighten-2 toolbar"
    fixed
    height="64"
    id="toolbar"
    :flat="$store.getters.flatToolbar"
  >
    <template v-if="showMenu">
      <v-toolbar-side-icon @click="handleMenuClick"></v-toolbar-side-icon>
      <v-toolbar-title
        v-if="!searchBar"
        class="toolbar-title"
      >{{ header }}</v-toolbar-title>
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
        />
      </router-link>
      <v-toolbar-items
        v-if="!searchBar"
        class="toolbar-item"
      >
        <v-btn
          v-for="link in links"
          :key="link.id"
          @click="goTo(link)"
          flat
          exact
          ripple
          class="text-none subheading"
          :class="{currentLink: link.name === $store.getters.selector.routeName}"
        >{{ link.text }}</v-btn>
      </v-toolbar-items>
    </template>
    <v-spacer v-if="!searchBar"></v-spacer>
    <v-autocomplete
      v-if="searchBar"
      autofocus
      color="white"
      flat
      clearable
      :loading="false"
      hide-details
      style="margin-left: 20px"
    >
    </v-autocomplete>
    <v-btn
      icon
      @click="showSearchBar"
    >
      <v-icon>search</v-icon>
    </v-btn>
    <v-menu
      bottom
      left
      offset-y
      :close-on-content-click="false"
      attach="#toolbar"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon>accessibility_new</v-icon>
        </v-btn>
      </template>
      <v-card class="accessiblity-card">
        <div class="accessiblity-title">
          <v-icon class="accessiblity-icon">accessibility</v-icon>
          <span class="title">Paramètres d'accessibilité</span>
        </div>
        <v-divider></v-divider>
        <div class="accessiblity-content">
          <div class="accessiblity-box">
            <v-slider
              v-model="sliderValue"
              thumb-color="red"
              thumb-label="always"
              step="10"
              :min="10"
              ticks="always"
              tick-size="2"
              :thumb-size="24"
              class="format-size-slider"
              prepend-icon="format_size"
              @change="onSliderChange"
            ></v-slider>
          </div>
          <div class="accessiblity-box">
            <v-switch value input-value="true" prepend-icon="brightness_medium"></v-switch>
          </div>
        </div>
      </v-card>
    </v-menu>
    <v-btn
      icon
      :to="{ name: 'contact' }"
    >
      <v-icon>perm_identity</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  data() {
    return {
      links: [
        { id: 1, name: 'home', text: 'Accueil' },
        { id: 2, name: 'section', text: 'Section Genevoise' },
        { id: 3, name: 'therapist', text: 'Ou trouver les érgothérapeutes' }
      ],
      searchBar: false,
      sliderValue: this.$store.getters.fontSizeMultiplier
    }
  },
  methods: {
    handleMenuClick() {
      this.$store.commit('toggleDrawer')
    },
    showSearchBar() {
      this.searchBar = !this.searchBar
    },
    goTo(link, to) {
      this.$router.push({ name: link.name })
      this.$store.commit('setHashSelector', null)
      this.$store.commit('setActiveLinkIndex', null)
    },
    onSliderChange(value) {
      this.$store.commit('fontSizeMultiplier', value)
    }
  },
  computed: {
    showMenu() {
      return this.$store.getters.windowSize.x < 830
    },
    header() {
      return this.$route.meta.header
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

.accessiblity-card {
  display: flex;
  width: 300px;
  height: 190px;
  flex-direction: column;
}

.accessiblity-title {
  display: flex;
  height: 50px;
  margin: 0 5px 0 5px;
  align-items: center;
}

.accessiblity-icon {
  margin-right: 5px;
}

.accessiblity-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 5px 0 5px;
  justify-content: flex-end;
}

.accessiblity-box {
  display: flex;
  align-items: center;
}

.format-size-slider {
  max-width: 250px;
}

@media screen and (max-width: 495px) {
  .toolbar-title {
    display: none;
  }
}
</style>
