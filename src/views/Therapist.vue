<template>
  <section class="therapist-content">
    <div class="filter-content">
      <OfficesFilter
        @sort-office="sort"
        @filter-categories="filter"
      />
    </div>
    <v-divider />
    <div class="cards-content">
      <OfficeCard
        v-for="(office, i) in offices"
        v-show="office.active"
        :key="i"
        :office="office"
        :selected-categories="selectedCategories"
      />
    </div>
  </section>
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
      offices: [],
      currentOrderKey: 'name',
      selectedCategories: []
    }
  },
  mounted() {
    if (!this.$store.getters.authorization && this.$store.getters.attempt <= 0) {
      this.$store.dispatch('reconnect').then(user => {
        this.$store.commit('notification', { status: 200, message: `Bienvenue ${user.first_name} ${user.last_name}` })
        this.$store.dispatch('setReconnectInterval')
      }).catch(() => {})
    }

    this.$http
      .get(`${process.env.VUE_APP_API_URL}/offices`)
      .then(response => {
        this.offices = response.data.data
        this.offices.forEach(office => {
          this.$http
            .get(`${process.env.VUE_APP_API_URL}/offices/${office.id}/categories`)
            .then(response => {
              this.$set(office, 'categories', response.data.data)
              this.$set(office, 'active', true)
            })
            .catch(() => {
              this.$set(office, 'active', false)
            })
        })
      })
      .catch(err => {
        this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
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
    filter(selectedCategories) {
      this.selectedCategories = selectedCategories
    }
  }
}
</script>

<style scoped>
.therapist-content {
  padding-bottom: 24px;
}

.filter-content {
  padding: 0 5% 0 5%;
}

.cards-content {
  padding: 0 5% 0 5%;
}
</style>
