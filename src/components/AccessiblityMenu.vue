<template>
  <v-menu
    bottom
    left
    offset-y
    :close-on-content-click="false"
    attach="#toolbar"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        v-on="on"
      >
        <v-icon>accessibility_new</v-icon>
      </v-btn>
    </template>
    <v-card class="accessiblity-card">
      <div class="accessiblity-title">
        <v-icon class="accessiblity-icon">
          accessibility
        </v-icon>
        <span class="title">Accessibilité</span>
      </div>
      <v-divider />
      <div class="accessiblity-content">
        <div class="accessiblity-box">
          <v-slider
            v-model="sliderValue"
            thumb-color="red"
            thumb-label="always"
            step="10"
            :min="10"
            ticks="always"
            tick-size="2"
            :thumb-size="24"
            class="format-size-slider"
            prepend-icon="format_size"
            @change="onSliderChange"
          />
        </div>
        <div class="accessiblity-box">
          <v-switch
            value
            prepend-icon="brightness_medium"
            @change="invertBrightness"
          />
        </div>
      </div>
    </v-card>
  </v-menu>
</template>
<script>
export default {
  name: 'AccessiblityMenu',
  data() {
    return {
      sliderValue: this.$store.getters.fontSizeMultiplier
    }
  },
  methods: {
    onSliderChange(value) {
      this.$store.commit('fontSizeMultiplier', value)
    },
    invertBrightness(value) {
      this.$store.commit('invertBrightness', value)
    }
  }
}
</script>
<style scoped>
  .accessiblity-card {
    display: flex;
    width: 300px;
    height: 190px;
    flex-direction: column;
  }

  .accessiblity-title {
    display: flex;
    height: 50px;
    margin: 0 5px 0 5px;
    align-items: center;
  }

  .accessiblity-icon {
    margin-right: 5px;
  }

  .accessiblity-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 5px 0 5px;
    justify-content: flex-end;
  }

  .accessiblity-box {
    display: flex;
    align-items: center;
  }

  .format-size-slider {
    max-width: 280px;
  }
</style>
