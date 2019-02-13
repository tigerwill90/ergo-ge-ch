<template>
  <div v-scroll="onScroll" v-resize="onResize" class="sub-nav-main">
    <div v-if="displayNav" class="teal lighten-2" :class="'sub-nav-header ' + subClass">
      <div class="sub-nav-content">
        <!-- HEADER## -->
        <div v-show="extendedHeader">
          <div class="sub-nav-title">
            <span class="display-2 center-text test">{{ title }}</span>
          </div>
          <div class="sub-nav-subtitle">
            <span class="headline center-text">{{ subtitle }}</span>
          </div>
          <div class="sub-nav-button">
            <v-btn :to="{ name: 'contact' }">Contactez nous</v-btn>
          </div>
        </div>
        <div v-show="!extendedHeader">
          <div class="sub-nav-title-only display-2">
            {{ title }}
          </div>
        </div>
      </div>
      <!-- ##HEADER -->
      <div class="sub-nav-links" :class="linksClass" v-if="showLinks">
        <v-btn color="white" v-for="(link, i) in links" :key="i" flat exact @click="goTo('#' + link.to)">{{
          link.title
        }}</v-btn>
      </div>
    </div>
    <div v-else class="sub-nav-header tiny teal lighten-2">
      <div class="sub-nav-content">
        <div class="sub-nav-title-only display-1">
          {{ title }}
        </div>
      </div>
    </div>
    <!-- MAIN## -->
    <div class="main-content">
      <slot />
    </div>
    <!-- ##MAIN -->
  </div>
</template>

<script>
// TODO implements STATE PATTERN
const mobileWidth = 495
const desktopExtendedHeaderWidth = 580
const extendedScrollTrigger = 252
const minExtendedScrollTrigger = 152
const minimizedScrollTrigger = 122
export default {
  name: 'Sub-Nav',
  data() {
    return {
      linksClass: {
        'absolute-links': true,
        'fixed-links': false
      },
      offsetTop: 0
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
      validator: function(value) {
        return ['extended', 'reduced'].indexOf(value) !== -1
      }
    }
  },
  methods: {
    onScroll() {
      /** State : normal to scrolled */
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      if (this.$store.getters.windowSize.x > mobileWidth) {
        if (this.extendedHeader) {
          if (this.$store.getters.windowSize.x > desktopExtendedHeaderWidth) {
            if (this.offsetTop > extendedScrollTrigger) {
              this.linksClass['absolute-links'] = false
              this.linksClass['fixed-links'] = true
            } else {
              this.linksClass['absolute-links'] = true
              this.linksClass['fixed-links'] = false
            }
          } else {
            if (this.offsetTop > minExtendedScrollTrigger) {
              this.linksClass['absolute-links'] = false
              this.linksClass['fixed-links'] = true
            } else {
              this.linksClass['absolute-links'] = true
              this.linksClass['fixed-links'] = false
            }
          }
        } else {
          if (this.offsetTop > minimizedScrollTrigger) {
            this.linksClass['absolute-links'] = false
            this.linksClass['fixed-links'] = true
          } else {
            this.linksClass['absolute-links'] = true
            this.linksClass['fixed-links'] = false
          }
        }
      } else {
        this.linksClass['absolute-links'] = true
        this.linksClass['fixed-links'] = false
      }
    },
    onResize() {
      this.$store.commit('windowSize', {
        x: window.innerWidth,
        y: window.innerHeight
      })
    },
    goTo(link) {
      this.$store.commit('selector', {
        hash: link,
        routeName: this.$router.currentRoute.name
      })
    }
  },
  computed: {
    displayNav() {
      return this.$store.getters.windowSize.x > mobileWidth
    },
    extendedHeader() {
      return this.subClass === 'extended'
    },
    showLinks() {
      return !this.$store.getters.drawer || !this.linksClass['fixed-links']
    }
  },
  mounted() {
    this.onResize()
  }
}
</script>

<style scoped>
.sub-nav-main {
  height: 100%;
  width: 100%;
}

.sub-nav-header {
  background-color: #f5f5f5;
  min-width: 100%;
  position: relative;
  color: white;
}

.sub-nav-content {
  display: flex;
  flex-direction: column;
}

.sub-nav-header.extended {
  height: 300px;
  max-height: 300px;
}

.sub-nav-header.reduced {
  min-height: 170px;
}

.sub-nav-header.tiny {
  min-height: 120px;
}

.sub-nav-title {
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.sub-nav-subtitle {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.sub-nav-title-only {
  padding-left: 20px;
  margin-top: 50px;
}

.sub-nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-content {
  background-color: #f5f5f5;
}

.center-text {
  text-align: center;
}

.absolute-links {
  position: absolute;
  height: 48px;
  bottom: 0;
  min-width: 100%;
}

.fixed-links {
  position: fixed;
  top: 64px;
  height: 48px;
  z-index: 1000;
  background-color: #4db6ac;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 0px 0 rgba(0, 0, 0, 0.12);
  width: 100%;
  left: 0;
}

@media screen and (max-width: 580px) {
  .sub-nav-header.extended {
    height: 200px;
    max-height: 200px;
  }

  .sub-nav-subtitle {
    display: none;
  }
}

@media screen and (max-width: 745px) {
  .sub-nav-button {
    display: none;
  }
}
</style>
