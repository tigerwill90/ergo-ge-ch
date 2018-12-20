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
    error: {
      activeNotification: localStorage.getItem('err_notifications'),
      get notification () {
        if (this.activeNotification === null || this.activeNotification === 'active') {
          return true
        }
        console.log('yolo')
        return false
      },
      set notification (newValue) {
        this.activeNotification = newValue
        localStorage.setItem('err_notifications', newValue)
      },
      networkId: 0,
      networks: []
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
  addNetworkError (userMessage, logs, active = true) {
    const error = {
      id: this.state.error.networkId++,
      active: active,
      log: logs,
      message: userMessage
    }
    this.state.error.networks.push(error)
  },
  deleteNetworkError (id) {
    const pos = this.state.error.networks.map(network => { return network.id }).indexOf(id)
    if (pos !== -1) {
      this.state.error.networks.splice(pos, 1)
    }
  },
  deleteAllErrors () {
    this.state.error.networks = []
  },
  disableErrorNotification () {
    this.state.error.notification = 'inactive'
  },
  enableErrorNotification () {
    this.state.error.notification = 'active'
  }
}
