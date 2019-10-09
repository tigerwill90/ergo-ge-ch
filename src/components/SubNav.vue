<template>
  <div
    v-scroll="onScroll"
    class="sub-nav-main"
  >
    <div
      v-if="displayNav"
      class="teal lighten-2"
      :class="'sub-nav-header ' + subClass"
    >
      <div class="sub-nav-content">
        <!-- HEADER## -->
        <div v-show="extendedHeader">
          <div class="sub-nav-title">
            <span class="display-2 center-text">{{ title }}</span>
          </div>
          <div
            v-if="subtitle"
            class="sub-nav-subtitle"
          >
            <span class="headline center-text">{{ subtitle }}</span>
          </div>
          <div class="sub-nav-button">
            <v-btn
              class="text-none"
              :to="{ name: 'contact' }"
            >
              Contactez-nous
            </v-btn>
          </div>
        </div>
        <div v-show="!extendedHeader">
          <div class="sub-nav-title-only display-2">
            {{ title }}
          </div>
        </div>
      </div>
      <!-- ##HEADER -->
      <div
        v-if="showLinks"
        class="sub-nav-links"
        :class="linksClass"
      >
        <v-btn
          v-for="(link, i) in links"
          v-show="link.show"
          :key="i"
          color="white"
          flat
          exact
          class="text-none subheading"
          :class="{currentLink: (i === $store.getters.selector.activeLinkIndex)}"
          @click="goTo(link, i)"
        >
          {{
            link.title
          }}
        </v-btn>
      </div>
    </div>
    <div
      v-else
      class="sub-nav-header tiny teal lighten-2"
    >
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
const mobileWidth = 580
const desktopExtendedHeaderWidth = 600
const extendedScrollTrigger = 252
const minExtendedScrollTrigger = 152
const minimizedScrollTrigger = 122
export default {
  name: 'SubNav',
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
      type: String,
      default: null
    },
    subClass: {
      type: String,
      required: true,
      validator: function (value) {
        return ['extended', 'reduced'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      linksClass: {
        'absolute-links': true,
        'fixed-links': false
      },
      offsetTop: 0
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
              this.$store.commit('flatToolbar', true)
            } else {
              this.linksClass['absolute-links'] = true
              this.linksClass['fixed-links'] = false
              this.$store.commit('flatToolbar', false)
            }
          } else {
            if (this.offsetTop > minExtendedScrollTrigger) {
              this.linksClass['absolute-links'] = false
              this.linksClass['fixed-links'] = true
              this.$store.commit('flatToolbar', true)
            } else {
              this.linksClass['absolute-links'] = true
              this.linksClass['fixed-links'] = false
              this.$store.commit('flatToolbar', false)
            }
          }
        } else {
          if (this.offsetTop > minimizedScrollTrigger) {
            this.linksClass['absolute-links'] = false
            this.linksClass['fixed-links'] = true
            this.$store.commit('flatToolbar', true)
          } else {
            this.linksClass['absolute-links'] = true
            this.linksClass['fixed-links'] = false
            this.$store.commit('flatToolbar', false)
          }
        }
      } else {
        this.linksClass['absolute-links'] = true
        this.linksClass['fixed-links'] = false
        this.$store.commit('flatToolbar', false)
      }
    },
    goTo(link, i) {
      this.$store.commit('selector', {
        hash: '#' + link.to,
        routeName: this.$router.currentRoute.name
      })
      this.$store.commit('setCurrentHash', '#' + link.to)
    }
  }
}
</script>

<style scoped>
.sub-nav-main {
  height: 100%;
  width: 100%;
}

.sub-nav-header {
  background-color: white;
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
  margin: 45px 50px 20px 50px;
  display: flex;
  justify-content: center;
}

.sub-nav-subtitle {
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
}

.sub-nav-title-only {
  padding: 0 20px 0 20px;
  margin: 45px 0 20px 0;
  text-align: center;
}

.sub-nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-content {
  background-color: #fafafa;
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
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 0 0 rgba(0, 0, 0, 0.12);
  width: 100%;
  left: 0;
}

.currentLink {
  color: #d81b60 !important;
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

@media screen and (max-width: 900px) {
  .sub-nav-button {
    display: none;
  }
}
</style>
