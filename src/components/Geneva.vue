/*
 * File: Geneva.vue
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 13th February 2019
 * Last Modified: 31st March 2019
 */
<template>
  <FlexContainer
    justify-content="center"
    :background-color="background"
  >
    <div
      v-if="!$vuetify.breakpoint.smAndDown"
      class="section"
    >
      <div class="container-img">
        <img
          src="../assets/img/geneva.svg"
          class="image"
          alt="geneva"
        >
      </div>
      <p
        class="headline paragraph"
        :class="{'text-white': $store.getters.invertBrightness}"
      >
        <strong :class="{'text-teal': !$store.getters.invertBrightness}">La section genevoise de l’ASE</strong> est composée de tous les ergothérapeutes
        membres de l’ASE qui sont domiciliés à Genève ou qui en font la demande par écrit au secrétariat central de
        l’Association
      </p>
    </div>
    <div
      v-else
      class="section column"
    >
      <p
        class="text-xs-center headline"
        :class="{'text-white': $store.getters.invertBrightness}"
      >
        <strong :class="{'text-teal': !$store.getters.invertBrightness}">La section genevoise de l’ASE</strong> est composée de tous les ergothérapeutes
        membres de l’ASE qui sont domiciliés à Genève ou qui en font la demande par écrit au secrétariat central de
        l’Association
      </p>
      <div class="container-img">
        <img
          src="../assets/img/geneva.svg"
          class="image"
          alt="geneva"
        >
      </div>
    </div>
  </FlexContainer>
</template>

<script>
export default {
  name: 'Geneva',
  computed: {
    background() {
      if (this.$store.getters.invertBrightness) {
        return '#424242'
      }
      return 'transparent'
    }
  }
}
</script>

<style scoped>
.container-img {
  display: flex;
  align-items: center;
  padding: 10px;
}

.image {
  height: 200px;
  min-height: 200px;
  width: auto;
}

.section {
  display: flex;
  align-items: center;
  max-width: 70%;
}

.section.column {
  flex-direction: column;
  max-width: 80%;
}

.paragraph {
  padding-left: 20px;
}

.text-white {
  color: white;
}

.text-teal {
  color: teal;
}
</style>
