export default {
  state: {
    windowSize: {
      x: 0,
      y: 0
    },
    scrollHeight: 0,
    drawer: false,
    selector: {
      hash: null,
      routeName: null,
      options: width => {
        const options = {
          duration: 250,
          easing: 'easeInOutCubic'
        }
        if (width < 496) {
          options.offset = -64
          return options
        }
        options.offset = -110
        return options
      }
    },
    messages: {
      activeNotification: localStorage.getItem(process.env.VUE_APP_LOCAL_STORAGE_ALERT),
      get notification () {
        if (this.activeNotification === null) {
          localStorage.setItem(process.env.VUE_APP_LOCAL_STORAGE_ALERT, 'ACTIVE')
          return true
        }

        if (this.activeNotification === 'ACTIVE') {
          return true
        }
        return false
      },
      set notification (newValue) {
        this.activeNotification = newValue
        localStorage.setItem(process.env.VUE_APP_LOCAL_STORAGE_ALERT, newValue)
      },
      alertId: 0,
      alerts: []
    }
  },
  setWindowsSize (x, y) {
    this.state.windowSize.x = x
    this.state.windowSize.y = y
  },
  setScrollHeight (height) {
    this.state.scrollHeight = height
  },
  setDrawer (newState) {
    this.state.drawer = newState
  },
  setHashSelector (hash) {
    this.state.selector.hash = hash
  },
  setRouteSelector (routeName) {
    this.state.selector.routeName = routeName
  },
  addAlert (userMessage, type, logs, active = true) {
    const error = {
      id: this.state.messages.alertId++,
      active: active,
      type: type,
      log: logs,
      message: userMessage
    }
    this.state.messages.alerts.push(error)
  },
  deleteAlert (id) {
    const pos = this.state.messages.alerts.map(alert => { return alert.id }).indexOf(id)
    if (pos !== -1) {
      this.state.messages.alerts.splice(pos, 1)
    }
  },
  deleteAllAlerts () {
    this.state.messages.alerts = []
  },
  disableAlertNotification () {
    this.state.messages.notification = 'INACTIVE'
  },
  enableAlertNotification () {
    this.state.messages.notification = 'ACTIVE'
  }
}
