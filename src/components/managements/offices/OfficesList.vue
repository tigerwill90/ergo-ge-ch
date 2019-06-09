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
                  v-if="$store.getters.windowSize.x > 450"
                  class="office-email"
                >
                  <v-icon style="margin-right: 5px">
                    email
                  </v-icon>
                  <span class="email-text">{{ office.email }}</span>
                </div>
                <div class="office-action">
                  <v-btn
                    v-if="$store.getters.windowSize.x >= 500"
                    color="primary"
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
                    @click="remove(office, i)"
                  >
                    Supprimer
                  </v-btn>
                  <v-btn
                    v-if="isAdmin() && $store.getters.windowSize.x < 500"
                    icon
                    color="warning"
                    @click="remove(office, i)"
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
      panel: [true]
    }
  },
  methods: {
    remove(office, id) {
      this.$http.delete(`${process.env.VUE_APP_API_URL}/offices/${office.id}`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
        }
      })
        .then(() => {
          this.$emit('remove-office', id)
          this.$store.commit('notification', { status: 200, message: `Le cabinet ${office.name} a bien été supprimé` })
        })
        .catch(err => {
          if (err.response.status === 401) {
            // TODO try to reconnect then delete authorization
            this.$store.commit('authorization', null)
          }
          this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
        })
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
        margin-left: 8px;
    }

    .email-text {
      word-break: break-all;
    }

    .office-action {
        display: flex;
        align-items: center;
    }
</style>
