<template>
  <div class="calendar-container">
    <full-calendar :events="events" :config="config"></full-calendar>
  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/fr'
import 'fullcalendar/dist/fullcalendar.css'
export default {
  name: 'Agenda',
  components: {
    FullCalendar
  },
  data () {
    return {
      events: [
        { title: 'Réunion ASE', start: '2018-12-04', end: '2018-12-04' },
        { title: 'Web app ASE -> prod', start: '2018-12-11', end: '2018-12-11' }
      ],
      config: {
        local: 'fr'
      }
    }
  }
}
</script>

<style scoped>
  .calendar-container {
    display: inline-block;
    padding: 50px 24px 50px 24px;
  }
</style>
