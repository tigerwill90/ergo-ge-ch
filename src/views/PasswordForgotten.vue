<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
    height="100%"
    align-items="flex-start"
    justify-content="space-around"
  >
    <article class="password-forgotten-box">
      <v-stepper
        :value="stepValue"
        vertical
        class="stepper"
      >
        <v-stepper-step
          :complete="complete"
          step="1"
        >
          Verification de votre email
          <small>Saisir l'email de récupération du mot de passe</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent
          >
            <v-text-field
              v-model="email"
              autocomplete="username"
              type="email"
              label="Email"
              required
              :rules="emailRules"
              filled
              @keyup.native.enter="submit"
            />
            <v-btn
              color="warning"
              class="text-none"
              :disabled="disabled"
              @click="submit"
            >
              Changer mon mot de passe
            </v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-step
          step="2"
        >
          Consulter votre boîte email
          <small>Suivez le lien de redirection</small>
        </v-stepper-step>
        <v-stepper-content step="2">
          <p>
            Si <strong>****{{ hidePartialEmail() }}</strong> est un email valide, vous recevrez dans quelque instant un message contenant les instructions pour modifier votre mot de passe.
            Vous devrez suivre le lien de redirection pour procéder au changement.
          </p>
        </v-stepper-content>
        <v-stepper-step
          step="3"
        >
          Mot de passe
          <small>Choisissez un nouveau mot de passe</small>
        </v-stepper-step>
      </v-stepper>
    </article>
  </FlexContainer>
</template>

<script>
import FlexContainer from '../components/FlexContainer'
import store from '../store'
export default {
  name: 'PasswordForgotten',
  components: {
    FlexContainer
  },
  data() {
    return {
      complete: false,
      disabled: false,
      valid: false,
      email: '',
      stepValue: 1,
      emailRules: [
        v => (!v || (/.+@.+/.test(v) && /\.[A-z]+$/.test(v))) || 'L\'email doit être valide.',
        v => (!v || v.toString().length <= 250) || 'Maximum 250 caractères.'
      ]
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
  methods: {
    hidePartialEmail() {
      const arobaseIndex = this.email.indexOf('@')
      const charBeforeArobase = 2
      if (this.email.substring(0, arobaseIndex).length > charBeforeArobase) {
        return this.email.substring(this.email.indexOf('@') - charBeforeArobase, this.email.length)
      }
      return this.email.substring(this.email.indexOf('@'), this.email.length)
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.disabled = true
        this.$http({
          method: 'PATCH',
          url: `${process.env.VUE_APP_API_URL}/users/resetpassword`,
          data: {
            email: this.email
          }
        })
          .then(() => {
            this.complete = true
            this.stepValue = 2
          })
          .catch(err => {
            this.disabled = false
            this.email = ''
            this.$refs.form.resetValidation()
            this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
          })
      }
    }
  }
}
</script>

<style scoped>
    .password-forgotten-box {
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
