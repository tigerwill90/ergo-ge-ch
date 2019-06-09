<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
  >
    <article>
      <span class="app-section-title title-1">Gestion des utilisateurs</span>
    </article>
  </FlexContainer>
</template>
<script>
import admin from '../../mixins/admin'
import FlexContainer from '../FlexContainer'
export default {
  name: 'UsersManagement',
  components: {
    FlexContainer
  },
  mixins: [admin()]
}
</script>
<style scoped>

</style>
