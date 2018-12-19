<template>
  <FlexContainer padding-left="50px" padding-right="50px" v-resize="onResize" class="hide" column>
    <h1 class="app-section-title title-1 center">Calendrier</h1>
    <full-calendar ref="calendar" :events="events" :config="config" @event-selected="eventSelected"></full-calendar>
  </FlexContainer>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/fr'
export default {
  name: 'Agenda',
  components: {
    FullCalendar
  },
  data () {
    return {
      events: this.fetchEvent(),
      selectedEvent: {},
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
      }
    }
  },
  methods: {
    eventSelected (event) {
      this.selectedEvent = event
    },
    fetchEvent () {
      return [
        { title: 'Réunion ASE', start: '2018-12-22 12:00', end: '2018-12-22 13:30', color: 'green' },
        { title: 'Web app ASE -> prod', start: '2018-12-24', end: '2018-12-24' }
      ]
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
  }
}
</script>
<style scoped>
  @import '~fullcalendar/dist/fullcalendar.css';

  @media screen and (max-width: 500px) {
    .hide{
      display: none;
    }
  }
</style>
