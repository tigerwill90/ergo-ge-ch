<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
    height="100%"
    align-items="flex-start"
    justify-content="space-around"
  >
    <article class="activation-box">
      <div class="title-box">
        <span class="headline text-xs-center">
          Bienvenue sur la plateforme en ligne de l'ASE - Section Genevoise
        </span>
        <img
          src="../assets/img/ase.svg"
          alt="ase"
          class="image"
        >
        <p class="subheading text-xs-center">
          En tant que membre de la Section Genevoise de l'Association Suisse des ergothérapeutes, vous pouvez modifier les informations relatives
          à vos cabinets et aux ergothérapeutes qui y travaillent. Pour accéder à votre compte vous devez créer un nouveau mot de passe. Nous vous conseillons
          d'inventer un mot de passe unique pour ce compte et de mixer chiffres, lettres et caractères spéciaux.
        </p>
      </div>

      <v-stepper
        value="3"
        vertical
        class="stepper"
      >
        <v-stepper-step
          complete
          step="1"
        >
          Création du compte
          <small>Un administrateur à initialiser votre compte</small>
        </v-stepper-step>

        <v-stepper-step
          complete
          step="2"
        >
          Redirection
          <small>Suivez le lien de redirection</small>
        </v-stepper-step>

        <v-stepper-step
          step="3"
          :complete="complete"
        >
          Mot de passe
          <small>Créer un mot de passe</small>
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
              box
              @keyup.enter="submit"
            />
            <v-text-field
              v-model="repeatPassword"
              type="password"
              label="Confirmation du mot de passe"
              required
              :rules="repeatPasswordRule"
              box
              @keyup.enter="submit"
            />
          </v-form>
          <v-btn
            color="primary text-none"
            :disabled="disabled"
            @click="submit"
          >
            Se connecter
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
      token: null,
      valid: false,
      password: '',
      repeatPassword: '',
      complete: false,
      timeout: null,
      disabled: false,
      passwordRules: [
        v => !!v || 'Mot de passe requis',
        v => v.length >= 10 || 'Minimum 10 caractères',
        v => v.length <= 50 || 'Maximum 50 caractères'
      ],
      repeatPasswordRule: [
        v => !!v || 'Confirmation du mot de passe requis',
        v => v === this.password || 'Les mots de passe ne sont pas identiques'
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!store.getters.authorization) {
      store.dispatch('reconnect').then(user => {
        store.commit('notification', { status: 200, message: `Vous êtes déjà connecter en tant que ${user.first_name} ${user.last_name}. Déconnecter vous avant de créer un nouveau compte !` })
        store.dispatch('setReconnectInterval')
        next(vm => vm.$router.push({ name: 'home' }))
      }).catch(() => {
        next()
      })
    } else {
      next(vm => vm.$router.push({ name: 'home' }))
    }
  },
  created() {
    this.token = new URLSearchParams(window.location.search).get('token')
    if (!this.token) {
      this.$router.push({ name: 'home' })
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
              this.$router.push({ name: 'login' })
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
  .activation-box {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    align-items: center;
  }

  .image {
    width: 150px;
    margin: 30px 0 30px 0;
  }

  .title-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 5% 15px 5%;
    flex: 1;
  }

  .stepper {
    flex: 1;
    max-width: 450px;
  }

  @media screen and (max-width: 1000px) {
    .activation-box {
      flex-direction: column;
    }

    .title-box {
      padding: 15px 5% 35px 5%;
    }

    .stepper {
      width: 100%;
      max-width: 450px;
    }
  }

</style>
