<template>
    <div :class="'flex-container ' + direction" :style="{ backgroundColor: backgroundColor }">
      <slot/>
    </div>
</template>

<script>
export default {
  name: 'FlexContainer',
  props: {
    direction: {
      type: String,
      default: 'row'
    },
    backgroundColor: {
      type: String,
      default: 'white'
    }
  }
}
</script>

<style scoped>
  .flex-container {
    display: flex;
    padding: 50px 24px 50px 24px;
  }

  .flex-container.row {
    flex-direction: row;
  }

  .flex-container.column {
    flex-direction: column;
  }
</style>
