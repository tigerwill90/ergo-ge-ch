<template>
  <FlexContainer padding-left="50px" padding-right="50px" v-resize="onResize" class="calendar" column>
    <h1 class="app-section-title title-1 center">Calendrier</h1>
    <v-progress-circular
      :size="70"
      :width="5"
      color="teal"
      indeterminate
      class="calendar-progress"
      v-if="loading"
    ></v-progress-circular>
    <full-calendar ref="calendar" :event-sources="eventSources" :config="config" @event-selected="eventSelected" :editable="false" :selectable="false"></full-calendar>
  </FlexContainer>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/fr'
import axios from 'axios'
import 'moment'

let self

export default {
  name: 'Agenda',
  components: {
    FullCalendar
  },
  data () {
    return {
      eventSources: [
        {
          events (start, end, timezone, callback) {
            self.loading = true
            axios
              .get(`${process.env.VUE_APP_API_URL}/events?start=${start.format()}&end=${end.format()}`)
              .then(response => {
                self.loading = false
                callback(response.data.data)
              })
              .catch(error => {
                let data = null
                if (error.response !== undefined) {
                  data = error.response.data
                }
                self.$store.addNetworkError('Impossible de télécharger les évènements du calendrier google', data)
                self.loading = false
              })
          }
        }
      ],
      selectedEvent: {},
      loading: false,
      config: {
        local: 'fr',
        themeSystem: 'standard',
        nowIndicator: true,
        titleFormat: 'D MMMM YYYY',
        minTime: '06:00:00',
        maxTime: '20:00:00',
        defaultView: 'month',
        header: {
          left: 'prev, next, today',
          center: 'title',
          right: 'month, agendaWeek, listWeek'
        }
      },
      sharedStore: this.$store.state,
      intervalId: null
    }
  },
  methods: {
    eventSelected (event) {
      this.selectedEvent = event
    },
    onResize () {
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
    }
  },
  created () {
    self = this
  },
  mounted () {
    this.intervalId = setInterval(() => this.$refs.calendar.fireMethod('refetchEvents'), 300000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  }
}
</script>
<style scoped>
  @import '~fullcalendar/dist/fullcalendar.css';

  .calendar {
    position: relative;
  }

  .calendar-progress {
    margin: auto;
    position: absolute;
    top: 20%; left: 0; bottom: 0; right: 0;
    z-index: 1000;
  }

</style>
