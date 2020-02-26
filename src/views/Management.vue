<template>
  <SubNav
    :selector="selector"
    :title="title"
    :links="links"
    sub-class="reduced"
  >
    <!-- :id => $vuetify.goTo() -->
    <OfficesManagement
      :id="links[0].to"
      :ref="links[0].to"
      :offices="offices"
      @create-office="createOffice"
      @update-office="updateOffice"
      @remove-office="removeOffice"
    />
    <TherapistsManagement
      :id="links[1].to"
      :ref="links[1].to"
      :offices="offices"
      :categories="categories"
      :therapists="therapists"
      @selected-therapists="selectedTherapists"
      @remove-therapist="removeTherapist"
      @create-therapist="createTherapist"
      @update-therapist="updateTherapist"
    />
    <UsersManagement
      v-if="links[2].show"
      :id="links[2].to"
      :ref="links[2].to"
      :users="users"
      :offices="offices"
      @remove-user="removeUser"
      @create-user="createUser"
      @update-user="updateUser"
    />
    <EventsManagement
      v-if="links[3].show"
      :id="links[3].to"
      :ref="links[3].to"
      :events="events"
      @remove-event="removeEvent"
      @create-event="createEvent"
      @update-event="updateEvent"
    />
    <CategoriesManagement
      v-if="links[4].show"
      :id="links[4].to"
      :ref="links[4].to"
    />
  </SubNav>
</template>
<script>
import SubNav from '../components/SubNav'
import Scrolling from '../mixins/scrolling'
import HandleScroll from '../mixins/handleScroll'
import OfficesManagement from '../components/managements/offices/OfficesManagement'
import TherapistsManagement from '../components/managements/therapists/TherapistsManagement'
import UsersManagement from '../components/managements/UsersManagement'
import CategoriesManagement from '../components/managements/CategoriesManagement'
import EventsManagement from '../components/managements/EventsManagement'
import admin from '../mixins/admin'
import store from '../store'
export default {
  name: 'Management',
  components: {
    SubNav,
    OfficesManagement,
    TherapistsManagement,
    UsersManagement,
    CategoriesManagement,
    EventsManagement
  },
  mixins: [Scrolling('management'), HandleScroll(), admin()],
  data () {
    return {
      title: 'Management des données',
      offices: [],
      categories: [],
      therapists: [],
      events: [],
      users: [],
      links: [
        { to: 'offices', title: 'Cabinets', show: true },
        { to: 'therapists', title: 'Ergothérapeutes', show: true },
        { to: 'users', title: 'Utilisateurs', show: this.isAdmin() },
        { to: 'events', title: 'Évènements', show: this.isAdmin() },
        { to: 'categories', title: 'Catégories', show: this.isAdmin() }
      ],
      unsubscribe: null
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!store.getters.authorization) {
      store.dispatch('reconnect').then(user => {
        store.commit('notification', { status: 200, message: `Bienvenue ${user.first_name} ${user.last_name}` })
        store.dispatch('setReconnectInterval')
        next()
      }).catch(() => {
        next()
      })
    } else {
      next()
    }
  },
  mounted() {
    // If client is unauthenticated, go to login
    if (!this.$store.getters.authorization) {
      this.$router.push({ name: 'login' }).catch(() => {})
      return
    }

    // Subscribe to authorization mutation, don't forget to unsubscribe.
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'authorization' && !mutation.payload) {
        this.unsubscribe()
        this.$router.push({ name: 'login' }).catch(() => {})
      }
    })

    // admin or user
    let url = `${process.env.VUE_APP_API_URL}/offices`
    if (!this.isAdmin()) {
      url = `${process.env.VUE_APP_API_URL}/users/${this.$store.getters.user.id}/offices`
    }

    // Fetch office and first office therapists
    this.$http.get(url)
      .then(response => {
        this.offices = response.data.data
        this.$http.get(`${process.env.VUE_APP_API_URL}/offices/${this.offices[0].id}/therapists`)
          .then(response => {
            this.therapists = response.data.data
          })
          .catch(err => {
            this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
          })
      })
      .catch(err => {
        this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
      })

    // fetch categories
    this.$http.get(`${process.env.VUE_APP_API_URL}/categories`)
      .then(response => {
        this.categories = response.data.data
      })
      .catch(err => {
        this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
      })

    // fetch events
    this.$http.get(`${process.env.VUE_APP_API_URL}/events`)
      .then(response => {
        this.events = response.data.data
      }).catch(err => {
        this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
      })

    // fetch users and user office
    if (this.isAdmin()) {
      this.$http.get(`${process.env.VUE_APP_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
        }
      })
        .then(response => {
          this.users = response.data.data
          this.users.forEach(user => {
            this.$http.get(`${process.env.VUE_APP_API_URL}/users/${user.id}/offices`)
              .then(response => {
                this.$set(user, 'offices_id', response.data.data.map(office => office.id))
              })
              .catch(err => {
                if (err.response.status !== 404) {
                  this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
                }
              })
          })
        })
        .catch(err => {
          this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
        })
    }
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  methods: {
    createOffice(office) {
      this.offices.push(office)
    },
    updateOffice(office) {
      const pos = this.offices.map(office => office.id).indexOf(office.id)
      this.offices.splice(pos, 1, office)
    },
    removeOffice(id) {
      this.offices.splice(id, 1)
    },
    selectedTherapists(therapists) {
      this.therapists = therapists
    },
    removeTherapist(id) {
      this.therapists.splice(id, 1)
    },
    createTherapist(therapist) {
      this.therapists.push(therapist)
    },
    updateTherapist(therapist) {
      const pos = this.therapists.map(therapist => therapist.id).indexOf(therapist.id)
      this.therapists.splice(pos, 1, therapist)
    },
    removeEvent(id) {
      this.events.splice(id, 1)
    },
    createEvent(event) {
      this.events.push(event)
    },
    removeUser(id) {
      this.users.splice(id, 1)
    },
    createUser(user) {
      this.users.push(user)
    },
    updateUser(user) {
      const pos = this.users.map(user => user.id).indexOf(user.id)
      this.users.splice(pos, 1, user)
    },
    updateEvent(event) {
      const pos = this.events.map(event => event.id).indexOf(event.id)
      this.events.splice(pos, 1, event)
    }
  }
}
</script>
<style scoped>

</style>
