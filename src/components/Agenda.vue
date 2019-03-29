/*
 * File: Agenda.vue
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 27th February 2019
 * Last Modified: 13th March 2019
 */
<template>
  <FlexContainer
    v-resize="onResize"
    class="calendar"
    column
    padding-top="50px"
  >
    <h1 class="app-section-title title-1 center">
      Calendrier
    </h1>
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="5"
      color="teal"
      indeterminate
      class="calendar-progress"
    />
    <full-calendar
      ref="calendar"
      :event-sources="eventSources"
      :config="config"
      :editable="false"
      :selectable="false"
      @event-selected="eventSelected"
      @view-render="onViewRender"
    />
    <v-menu
      v-model="showEvent"
      offset-y
      absolute
      bottom
      :position-x="x"
      :position-y="y"
      :close-on-content-click="false"
      :close-on-click="false"
      origin
    >
      <v-card class="calendar-event-card">
        <div class="event-toolbar">
          <v-btn
            :href="selectedEvent.htmlLink"
            target="_blank"
            icon
            small
            class="event-btn"
          >
            <v-icon>open_in_new</v-icon>
          </v-btn>
          <v-btn
            icon
            small
            class="event-btn"
            @click="closeEvent"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>
        <div class="event-title-box">
          <span class="title">{{ selectedEvent.title }}</span>
        </div>
        <v-divider />
        <div class="event-info-box">
          <v-icon class="event-icon">
            access_time
          </v-icon>
          <div class="info-time-box">
            <span class="subheading">{{ moment(selectedEvent.start).format("dddd, Do MMMM YYYY, H:mm") }}</span>
            <span class="subheading">{{ moment(selectedEvent.end).format("dddd, Do MMMM YYYY, H:mm") }}</span>
          </div>
        </div>
        <v-divider v-if="selectedEvent.location" />
        <div
          v-if="selectedEvent.location"
          class="event-info-location"
        >
          <v-icon class="event-icon">
            location_on
          </v-icon>
          <span class="subheading">{{ selectedEvent.location }}</span>
        </div>
        <v-divider v-if="selectedEvent.description" />
        <div
          v-if="selectedEvent.description"
          class="event-desc-box"
        >
          <v-icon class="event-icon">
            description
          </v-icon>
          <p class="subheading">
            {{ selectedEvent.description }}
          </p>
        </div>
        <v-divider />
        <div class="event-desc-organizer">
          <v-icon class="event-icon">
            event
          </v-icon>
          <span
            v-if="selectedEvent.organizer"
            class="subheading"
          >{{ selectedEvent.organizer.name || selectedEvent.organizer.email }}</span>
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
                callback(response.data.data)
              })
              .catch(error => {
                self.loading = false
                throw new Error(error.message)
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
  created() {
    self = this
    window.addEventListener('click', this.closeEventOnClick)
  },
  mounted() {
    this.intervalId = setInterval(() => this.$refs.calendar.fireMethod('refetchEvents'), 300000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  destroyed() {
    window.removeEventListener('click', this.closeEventOnClick)
  },
  methods: {
    closeEventOnClick(event) {
      if (this.x !== event.clientX || this.y !== event.clientY) {
        this.closeEvent()
      }
    },
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
  width: 400px;
  padding: 5px 10px 5px 10px;
}

.event-toolbar {
  display: flex;
  margin-left: auto;
}

.event-title-box {
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;
}

.event-icon {
  margin-right: 15px;
}

.event-btn {
  margin: 0;
}

.event-info-box {
  display: flex;
  align-items: center;
  margin: 10px 0 10px 0;
}

.info-time-box {
  display: flex;
  flex-direction: column;
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

.event-desc-organizer {
  display: flex;
  margin: 10px 0 10px 0;
  align-items: center;
}
</style>
