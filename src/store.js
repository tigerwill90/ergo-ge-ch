/*
 * File: store.js
 * Project: Ergotherapeute
 * **********************
 * Author: Sylvain Muller
 * Email: sylvain.muller90@gmail.com
 * **********************
 * License: MIT License
 * Created Date: 26th February 2019
 * Last Modified: 31st March 2019
 */
import Vue from 'vue'
import Vuex from 'vuex'

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
    }
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
    }
  },
  actions: {},
  getters: {
    windowSize: state => state.windowSize,
    drawer: state => state.drawer,
    selector: state => state.selector,
    fontSizeMultiplier: state => state.fontSizeMultiplier,
    flatToolbar: state => state.flatToolbar,
    invertBrightness: state => state.invertBrightness
  }
})
