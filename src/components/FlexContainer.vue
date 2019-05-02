<template>
  <section
    :style="{
      padding: paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft,
      'background-color': backgroundColor,
      'align-items': alignItems,
      'justify-content': justifyContent,
      height: height,
      'min-height': minHeight,
      width: width,
      'max-width': maxWidth,
      transform: `skewY(${transformSkewY})`,
      'z-index': zIndex,
      position: position
    }"
    :class="{
      'flex-container-direction': column
    }"
    class="flex-container"
  >
    <slot />
  </section>
</template>

<script>
export default {
  name: 'FlexContainer',
  props: {
    column: {
      type: Boolean,
      default: false
    },
    transformSkewY: {
      type: String,
      default: '0'
    },
    zIndex: {
      type: String,
      default: 'auto'
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
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
      default: 'normal',
      validator: function (value) {
        return [
          'flex-start',
          'flex-end',
          'center',
          'stretch',
          'baseline',
          'stretch',
          'self-start',
          'self-end',
          'start',
          'end',
          'normal'
        ].indexOf(value) !== -1
      }
    },
    position: {
      type: String,
      default: 'initial',
      validator: value => ['relative', 'absolute', 'fixed', 'sticky', 'static', 'inherit', 'initial'].indexOf(value) !== -1
    },
    justifyContent: {
      type: String,
      default: 'normal',
      validator: function (value) {
        return (
          [
            'flex-start',
            'flex-end',
            'center',
            'space-between',
            'space-around',
            'space-evenly',
            'left',
            'start',
            'end',
            'right',
            'normal',
            'stretch'
          ].indexOf(value) !== -1
        )
      }
    },
    minHeight: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: 'auto'
    },
    width: {
      type: String,
      default: '100%'
    },
    maxWidth: {
      type: String,
      default: 'auto'
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
