




//Default color of all zones
const defaultColor = '#b2b2b2'




//Stores the information objects of all the zones (including the SVG.Element)
let zones = []
//ID-keyed storage of array values. zones[zoneReference[id]] will get the information object of the zone
let zoneReference = {}
//Returns the information table of the zone with {id}
function getInfo(id) {
  return zones[zoneReference[id]]
}
//Stores the ID of the currently selected (clicked) zone, if any
let selectedZone;




//Activates the information blurb group corresponding to the given zone ID
function triggerInfo(id) {
  document.getElementById('hover').innerHTML = 'Hovered zone id: '+id
  document.getElementById('blurb'+id).classList.remove('hidden')

}
//Activates the full information group corresponding to the given zone ID
function triggerExpandedInfo(id) {
  document.getElementById('click').innerHTML = 'Clicked zone id: '+id
  document.getElementById('long'+id).classList.remove('hidden')
}
//Turns off all information blurb group
function untriggerInfo() {
  Array.from(document.getElementById('blurb').children).forEach( (node) => {
    node.classList.add('hidden')
  })
}
//Turns off all full information groups
function untriggerExpandedInfo() {
  Array.from(document.getElementById('long').children).forEach( (node) => {
    node.classList.add('hidden')
  })
}




//Set a zone as 'active' (clicked)
function selectZone(id) {
  let info = zones[zoneReference[id]]
  let color = '#fff'
  if(info.g) {
    for(let poly of document.getElementById(id).childNodes) {
      if(!poly.tagName) { continue; }
      poly.style.fill = color
    }
  } else {
    info.e.node.style.fill = color
  }
  untriggerExpandedInfo()
  triggerExpandedInfo(id)
}
//Set a zone as 'hovered' (the zone 'selected' by the most recent hover choice)
function hoverZone(id) {
  let info = zones[zoneReference[id]]
  let color = '#ddd'
  if(info.g) {
    for(let poly of document.getElementById(id).childNodes) {
      if(!poly.tagName) { continue; }
      poly.style.fill = color
    }
  } else {
    info.e.node.style.fill = color
  }
  untriggerInfo()
  triggerInfo(id)

}




//Handler function for a custom event. This 'resets' the zone to their default coloring.
function customresethandler() {
  let info = getInfo(this.id())
  try {
    var color = Factions[info.details.owner].color
  } catch(err) {
    var color = defaultColor
  }
  if(info.g) {
    for(let poly of document.getElementById(info.id).childNodes) {
      if(!poly.tagName) { continue; }
      poly.style.fill = color
    }
  } else {
    info.e.node.style.fill = color
  }
}
//Triggers the customreset event on all zones
function customresetcaller() {
  zones.forEach(function(obj) {
    if(obj.id === selectedZone) { return; }
    obj.e.fire('customreset')
  })
}
//This is what actually makes the mouseover event 'happen'
//It is globally scoped to allow access by the
function delayedMouseover(info,id) {
  //if(selectedZone) { return; }
  if(info.mouseout) { return; }
  if(info.id !== selectedZone) {
    customresetcaller()
    hoverZone(id)
  } else {
    customresetcaller()
    untriggerInfo()
    triggerInfo(id)
  }
}
//Mouseover event handler for zones
function mouseoverhandler() {
  let info = getInfo(this.id())
  info.mouseout = false
  setTimeout(delayedMouseover,50,info,info.id)
}
//Mouseout event handler for zones
//Only required if you desire to 'move the mouse off a zone' without 'unhovering' it, which is the current implementation
function mouseouthandler() {
  if(selectedZone) { return; }
  let info = zones[zoneReference[this.id()]]
  info.mouseout = true
}
//Handles the clicking of elements
function clickhandler() {
  let info = getInfo(this.id())
  if(selectedZone === info.id) {
    selectedZone = null
    info.e.fire('customreset')
    delayedMouseover(info,info.id) //The mouseover event ceases execution early if the element is selected, so we retrigger it here.
    untriggerExpandedInfo()
  } else {
    selectedZone = info.id
    customresetcaller()
    selectZone(info.id)
  }
}
//Handles touch events
function ontouchstarthandler() {
  let info = getInfo(this.id())
  info.e.fire('mouseover')
  info.e.fire('click')
}



function adopt() {
  for(let element of document.getElementById('The_Ninja_World').childNodes) {
    if(!element.tagName) { continue; }
    if(!element.id) { throw 'Element lacks id!'; }
    zoneReference[element.id] = zones.length
    zones.push({
      g: element.tagName.toLowerCase() === 'g',
      e: SVG.adopt(element),
      id: element.id,
      details: ZoneDetails[element.id],
      mouseout: false
    })
  }
  zones.forEach(function(obj,i) {
    let SVGelement = obj.e
    SVGelement.mouseover(mouseoverhandler)
    SVGelement.mouseout(mouseouthandler)
    SVGelement.click(clickhandler)
    SVGelement.on('customreset',customresethandler)
    SVGelement.on('touchstart',ontouchstarthandler)
    SVGelement.fire('customreset')
  })
}

addload(adopt)
addload(function() {
  window.map = svgPanZoom('#The_Best_Map_Ever', {
    panEnabled: true,
    controlIconsEnabled: true,
    zoomEnabled: true,
    dblClickZoomEnabled: true,
    mouseWheelZoomEnabled: true,
    preventMouseEventsDefault: true,
    zoomScaleSensitivity: 0.5,
    minZoom: 1,
    maxZoom: 10,
    fit: true,
    contain: false,
    center: true,
    refreshRate: 'auto',
  })
})
