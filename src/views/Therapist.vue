/*
 * File: Therapist.vue
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 27th February 2019
 * Last Modified: 30th March 2019
 */
<template>
  <div class="therapist-content">
    <OfficesFilter
      @sort-office="sort"
      @filter-categories="filter"
    />
    <v-divider />
    <OfficeCard
      v-for="(office, i) in offices"
      :key="i"
      :office="office"
      :filtered-category="categories"
    />
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
      currentOrderKey: 'name',
      categories: []
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
  },
  methods: {
    sort(key) {
      // Offices can be directly sorted
      if (this.offices[0].hasOwnProperty(key)) {
        if (this.currentOrderKey === key) {
          this.offices.reverse()
        } else {
          this.offices.sort((a, b) => {
            if (a[key] < b[key]) {
              return -1
            } else if (a[key] > b[key]) {
              return 1
            } else {
              return 0
            }
          })
        }
      } else {
        // Deep sorting by office contact
        if (this.currentOrderKey === key) {
          this.offices.reverse()
          this.offices.forEach(office => {
            office.contacts.reverse()
          })
        } else {
          this.offices.forEach(office => {
            office.contacts.sort((a, b) => {
              if (a[key] < b[key]) {
                return -1
              } else if (a[key] > b[key]) {
                return 1
              } else {
                return 0
              }
            })
          })
          // sort by first contacts key
          this.offices.sort((a, b) => {
            if (a.contacts[0][key] < b.contacts[0][key]) {
              return -1
            } else if (a.contacts[0][key] > b.contacts[0][key]) {
              return 1
            } else {
              return 0
            }
          })
        }
      }
      this.currentOrderKey = key
    },
    filter(categories) {
      this.categories = categories
    }
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
