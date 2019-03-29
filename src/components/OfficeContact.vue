<template>
  <div>
    {{ contacts }}
  </div>
</template>
<script>
export default {
  name: 'OfficeContact',
  props: {
    contacts: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped>

</style>
