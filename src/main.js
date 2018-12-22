import '@babel/polyfill'
import { detect } from 'detect-browser'
import Vue from 'vue'
import './plugins/vuetify'
import './global-components'
import VueState from './plugins/vuestate'
import VueAxios from './plugins/vueaxios'
import axios from 'axios'
import store from './store'
import storeBackup from './backup_store'
import './plugins/asyncComputed'
import router from './router'
import App from './App.vue'

const browser = detect()

if (browser) {
  if (browser.name === 'ie' && parseInt(browser.version) < 11) {
    window.location.replace('http://ergo-ge-independants.ch')
  }
  console.log('%c' + browser.name, 'color: teal; font-size: 13px')
  console.log('%c' + browser.version, 'color: teal; font-size: 13px')
  console.log('%c' + browser.os, 'color: teal; font-size: 13px')
}

if (process.env.NODE_ENV === 'production') {
  console.log(
    '%cAttention ! En utilisant cette console, vous vous exposez au risque que des personnes malveillantes ' +
    'se fassent passer pour vous et volent vos informations grâce à une attaque appelée Self-XSS. ' +
    'Ne saisissez pas et ne copiez pas du code que vous ne comprenez pas.', 'color: red; font-size: 20px'
  )
}

Vue.config.productionTip = false
Vue.use(VueState, storeBackup)
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
