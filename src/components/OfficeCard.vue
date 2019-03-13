/*
 * File: OfficeCard.vue
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 27th February 2019
 * Last Modified: 13th March 2019
 */
<template>
  <v-card
    v-if="showCard"
    class="office-card"
    elevation="5"
  >
    <div class="office-card-title">
      <span class="subheading">{{ flatCategories }}</span>
    </div>
    <div class="office-content">
      <div class="office-title">
        <h2 class="title">
          {{ office.name }}
        </h2>
        <h3 class="subheading">
          {{ office.email }} show: {{ showCard }}
        </h3>
      </div>
      <div class="office-bloc">
        <v-icon class="icon">
          location_city
        </v-icon>
        <div class="list subheading">
          <span>{{ office.address }}</span>
          <span>{{ office.npa }} {{ office.city }}</span>
          <span v-if="office.district">Quartier : {{ office.district }}</span>
          <span v-if="office.cp">c.p. : {{ office.cp }}</span>
        </div>
      </div>
      <div class="office-bloc">
        <v-icon class="icon">
          contact_phone
        </v-icon>
        <div
          v-if="office.phone || office.fax"
          class="list subheading"
        >
          <span v-if="office.phone">tél: {{ office.phone }}</span>
          <span v-if="office.fax">fax: {{ office.fax }}</span>
        </div>
      </div>
    </div>
    <v-expansion-panel class="expansion-panel">
      <v-expansion-panel-content lazy>
        <div
          slot="header"
          class="expansion-panel-title"
        >
          Plus de détails
        </div>
        <TherapistTab :id="office.id" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-card>
</template>

<script>
import TherapistTab from './TherapistsTab'
export default {
  name: 'OfficeCard',
  components: {
    TherapistTab
  },
  props: {
    office: {
      type: Object,
      required: true
    },
    filteredCategory: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      categories: [],
      flatCategories: ''
    }
  },
  computed: {
    // TODO, correct filter bug when reverse sorting
    showCard() {
      if (this.filteredCategory.length <= 0) return true
      const res = this.categories.some(cat => this.filteredCategory.find(el => cat.name === el))
      return res
    }
  },
  mounted() {
    this.$http
      .get(`${process.env.VUE_APP_API_URL}/offices/${this.office.id}/categories`)
      .then(response => {
        this.categories = response.data.data
        this.flatCategories = this.categories.map(cat => cat.name).join(', ')
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
          userMessage: 'Impossible de télécharger la liste des spécialités des cabinets'
        })
      })
  }
}
</script>

<style scoped>
.office-card {
  width: 100%;
  margin-top: 30px;
  position: relative;
}

.office-card-title {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #424242;
  position: absolute;
  min-width: 200px;
  max-width: 90%;
  height: 30px;
  color: white;
  top: -15px;
  left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.office-content {
  display: flex;
  padding: 35px 10px 20px 15px;
  width: 100%;
  height: 100%;
}

.office-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.office-bloc {
  display: flex;
  flex: 1;
}

.icon {
  margin-right: 10px;
  font-size: 60px;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.expansion-panel {
  border: none;
  box-shadow: none;
  padding: 0 5px 0 5px;
}

.expansion-panel-title {
  font-weight: 600;
  font-size: 1.2em;
  color: #424242;
}
</style>
