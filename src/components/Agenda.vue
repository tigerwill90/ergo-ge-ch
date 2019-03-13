<template>
  <FlexContainer
    v-resize="onResize"
    class="calendar"
    column
    padding-top="50px"
  >
    <h1 class="app-section-title title-1 center">Calendrier</h1>
    <v-progress-circular
      :size="70"
      :width="5"
      color="teal"
      indeterminate
      class="calendar-progress"
      v-if="loading"
    ></v-progress-circular>
    <full-calendar
      ref="calendar"
      :event-sources="eventSources"
      :config="config"
      @event-selected="eventSelected"
      @view-render="onViewRender"
      :editable="false"
      :selectable="false"
    />
    <v-menu
      offset-y
      absolute
      bottom
      v-model="showEvent"
      :position-x="x"
      :position-y="y"
      :close-on-content-click="false"
      :close-on-click="false"
      origin
    >
      <v-card class="calendar-event-card">
        <div class="event-toolbar">
          <v-btn :href="selectedEvent.htmlLink" target="_blank" icon small class="event-btn">
            <v-icon>open_in_new</v-icon>
          </v-btn>
          <v-btn icon small @click="closeEvent" class="event-btn">
            <v-icon>close</v-icon>
          </v-btn>
        </div>
        <div class="event-title-box">
          <v-icon class="event-icon">event</v-icon>
          <span class="title">{{ selectedEvent.title }}</span>
        </div>
        <v-divider></v-divider>
        <div class="event-info-box">
          <span class="subheading"><strong>Début : </strong> {{ moment(selectedEvent.start).format("dddd, Do MMMM YYYY, H:mm") }}</span>
          <span class="subheading"><strong>Fin : </strong>{{ moment(selectedEvent.end).format("dddd, Do MMMM YYYY, H:mm") }}</span>
        </div>
        <v-divider v-if="selectedEvent.location"></v-divider>
        <div
          class="event-info-location"
          v-if="selectedEvent.location"
        >
          <v-icon class="event-icon">location_on</v-icon>
          <span class="subheading">{{ selectedEvent.location }}</span>
        </div>
        <v-divider v-if="selectedEvent.description"></v-divider>
        <div
          v-if="selectedEvent.description"
          class="event-desc-box"
        >
          <v-icon class="event-icon">description</v-icon>
          <p class="subheading">{{ selectedEvent.description }}</p>
        </div>
      </v-card>
    </v-menu>
  </FlexContainer>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/fr'
import moment from 'moment'

let self

export default {
  name: 'Agenda',
  components: {
    FullCalendar
  },
  data() {
    return {
      x: 0,
      y: 0,
      showEvent: false,
      moment: moment,
      eventSources: [
        {
          events(start, end, timezone, callback) {
            self.loading = true
            self.$http
              .get(`${process.env.VUE_APP_API_URL}/events?start=${start.format()}&end=${end.format()}`)
              .then(response => {
                self.loading = false
                console.log(response.data.data)
                callback(response.data.data)
              })
              .catch(error => {
                let data = null
                if (error.response !== undefined) {
                  data = error.response.data
                }
                self.$store.commit('addNotification', {
                  active: true,
                  type: 'error',
                  logs: data,
                  userMessage: 'Impossible de télécharger les évènements du calendrier google'
                })
                self.loading = false
              })
          }
        }
      ],
      selectedEvent: {},
      loading: false,
      config: {
        local: 'fr',
        aspectRatio: 2.1,
        themeSystem: 'standard',
        nowIndicator: true,
        titleFormat: 'D MMMM YYYY',
        minTime: '08:00:00',
        maxTime: '22:00:00',
        defaultView: 'month',
        header: {
          left: 'prev, next, today',
          center: 'title',
          right: 'month, agendaWeek, listWeek'
        }
      },
      intervalId: null
    }
  },
  methods: {
    eventSelected(event, jsEvent) {
      this.showEvent = false
      this.x = jsEvent.clientX
      this.y = jsEvent.clientY
      this.$nextTick(() => {
        this.showEvent = true
      })
      this.selectedEvent = event
    },
    closeEvent() {
      this.showEvent = false
    },
    onResize() {
      // adapt calendar layout
      if (window.innerWidth < 800) {
        this.$refs.calendar.fireMethod('option', {
          defaultView: 'listWeek',
          header: {
            left: 'prev, next, today',
            center: 'title',
            right: 'listWeek'
          }
        })
        this.$refs.calendar.fireMethod('changeView', 'listWeek')
      } else {
        this.$refs.calendar.fireMethod('option', {
          defaultView: 'month',
          header: {
            left: 'prev, next, today',
            center: 'title',
            right: 'month, agendaWeek, listWeek'
          }
        })
      }
      this.$refs.calendar.fireMethod('render')
    },
    onViewRender() {
      this.closeEvent()
    }
  },
  created() {
    self = this
  },
  mounted() {
    this.intervalId = setInterval(() => this.$refs.calendar.fireMethod('refetchEvents'), 300000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  }
}
</script>
<style scoped>
@import "~fullcalendar/dist/fullcalendar.css";

.calendar {
  position: relative;
}

.calendar-progress {
  margin: auto;
  position: absolute;
  top: 20%;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
}

.calendar-event-card {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 5px 10px 5px 10px;
}

.event-toolbar {
  display: flex;
  margin-left: auto;
}

.event-title-box {
  display: flex;
  align-items: center;
  margin: 10px 0 10px 0;
}

.event-icon {
  margin-right: 10px;
}

.event-btn {
  margin: 0;
}

.event-info-box {
  display: flex;
  margin: 10px 0 10px 0;
  flex-direction: column;
  justify-content: center;
}

.event-info-location {
  display: flex;
  margin: 10px 0 10px 0;
  align-items: center;
}

.event-desc-box {
  display: flex;
  margin: 10px 0 10px 0;
  align-items: center;
}
</style>
