<template>
  <FlexContainer
    justify-content="center"
    align-items="center"
    column
  >
    <v-slide-group
      v-model="id"
      :show-arrows="$vuetify.breakpoint.smAndUp"
      center-active
    >
      <v-slide-item
        v-for="(event, i) in events"
        :key="i"
        v-slot:default="{toggle}"
      >
        <v-card
          class="ma-4 d-flex flex-column"
          height="450"
          width="300"
          max-width="300"
          max-height="450"
        >
          <v-img
            height="150"
            max-height="150"
            :src="event.imageUrl"
            :alt="event.img_alt"
          />
          <div class="d-flex flex-column flex-grow-1">
            <v-card-title>{{ event.title }}</v-card-title>
            <v-card-subtitle v-if="event.subtitle">
              {{ event.subtitle }}
            </v-card-subtitle>
            <v-card-text class="flex-grow-1">
              {{ event.description }}
            </v-card-text>

            <v-card-actions v-if="event.urls.length > 0 || event.dates.length > 0">
              <v-btn
                outlined
                color="orange"
                @click="toggleDialog(toggle)"
              >
                En savoir plus
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-slide-item>
    </v-slide-group>
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="400px"
      @click:outside="closeDialog"
    >
      <v-card v-if="id != null">
        <v-img
          height="200"
          max-height="200"
          :src="events[id].imageUrl"
          :alt="events[id].img_alt"
        />
        <v-card-title>
          {{ events[id].title }}
        </v-card-title>
        <v-card-text style="max-height: 250px;">
          <template v-if="events[id].dates.length > 0">
            <v-card-subtitle>Dates :</v-card-subtitle>
            <ul>
              <li
                v-for="(date, k) in events[id].dates"
                :key="k"
              >
                <span>{{ formatDate(date) }}</span>
              </li>
            </ul>
          </template>
          <template v-if="events[id].urls.length > 0">
            <v-card-subtitle>Liens utiles :</v-card-subtitle>
            <ul>
              <li
                v-for="(url, k) in events[id].urls"
                :key="k"
              >
                <a

                  :href="formatUrl(url.url)"
                  target="_blank"
                >{{ url.name }}</a>
              </li>
            </ul>
          </template>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            text
            @click="closeDialog"
          >
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </FlexContainer>
</template>

<script>
export default {
  name: 'Actuality',
  data: () => ({
    id: null,
    dialog: false,
    events: []
  }),
  mounted() {
    this.$http.get(`${process.env.VUE_APP_API_URL}/events`)
      .then(response => {
        response.data.data.forEach(event => {
          event.imageUrl = `${process.env.VUE_APP_API_URL}/events/${event.id}/images`
          this.events.push(event)
        })
      })
      .catch(err => {
        this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
      })
  },
  methods: {
    toggleDialog(fn) {
      fn()
      this.dialog = !this.dialog
    },
    closeDialog() {
      this.dialog = false
      this.id = null
    },
    formatUrl(url) {
      if (!/^(http|https):\/\//.test(url)) {
        return 'http://' + url
      }
      return url
    },
    formatDate(s) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      const date = new Date(s)
      return date.toLocaleDateString('fr-ch', options)
    }
  }
}
</script>
<style scoped>
  ul {
    list-style-type: circle;
    border-left: none;
  }
</style>
