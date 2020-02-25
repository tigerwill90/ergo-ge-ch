<template>
  <v-card
    class="actuality-card"
    :dark="$store.getters.invertBrightness"
  >
    <v-img
      :src="imageUrl"
      max-height="200"
    />
    <div class="actuality-content">
      <span
        class="title-box app-section-subtitle font-600"
        :class="{cDark: !$store.getters.invertBrightness}"
        :style="{'font-size': (1 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
      >
        {{ title }}
      </span>
      <span
        v-if="subtitle"
        class="subtitle-box app-section-subtitle"
        :class="{cDark: !$store.getters.invertBrightness}"
        :style="{'font-size': (0.8 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
      >
        {{ subtitle }}
      </span>
      <div
        class="description-box"
        :style="{'font-size': (0.8 + ($store.getters.fontSizeMultiplier/100)) + 'em'}"
      >
        {{ description }}
        <br>
        <span v-if="date"><strong>Date:</strong> {{ formatDate(date) }}</span>
      </div>
      <v-card-actions
        v-if="link"
        class="card-button"
      >
        <v-btn
          flat
          :color="color"
          :href="formatUrl(link)"
          target="_blank"
        >
          En savoir plus
        </v-btn>
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
      default: null
    },
    date: {
      type: String,
      default: null
    },
    imageUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: null
    }
  },
  computed: {
    color() {
      if (this.$store.getters.invertBrightness) {
        return 'white'
      }
      return 'orange'
    }
  },
  methods: {
    formatUrl(url) {
      if (!/^(http|https):\/\//.test(url)) {
        return 'http://' + url
      }
      return url
    },
    formatDate(s) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      const date = new Date(s)
      return date.toLocaleDateString('fr-ch', options)
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
    margin: 10px 15px 10px 15px;
  }

  .subtitle-box {
    margin: 0 15px 10px 15px;
  }

  .description-box {
    margin: 0 15px 10px 15px;
    flex: 1;
  }

  .card-button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
