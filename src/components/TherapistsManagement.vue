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
              Le nom du cabinet un identifiant unique. En temps qu'administrateur,
              vous pouvez modifier et supprimer l'ensemble des cabinets. <strong>Soyez prudent !</strong>
            </p>
            <p v-else>
              Le nom du cabinet un identifiant unique. En temps qu'utilisateur de la plateforme ASE - Section Genevoise,
              vous pouvez modifier les informations concernant votre cabinet. Si vous souhaitez ajouter ou supprimer des cabinets,
              merci d'envoyer une demande via le formulaire de contact.
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
                  label="Sélectionner un titre"
                  style="margin-right: 10px"
                  @change="t => title = t"
                />
                <v-checkbox
                  v-model="home"
                  label="Consultation à domicile"
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
                      <div class="emails-list">
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
      first_name: '',
      last_name: '',
      home: false,
      valid: false,
      panel: [true]
    }
  },
  mounted() {
    // Fetch office
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

  .therapist-action {
    flex: 1;
    display: flex;
    align-items: center;
    min-height: 40px;
    margin-left: 8px;
  }

  .emails-list {
    display: flex;
    flex-direction: column;
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
  }
</style>
