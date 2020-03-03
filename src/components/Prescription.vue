<template>
  <FlexContainer
    column
    align-items="center"
    padding-left="20%"
    padding-right="20%"
    :background-color="background"
  >
    <p
      class="headline text-center paragraph"
      :class="{'text-white': $store.getters.invertBrightness}"
    >
      Le traitement d'ergothérapie est pris en charge par <strong :class="{'text-teal': !$store.getters.invertBrightness}">les assurances sociales</strong> (AI, AA, AM)
      ainsi que par <strong :class="{'text-teal': !$store.getters.invertBrightness}">les caisses maladies</strong> (LAMal) lorsqu'il est prescrit par un médecin.
    </p>
    <div class="prescription-document-container">
      <v-icon
        large
        class="icon"
        :color="color"
      >
        assignment
      </v-icon>
      <div class="document-list">
        <a
          class="subtitle-1"
          :href="prescriptionUrl"
          target="_blank"
          :class="{'text-white': $store.getters.invertBrightness}"
        >
          Ordonnance pour l'Ergothérapie (pdf)
        </a>
        <a
          class="subtitle-1"
          :href="indicationUrl"
          target="_blank"
          :class="{'text-white': $store.getters.invertBrightness}"
        >
          Indication pour le formulaire d'ordonnance (pdf)
        </a>
      </div>
    </div>
  </FlexContainer>
</template>
<script>
export default {
  name: 'Prescription',
  data() {
    return {
      prescriptionUrl: process.env.VUE_APP_PDF_PRESCRIPTION_URL,
      indicationUrl: process.env.VUE_APP_PDF_INDICATION_URL
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

.document-list{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
