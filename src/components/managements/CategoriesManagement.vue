<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
  >
    <article>
      <span class="app-section-title title-1">Gestion des catégories</span>
    </article>
  </FlexContainer>
</template>
<script>
import admin from '../../mixins/admin'
import FlexContainer from '../FlexContainer'
export default {
  name: 'CategoriesManagement',
  components: {
    FlexContainer
  },
  mixins: [admin()]
}
</script>
<style scoped>

</style>
