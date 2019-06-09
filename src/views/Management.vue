<template>
  <SubNav
    :selector="selector"
    :title="title"
    :links="links"
    sub-class="reduced"
  >
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
      :id="links[2].to"
      :ref="links[2].to"
    />
    <CategoriesManagement
      :id="links[3].to"
      :ref="links[3].to"
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
import admin from '../mixins/admin'
export default {
  name: 'Management',
  components: {
    SubNav,
    OfficesManagement,
    TherapistsManagement,
    UsersManagement,
    CategoriesManagement
  },
  mixins: [Scrolling('management'), HandleScroll(), admin()],
  data () {
    return {
      title: 'Gestion des données',
      offices: [],
      categories: [],
      therapists: [],
      links: [
        { to: 'offices', title: 'Cabinets' },
        { to: 'therapists', title: 'Ergothérapeutes' },
        { to: 'users', title: 'Utilisateurs' },
        { to: 'categories', title: 'Catégories' }
      ]
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'authorization' && this.$router.currentRoute.name === 'management') {
        if (mutation.payload === null) {
          this.$router.push({ name: 'login' })
        }
      }
    })
    if (this.$store.getters.authorization === null) {
      this.$router.push({ name: 'login' })
    }

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
    }
  }
}
</script>
<style scoped>

</style>
