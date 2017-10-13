var Factions = {
  'Konohagakure': {
    name: 'Konohagakure',                 //Faction Name (SAME AS OWNER ID INSIDE ZoneDetails)
    capital: 'Konohagakure',              //Faction Capital (do we want this? If so, should these be zones or should they be cities?)
    color: '#bbffaa',                     //Faction color
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
  'Hoshigakure': {
    name: 'Hoshigakure',
    capital: 'Hoshi',
    color: '#ffaabb',
    blurb: 'Shorter description.',
    detail: 'Still short description.'
  },


  'Claw Country': {
    name: 'Claw Country',
    capital: '',
    color: '#668b67',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Fang Country': {
    name: 'Fang Country',
    capital: '',
    color: '#5a5858',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Kirigakure Ruins': {
    name: 'Kirigakure Ruins',
    capital: '',
    color: '#ffffff',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Island Country': {
    name: 'Island Country',
    capital: '',
    color: '#c13dff',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Volcano Country': {
    name: 'Volcano Country',
    capital: '',
    color: '#3d0632',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Lightning Country': {
    name: 'Lightning Country',
    capital: '',
    color: '#ffe5bf',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Bear Country': {
    name: 'Bear Country',
    capital: '',
    color: '#ff5252',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Rain Country': {
    name: 'Rain Country',
    capital: '',
    color: '#a4c6ff',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Fire Country': {
    name: 'Fire Country',
    capital: '',
    color: '#b90000',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Whirling Tide Country': {
    name: 'Whirling Tide Country',
    capital: '',
    color: '#0000b9',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Flower Country': {
    name: 'Flower Country',
    capital: '',
    color: '#74ff54',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Tea Country': {
    name: 'Tea Country',
    capital: '',
    color: '#6a0856',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Snow Country': {
    name: 'Snow Country',
    capital: '',
    color: '#185cb7',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Moon Country': {
    name: 'Moon Country',
    capital: '',
    color: '#8a929c',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Waterfall Country': {
    name: 'Waterfall Country',
    capital: '',
    color: '#022a5f',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Grass Country': {
    name: 'Grass Country',
    capital: '',
    color: '#4c7b37',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Earth Country': {
    name: 'Earth Country',
    capital: '',
    color: '#682504',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Forest Country': {
    name: 'Forest Country',
    capital: '',
    color: '#0a4b03',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Shadow Country': {
    name: 'Shadow Country',
    capital: '',
    color: '#2f2f2f',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Swamp Country': {
    name: 'Swamp Country',
    capital: '',
    color: '#65302e',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Tornado Country': {
    name: 'Tornado Country',
    capital: '',
    color: '#035547',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Bird Country': {
    name: 'Bird Country',
    capital: '',
    color: '#bdb86b',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Stone Country': {
    name: 'Stone Country',
    capital: '',
    color: '#9f6548',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Iron Country': {
    name: 'Iron Country',
    capital: '',
    color: '#46737b',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'River Country': {
    name: 'River Country',
    capital: '',
    color: '#ad75f9',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Wind Country': {
    name: 'Wind Country',
    capital: 'The Pristine Oasis',
    color: '#ffa00a',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },
  'Haven Country': {
    name: 'Haven Country',
    capital: '',
    color: '#ffcf4d',
    blurb: 'Shortish description here.',
    detail: 'Longish description here.'
  },


  '': {
    name: 'blank',
    capital: 'video games',
    color: '#cccccc',
    blurb: 'They are the dynamic duo.',
    detail: 'There exists no game they cannot beat.'
  }
}

if (typeof window !== 'undefined') {
  window.Factions = Factions
} else {
  module.exports = Factions
}
