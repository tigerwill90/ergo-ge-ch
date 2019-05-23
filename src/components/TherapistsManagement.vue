<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
  >
    <article class="article-content">
      <span class="app-section-title title-1">Gestion des cabinets</span>
      <div class="therapists-panel">
        <div class="add-therapist">
          <v-form
            ref="form"
            v-model="valid"
            class="form-input-box"
          >
            <p v-if="isAdmin()">
              Les ergothérapeutes font parti d'un ou plusieurs cabinet. En temps qu'administrateur,
              vous pouvez modifier et supprimer l'ensemble des ergothérapeutes. <strong>Soyez prudent !</strong>
            </p>
            <p v-else>
              En temps qu'utilisateur de la plateforme ASE - Section Genevoise,
              vous pouvez modifier les informations concernant les ergothérapeutes qui travaillent avec vous. Garder
              ces informations à jour permet aux patients de contacter un spécialiste plus facilement.
            </p>
            <div class="information-box">
              <v-icon>person</v-icon>
              <v-text-field
                v-model="first_name"
                label="Prénom"
                type="text"
                required
              />
              <v-text-field
                v-model="last_name"
                type="text"
                label="Nom"
                required
              />
              <div class="combo-box">
                <v-select
                  v-model="title"
                  :items="titles"
                  label="Titre"
                  style="margin-right: 10px; width: 20px;"
                  @change="t => title = t"
                />
                <v-checkbox
                  v-model="home"
                  label="Consultation à domicile"
                />
              </div>
            </div>
            <p>
              Chaque ergothérpeute doit au moin renseigner un numéro de téléphone est une adresse email.
              Vous pouvez ajouter plusieurs adresse email ou numéro de téléphone.
            </p>
            <div class="contacts-box">
              <div
                v-for="(email, i) in emails"
                :key="i"
                class="contacts-list"
              >
                <div class="delete-header-button ">
                  <v-icon>email</v-icon>
                  <v-btn
                    v-if="emails.length > 1"
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
                  v-model="emails[i]"
                  type="email"
                  label="Email"
                  required
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
                v-for="(phone, i) in phones"
                :key="i"
                class="contacts-list"
              >
                <div class="delete-header-button ">
                  <v-icon>contact_phone</v-icon>
                  <v-btn
                    v-if="phones.length > 1"
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
                    label="Type de tel"
                    style="width: 20px;"
                    @change="t => phone.type = t"
                  />
                  <v-text-field
                    v-model="phone.number"
                    type="tel"
                    label="Numéro"
                    style="margin-left: 10px"
                    required
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
            <div class="contacts-box">
              <div
                class="contacts-list"
              >
                <v-select
                  :items="categoriesList"
                  label="Catégories"
                  item-text="name"
                  item-value="name"
                  flat
                  chips
                  multiple
                  deletable-chips
                  single-line
                  attach
                  small-chips
                  @change="selectCategories"
                />
              </div>
            </div>
          </v-form>
        </div>
        <div class="therapist-panel">
          <v-select
            v-model="offices[0]"
            :items="offices"
            item-text="name"
            return-object
            label="Sélectionner un cabinet"
            @change="selected"
          />
          <v-card>
            <v-expansion-panel
              v-model="panel"
              expand
            >
              <v-expansion-panel-content
                v-for="(therapist,i) in therapists"
                :key="i"
              >
                <template v-slot:actions>
                  <v-icon>
                    $vuetify.icons.expand
                  </v-icon>
                </template>
                <template v-slot:header>
                  <div>
                    {{ therapist.title }} {{ therapist.first_name }} {{ therapist.last_name }}
                  </div>
                </template>
                <v-card>
                  <div class="therpist-box">
                    <div class="therapist-action">
                      <v-icon style="margin-right: 5px">
                        email
                      </v-icon>
                      <div class="contacts-email-list">
                        <span
                          v-for="(email, e) in therapist.emails"
                          :key="e"
                        >{{ email }}</span>
                      </div>
                    </div>
                    <div class="action">
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
  name: 'TherapistsManagement',
  components: {
    FlexContainer
  },
  mixins: [admin()],
  data() {
    return {
      therapists: [],
      offices: [],
      titles: ['Mme.', 'M.', 'Dr.', 'Pr.'],
      title: '',
      phonesType: ['tel', 'fax', 'pro'],
      first_name: '',
      last_name: '',
      emails: [],
      phones: [],
      categoriesList: [],
      categories: [],
      home: false,
      valid: false,
      panel: [true]
    }
  },
  mounted() {
    // Fetch office
    this.emails.push('')
    this.categories.push('')
    this.phones.push({ type: '', number: '' })

    // fetch offices and therapists
    let url = `${process.env.VUE_APP_API_URL}/offices`
    if (!this.isAdmin()) {
      url = `${process.env.VUE_APP_API_URL}/users/${this.$store.getters.user.id}/offices`
    }
    this.$http.get(url)
      .then(response => {
        this.offices = response.data.data
        this.$http.get(`${process.env.VUE_APP_API_URL}/offices/${this.offices[0].id}/therapists`)
          .then(response => {
            this.therapists = response.data.data
          })
          .catch(err => {
            this.$store.commit('notification', { status: err.response.status, message: 'Impossible d\'afficher cette ergothérapeute' })
          })
      })
      .catch(err => {
        this.$store.commit('notification', { status: err.response.status, message: 'Impossible d\'afficher la liste des cabinets' })
      })

    // fetch categories
    this.$http.get(`${process.env.VUE_APP_API_URL}/categories`)
      .then(response => {
        this.categoriesList = response.data.data
      })
      .catch(err => {
        this.$store.commit('notification', { status: err.response.status, message: 'Impossible d\'afficher la liste des catégories' })
      })
  },
  methods: {
    selected(selectedOffice) {
      this.$http.get(`${process.env.VUE_APP_API_URL}/offices/${selectedOffice.id}/therapists`)
        .then(response => {
          this.therapists = response.data.data
        })
        .catch(err => {
          this.$store.commit('notification', { status: err.response.status, message: 'Impossible d\'afficher cet ergothérapeute' })
        })
    },
    addNewTherapistEmail() {
      this.emails.push('')
    },
    addNewTherapistPhone() {
      this.phones.push({ type: '', number: '' })
    },
    removeNewEmail(id) {
      this.emails.splice(id, 1)
    },
    removeNewPhone(id) {
      this.phones.splice(id, 1)
    },
    selectCategories(selectedCategories) {
      this.categories = selectedCategories
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

  .therapists-panel {
    display: flex;
    flex: 1;
  }

  .add-therapist {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
  }

  .therapist-panel{
    flex: 1;
    padding: 10px 10px 10px 10px;
    flex-direction: columns;
  }

  .therpist-box {
    display: flex;
    margin: 10px 20px 10px 20px;
    flex-direction: column;
  }

  .add-email {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 10px 10px 10px 10px;
    margin: 10px 0 25px 0;
  }

  .therapist-action {
    flex: 1;
    display: flex;
    align-items: center;
    min-height: 40px;
    margin-left: 8px;
  }

  .contacts-email-list {
    display: flex;
    flex-direction: column;
  }

  .contacts-list {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
  }

  .action {
    display: flex;
    align-items: center;
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

  .new-entity {
    background: #cfd8dc;
    display: flex;
    align-items: center;
    padding: 0 0 0 10px;
  }
</style>
