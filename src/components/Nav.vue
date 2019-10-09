<template>
  <v-navigation-drawer
    v-if="forceHide"
    v-model="drawer"
    class="nav-drawer"
    app
    temporary
    disable-resize-watcher
  >
    <header class="nav-header">
      <img
        src="../assets/img/ase.svg"
        alt="ase"
        class="nav-img"
        @click="goTo('home')"
      >
      <span class="title center-text">Association Suisse des Ergothérapeutes</span>
    </header>
    <v-divider />
    <div class="nav-content">
      <v-subheader>Information</v-subheader>
      <v-list
        class="nav-list"
        expand
      >
        <v-list-group
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.icon"
          no-action
        >
          <v-list-tile
            slot="activator"
            exact
            :class="{currentLink: (item.link === $store.getters.selector.routeName)}"
            @click="goTo(item.link)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            v-for="(subItem, i) in item.items"
            v-show="subItem.show"
            :key="i"
            :disabled="subItem.active"
            @click="goTo(item.link, subItem.to)"
          >
            <v-list-tile-content>
              <v-list-tile-title :class="{currentLink: (i === $store.getters.selector.activeLinkIndex)}">
                {{ subItem.title }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
      <v-list class="nav-list">
        <v-list-tile
          :class="{currentLink: ('therapist' === $store.getters.selector.routeName)}"
          @click="goTo('therapist')"
        >
          <v-list-tile-action>
            <v-icon>place</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Ergothérapeute</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="nav-list">
        <v-list-tile
          :class="{currentLink: ('contact' === $store.getters.selector.routeName)}"
          @click="goTo('contact')"
        >
          <v-list-tile-action>
            <v-icon>phone</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-subheader>Liens utiles</v-subheader>
      <div class="nav-link">
        <a
          v-for="(link, i) in links"
          :key="i"
          class="nav-ref"
          :href="link.url"
          target="_blank"
        >{{ link.title }}</a>
      </div>
    </div>
    <v-divider />
    <footer class="nav-footer">
      <div class="nav-bottom-connexion">
        <v-btn
          color="red"
          outline
          class="white--text"
          :disabled="!!$store.getters.authorization"
          @click="goTo('login')"
        >
          Connexion
          <v-icon
            right
            dark
          >
            account_circle
          </v-icon>
        </v-btn>
      </div>
      <div class="nav-bottom-footer">
        <span>&copy;{{ date.getFullYear() }} —&nbsp;<strong>www.ergo-ge-independants.ch</strong></span>
      </div>
    </footer>
  </v-navigation-drawer>
</template>
<script>
import admin from '../mixins/admin'
export default {
  name: 'Nav',
  mixins: [admin()],
  data() {
    return {
      links: [
        {
          url: process.env.VUE_APP_PDF_PROCEDURE_URL,
          title: "Démarche de l'ergothérapie (pdf)"
        },
        {
          url: process.env.VUE_APP_PDF_DEFINITION_URL,
          title: 'La définition (pdf)'
        },
        {
          url: process.env.VUE_APP_PDF_PRESCRIPTION_URL,
          title: 'Ordonnance pour l\'Ergothérapie (pdf)'
        },
        {
          url: process.env.VUE_APP_PDF_INDICATION_URL,
          title: 'Indication pour l\'ordonnance (pdf)'
        },
        {
          url: 'https://www.ergotherapie.ch/page-dacceuil',
          title: 'Association Suisse des Ergothérapeutes'
        },
        {
          url: 'https://www.eesp.ch/',
          title: "École d'ergothérapie Lausanne, EESP"
        }
      ],
      date: new Date()
    }
  },
  computed: {
    drawer: {
      get: function() {
        return this.$store.getters.drawer
      },
      set: function(newState) {
        this.$store.commit('drawer', newState)
      }
    },
    forceHide() {
      return this.$store.getters.windowSize.x < 880
    },
    items() {
      const menus = [
        {
          title: 'Accueil',
          icon: 'home',
          link: 'home',
          items: [
            { to: 'desc', title: "L'ergothérapie", active: false, show: true },
            { to: 'prescription', title: "L'ordonnance", active: false, show: true },
            { to: 'actu', title: 'Actualité', active: false, show: true },
            {
              to: 'agenda',
              title: 'Agenda',
              active: this.$store.getters.windowSize.x < 500,
              show: true
            }
          ]
        },
        {
          title: 'Section Genevoise',
          icon: 'people',
          link: 'section',
          items: [
            { to: 'geneva', title: 'Section Genevoise', active: false, show: true },
            { to: 'conseil', title: 'Comité', active: false, show: true },
            { to: 'groupe', title: 'Groupes de travail', active: false, show: true }
          ]
        }
      ]

      if (this.$store.getters.authorization) {
        menus.push(
          {
            title: 'Management',
            icon: 'business',
            link: 'management',
            items: [
              { to: 'offices', title: 'Cabinets', active: false, show: true },
              { to: 'therapists', title: 'Ergothérapeutes', active: false, show: true },
              { to: 'users', title: 'Utilisateurs', active: false, show: true },
              { to: 'categories', title: 'Catégories', active: false, show: this.isAdmin() }
            ]
          }
        )
      }
      return menus
    }
  },
  methods: {
    goTo(link, to) {
      this.$router.push({ name: link })
      const hash = to === undefined ? null : '#' + to
      this.$store.commit('selector', {
        hash,
        routeName: link
      })
      if (!hash) {
        this.$store.commit('setActiveLinkIndex', null)
      }
      this.$store.commit('setCurrentHash', hash)
    }
  }
}
</script>

<style scoped>
.nav-drawer {
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow-y: auto;
}

.nav-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 35px 0 50px 0;
  background-color: #4db6ac;
  color: white;
}

.center-text {
  text-align: center;
}

.nav-img {
  height: 80px;
  margin-bottom: 15px;
  cursor: pointer;
}

.nav-content {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  margin-bottom: 20px;
}

.nav-list {
  padding: 0;
}

.nav-link {
  display: flex;
  flex-direction: column;
  padding-left: 15px;
}

.nav-ref {
  margin-bottom: 5px;
}

.nav-footer {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 125px;
}

.nav-bottom-connexion {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  background-color: #f5f5f5;
}

.nav-bottom-footer {
  background-color: #424242;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0 8px 0;
}

.currentLink {
  color: #d81b60;
}
</style>
