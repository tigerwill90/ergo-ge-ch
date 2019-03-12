<template>
  <v-card class="actuality-card">
    <v-img :src="imageUrl" max-height="200" />
    <div class="actuality-content">
      <span class="title-box app-section-subtitle title-1 font-600">
        {{ title }}
      </span>
      <span class="subtitle-box app-section-subtitle title-2">
        {{ subtitle }}
      </span>
      <div class="description-box">
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
