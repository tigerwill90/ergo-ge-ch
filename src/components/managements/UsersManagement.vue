<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
  >
    <article
      id="userForm"
      class="users-content-article"
    >
      <span class="app-section-title title-1">Gestion des utilisateurs</span>
      <div class="users-content-section">
        <section class="users-form-section">
          <v-form
            ref="form"
            v-model="valid"
          >
            <p>
              Les utilisateurs de la plateforme ASE peuvent modifier leur information personnel ainsi que celle
              relative à leur cabinet et aux ergothérapeute qui y travaille. Il existe deux type de privilèges : administrateur et normal.
              Les actions que peuvent exécuter les utilisateurs normal sont restreints aux données qui les concernes.
            </p>
            <div>
              <v-text-field
                v-model="targetUser.first_name"
                label="Prénom*"
                type="text"
                required
                :rules="userFirstNameRules"
              />
              <v-text-field
                v-model="targetUser.last_name"
                label="Nom*"
                type="text"
                required
                :rules="userLastNameRules"
              />
              <v-text-field
                v-model="targetUser.email"
                label="Email*"
                type="email"
                required
                :rules="userEmailRules"
              />
              <v-select
                v-model="selectedModelRole"
                :items="roles"
                label="Role*"
                :rules="userRoleRules"
                @change="selectedRoles"
              />
              <v-select
                v-model="selectedModelOffice"
                :items="offices"
                label="Associer des cabinets"
                item-text="name"
                return-object
                flat
                chips
                multiple
                deletable-chips
                single-line
                small-chips
                @change="selectedOffices"
              />
            </div>
            <div>
              <v-btn
                class="text-none ma-1"
                color="warning"
                @click="reset('users')"
              >
                Annuler
              </v-btn>
              <v-btn
                v-if="!updateMode"
                class="text-none ma-1"
                color="primary"
                :disabled="disabled"
                @click="create()"
              >
                Créer l'utilisateur
              </v-btn>
              <v-btn
                v-else
                color="primary"
                class="text-none ma-1"
                :disabled="disabled"
                @click="update()"
              >
                Modifier l'utilisateur
              </v-btn>
            </div>
          </v-form>
        </section>
        <section class="users-list-section">
          <v-card
            v-if="users.length > 0"
            max-width="500px"
            width="100%"
          >
            <v-list two-line>
              <template
                v-for="(user, i) in users"
              >
                <v-list-item
                  :key="`tile-${i}`"
                  r
                  @click="prepareUpdate(user)"
                >
                  <v-list-item-avatar>
                    <v-icon
                      v-if="user.active"
                      :color="userIconColor(user)"
                    >
                      person
                    </v-icon>
                    <v-icon v-else>
                      person_outline
                    </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ user.first_name }} {{ user.last_name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <b
                        v-if="user.active"
                        style="color: green"
                      >Compte activé</b>
                      <b
                        v-else
                        style="color: red"
                      >Compte désactivé</b>
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                      icon
                      ripple
                      @click="openDialog(user, i)"
                    >
                      <v-icon color="grey lighten-1">
                        delete
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider
                  v-if="i < users.length - 1"
                  :key="i"
                />
              </template>
            </v-list>
          </v-card>
        </section>
      </div>
    </article>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">
          Supprimer l'utilisateur {{ userToDelete.first_name }} {{ userToDelete.last_name }} ?
        </v-card-title>
        <v-card-text>
          Les données relatives au cabinet de cet utilisateur seront conservées mais il ne pourra plus les administrer.
          Cette opération est irréversible.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            class="text-none ma-1"
            text
            @click="dialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="warning"
            class="text-none ma-1"
            text
            @click="remove()"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </FlexContainer>
</template>
<script>
import admin from '../../mixins/admin'
import FlexContainer from '../FlexContainer'
export default {
  name: 'UsersManagement',
  components: {
    FlexContainer
  },
  mixins: [admin()],
  props: {
    users: {
      type: Array,
      required: true
    },
    offices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      userToDelete: {},
      rowIdToDelete: -1,
      valid: false,
      roles: ['Administrateur', 'Utilisateur'],
      disabled: false,
      targetUser: {
        first_name: '',
        last_name: '',
        email: '',
        roles: [],
        offices_id: null
      },
      selectedModelOffice: null,
      selectedModelRole: '',
      updateMode: false,
      userFirstNameRules: [
        v => !!v || 'Le prénom de l\'utilisateur est requis.',
        v => v.toString().length >= 3 || 'Minimum 3 caractères.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => /^[A-zàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ][A-z-' àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]*[A-zàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]$/.test(v) || 'Le prénom ne doit contenir aucun caractères spéciaux, excepté "-" et "\'". Ex: Jean-Luc.',
        v => v.toString().length <= 45 || 'Maximum 45 caractères.'
      ],
      userLastNameRules: [
        v => !!v || 'Le nom de l\'utilisateur est requis.',
        v => v.toString().length >= 3 || 'Minimum 3 caractères.',
        v => !/\s+$/.test(v) || 'Espace en fin de champ interdit.',
        v => /^[A-zàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ][A-z-' àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+[A-zàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]$/.test(v) || 'Le nom ne doit contenir aucun caractères spéciaux, excepté "-" et "\'". Ex: Alain.',
        v => v.toString().length <= 45 || 'Maximum 45 caractères.'
      ],
      userEmailRules: [
        v => !!v || 'Email requis',
        v => (/.+@.+/.test(v) && /\.[A-z]+$/.test(v)) || 'L\'email doit être valide.',
        v => (v.toString().length <= 250 && v.toString().length >= 5) || 'Le nombre de caractères doit être compris entre 5 et 250.'
      ],
      userRoleRules: [
        v => v.length > 0 || 'Vous devez sélectionner un role'
      ]
    }
  },
  methods: {
    openDialog(user, id) {
      this.dialog = true
      this.userToDelete = user
      this.rowIdToDelete = id
    },
    prepareUpdate(user) {
      this.reset('userForm')
      this.updateMode = true
      this.targetUser = JSON.parse(JSON.stringify(user))
      if (this.targetUser.roles.some(role => role === 'admin')) {
        this.selectedModelRole = 'Administrateur'
      } else {
        this.selectedModelRole = 'Utilisateur'
      }
      this.selectedModelOffice = this.offices.filter(office => user.offices_id && user.offices_id.includes(office.id))
    },
    update() {
      if (this.$refs.form.validate()) {
        this.disabled = true
        if (this.targetUser.offices_id === null) {
          delete this.targetUser.offices_id
        }
        this.$http({
          method: 'PATCH',
          url: `${process.env.VUE_APP_API_URL}/users/${this.targetUser.id}`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
          },
          data: this.targetUser
        }).then(response => {
          this.disabled = false
          this.$emit('update-user', response.data.data)
          this.reset('users')
          this.$store.commit('notification', { status: response.status, message: 'Utilisateur modifié' })
        }).catch(err => {
          this.disabled = false
          this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
        })
      } else {
        this.$store.commit('notification', { status: 400, message: 'Toutes les données doivent être valide pour modifier l\'utilisateur' })
      }
    },
    create() {
      if (this.$refs.form.validate()) {
        this.disabled = true
        if (this.targetUser.offices_id === null) {
          delete this.targetUser.offices_id
        }
        this.$http({
          method: 'POST',
          url: `${process.env.VUE_APP_API_URL}/users`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
          },
          data: this.targetUser
        }).then(response => {
          this.disabled = false
          this.$emit('create-user', response.data.data)
          this.reset('users')
          this.$store.commit('notification', { status: response.status, message: 'Utilisateur ajouté' })
        }).catch(err => {
          this.disabled = false
          this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
        })
      } else {
        this.$store.commit('notification', { status: 400, message: 'Toutes les données doivent être valide pour créer l\'utilisateur' })
      }
    },
    reset(to) {
      this.$refs.form.resetValidation()
      this.targetUser = {
        first_name: '',
        last_name: '',
        email: '',
        roles: [],
        offices_id: null
      }
      this.selectedModelOffice = null
      this.selectedModelRole = ''
      this.updateMode = false
      this.goTo(to)
    },
    remove() {
      this.$http.delete(`${process.env.VUE_APP_API_URL}/users/${this.userToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
        }
      })
        .then(() => {
          this.dialog = false
          this.$emit('remove-user', this.rowIdToDelete)
          this.$store.commit('notification', { status: 200, message: `L'utilisateur ${this.userToDelete.first_name} ${this.userToDelete.last_name} a bien été supprimé` })
        })
        .catch(err => {
          this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
        })
    },
    selectedOffices(offices) {
      if (offices && offices.length > 0) {
        this.targetUser.offices_id = offices.map(office => office.id)
        return
      }
      this.targetUser.offices_id = null
    },
    selectedRoles(role) {
      if (role === 'Administrateur') {
        this.targetUser.roles = ['admin']
      } else {
        this.targetUser.roles = ['user']
      }
    },
    userIconColor(user) {
      if (user.roles.includes('admin')) {
        return '#b71c1c'
      }
      return '#9E9E9E'
    },
    goTo(to) {
      this.$store.commit('selector', {
        hash: '#' + to,
        routeName: this.$router.currentRoute.name
      })
    }
  }
}
</script>
<style scoped>
  .users-content-article {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .users-content-section {
    display: flex;
    width: 100%;
  }

  .users-form-section {
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-right: 25px;
  }

  .users-list-section {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: flex-start;
  }
</style>
