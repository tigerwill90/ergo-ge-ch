<template>
  <section class="contact-section">
    <article class="information-box">
      <span class="app-section-title title-1">Contactez nous</span>
      <div class="information-content">
        <v-icon
          v-if="$store.getters.windowSize.x > 710"
          color="white"
          size="70"
          class="icon"
        >
          info
        </v-icon>
        <p class="information-paragraph">
          Une question ? N'hésitez pas à nous contacter en remplissant le formulaire. Nous vous répondrons dans un bref délai.
        </p>
      </div>
    </article>
    <article class="form-box">
      <v-progress-circular
        v-if="loading"
        :size="70"
        :width="5"
        color="teal"
        indeterminate
        class="calendar-progress"
      />
      <span class="app-section-title title-2 cDark">Contactez nous par email</span>
      <v-form
        ref="form"
        v-model="valid"
        class="form-input-box"
      >
        <v-text-field
          v-model="name"
          type="text"
          label="Prénom et nom"
          required
          :rules="nameRules"
          :counter="50"
          box
        />
        <v-text-field
          v-model="email"
          type="email"
          label="Email"
          :rules="emailRules"
          required
          box
        />
        <v-text-field
          v-model="subject"
          type="text"
          label="Objet du message"
          required
          :counter="60"
          :rules="subjectRules"
          box
        />
        <v-textarea
          v-model="message"
          label="Votre message"
          type="text"
          :counter="1000"
          :rules="messageRules"
          auto-grow
          required
          box
        />
        <div class="submit-button">
          <v-btn
            large
            color="primary"
            :disabled="loading"
            @click="submit"
          >
            Envoyer
          </v-btn>
        </div>
      </v-form>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      valid: false,
      name: '',
      email: '',
      subject: '',
      message: '',
      loading: false,
      nameRules: [
        v => !!v || 'Nom et prénom requis',
        v => v.length <= 50 || 'Maximum 50 caractères'
      ],
      emailRules: [
        v => !!v || 'Email requis',
        v => /.+@.+/.test(v) || 'L\'email doit être valide'
      ],
      subjectRules: [
        v => !!v || 'Objet requis',
        v => (v.length <= 100 && v.length >= 5) || 'Le nombre de caractères doit être compris entre 5 et 100'
      ],
      messageRules: [
        v => !!v || 'Message requis',
        v => (v.length <= 1000 && v.length >= 5) || 'Le nombre de caractères doit être compris entre 5 et 1000'
      ]
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$recaptcha('social')
          .then(token => {
            this.$http
              .post(`${process.env.VUE_APP_API_URL}/emails/send`, {
                name: this.name,
                email: this.email,
                subject: this.subject,
                message: this.message,
                token: token
              })
              .then(response => {
                this.loading = false
                this.$refs.form.resetValidation()
                this.name = ''
                this.email = ''
                this.subject = ''
                this.message = ''
                this.$store.commit('notification', { status: response.status, message: 'Message envoyé avec succès' })
              })
              .catch(err => {
                this.loading = false
                this.$store.commit('notification', { status: err.response.status, message: 'Impossbile d\'envoyé le message' })
              })
          })
          .catch(err => {
            this.loading = false
            this.$store.commit('notification', { status: err.response.status, message: 'Impossbile d\'envoyé le message' })
          })
      }
    }
  }
}
</script>

<style scoped>
  .contact-section {
    display: flex;
    height: 100%;
  }

  .information-box {
    display: flex;
    flex-direction: column;
    background-color: #424242;
    color: white;
    align-items: center;
    justify-content: center;
    padding: 50px 5% 50px 5%;
  }

  .information-content {
    display: flex;
    align-items: center;
  }

  .form-box {
    display: flex;
    min-width: 60%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 50px 15px 50px 15px;
  }

  .form-input-box {
    max-width: 500px;
    width: 80%;
  }

  .submit-button{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .icon {
    margin-right: 20px;
  }

  .information-paragraph {
    font-size: 1.5em;
  }

  .calendar-progress {
    margin: auto;
    position: relative;
    top: 50%;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }

  @media screen and (max-width: 1330px) {
    .contact-section {
      display: flex;
      height: 100%;
      flex-direction: column;
    }

    .submit-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media screen and (max-width: 710px) {
    .information-paragraph {
      font-size: 1.5em;
      text-align: center;
    }
  }
</style>
