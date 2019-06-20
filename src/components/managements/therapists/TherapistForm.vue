<template>
  <div
    id="therapistForm"
    class="add-therapist"
  >
    <v-form
      ref="form"
      v-model="valid"
      class="form-input-box"
    >
      <p v-if="isAdmin()">
        Un ergothérapeute ne fait parti que d'un seul cabinet. En temps qu'administrateur,
        vous pouvez modifier et supprimer l'ensemble des ergothérapeutes. <strong>Soyez prudent !</strong>
        Vous pouvez ajouter un même ergothérapeute plusieurs fois pour l'associer à plusieurs cabinets.
      </p>
      <p v-else>
        En temps qu'utilisateur de la plateforme ASE - Section Genevoise,
        vous pouvez modifier les informations concernant les ergothérapeutes qui travaillent avec vous. Garder
        ces informations à jour permet aux patients de contacter un spécialiste plus facilement.
        Vous pouvez ajouter un même ergothérapeute plusieurs fois pour l'associer à plusieurs cabinets
      </p>
      <div class="information-box">
        <v-icon>person</v-icon>
        <v-text-field
          v-model="therapist.first_name"
          label="Prénom*"
          type="text"
          required
          :rules="firstNameRules"
        />
        <v-text-field
          v-model="therapist.last_name"
          type="text"
          label="Nom*"
          required
          :rules="lastNameRules"
        />
        <div class="combo-box">
          <v-select
            v-model="therapist.title"
            :items="titles"
            label="Titre*"
            style="margin-right: 10px; width: 20px;"
            :rules="titleRules"
          />
          <v-checkbox
            v-model="therapist.home"
            color="green"
            label="Consultation à domicile"
          />
        </div>
      </div>
      <p>
        Chaque ergothérpeute doit au moin renseigner un numéro de téléphone et une adresse email.
        Vous pouvez ajouter plusieurs adresse email ou numéro de téléphone.
      </p>
      <div class="contacts-box">
        <div
          v-for="(_, i) in therapist.emails"
          :key="i"
          class="contacts-list"
        >
          <div class="delete-header-button ">
            <v-icon>email</v-icon>
            <v-btn
              v-if="therapist.emails.length > 1"
              icon
              @click="removeNewEmail(i)"
            >
              <v-icon
                color="red"
              >
                delete
              </v-icon>
            </v-btn>
          </div>
          <v-text-field
            v-model="therapist.emails[i]"
            type="email"
            label="Email*"
            required
            :rules="emailRules"
          />
        </div>
        <div class="new-entity">
          <span style="flex: 1;">Ajouter un nouvel email</span>
          <v-btn
            icon
            @click="addNewTherapistEmail"
          >
            <v-icon color="green">
              add
            </v-icon>
          </v-btn>
        </div>
      </div>
      <div class="contacts-box">
        <div
          v-for="(phone, i) in therapist.phones"
          :key="i"
          class="contacts-list"
        >
          <div class="delete-header-button ">
            <v-icon>contact_phone</v-icon>
            <v-btn
              v-if="therapist.phones.length > 1"
              icon
              @click="removeNewPhone(i)"
            >
              <v-icon
                color="red"
              >
                delete
              </v-icon>
            </v-btn>
          </div>
          <div class="combo-box">
            <v-select
              v-model="phone.type"
              :items="phonesType"
              label="Type de tel*"
              style="width: 20px;"
              :rules="phoneTypeRules"
            />
            <v-text-field
              v-model="phone.number"
              type="tel"
              label="Numéro*"
              style="margin-left: 10px"
              required
              :disabled="!phone.type"
              :rules="phoneRules"
            />
          </div>
        </div>
        <div class="new-entity">
          <span style="flex: 1;">Ajouter un nouveau numéro</span>
          <v-btn
            icon
            @click="addNewTherapistPhone"
          >
            <v-icon color="green">
              add
            </v-icon>
          </v-btn>
        </div>
      </div>
      <p>
        Chaque ergothérapeute est spécialisé dans un ou plusieurs domaines. Renseigner chacune de vos spécialités permet
        au patient de touver un ergothérapeute plus facilement.
      </p>
      <div class="category-box">
        <v-icon>category</v-icon>
        <div
          class="contacts-list"
        >
          <v-select
            v-model="therapist.categories"
            :items="categories"
            label="Catégories*"
            item-text="name"
            return-object
            flat
            chips
            multiple
            deletable-chips
            single-line
            small-chips
            :rules="categoriesRules"
            @change="selectCategories"
          />
        </div>
      </div>
      <div class="category-box">
        <v-icon>home</v-icon>
        <div
          class="contacts-list"
        >
          <v-select
            :value="offices[offices.map(o => o.id).indexOf(therapist.office_id)]"
            :items="offices"
            label="Associer à un cabinet*"
            item-text="name"
            return-object
            flat
            single-line
            :rules="officesRules"
            @change="selectOffice"
          />
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
          :disabled="disabled"
          @click="updateTherapist()"
        >
          Modifier l'ergothérapeute
        </v-btn>
        <v-btn
          v-else
          class="primary text-none"
          :disabled="disabled"
          @click="createTherapist()"
        >
          Créer l'ergothérapeute
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import admin from '../../../mixins/admin'
export default {
  name: 'TherapistsForm',
  mixins: [admin()],
  props: {
    categories: {
      type: Array,
      required: true
    },
    therapist: {
      type: Object,
      required: true
    },
    updateMode: {
      type: Boolean,
      required: true
    },
    offices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      titles: ['Mme.', 'M.', 'Dr.', 'Pr.'],
      phonesType: ['Tel.', 'Fax.', 'Pro.'],
      valid: false,
      disabled: false,
      firstNameRules: [
        v => !!v || 'Le prénom de l\'ergothérapeute est requis.',
        v => v.toString().length >= 3 || 'Minimum 3 caractères.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => /^[A-zÀ-ú][A-zÀ-ú-' ]+[A-zÀ-ú]$/.test(v) || 'Le prénom ne doit contenir aucun caractères spéciaux, excepté le trait d\'union. Ex: Jean-Luc.',
        v => v.toString().length <= 45 || 'Maximum 45 caractères.'
      ],
      lastNameRules: [
        v => !!v || 'Le nom de l\'ergothérapeute est requis.',
        v => v.toString().length >= 3 || 'Minimum 3 caractères.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => /^[A-zÀ-ú][A-zÀ-ú-' ]+[A-zÀ-ú]$/.test(v) || 'Le nom ne doit contenir aucun caractères spéciaux, excepté le trait d\'union. Ex: Alain.',
        v => v.toString().length <= 45 || 'Maximum 45 caractères.'
      ],
      emailRules: [
        v => !!v || 'Email requis',
        v => (/.+@.+/.test(v) && /\.[A-z]+$/.test(v)) || 'L\'email doit être valide.',
        v => (v.toString().length <= 250 && v.toString().length >= 5) || 'Le nombre de caractères doit être compris entre 5 et 250.'
      ],
      phoneRules: [
        v => !isNaN(v) || 'Le numéro de téléphone doit être composé que de nombres et sans espace. Ex : 0229876532.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => (v.toString().length === 7 || v.toString().length === 10 || v.toString().length === 11) || 'Le numéro n\'est pas valide. Ex : 0229876532.'
      ],
      categoriesRules: [
        v => v.length > 0 || 'Vous devez sélectionner au moins une catégorie.'
      ],
      officesRules: [
        v => !!v || 'Vous devez sélectionner un cabinet.'
      ],
      phoneTypeRules: [
        v => !!v || 'Vous devez sélectionner le type de numéros.'
      ],
      titleRules: [
        v => !!v || 'Vous devez sélectionner un titre.'
      ]
    }
  },
  methods: {
    createTherapist() {
      if (this.$refs.form.validate()) {
        this.disabled = true
        this.$http({
          method: 'POST',
          url: `${process.env.VUE_APP_API_URL}/therapists`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
          },
          data: {
            office_id: this.therapist.office_id,
            first_name: this.therapist.first_name,
            last_name: this.therapist.last_name,
            title: this.therapist.title,
            home: this.therapist.home,
            phones: this.therapist.phones,
            emails: this.therapist.emails,
            categories: this.therapist.categories.map(c => c.id)
          }
        }).then(response => {
          this.disabled = false
          this.$emit('create-therapist', response.data.data)
          this.reset()
          this.$store.commit('notification', { status: response.status, message: 'Ergothérapeute ajouté' })
        }).catch(err => {
          this.disabled = false
          this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
        })
      } else {
        this.$store.commit('notification', { status: 400, message: 'Toutes les données doivent être valide pour créer l\'ergothérapeute' })
      }
    },
    updateTherapist() {
      if (this.$refs.form.validate()) {
        this.disabled = true
        this.$http({
          method: 'PUT',
          url: `${process.env.VUE_APP_API_URL}/therapists/${this.therapist.id}`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
          },
          data: {
            office_id: this.therapist.office_id,
            first_name: this.therapist.first_name,
            last_name: this.therapist.last_name,
            title: this.therapist.title,
            home: this.therapist.home,
            phones: this.therapist.phones,
            emails: this.therapist.emails,
            categories: this.therapist.categories.map(c => c.id)
          }
        }).then(response => {
          this.disabled = false
          this.$emit('update-therapist', response.data.data)
          this.reset()
          this.$store.commit('notification', { status: response.status, message: 'Ergothérapeute modifié' })
        }).catch(err => {
          this.disabled = false
          this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
        })
      } else {
        this.$store.commit('notification', { status: 400, message: 'Toutes les données doivent être valide pour modifier l\'ergothérapeute' })
      }
    },
    reset() {
      this.$refs.form.resetValidation()
      this.$emit('reset', false)
    },
    addNewTherapistEmail() {
      this.$emit('add-email')
    },
    addNewTherapistPhone() {
      this.$emit('add-phone')
    },
    removeNewEmail(id) {
      this.$emit('remove-email', id)
    },
    removeNewPhone(id) {
      this.$emit('remove-phone', id)
    },
    selectCategories(selectedCategories) {
      this.$emit('selected-categories', selectedCategories)
    },
    selectOffice(selectedOffice) {
      this.$emit('selected-office', selectedOffice)
    }
  }
}
</script>

<style scoped>
    .add-therapist {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 10px 10px 10px 10px;
    }

    .add-email {
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        padding: 10px 10px 10px 10px;
        margin: 10px 0 25px 0;
    }

    .contacts-list {
        display: flex;
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

    .combo-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .delete-header-button {
        display: flex;
        align-items: center;
    }

    .contacts-box {
        background: #bbdefb;
        border-radius: 5px;
        margin: 10px 0 15px 0;
    }

    .category-box {
        background: #bbdefb;
        border-radius: 5px;
        padding: 10px 10px 10px 10px;
        margin: 10px 0 15px 0;
    }

    .new-entity {
        background: #cfd8dc;
        display: flex;
        align-items: center;
        padding: 0 0 0 10px;
    }

    .submit {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media screen and (max-width: 500px){
      .submit {
        flex-direction: column;
      }
    }
</style>
