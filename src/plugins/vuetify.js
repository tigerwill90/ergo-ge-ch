import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { Scroll, Resize } from 'vuetify/es5/directives'
import fr from 'vuetify/es5/locale/fr'

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
