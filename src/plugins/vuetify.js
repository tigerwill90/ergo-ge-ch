import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import fr from 'vuetify/es5/locale/fr'
import { Scroll, Resize } from 'vuetify/es5/directives'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { fr },
    current: 'fr'
  },
  directives: {
    Scroll,
    Resize
  }
})
