<template>
  <v-card class="actuality-card">
    <v-img
      :src="imageUrl"
      max-height="200"
    />
    <div class="actuality-content">
      <span
        class="title-box app-section-subtitle font-600"
        :style="{'font-size': (1 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
      >
        {{ title }}
      </span>
      <span
        class="subtitle-box app-section-subtitle"
        :style="{'font-size': (0.8 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
      >
        {{ subtitle }}
      </span>
      <div
        class="description-box"
        :style="{'font-size': (0.8 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
      >
        {{ description }}
      </div>
      <v-card-actions>
        <v-btn
          flat
          color="orange"
        >Partager</v-btn>
        <v-btn
          flat
          color="orange"
        >En savoir plus</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'ActualityCard',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    description: {
      type: String,
      required: true
    },
    link: {
      type: String
    }
  }
}
</script>
<style scoped>
.actuality-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.actuality-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.title-box {
  margin: 10px 5px 10px 5px;
}

.subtitle-box {
  margin: 0 5px 10px 5px;
}

.description-box {
  margin: 0 5px 10px 5px;
  flex: 1;
}
</style>
