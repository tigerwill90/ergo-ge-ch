<template>
  <div class="therapist-content">
    <OfficeCard v-for="(office, i) in offices" :office="office" :key="i" />
  </div>
</template>

<script>
import OfficeCard from '../components/OfficeCard'
export default {
  name: 'Therapist',
  components: {
    OfficeCard
  },
  data() {
    return {
      title: 'Les indépendants',
      offices: []
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
  padding: 24px;
}
</style>
