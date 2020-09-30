<template>
  <!-- selector in mixin -->
  <SubNav
    :selector="selector"
    :links="links"
    :title="title"
    :subtitle="subtitle"
    sub-class="extended"
  >
    <Description
      :id="links[0].to"
      :ref="links[0].to"
    />
    <v-divider />
    <Prescription
      :id="links[1].to"
      :ref="links[1].to"
    />
    <v-divider />
    <Actuality
      :id="links[2].to"
      :ref="links[2].to"
    />
    <v-divider />
    <Agenda
      v-if="links[3]"
      :id="links[3].to"
      :ref="links[3].to"
    />
    <div
      v-if="!$vuetify.breakpoint.xs"
      class="alert"
      @click="expand = !expand"
    >
      <div class="alert-title">
        <strong>Covid-19 restons vigilants</strong>
      </div>
      <v-expand-transition>
        <v-img
          v-show="expand"
          :src="img"
          content
        />
      </v-expand-transition>
    </div>
  </SubNav>
</template>

<script>
import SubNav from '../components/SubNav'
import Description from '../components/Description'
import Agenda from '../components/Agenda'
import Actuality from '../components/Actuality'
import Prescription from '../components/Prescription'
import Scrolling from '../mixins/scrolling'
import HandleScroll from '../mixins/handleScroll'
export default {
  name: 'Home',
  components: {
    SubNav,
    Description,
    Agenda,
    Actuality,
    Prescription
  },
  mixins: [Scrolling('home'), HandleScroll()],
  data() {
    return {
      title: 'La section genevoise de l\'Association Suisse des Ergothérapeutes\xa0!',
      subtitle: 'ergotherapie-ge.ch',
      expand: false,
      img: `${process.env.VUE_APP_API_URL}/images/covid`,
      links: [
        { to: 'desc', title: "L'ergothérapie", show: true },
        { to: 'prescription', title: "L'ordonnance", show: true },
        { to: 'actu', title: 'Actualité', show: true },
        { to: 'agenda', title: 'Agenda', show: true }
      ]
    }
  },
  mounted() {
    if (!this.$store.getters.authorization && this.$store.getters.attempt <= 0) {
      this.$store.dispatch('reconnect').then(user => {
        this.$store.commit('notification', { status: 200, message: `Bienvenue ${user.first_name} ${user.last_name}` })
        this.$store.dispatch('setReconnectInterval')
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
  .alert {
    position: fixed;
    bottom: 0;
    left: 40px;
    width: 450px;
    flex-direction: column;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #424242;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
  }

  .alert-title {
    min-height: 30px;
    display: flex;
    align-items: center;
  }
</style>
