<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
  >
    <article
      class="article-content"
    >
      <span class="app-section-title title-1">Gestion des cabinets</span>
      <div class="offices-panel">
        <div class="add-offices">
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
                v-model="name"
                label="Nom du cabinet"
                type="text"
                required
                :rules="nameRules"
              />
              <v-text-field
                v-model="email"
                type="email"
                label="Email"
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
                v-for="(contact, i) in contacts"
                :key="i"
                class="contacts-information"
              >
                <div class="contact-header-button">
                  <v-icon>location_city</v-icon>
                  <v-btn
                    v-if="contacts.length > 1"
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
                  label="Adresse et n°"
                  required
                  :rules="streeRules"
                />
                <v-text-field
                  v-model="contact.city"
                  type="text"
                  label="Ville"
                  required
                  :rules="cityRules"
                />
                <div class="combo-box">
                  <v-text-field
                    v-model="contact.npa"
                    type="text"
                    label="Code postal"
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
                class="warning"
                @click="reset()"
              >
                Annuler
              </v-btn>
              <v-btn
                v-if="updateMode"
                class="primary"
                @click="updateOffice()"
              >
                Modifier le cabinet
              </v-btn>
              <v-btn
                v-else
                class="primary"
                @click="createOffice()"
              >
                Créer le cabinet
              </v-btn>
            </div>
          </v-form>
        </div>
        <div class="list-office">
          <v-card>
            <v-expansion-panel
              v-model="panel"
              expand
            >
              <v-expansion-panel-content
                v-for="(office,i) in offices"
                :key="i"
              >
                <template v-slot:actions>
                  <v-icon>
                    $vuetify.icons.expand
                  </v-icon>
                </template>
                <template v-slot:header>
                  <div>
                    {{ office.name }}
                  </div>
                </template>
                <v-card>
                  <div class="office-list-box">
                    <div class="office-list-action">
                      <div class="office-email">
                        <v-icon style="margin-right: 5px">
                          email
                        </v-icon>
                        <span>{{ office.email }}</span>
                      </div>
                      <div class="office-action">
                        <v-btn
                          color="primary"
                          @click="prepareUpdate(office)"
                        >
                          Modifier
                        </v-btn>
                        <v-btn
                          color="warning"
                          @click="remove(office, i)"
                        >
                          Supprimer
                        </v-btn>
                      </div>
                    </div>
                    <div class="office-list-place">
                      <span
                        v-for="(contact, k) in office.contacts"
                        :key="k"
                      >
                        {{ contact.street }}, {{ contact.npa }} {{ contact.city }}
                      </span>
                    </div>
                  </div>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card>
        </div>
      </div>
    </article>
  </FlexContainer>
</template>
<script>
import admin from '../mixins/admin'
import FlexContainer from './FlexContainer'
export default {
  name: 'OfficesManagement',
  components: {
    FlexContainer
  },
  mixins: [admin()],
  data() {
    return {
      offices: [],
      id: -1,
      name: '',
      email: '',
      contacts: [],
      valid: false,
      panel: [true],
      updateMode: !this.isAdmin(),
      nameRules: [
        v => !!v || 'Le nom du cabinet est requis',
        v => (v.length <= 45 || v.length >= 3) || 'Le nombre de caractères doit être compris entre 3 et 45'
      ],
      emailRules: [
        v => !!v || 'Email requis',
        v => /.+@.+/.test(v) || 'L\'email doit être valide',
        v => (v.length <= 250 || v.length >= 5) || 'Le nombre de caractères doit être compris entre 5 et 250'
      ],
      streeRules: [
        v => !!v || 'Le nom de la rue est requis',
        v => (v.length <= 80 || v.length >= 5) || 'Le nombre de caractères doit être compris entre 5 et 80'
      ],
      cityRules: [
        v => !!v || 'Le nom de la ville est requis',
        v => (v.length <= 45 || v.length >= 2) || 'Le nombre de caractères doit être compris entre 2 et 45'
      ],
      npaRules: [
        v => !!v || 'Le code postal est requis',
        v => (v.length <= 10 || v.length >= 2) || 'Le nombre de caractères doit être compris entre 2 et 10'
      ],
      cpRules: [
        v => (!v || v.length <= 10 || v.length >= 2) || 'Le nombre de caractères doit être compris entre 2 et 10'
      ],
      phoneRules: [
        v => (!isNaN(v) || !v) || 'Le numéro de téléphone doit être composé que de nombres',
        v => (!v || v.length <= 45 || v.length >= 5) || 'Le nombre de caractères doit être compris entre 5 et 45'
      ],
      faxRules: [
        v => (!isNaN(v) || !v) || 'Le numéro de fax doit être composé que de nombres',
        v => (!v || v.length <= 45 || v.length >= 5) || 'Le nombre de caractères doit être compris entre 5 et 45'
      ]
    }
  },
  mounted() {
    // push a new contact, at least one is required
    this.contacts.push({
      city: '',
      cp: '',
      fax: '',
      npa: '',
      phone: '',
      street: ''
    })

    // Fetch office
    let url = `${process.env.VUE_APP_API_URL}/offices`
    if (!this.isAdmin()) {
      url = `${process.env.VUE_APP_API_URL}/users/${this.$store.getters.user.id}/offices`
    }
    this.$http.get(url)
      .then(response => {
        this.offices = response.data.data
      })
      .catch(err => {
        this.$store.commit('notification', { status: err.response.status, message: 'Impossible d\'afficher la liste des cabinets' })
      })
  },
  methods: {
    remove(office, id) {
      this.$http.delete(`${process.env.VUE_APP_API_URL}/offices/${office.id}`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
        }
      })
        .then(response => {
          this.offices.splice(id, 1)
          this.$store.commit('notification', { status: 200, message: `Le cabinet ${office.name} a bien été supprimé` })
        })
        .catch(err => {
          if (err.response.status === 401) {
          // TODO try to reconnect then delete authorization
            this.$store.commit('authorization', null)
            this.$store.commit('notification', { status: err.response.status, message: 'Session expirée, vous devez vous reconneter' })
          } else if (err.response.status === 409) {
            this.$store.commit('notification', { status: err.response.status, message: 'Ce cabinet contient des utilisateurs. Action interdite !' })
          } else {
            this.$store.commit('notification', { status: err.response.status, message: 'Oups, une erreur inattendu est survenu' })
          }
        })
    },
    reset() {
      this.$refs.form.resetValidation()
      this.id = -1
      this.name = ''
      this.email = ''
      this.contacts = [{
        city: '',
        cp: '',
        fax: '',
        npa: '',
        phone: '',
        street: ''
      }]
      this.updateMode = !this.isAdmin()
    },
    prepareUpdate(office) {
      this.id = office.id
      this.email = office.email
      this.name = office.name
      this.contacts = JSON.parse(JSON.stringify(office.contacts)) // clone array
      this.updateMode = true
    },
    addNewOfficeContact() {
      this.contacts.push({
        city: '',
        cp: '',
        fax: '',
        npa: '',
        phone: '',
        street: ''
      })
    },
    removeNewOfficeContact(id) {
      this.contacts.splice(id, 1)
    },
    createOffice() {
      if (this.$refs.form.validate()) {
        this.contacts.forEach(contact => {
          if (contact.cp === '') {
            delete contact.cp
          }
          if (contact.phone === '') {
            delete contact.phone
          }
          if (contact.fax === '') {
            delete contact.fax
          }
        })
        this.$http({
          method: 'POST',
          url: `${process.env.VUE_APP_API_URL}/offices`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
          },
          data: {
            name: this.name,
            email: this.email,
            contacts: this.contacts
          }
        })
          .then(response => {
            this.reset()
            this.offices.push(response.data.data)
            this.$store.commit('notification', { status: response.status, message: 'Office ajoutée' })
          })
          .catch(err => {
            if (err.response.status === 401) {
              // TODO try to reconnect then delete authorization
              this.$store.commit('authorization', null)
              this.$store.commit('notification', { status: err.response.status, message: 'Session expirée, vous devez vous reconneter' })
            } else if (err.response.status === 409) {
              this.$store.commit('notification', { status: err.response.status, message: 'L\'adresse email ou le nom du cabinet existe déjà' })
            } else {
              this.$store.commit('notification', { status: err.response.status, message: 'Oups, une erreur inattendu est survenu' })
            }
          })
      }
    },
    updateOffice() {
      if (this.$refs.form.validate()) {
        this.contacts.forEach(contact => {
          if (contact.cp === '') {
            delete contact.cp
          }
          if (contact.phone === '') {
            delete contact.phone
          }
          if (contact.fax === '') {
            delete contact.fax
          }
        })
      }
      this.$http({
        method: 'PUT',
        url: `${process.env.VUE_APP_API_URL}/offices/${this.id}`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
        },
        data: {
          name: this.name,
          email: this.email,
          contacts: this.contacts
        }
      })
        .then(response => {
          this.$refs.form.resetValidation()
          this.email = ''
          this.name = ''
          this.contacts = [{
            city: '',
            cp: '',
            fax: '',
            npa: '',
            phone: '',
            street: ''
          }]
          const pos = this.offices.map(office => office.id).indexOf(this.id)
          this.offices.splice(pos, 1, response.data.data)
          this.$store.commit('notification', { status: response.status, message: 'Office ajoutée' })
        })
        .catch(err => {
          if (err.response.status === 401) {
            // TODO try to reconnect then delete authorization
            this.$store.commit('authorization', null)
            this.$store.commit('notification', { status: err.response.status, message: 'Session expirée, vous devez vous reconneter' })
          } else if (err.response.status === 409) {
            this.$store.commit('notification', { status: err.response.status, message: 'L\'adresse email ou le nom du cabinet existe déjà' })
          } else {
            this.$store.commit('notification', { status: err.response.status, message: 'Oups, une erreur inattendu est survenu' })
          }
        })
    }
  }
}
</script>
<style scoped>
  .article-content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .offices-panel {
    display: flex;
    flex: 1;
  }

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

  .add-contact-pannel {
    display: flex;
    align-items: center;    flex-direction: column;
    justify-content: space-between;
    padding: 10px 10px 10px 10px;
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

  .list-office {
    flex: 1;
    padding: 10px 10px 10px 10px;
  }

  .office-list-box {
    margin: 10px 20px 10px 20px;
    display: flex;
  }

  .office-list-action {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
  }

  .office-list-place {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .office-email {
    display: flex;
    align-items: center;
    height: 40px;
    margin-left: 8px;
  }

  .office-action {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 1280px) {
    .offices-panel {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .add-offices {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 10px 10px 10px 10px;
      align-items: center;
    }
  }

</style>
