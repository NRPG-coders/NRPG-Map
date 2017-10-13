let mapholder = document.getElementById('map')

fetch('something.github.io/NRPG-Map/dist/gfx/map.svg')
  .then( response => response.text() )
  .then( text => { mapholder.innerHTML = text } )
  .catch( err => {
    mapholder.innerHTML = "An error has been encountered, or you are experiencing connectivity issues."
    throw err;
  })