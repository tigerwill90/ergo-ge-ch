export default {
  state: {
    windowSize: {
      x: 0,
      y: 0
    },
    scrollHeight: 0,
    drawer: false
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
  }
}
