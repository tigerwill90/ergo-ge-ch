<template>
  <v-navigation-drawer style="top: 64px;" v-if="forceHide" fixed temporary v-model="drawer">
    <div class="nav-header">
      <img src="../assets/img/ase.svg" alt="ase" class="nav-img">
      <span class="title center-text">Association Suisse des Ergothérapeutes'</span>
    </div>
    <div class="nav-content">
      <v-list expand>
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
    </div>
  </v-navigation-drawer>
</template>

<script>
import store from '../store'
export default {
  name: 'Nav',
  data () {
    return {
      sharedStore: store.state,
      items: [
        {
          title: 'Accueil',
          icon: 'home',
          link: 'home',
          items: [
            { to: 'desc', title: 'L\'ergothérapie', active: false },
            { to: 'actu', title: 'Actualité', active: false },
            { to: 'agenda', title: 'Agenda', active: true }
          ]
        },
        {
          title: 'Section Genevoise',
          icon: 'home',
          link: 'section',
          items: [
            { id: 0, to: 'geneva', title: 'Section Genevoise', active: false },
            { id: 1, to: 'conseil', title: 'Comité', active: false },
            { id: 2, to: 'groupe', title: 'Groupes de travail', active: false }
          ]
        },
        {
          title: 'Où trouver les ergothérapeutes',
          icon: 'home',
          link: 'therapist'
        }
      ]
    }
  },
  methods: {
    goTo (link, to) {
      this.$router.push({ name: link })
      console.log(to === undefined ? null : '#' + to)
      store.setCurrentSelector(to === undefined ? null : '#' + to)
    }
  },
  computed: {
    drawer: {
      get: function () {
        return this.sharedStore.drawer
      },
      set: function (newState) {
        store.setDrawer(newState)
      }
    },
    forceHide () {
      return this.sharedStore.windowSize.x < 830
    }
  }
}
</script>

<style scoped>
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 30px 0 30px 0;
  }

  .center-text {
    text-align: center;
  }

  .nav-img {
    height: 80px;
    margin-bottom: 10px;
  }

  .nav-content {
    display: flex;
    flex-direction: column;
  }
</style>
