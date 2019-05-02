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
          autofocus
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
          v-model="object"
          type="text"
          label="Objet du message"
          required
          :counter="60"
          :rules="objectRules"
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
      object: '',
      message: '',
      nameRules: [
        v => !!v || 'Nom et prénom requis',
        v => v.length <= 50 || 'Maximum 50 caractères'
      ],
      emailRules: [
        v => !!v || 'Email requis',
        v => /.+@.+/.test(v) || 'L\'email doit être valide'
      ],
      objectRules: [
        v => !!v || 'Objet requis',
        v => v.length <= 60 || 'Maximum 60 caractères'
      ],
      messageRules: [
        v => !!v || 'Message requis',
        v => v.length <= 1000 || 'Maximum 1000 caractère'
      ]
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$recaptcha('login')
          .then(token => {
            console.log(token)
          })
          .catch(err => {
            console.log(err)
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
