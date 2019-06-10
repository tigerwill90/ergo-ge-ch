<template>
  <section class="login-section">
    <article class="header-box">
      <span class="headline">
        Bienvenue sur le site de la section genevoise de l'Association Suisse des Ergothérapeutes !
        Nos membres peuvent se connecter pour gérer leur informations personnels
      </span>
      <img
        src="../assets/img/ase.svg"
        alt="ase"
        class="image"
      >
    </article>
    <article class="form-login">
      <v-form
        ref="form"
        v-model="valid"
        class="form-input-box"
      >
        <v-text-field
          v-model="email"
          type="email"
          label="Email"
          required
          :rules="emailRules"
          box
        />
        <v-text-field
          v-model="password"
          type="password"
          label="Mot de passe"
          required
          :rules="passwordRules"
          box
        />
        <div class="submit-button">
          <v-btn
            large
            color="primary"
            @click="submit"
          >
            Se connecter
          </v-btn>
          <a href="">Mot de passe oublié ?</a>
        </div>
      </v-form>
    </article>
  </section>
</template>
<script>
import store from '../store'
export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'Email requis',
        v => /.+@.+/.test(v) || 'L\'email doit être valide'
      ],
      passwordRules: [
        v => !!v || 'Mot de passe requis'
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!store.getters.authorization) {
      store.dispatch('reconnect').then(user => {
        console.log('before login, success')
        store.commit('notification', { status: 200, message: `Bienvenue ${user.first_name} ${user.last_name}` })
        store.dispatch('setReconnectInterval')
        next(vm => vm.$router.push({ name: 'home' }))
      }).catch(() => {
        console.log('before login, failure')
        next()
      })
    } else {
      console.log('before login, go -1')
      next(vm => vm.$router.go(-1))
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$http({
          method: 'GET',
          url: `${process.env.VUE_APP_API_URL}/auth`,
          auth: {
            username: this.email,
            password: this.password
          },
          withCredentials: true
        })
          .then(response => {
            this.$store.commit('user', response.data.data.user)
            this.$store.commit('authorization', response.data.data.authorization)
            this.$store.commit('notification', { status: response.status, message: 'Vous êtes connecter' })
            this.$store.dispatch('setReconnectInterval')
            this.$router.go(-1)
          })
          .catch(err => {
            this.$refs.form.resetValidation()
            this.password = ''
            this.$store.commit('notification', { status: err.response.status, message: 'Email ou mot de passe invalide' })
          })
      }
    }
  }
}
</script>
<style scoped>
  .login-section {
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  .header-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 50px 50px 5px 50px;
    text-align: center;
  }

  .image {
    width: 200px;
    margin-top: 30px;
  }

  .form-login {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .form-input-box {
    max-width: 500px;
    width: 80%;
  }

  .submit-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

</style>
