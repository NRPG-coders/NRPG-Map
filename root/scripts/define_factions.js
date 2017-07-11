var Factions = {
  'Konohagakure': {
    name: 'Konohagakure',                 //Faction Name (SAME AS OWNER ID INSIDE ZoneDetails)
    capital: 'Konohagakure',              //Faction Capital (do we want this? If so, should these be zones or should they be cities?)
    color: '#ffaabb',                     //Faction color
    blurb: 'Short description here.',     //Short description
    detail: 'Lengthy description here.'   //Long Description
  },
  'Sunagakure': {
    name: 'Sunagakure',
    capital: 'Sunagakure',
    color: '#f2cc0e',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Wind Daimyou': {
    name: 'Wind Daimyou',
    capital: 'The Pristine Oasis',
    color: '#fff356',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Hoshigakure': {
    name: 'Hoshigakure',
    capital: 'Hoshi',
    color: '#bbffaa',
    blurb: 'Shorter description.',
    detail: 'Still short description.'
  }
}

if (window) {
  window.Factions = Factions
} else {
  module.exports = Factions
}
