<template>
    <div :style="{padding: padTop + 'px ' + padRight + 'px ' + padBottom + 'px ' + padLeft + 'px', backgroundColor: backgroundColor}" :class="'flex-container ' + direction">
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
    },
    padTop: {
      type: Number,
      default: 50
    },
    padBottom: {
      type: Number,
      default: 50
    },
    padLeft: {
      type: Number,
      default: 24
    },
    padRight: {
      type: Number,
      default: 24
    }
  }
}
</script>

<style scoped>
  .flex-container {
    display: flex;
  }

  .flex-container.row {
    flex-direction: row;
  }

  .flex-container.column {
    flex-direction: column;
  }
</style>
