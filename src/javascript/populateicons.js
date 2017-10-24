(function(context) {let map = document.getElementById('TheMap')
  let icontag = document.createElementNS("http://www.w3.org/2000/svg", 'g')
  icontag.id = 'Icons'
  icontag.setAttribute('data-name', 'Icon collection')
  icontag.setAttribute('externalResourcesRequired', 'true')

  Icons.forEach( def => {
    if (!def || !def.x || !def.y || !def.width ||!def.height || !def.url) { return; }
    let el = document.createElementNS("http://www.w3.org/2000/svg", 'image')
    el.setAttribute('x', def.x)
    el.setAttribute('y', def.y)
    el.setAttribute('width', def.width)
    el.setAttribute('height', def.height)
    el.setAttribute('href', def.url)
    el.setAttribute('externalResourcesRequired', 'true')
    icontag.appendChild(el)
  })

  document.getElementById('TheMap').appendChild(icontag)
})(this)