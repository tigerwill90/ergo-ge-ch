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
            <span class="text-xs-center">Version {{ version }}</span>
            <a
              class="text-xs-center footer-link"
              href="https://www.sylvainmuller.ch"
              target="_blank"
            >
              <strong>www.sylvainmuller.ch</strong>&nbsp;
              <v-icon small>open_in_new</v-icon>
            </a>
          </div>
          <div class="footer-desc">
            <span class="text-xs-center">Association Suisse des Ergothérapeutes ASE</span>
            <span class="text-xs-center">Section Genevoise</span>
            <span class="text-xs-center">info@ergotherapie-ge.ch</span>
          </div>
        </div>
      </v-card-title>
      <v-card-actions class="grey darken-3 justify-center">
        &copy;{{ date.getFullYear() }} —&nbsp;<strong>www.ergotherapie-ge.ch</strong>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      bottom
      left
      auto-height
      :timeout="6000"
    >
      {{ message }}
      <v-btn
        color="teal"
        flat
        class="text-none"
        @click="snackbar = false"
      >
        Fermer
      </v-btn>
    </v-snackbar>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      date: new Date(),
      snackbar: false,
      message: null,
      version: process.env.VUE_APP_VERSION
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'notification') {
        this.snackbar = true
        this.message = state.notification.message
      }
    })
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
