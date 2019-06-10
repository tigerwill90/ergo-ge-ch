<template>
  <div class="therapists-panel">
    <div class="therapist-panel">
      <v-select
        :value="offices[0]"
        :items="offices"
        item-text="name"
        return-object
        label="Sélectionner un cabinet"
        class="select-office"
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
                <div
                  v-if="$store.getters.windowSize.x >= 450"
                  class="therapist-action"
                >
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
                    v-if="$store.getters.windowSize.x >= 500"
                    color="primary"
                    @click="prepareUpdate(therapist)"
                  >
                    Modifier
                  </v-btn>
                  <v-btn
                    v-else
                    icon
                    color="primary"
                    @click="prepareUpdate(therapist)"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="$store.getters.windowSize.x >= 500"
                    color="warning"
                    @click="remove(therapist, i)"
                  >
                    Supprimer
                  </v-btn>
                  <v-btn
                    v-else
                    icon
                    color="warning"
                    @click="remove(therapist, i)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TherapistsList',
  props: {
    offices: {
      type: Array,
      required: true
    },
    therapists: {
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
    selected(selectedOffice) {
      this.$emit('current-office-list-selected', selectedOffice)
      this.$http.get(`${process.env.VUE_APP_API_URL}/offices/${selectedOffice.id}/therapists`)
        .then(response => {
          this.$emit('selected-therapists', response.data.data)
        })
        .catch(err => {
          this.$emit('selected-therapists', [])
          this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
        })
    },
    remove(therapist, id) {
      this.$http.delete(`${process.env.VUE_APP_API_URL}/therapists/${therapist.id}`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.authorization.access_token}`
        }
      })
        .then(() => {
          this.$emit('remove-therapist', id)
          this.$store.commit('notification', { status: 200, message: `L'ergothérapeute ${therapist.first_name} ${therapist.last_name} a bien été supprimé` })
        })
        .catch(err => {
          this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
        })
    },
    prepareUpdate(therapist) {
      this.$emit('prepare-update', therapist)
    }
  }
}
</script>

<style scoped>
    .therapists-panel {
        display: flex;
        flex: 1;
    }

    .therapist-panel{
        flex: 1;
        padding: 10px 10px 10px 10px;
        flex-direction: column;
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

    .contacts-email-list {
        display: flex;
        flex-direction: column;
    }

    .action {
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 1280px) {
      .therapists-panel {
        max-width: 570px;
      }
    }
</style>
