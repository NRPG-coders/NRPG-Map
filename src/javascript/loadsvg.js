let mapholder = document.getElementById('map')
let oReq = new XMLHttpRequest()

oReq.addEventListener('load', res => {
  try {
    mapholder.innerHTML = res.target.responseText
  } catch(err) {
    mapholder.innerHTML = "An error has been encountered, or you are experiencing connectivity issues."
    throw err;
  }
})
oReq.open('GET', 'something.github.io/NRPG-Map/dist/gfx/map.svg')
oReq.send()