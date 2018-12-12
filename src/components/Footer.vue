<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="teal lighten-2">
        <strong class="subheading">Version 0.0.1</strong>

        <v-spacer></v-spacer>

        <div class="footer-desc">
          <span>Accosciation Suisse des Ergothérapeutes ASE</span>
          <span>Section Genevoise</span>
          <span>info@ergotherapie-ge.ch</span>
        </div>
      </v-card-title>
      <v-card-actions class="grey darken-3 justify-center">
        &copy;2018 —&nbsp;<strong>www.ergo-ge-independants.ch</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
  .footer-desc {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
