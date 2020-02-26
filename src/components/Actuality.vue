<template>
  <FlexContainer
    justify-content="center"
    align-items="center"
  >
    <div class="btn-box">
      <v-btn
        v-show="previousArrow"
        flat
        icon
        color="indigo"
        large
        @click="previous()"
      >
        <v-icon x-large>
          navigate_before
        </v-icon>
      </v-btn>
    </div>
    <div :class="cargouselLayout">
      <div
        v-for="(actu, i) in carousels"
        :key="i"
        class="item"
      >
        <ActualityVue
          :title="actu.title"
          :subtitle="actu.subtitle"
          :image-url="actu.imageUrl"
          :description="actu.description"
          :dates="actu.dates"
          :link="actu.url"
        />
      </div>
    </div>
    <div class="btn-box">
      <v-btn
        v-show="nextArrow"
        flat
        icon
        large
        color="indigo"
        @click="next()"
      >
        <v-icon x-large>
          navigate_next
        </v-icon>
      </v-btn>
    </div>
  </FlexContainer>
</template>

<script>
import ActualityVue from './ActualityCard'
export default {
  name: 'Actuality',
  components: {
    ActualityVue
  },
  data() {
    return {
      cargouselLayout: {
        'actuality-container-l': false,
        'actuality-container-m': false,
        'actuality-container-s': false
      },
      lowerBound: 0,
      upperBound: 0,
      carousels: [],
      datas: []
    }
  },
  computed: {
    previousArrow() {
      return this.lowerBound > 0
    },
    nextArrow() {
      return this.upperBound < this.datas.length - 1
    }
  },
  mounted() {
    this.$http.get(`${process.env.VUE_APP_API_URL}/events`)
      .then(response => {
        response.data.data.forEach(event => {
          event['imageUrl'] = `${process.env.VUE_APP_API_URL}/events/${event.id}/images`
          this.datas.push(event)
        })

        this.$store.subscribe((mutation) => {
          if (mutation.type === 'windowSize') {
            this.resize(mutation.payload.x)
          }
        })

        this.resize(this.$store.getters.windowSize.x)
      })
      .catch(err => {
        this.$store.commit('notification', { status: err.response.status, message: err.response.data.data.user_message })
      })
  },
  methods: {
    next() {
      if (this.upperBound < this.datas.length - 1) {
        this.lowerBound++
        this.upperBound++
        this.carousels.shift()
        this.carousels.push(this.datas[this.upperBound])
      }
    },
    previous() {
      if (this.lowerBound > 0) {
        this.lowerBound--
        this.upperBound--
        this.carousels.pop()
        this.carousels.unshift(this.datas[this.lowerBound])
      }
    },
    resize(x) {
      if (x >= 1300) {
        if (this.datas.length >= 3) {
          this.cargouselLayout['actuality-container-l'] = true
          this.cargouselLayout['actuality-container-m'] = false
          this.cargouselLayout['actuality-container-s'] = false
        } else if (this.datas.length >= 2) {
          this.cargouselLayout['actuality-container-l'] = false
          this.cargouselLayout['actuality-container-m'] = true
          this.cargouselLayout['actuality-container-s'] = false
        } else {
          this.cargouselLayout['actuality-container-l'] = false
          this.cargouselLayout['actuality-container-m'] = false
          this.cargouselLayout['actuality-container-s'] = true
        }
        this.lowerBound = 0
        this.upperBound = 2
        this.carousels = this.datas.slice(0, 3)
      } else if (x < 1300 && x >= 900) {
        if (this.datas.length >= 2) {
          this.cargouselLayout['actuality-container-l'] = false
          this.cargouselLayout['actuality-container-m'] = true
          this.cargouselLayout['actuality-container-s'] = false
        } else {
          this.cargouselLayout['actuality-container-l'] = false
          this.cargouselLayout['actuality-container-m'] = false
          this.cargouselLayout['actuality-container-s'] = true
        }
        this.lowerBound = 0
        this.upperBound = 1
        this.carousels = this.datas.slice(0, 2)
      } else {
        this.cargouselLayout['actuality-container-l'] = false
        this.cargouselLayout['actuality-container-m'] = false
        this.cargouselLayout['actuality-container-s'] = true
        this.lowerBound = 0
        this.upperBound = 0
        this.carousels = this.datas.slice(0, 1)
      }
    }
  }
}
</script>
<style scoped>
.actuality-container-l {
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, 450px));
  width: 100%;
  grid-gap: 15px 15px;
  justify-content: center;
}

.actuality-container-m {
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 350px));
  width: 100%;
  grid-gap: 15px 15px;
  justify-content: center;
}

.actuality-container-s {
  display: grid;
  grid-template-columns: repeat(1, minmax(auto, 350px));
  width: 100%;
  grid-gap: 15px 15px;
  justify-content: center;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-box {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  width: 60px;
}
</style>
