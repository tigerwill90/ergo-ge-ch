/*
 * File: main.js
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 13th February 2019
 * Last Modified: 22nd May 2019
 */
import '@babel/polyfill'
import { detect } from 'detect-browser'

const browser = detect()

if (browser && browser.name === 'ie' /* && parseInt(browser.version) < 11 */) {
  alert('Désolé votre navigateur internet est trop vieux, il n\'est pas supporté par notre application. Vous allez être redirigé')
  window.location.replace('https://www.google.com/intl/fr/chrome')
} else {
  loadApp().catch(err => {
    if (process.env.NODE_ENV === 'development') {
      console.log(err.message)
    }
  })
}

async function loadApp() {
  if (process.env.NODE_ENV === 'production') {
    console.log(
      '%cAttention ! En utilisant cette console, vous vous exposez au risque que des personnes malveillantes ' +
        'se fassent passer pour vous et volent vos informations grâce à une attaque appelée Self-XSS. ' +
        'Ne saisissez pas et ne copiez pas du code que vous ne comprenez pas.',
      'color: red; font-size: 20px'
    )
  }

  try {
    const { default: Vue } = await import('vue')
    await import('./plugins/vuetify')
    await import('./global-components')
    const { default: VueAxios } = await import('./plugins/vueaxios')
    const { default: axios } = await import('axios')
    const { VueReCaptcha } = await import('vue-recaptcha-v3')
    const { default: router } = await import('./router')
    const { default: store } = await import('./store')
    await import('./plugins/asyncComputed')
    const { default: App } = await import('./App')

    Vue.config.productionTip = false
    Vue.use(VueAxios, axios)
    Vue.use(VueReCaptcha, { siteKey: process.env.VUE_APP_RECAPTCHA_PUBLIC_KEY })

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  } catch (e) {
    throw e
  }
}
