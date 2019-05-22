<template>
  <FlexContainer
    padding-left="10%"
    padding-right="10%"
  >
    <article v-if="admin">
      yolo
    </article>
    <article v-else>
      yola
    </article>
  </FlexContainer>
</template>
<script>
import admin from '../mixins/admin'
import FlexContainer from './FlexContainer'
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
