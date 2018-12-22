import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowSize: {
      x: 0,
      y: 0
    },
    scrollHeight: 0,
    drawer: false
  },
  mutations: {
    windowSize: (state, windowSize) => {
      state.windowSize = windowSize
    },
    scrollHeight: (state, currentOffset) => {
      state.scrollHeight = currentOffset
    },
    toggleDrawer: (state) => {
      state.drawer = !state.drawer
    },
    drawer: (state, drawerState) => {
      state.drawer = drawerState
    }
  },
  actions: {},
  getters: {
    windowSize: state => state.windowSize,
    scrollHeight: state => state.scrollHeight,
    drawer: state => state.drawer
  }
})
