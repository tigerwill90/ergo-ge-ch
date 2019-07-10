<template>
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
                <div
                  v-if="$store.getters.windowSize.x > 450 && office.email"
                  class="office-email"
                >
                  <v-icon style="margin-right: 5px">
                    email
                  </v-icon>
                  <span class="email-text">
                    <a :href="'mailto:' + office.email">{{ office.email }}</a>
                  </span>
                </div>
                <div class="office-action">
                  <v-btn
                    v-if="$store.getters.windowSize.x >= 500"
                    color="primary"
                    class="text-none"
                    @click="$emit('prepare-update', office)"
                  >
                    Modifier
                  </v-btn>
                  <v-btn
                    v-else
                    icon
                    color="primary"
                    @click="$emit('prepare-update', office)"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="isAdmin() && $store.getters.windowSize.x >= 500"
                    color="warning"
                    class="text-none"
                    @click="openDialog(office, i)"
                  >
                    Supprimer
                  </v-btn>
                  <v-btn
                    v-if="isAdmin() && $store.getters.windowSize.x < 500"
                    icon
                    color="warning"
                    @click="openDialog(office, i)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </div>
              </div>
              <div
                v-if="$store.getters.windowSize.x >= 900"
                class="office-list-place"
              >
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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">
          Supprimer le cabinet {{ officeToDelete.name }}
        </v-card-title>
        <v-card-text>
          Seuls les cabinets qui ne contiennent aucun ergothérapeute peuvent être supprimé. Cette opération est irréversible.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary text-none"
            flat
            @click="dialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            color="warning text-none"
            flat
            @click="remove()"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import admin from '../../../mixins/admin'
export default {
  name: 'OfficesList',
  mixins: [admin()],
  props: {
    offices: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      panel: [true],
      dialog: false,
      officeToDelete: -1,
      rowIdToDelete: -1
    }
  },
  methods: {
    remove() {
      this.$http.delete(`${process.env.VUE_APP_API_URL}/offices/${this.officeToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
        }
      })
        .then(() => {
          this.dialog = false
          this.$emit('remove-office', this.rowIdToDelete)
          this.$store.commit('notification', { status: 200, message: `Le cabinet ${this.officeToDelete.name} a bien été supprimé` })
        })
        .catch(err => {
          this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
        })
    },
    openDialog(office, id) {
      this.dialog = true
      this.officeToDelete = office
      this.rowIdToDelete = id
    }
  }
}
</script>

<style scoped>
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
        margin: 0 0 5px 8px;
    }

    .email-text {
      word-break: break-all;
    }

    .office-action {
        display: flex;
        align-items: center;
    }
</style>
