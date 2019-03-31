/*
 * File: Prescription.vue
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 31st March 2019
 * Last Modified: 31st March 2019
 */
<template>
  <FlexContainer
    column
    align-items="center"
    padding-left="20%"
    padding-right="20%"
    :background-color="background"
  >
    <p
      class="headline text-xs-center paragraph"
      :class="{'text-white': $store.getters.invertBrightness}"
    >
      Le traitement d'ergothérapie est pris en charge par <strong :class="{'text-teal': !$store.getters.invertBrightness}">les assurances sociales</strong> (AI, AA, AM)
      ainsi que par <strong :class="{'text-teal': !$store.getters.invertBrightness}">les caisses maladies</strong> (LAMal) lorsqu'il est prescrit par un médecin
    </p>
    <div class="prescription-document-container">
      <v-icon
        large
        class="icon"
        :color="color"
      >
        assignment
      </v-icon>
      <a
        class="subheading"
        :href="prescriptionUrl"
        target="_blank"
        :class="{'text-white': $store.getters.invertBrightness}"
      >
        Ordonnance pour l'Ergothérapie
      </a>
    </div>
  </FlexContainer>
</template>
<script>
export default {
  name: 'Prescription',
  data() {
    return {
      prescriptionUrl: process.env.VUE_APP_PDF_PRESCRIPTION_URL
    }
  },
  computed: {
    background() {
      if (this.$store.getters.invertBrightness) {
        return '#424242'
      }
      return 'transparent'
    },
    color() {
      if (this.$store.getters.invertBrightness) {
        return 'white'
      }
      return '#424242'
    }
  }
}
</script>
<style scoped>

.paragraph {
  margin-bottom: 15px;
}

.prescription-document-container {
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 6px;
}

.text-white {
  color: white;
}

.text-teal {
  color: teal;
}
</style>
