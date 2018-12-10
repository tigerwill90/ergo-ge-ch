import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { Scroll, Resize } from 'vuetify/es5/directives'

Vue.use(Vuetify, {
  iconfont: 'md',
  directives: {
    Scroll,
    Resize
  }
})
