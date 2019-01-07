<template>
  <v-navigation-drawer class="nav-drawer" v-if="forceHide" app temporary v-model="drawer" disable-resize-watcher>
    <header class="nav-header">
      <img src="../assets/img/ase.svg" alt="ase" class="nav-img" @click="goTo('home')">
      <span class="title center-text">Association Suisse des Ergothérapeutes</span>
    </header>
    <v-divider></v-divider>
    <div class="nav-content">
      <v-subheader>Information</v-subheader>
      <v-list class="nav-list" expand>
        <v-list-group v-for="item in items" :key="item.title" :prepend-icon="item.icon" no-action>

          <v-list-tile slot="activator" @click="goTo(item.link)" exact>
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-for="subItem in item.items" :key="subItem.to" @click="goTo(item.link, subItem.to)" :disabled="subItem.active">
            <v-list-tile-content>
              <v-list-tile-title>{{subItem.title}}</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>

        </v-list-group>
      </v-list>
      <v-list>
        <v-list-tile @click="goTo('contact')">
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
        <a class="nav-ref" v-for="(link, i) in links" :href="link.url" :key="i" target="_blank">{{link.title}}</a>
      </div>
    </div>
    <v-divider></v-divider>
    <footer class="nav-footer">
      <div class="nav-bottom-connexion">
        <v-btn
          color="red"
          outline
          class="white--text"
          disabled
        >
          Connexion
          <v-icon right dark>account_circle</v-icon>
        </v-btn>
      </div>
      <div class="nav-bottom-footer">
          <span>&copy;{{date.getFullYear()}} —&nbsp;<strong>www.ergo-ge-independants.ch</strong></span>
      </div>
    </footer>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {
      links: [
        {
          url: process.env.VUE_APP_PDF_PROCEDURE_URL,
          title: 'Démarche de l\'ergothérapie (pdf)'
        },
        {
          url: process.env.VUE_APP_PDF_DEFINITION_URL,
          title: 'La définition (pdf)'
        },
        {
          url: 'https://www.ergotherapie.ch/page-dacceuil',
          title: 'Association Suisse des Ergothérapeutes'
        },
        {
          url: 'https://www.eesp.ch/',
          title: 'École d\'ergothérapie Lausanne, EESP'
        }
      ],
      date: new Date()
    }
  },
  methods: {
    goTo (link, to) {
      this.$router.push({ name: link })
      const hash = to === undefined ? null : '#' + to
      this.$store.commit('selector', { hash: hash, routeName: link })
    }
  },
  computed: {
    drawer: {
      get: function () {
        return this.$store.getters.drawer
      },
      set: function (newState) {
        this.$store.commit('drawer', newState)
      }
    },
    forceHide () {
      return this.$store.getters.windowSize.x < 830
    },
    items () {
      return [
        {
          title: 'Accueil',
          icon: 'home',
          link: 'home',
          items: [
            { to: 'desc', title: 'L\'ergothérapie', active: false },
            { to: 'actu', title: 'Actualité', active: false },
            { to: 'agenda', title: 'Agenda', active: this.$store.getters.windowSize.x < 500 }
          ]
        },
        {
          title: 'Section Genevoise',
          icon: 'people',
          link: 'section',
          items: [
            { to: 'geneva', title: 'Section Genevoise', active: false },
            { to: 'conseil', title: 'Comité', active: false },
            { to: 'groupe', title: 'Groupes de travail', active: false }
          ]
        },
        {
          title: 'Ergothérapeute',
          icon: 'place',
          link: 'therapist',
          items: [
            { to: 'pediatrics', title: 'Pédiatrie', active: false },
            { to: 'mental', title: 'Santé mentale', active: false },
            { to: 'physical', title: 'Médecine physique', active: false }
          ]
        }
      ]
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
</style>
