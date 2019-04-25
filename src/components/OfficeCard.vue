/*
 * File: OfficeCard.vue
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 27th February 2019
 * Date Modified: 29th March 2019
 */
<template>
  <v-card
    v-if="showCard"
    class="office-card"
    elevation="5"
  >
    <div class="office-card-title">
      <span
        v-if="office.categories"
        class="subheading"
      >{{ office.categories.map(cat => cat.name).join(', ') }}</span>
    </div>
    <div class="office-content">
      <div class="office-title">
        <span class="title">
          {{ office.name }} {{ showCard }}
        </span>
        <span class="subheading">
          {{ office.email }}
        </span>
      </div>
      <div class="office-bloc">
        <v-icon class="icon">
          location_city
        </v-icon>
        <div class="list subheading">
          <span
            v-for="(contact, i) in office.contacts"
            :key="i"
          >{{ contact.street }}, {{ contact.npa }} {{ contact.city }}</span>
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
        <div class="panel-box">
          <OfficeContact :contacts="office.contacts" />
          <TherapistTab :id="office.id" />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-card>
</template>

<script>
import TherapistTab from './TherapistsTab'
import OfficeContact from './OfficeContact'
export default {
  name: 'OfficeCard',
  components: {
    TherapistTab,
    OfficeContact
  },
  props: {
    office: {
      type: Object,
      required: true
    },
    selectedCategories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      flatCategories: ''
    }
  },
  computed: {
    /**
     * Foreach categories, return directly true if match with one of the selected categories
     */
    showCard() {
      if (this.selectedCategories.length <= 0 || this.office.categories === undefined) return true
      return this.office.categories.some(cat => this.selectedCategories.find(el => cat.name === el))
    }
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

.panel-box {
  display: flex;
  flex-direction: column;
}
</style>
