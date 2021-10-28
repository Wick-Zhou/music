function rem() {
  let deviceWidth = window.innerWidth || document.documentElement.clientWidth
  if (deviceWidth > 750) {
    deviceWidth=750
  }
  if (deviceWidth < 320) {
    deviceWidth=320
  }
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
  document.querySelector('body').style.fontSize = 0.3 + 'rem'
}

rem()

window.onresize = function () {
  rem()
}