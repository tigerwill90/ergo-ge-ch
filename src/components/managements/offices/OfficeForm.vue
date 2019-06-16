<template>
  <div
    id="officeForm"
    class="add-offices"
  >
    <v-form
      ref="form"
      v-model="valid"
      class="form-input-box"
    >
      <p v-if="isAdmin()">
        Le nom du cabinet est un identifiant unique. En temps qu'administrateur,
        vous pouvez modifier et supprimer l'ensemble des cabinets. <strong>Soyez prudent !</strong>
      </p>
      <p v-else>
        Le nom du cabinet est un identifiant unique. En temps qu'utilisateur de la plateforme ASE - Section Genevoise,
        vous pouvez modifier les informations concernant votre cabinet. Si vous souhaitez ajouter ou supprimer des cabinets,
        merci d'envoyer une demande via le formulaire de contact.
      </p>
      <div class="information-box">
        <v-icon>contact_mail</v-icon>
        <v-text-field
          v-model="office.name"
          label="Nom du cabinet*"
          type="text"
          required
          :rules="nameRules"
        />
        <v-text-field
          v-model="office.email"
          type="email"
          label="Email*"
          required
          :rules="emailRules"
        />
      </div>
      <p>
        Ajouter un ou plusieur nouveau lieu au cabinet.
        Chaque cabinet possède au moin un lieu. Les informations que vous renseigner
        aide les patients à vous trouver plus facilement. <strong>Soyez précis !</strong>
      </p>
      <div class="contacts-box">
        <div
          v-for="(contact, i) in office.contacts"
          :key="i"
          class="contacts-information"
        >
          <div class="contact-header-button">
            <v-icon>location_city</v-icon>
            <v-btn
              v-if="office.contacts.length > 1"
              icon
              @click="removeNewOfficeContact(i)"
            >
              <v-icon
                color="red"
              >
                delete
              </v-icon>
            </v-btn>
          </div>
          <v-text-field
            v-model="contact.street"
            type="text"
            label="Adresse et n°*"
            required
            :rules="streetRules"
          />
          <v-text-field
            v-model="contact.city"
            type="text"
            label="Ville*"
            required
            :rules="cityRules"
          />
          <div class="combo-box">
            <v-text-field
              v-model="contact.npa"
              type="text"
              label="Code postal*"
              style="margin-right: 10px"
              required
              :rules="npaRules"
            />
            <v-text-field
              v-model="contact.cp"
              type="text"
              label="Case postal"
              :rules="cpRules"
            />
          </div>
          <div class="combo-box">
            <v-text-field
              v-model="contact.phone"
              type="tel"
              label="Tél"
              style="margin-right: 10px"
              :rules="phoneRules"
            />
            <v-text-field
              v-model="contact.fax"
              type="tel"
              label="Fax"
              :rules="faxRules"
            />
          </div>
        </div>
        <div class="new-contact">
          <span style="flex: 1;">Ajouter un nouveau contact</span>
          <v-btn
            icon
            @click="addNewOfficeContact"
          >
            <v-icon color="green">
              add
            </v-icon>
          </v-btn>
        </div>
      </div>
      <div class="submit">
        <v-btn
          class="warning text-none"
          @click="reset()"
        >
          Annuler
        </v-btn>
        <v-btn
          v-if="updateMode"
          class="primary text-none"
          @click="updateOffice()"
        >
          Modifier le cabinet
        </v-btn>
        <v-btn
          v-else
          class="primary text-none"
          @click="createOffice()"
        >
          Créer le cabinet
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
import admin from '../../../mixins/admin'
export default {
  name: 'OfficeForm',
  mixins: [admin()],
  props: {
    office: {
      type: Object,
      required: true
    },
    updateMode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      nameRules: [
        v => !!v || 'Le nom du cabinet est requis.',
        v => v.toString().length >= 3 || 'Minimum 3 caractères.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => /^[A-zÀ-ú0-9][A-zÀ-ú- 0-9]+[A-zÀ-ú0-9]$/.test(v) || 'Le nom du cabinet ne doit contenir aucun caractères spéciaux, excepté le trait d\'union. Ex : O-Clair9.',
        v => v.toString().length <= 45 || 'Maximum 45 caractères.'
      ],
      emailRules: [
        v => !!v || 'Email requis',
        v => (/.+@.+/.test(v) && /\.[A-z]+$/.test(v)) || 'L\'email doit être valide.',
        v => v.toString().length <= 250 || 'Maximum 250 caractères.'
      ],
      streetRules: [
        v => !!v || 'Le nom de la rue est requis.',
        v => v.toString().length >= 5 || 'Minimum 5 caractères.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => /^[A-zÀ-ú-., ]+[ ][0-9]+(?:[ A-zÀ-ú])*$/.test(v) || 'L\'adresse n\'est pas valide, Ex : Rue de la Coratrie 17.',
        v => v.toString().length <= 80 || 'Maximum 80 caractères.'
      ],
      cityRules: [
        v => !!v || 'Le nom de la ville est requis.',
        v => v.toString().length >= 2 || 'Minimum 2 caractères.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => /^[A-zÀ-ú- /]+[A-zÀ-ú]$/.test(v) || 'Les caractères spéciaux ne sont pas admis.',
        v => v.toString().length <= 45 || 'Maximum 45 caractères.'
      ],
      npaRules: [
        v => !!v || 'Le code postal est requis.',
        v => v.toString().length >= 2 || 'Minimum 2 caractères.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => !isNaN(v) || 'Le code postal est composé uniquement de nombre.',
        v => v.toString().length <= 10 || 'Maximum 10 caractères.'
      ],
      cpRules: [
        v => (!v || v.toString().length >= 2) || 'Minimum 2 caractères.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => (/^[0-9][0-9-]*[0-9]+$/.test(v) || !v) || 'La case postal est composé uniquement de nombre et d\'un ou plusieurs trait d\'union.',
        v => (!v || v.toString().length <= 10) || 'Maximum 10 caractères.'
      ],
      phoneRules: [
        v => (!isNaN(v) || !v) || 'Le numéro de téléphone doit être composé que de nombres et sans espace. Ex : 0229876532.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => (!v || (v.toString().length === 7 || v.toString().length === 10 || v.toString().length === 11)) || 'Le numéro n\'est pas valide. Ex : 0229876532.'
      ],
      faxRules: [
        v => (!isNaN(v) || !v) || 'Le numéro de fax doit être composé que de nombres et sans espace. Ex : 0229876532.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => (!v || (v.toString().length === 7 || v.toString().length === 10 || v.toString().length === 11)) || 'Le numéro n\'est pas valide. Ex : 0229876532.'
      ]
    }
  },
  methods: {
    reset() {
      this.$refs.form.resetValidation()
      this.$emit('reset', !this.isAdmin())
    },
    addNewOfficeContact() {
      this.$emit('add-contact')
    },
    removeNewOfficeContact(id) {
      this.$emit('remove-contact', id)
    },
    cleanData() {
      this.$emit('clean-data')
    },
    createOffice() {
      if (this.$refs.form.validate()) {
        this.cleanData()
        this.$http({
          method: 'POST',
          url: `${process.env.VUE_APP_API_URL}/offices`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
          },
          data: this.office
        })
          .then(response => {
            this.$emit('create-office', response.data.data)
            this.reset()
            this.$store.commit('notification', { status: response.status, message: 'Cabinet ajouté' })
          })
          .catch(err => {
            this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
          })
      } else {
        this.$store.commit('notification', { status: 400, message: 'Toutes les données doivent être valide pour créer le cabinet' })
      }
    },
    updateOffice() {
      if (this.$refs.form.validate()) {
        this.cleanData()
        this.$http({
          method: 'PUT',
          url: `${process.env.VUE_APP_API_URL}/offices/${this.office.id}`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
          },
          data: this.office
        })
          .then(response => {
            this.$emit('update-office', response.data.data)
            this.reset()
            this.$store.commit('notification', { status: response.status, message: 'Cabinet modifié' })
          })
          .catch(err => {
            this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
          })
      } else {
        this.$store.commit('notification', { status: 400, message: 'Toutes les données doivent être valide pour modifier le cabinet' })
      }
    }
  }
}
</script>

<style scoped>

    .add-offices {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 10px 10px 10px 10px;
    }

    .form-input-box {
        max-width: 550px;
    }

    .information-box {
        padding: 10px 10px 10px 10px;
        background: #bbdefb;
        border-radius: 5px;
        margin: 10px 0 25px 0;
    }

    .contacts-box {
        background: #bbdefb;
        border-radius: 5px;
        margin: 10px 0 15px 0;
    }

    .contact-header-button {
        display: flex;
        align-items: center;
    }

    .combo-box {
        display: flex;
        align-items: center;
    }

    .new-contact {
        background: #cfd8dc;
        display: flex;
        align-items: center;
        padding: 0 0 0 10px;
    }

    .contacts-information {
        padding: 10px 10px 10px 10px;
    }

    .submit {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media screen and (max-width: 1280px) {
        .add-offices {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 50px 10px 10px 10px;
            align-items: center;
        }
    }

  @media screen and (max-width: 500px){
    .submit {
      flex-direction: column;
    }
  }

</style>
