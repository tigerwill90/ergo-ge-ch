<template>
  <div class="therapist-content">
    <OfficesFilter @sort-office="sort" @filter-categories="filter" />
    <v-divider></v-divider>
    <OfficeCard v-for="(office, i) in offices" :office="office" :filtered-category="categories" :key="i" />
  </div>
</template>

<script>
import OfficeCard from '../components/OfficeCard'
import OfficesFilter from '../components/OfficesFilter'
export default {
  name: 'Therapist',
  components: {
    OfficeCard,
    OfficesFilter
  },
  data() {
    return {
      title: 'Les indépendants',
      offices: [],
      order: true,
      categories: []
    }
  },
  methods: {
    sort(key) {
      this.offices.sort((a, b) => {
        this.order = !this.order
        if (a[key] < b[key]) {
          return this.order ? -1 : 1
        } else if (a[key] > b[key]) {
          return this.order ? 1 : -1
        } else {
          return 0
        }
      })
    },
    filter(categories) {
      this.categories = categories
    }
  },
  mounted() {
    this.$http
      .get(`${process.env.VUE_APP_API_URL}/offices`)
      .then(response => {
        this.offices = response.data.data
      })
      .catch(error => {
        let data = null
        if (error.response !== undefined) {
          data = error.response.data
        }
        this.$store.commit('addNotification', {
          active: true,
          type: 'error',
          logs: data,
          userMessage: "Impossible de télécharger la liste des cabinets d'ergothérapie"
        })
      })
  }
}
</script>

<style scoped>
.therapist-main {
  background-color: #f5f5f5;
}

.therapist-content {
  padding: 0 24px 24px 24px;
}
</style>
