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
            <span class="text-xs-center">Version 0.0.2</span>
            <a class="text-xs-center footer-link" href="https://www.sylvainmuller.ch" target="_blank"><strong>www.sylvainmuller.ch</strong></a>
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
  name: 'Footer',
  data () {
    return {
      sharedStore: this.$store.state
    }
  }
}
</script>

<style scoped>
  .footer {
    display: flex;
    align-items: stretch;
    flex: 1;
  }

  .footer-version {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
  }

  .footer-desc {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    flex: 1;
  }

  .footer-link {
    text-decoration: none;
    color: white;
  }

  @media screen and (max-width: 650px) {
    .footer {
      align-items: center;
      flex-direction: column;
    }

    .footer-version {
      align-items: center;
      margin-bottom: 10px;
    }

    .footer-desc {
      align-items: center;
    }
  }
</style>
