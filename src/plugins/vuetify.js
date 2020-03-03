import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import fr from 'vuetify/es5/locale/fr'
import { Scroll, Resize } from 'vuetify/es5/directives'
import goTo from 'vuetify/es5/services/goto'

Vue.use(Vuetify)

export function createVuetify() {
  const vuetify = new Vuetify({
    theme: { disable: false },
    icons: {
      iconfont: 'md'
    },
    lang: {
      locales: { fr },
      current: 'fr'
    },
    directives: {
      Scroll,
      Resize
    }
  })

  goTo.framework = vuetify.framework

  return vuetify
}
