import Vue from 'vue'
import './plugins/vuetify'
import './global-components'
import App from './App.vue'
import router from './router'
import VueState from './plugins/vuestate'
import store from './store'
import './plugins/asyncComputed'

Vue.config.productionTip = false
Vue.use(VueState, store)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
