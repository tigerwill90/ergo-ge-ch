<template>
  <div v-scroll="onScroll" v-resize="onResize">
    <div v-if="displayNav" class="teal lighten-2" :class="'nav ' + subClass">
      <div class="nav-content">
        <template v-if="subtitle">
          <div class="nav-title">
            <span class="display-2 center-text">{{title}}</span>
          </div>
          <div class="nav-subtitle">
            <span class="headline center-text">{{subtitle}}</span>
          </div>
          <div class="nav-contact">
            <v-btn :to="{name: 'contact'}">Contactez nous</v-btn>
          </div>
        </template>
        <template v-else>
          <div class="nav-title-only display-2">
            {{title}}
          </div>
        </template>
      </div>
      <div class="nav-links" :class="{fixed: navIsFixed}">
        <v-btn v-for="(link, i) in links" :key="i" flat exact @click="goTo('#' + link.to)">{{link.title}}</v-btn>
      </div>
    </div>
    <div class="main-content">
      <slot/>
    </div>
  </div>
</template>

<script>
import store from '../store'
export default {
  name: 'Sub-Nav',
  data () {
    return {
      navIsFixed: false,
      offsetTop: 0,
      options: {
        duration: 500,
        offset: -100,
        easing: 'easeInOutCubic'
      },
      windowSize: {
        x: 0,
        y: 0
      }
    }
  },
  props: {
    links: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String
    },
    subClass: {
      type: String,
      required: true,
      validator: function (value) {
        return ['main', 'content'].indexOf(value) !== -1
      }
    }
  },
  methods: {
    onScroll (e) {
      store.setScrollHeight(window.pageYOffset || document.documentElement.scollTop)
      this.offsetTop = store.state.scrollHeight
      console.log(this.offsetTop)
      if (this.windowSize.x > 495) {
        if (this.subClass === 'main') {
          if (this.windowSize.x > 580) {
            if (this.offsetTop > 201) {
              this.navIsFixed = true
            } else {
              this.navIsFixed = false
            }
          } else {
            if (this.offsetTop > 150) {
              this.navIsFixed = true
            } else {
              this.navIsFixed = false
            }
          }
        } else {
          if (this.offsetTop > 100) {
            this.navIsFixed = true
          } else {
            this.navIsFixed = false
          }
        }
      }
    },
    onResize () {
      store.setWindowsSize(window.innerWidth, window.innerHeight)
      this.windowSize = { x: store.state.windowSize.x, y: store.state.windowSize.y }
      console.log(this.windowSize.x)
    },
    goTo (link) {
      this.$emit('go-to', link, this.options)
    }
  },
  computed: {
    displayNav () {
      return this.windowSize.x > 495
    }
  },
  mounted () {
    this.onResize()
  }
}
</script>

<style scoped>
  .nav {
    background-color: #f5f5f5;
    min-width: 100%;
    position: relative;
  }

  .nav-content {
    display: flex;
    flex-direction: column;
  }

  .nav.main {
    height: 250px;
    max-height: 250px;
  }

  @media screen and (max-width: 580px){
    .nav.main {
      height: 200px;
      max-height: 200px;
    }
  }

  .nav.content {
    min-height: 150px;
  }

  .nav-title {
    margin-top: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  .nav-subtitle {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 580px) {
    .nav-subtitle {
      display: none;
    }
  }

  .nav-title-only {
    padding-left: 20px;
    margin-top: 50px;
  }

  .nav-contact{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 1000px) {
    .nav-contact {
      display: none;
    }
  }

  .nav-links {
    position: absolute;
    height: 48px;
    bottom: 0;
    min-width: 100%;
  }

  .main-content {
    background-color: #F5F5F5;
  }

  .center-text {
    text-align: center;
  }

  .fixed{
    position: fixed !important;
    top: 64px;
    z-index: 1000;
    background-color: #4db6ac !important;
  }
</style>
