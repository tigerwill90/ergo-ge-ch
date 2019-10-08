/*
 * File: store.js
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 26th February 2019
 * Last Modified: 22nd May 2019
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    windowSize: {
      x: 0,
      y: 0
    },
    drawer: false,
    fontSizeMultiplier: 40,
    invertBrightness: false,
    flatToolbar: false,
    selector: {
      hash: null,
      routeName: null,
      activeLinkIndex: null,
      currentHash: null,
      options: width => {
        const options = {
          duration: 300,
          easing: 'easeInOutCubic'
        }
        if (width < 496) {
          options.offset = 64
          return options
        }
        options.offset = 110
        return options
      }
    },
    notification: {
      status: null,
      message: null
    },
    user: null,
    authorization: null,
    attempt: 0
  },
  mutations: {
    windowSize: (state, windowSize) => {
      state.windowSize = windowSize
    },
    toggleDrawer: state => {
      state.drawer = !state.drawer
    },
    drawer: (state, drawerState) => {
      state.drawer = drawerState
    },
    selector: (state, selector) => {
      state.selector.hash = selector.hash
      state.selector.routeName = selector.routeName
    },
    setActiveLinkIndex: (state, activeLinkIndex) => {
      state.selector.activeLinkIndex = activeLinkIndex
    },
    setHashSelector: (state, hash) => {
      state.selector.hash = hash
    },
    setCurrentHash: (state, hash) => {
      state.selector.currentHash = hash
    },
    setRouteName: (state, routeName) => {
      state.selector.routeName = routeName
    },
    fontSizeMultiplier: (state, value) => {
      state.fontSizeMultiplier = value
    },
    invertBrightness: (state, value) => {
      state.invertBrightness = value
    },
    flatToolbar: (state, value) => {
      state.flatToolbar = value
    },
    notification: (state, { status, message }) => {
      state.notification.status = status
      state.notification.message = message
    },
    user: (state, user) => {
      state.user = user
    },
    authorization: (state, authorization) => {
      state.authorization = authorization
    },
    attempt: (state) => {
      state.attempt++
    }
  },
  actions: {
    reconnect({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_API_URL}/auth/token`, { withCredentials: true })
          .then(response => {
            commit('user', response.data.data.user)
            commit('authorization', response.data.data.authorization)
            resolve(response.data.data.user)
          })
          .catch(err => {
            commit('attempt')
            commit('user', null)
            commit('authorization', null)
            reject(err)
          })
      })
    },
    setReconnectInterval({ dispatch, state }) {
      const interval = setInterval(() => {
        if (!state.authorization) {
          clearInterval(interval)
          return
        }
        const now = Math.floor(Date.now() / 1000)
        const exp = state.authorization.expires_at - 10
        if (now >= exp) {
          dispatch('reconnect').then(() => {
            console.warn('reconnected')
          }).catch(() => {
            clearInterval(interval)
          })
        }
      }, 1000)
    }
  },
  getters: {
    windowSize: state => state.windowSize,
    drawer: state => state.drawer,
    selector: state => state.selector,
    fontSizeMultiplier: state => state.fontSizeMultiplier,
    flatToolbar: state => state.flatToolbar,
    invertBrightness: state => state.invertBrightness,
    notification: state => state.success,
    user: state => state.user,
    authorization: state => state.authorization,
    attempt: state => state.attempt
  }
})
