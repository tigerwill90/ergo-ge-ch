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
        <div class="footer">
          <div class="footer-version">
            <strong class="subheading">Version 0.0.1</strong>
          </div>
          <div class="footer-desc">
            <span class="text-xs-center">Accosciation Suisse des Ergothérapeutes ASE</span>
            <span class="text-xs-center">Section Genevoise</span>
            <span class="text-xs-center">info@ergotherapie-ge.ch</span>
          </div>
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
  .footer {
    display: flex;
    align-items: center;
    flex: 1;
  }

  @media screen and (max-width: 650px) {
    .footer {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex: 1;
    }
  }

  .footer-version {
    flex: 2;
    align-items: center;
  }

  .footer-desc {
    display: flex;
    align-items: center;
    flex: 1;
    flex-direction: column;
  }
</style>
