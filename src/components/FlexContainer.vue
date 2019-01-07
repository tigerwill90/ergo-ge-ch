<template>
    <div
      :style="{
        padding: paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft,
        'background-color': backgroundColor,
        'align-items': alignItems,
        'justify-content' : justifyContent,
        height: height,
        'min-height': minHeight,
        width: width,
        'max-width': maxWidth
        }"
      :class="{
        'flex-container-direction': column
      }"
      class="flex-container"
    >
      <slot/>
    </div>
</template>

<script>
export default {
  name: 'FlexContainer',
  props: {
    column: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: 'white'
    },
    paddingTop: {
      type: String,
      default: '100px'
    },
    paddingBottom: {
      type: String,
      default: '100px'
    },
    paddingLeft: {
      type: String,
      default: '24px'
    },
    paddingRight: {
      type: String,
      default: '24px'
    },
    alignItems: {
      type: String,
      validator: function (value) {
        return ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'].indexOf(value) !== -1
      }
    },
    justifyContent: {
      type: String,
      validator: function (value) {
        return ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].indexOf(value) !== -1
      }
    },
    minHeight: {
      type: String
    },
    height: {
      type: String
    },
    width: {
      type: String,
      default: '100%'
    },
    maxWidth: {
      type: String
    }
  }
}
</script>

<style scoped>
  .flex-container {
    display: flex;
  }

  .flex-container-direction {
    flex-direction: column;
  }
</style>
