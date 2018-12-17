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
  }
}
