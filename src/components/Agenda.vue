<template>
  <FlexContainer :pad-left="40" :pad-right="40" v-resize="onResize" class="hide">
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
          right: 'month, agendaWeek, agendaDay'
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
        { title: 'Réunion ASE', start: '2018-12-10 12:00', end: '2018-12-10 13:30', color: 'green' },
        { title: 'Web app ASE -> prod', start: '2018-12-15', end: '2018-12-15' }
      ]
    },
    onResize () {
      // adapt calendar layout
      if (window.innerWidth < 800) {
        this.$refs.calendar.fireMethod('option', {
          defaultView: 'agendaDay',
          header: {
            left: 'prev, next, today',
            center: 'title',
            right: 'agendaDay'
          }
        })
        this.$refs.calendar.fireMethod('changeView', 'agendaDay')
      } else {
        this.$refs.calendar.fireMethod('option', {
          defaultView: 'month',
          header: {
            left: 'prev, next, today',
            center: 'title',
            right: 'month, agendaWeek, agendaDay'
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
