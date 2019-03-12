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
    },
    notifications: {
      active: () => {
        const alert = localStorage.getItem(process.env.VUE_APP_LOCAL_STORAGE_ALERT)
        if (alert === null || alert === 'ACTIVE') {
          return true
        }
        return false
      },
      messageId: 0,
      messages: []
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
      state.selector.activeLinkIndex = selector.activeLinkIndex
    },
    setHashSelector: (state, hash) => {
      state.selector.hash = hash
    },
    enableNotifications: state => {
      state.notifications.active = true
      localStorage.setItem(process.env.VUE_APP_LOCAL_STORAGE_ALERT, 'ACTIVE')
    },
    disableNotifications: state => {
      state.notifications.active = false
      localStorage.setItem(process.env.VUE_APP_LOCAL_STORAGE_ALERT, 'INACTIVE')
    },
    addNotification: (state, newMessage) => {
      const message = {
        active: newMessage.active,
        type: newMessage.type,
        logs: newMessage.logs,
        message: newMessage.userMessage
      }
      message.id = state.notifications.messageId++
      state.notifications.messages.push(message)
    },
    deleteNotification: (state, id) => {
      const pos = state.notifications.messages.map(message => message.id).indexOf(id)
      if (pos !== -1) {
        state.notifications.messages.splice(pos, 1)
      }
    },
    deleteNotifications: state => {
      state.notifications.messages = []
      state.notifications.messageId = 0
    }
  },
  actions: {},
  getters: {
    windowSize: state => state.windowSize,
    drawer: state => state.drawer,
    selector: state => state.selector,
    notifications: state => state.notifications
  }
})
