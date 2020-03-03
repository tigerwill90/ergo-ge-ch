<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
    height="100%"
    align-items="flex-start"
    justify-content="space-around"
  >
    <article class="reset-password-box">
      <v-stepper
        value="3"
        vertical
        class="stepper"
      >
        <v-stepper-step
          complete
          step="1"
        >
          Verification de votre email
          <small>Saisir l'email de récupération du mot de passe</small>
        </v-stepper-step>

        <v-stepper-step
          complete
          step="2"
        >
          Consulter votre boîte email
          <small>Suivez le lien de redirection</small>
        </v-stepper-step>

        <v-stepper-step
          step="3"
          :complete="complete"
        >
          Mot de passe
          <small>Choisissez un nouveau mot de passe</small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-text-field
              v-model="password"
              type="password"
              label="Mot de passe"
              required
              :rules="passwordRules"
              filled
              @keyup.enter="submit"
            />
            <v-text-field
              v-model="repeatPassword"
              type="password"
              label="Confirmation du mot de passe"
              required
              :rules="repeatPasswordRule"
              filled
              @keyup.enter="submit"
            />
          </v-form>
          <v-btn
            color="warning text-none"
            :disabled="disabled"
            @click="submit"
          >
            Changer mon mot de passe
          </v-btn>
        </v-stepper-content>
      </v-stepper>
    </article>
  </FlexContainer>
</template>

<script>
import FlexContainer from '../components/FlexContainer'
import store from '../store'
export default {
  name: 'Reset',
  components: {
    FlexContainer
  },
  data() {
    return {
      passwordRules: [
        v => !!v || 'Mot de passe requis',
        v => v.length >= 10 || 'Minimum 10 caractères',
        v => v.length <= 50 || 'Maximum 50 caractères'
      ],
      repeatPasswordRule: [
        v => !!v || 'Confirmation du mot de passe requis',
        v => v === this.password || 'Les mots de passe ne sont pas identiques'
      ],
      disabled: false,
      valid: false,
      password: '',
      repeatPassword: '',
      complete: false,
      token: null,
      timeout: null
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!store.getters.authorization) {
      store.dispatch('reconnect').then(user => {
        store.commit('notification', { status: 200, message: `Vous êtes déjà connecter en tant que ${user.first_name} ${user.last_name}` })
        store.dispatch('setReconnectInterval')
        next(vm => vm.$router.push({ name: 'home' }).catch(() => {}))
      }).catch(() => {
        next()
      })
    } else {
      next(vm => vm.$router.push({ name: 'home' }).catch(() => {}))
    }
  },
  created() {
    this.token = new URLSearchParams(window.location.search).get('token')
    if (!this.token) {
      this.$router.push({ name: 'home' }).catch(() => {})
    }
  },
  destroyed() {
    clearTimeout(this.timeout)
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.disabled = true
        this.$http({
          method: 'PATCH',
          url: `${process.env.VUE_APP_API_URL}/users/activate`,
          data: {
            token: this.token,
            password: btoa(this.password)
          },
          withCredentials: true
        })
          .then(response => {
            this.complete = true
            this.$store.commit('notification', { status: response.status, message: 'Vous allez être rediriger vers la page de connexion' })
            this.$store.commit('user', response.data.data)
            this.timeout = setTimeout(() => {
              this.disabled = false
              this.$router.push({ name: 'login' }).catch(() => {})
            }, 2000)
          })
          .catch(err => {
            this.disabled = false
            this.$refs.form.resetValidation()
            this.password = ''
            this.repeatPassword = ''
            this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
          })
      }
    }
  }
}
</script>

<style scoped>
  .reset-password-box {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .stepper {
    max-width: 450px;
    flex: 1;
    min-width: 300px;
  }
</style>
