var ZoneDetails = {
  'WindZone01': {
    name: 'The Grand Desert',                        //Zone name
    blurb: 'A fucking huge desert.',                 //Short details
    detail: 'Seriously. It\'s really fucking big.',  //Longer details
    owner: 'Wind Daimyou'                            //Owning Faction
  },
  'WindZone03': {
    name: 'Sunagakure',
    blurb: 'It\'s the sand village.',
    detail: 'Gaara lived here once. Probably.',
    owner: 'Sunagakure'
  },
  'WindZone04': {
    name: 'The Pristine Oasis',
    blurb: 'Short text.',
    detail: 'Much longer text.',
    owner: 'Wind Daimyou'
  },
}

if (window) {
  window.ZoneDetails = ZoneDetails
} else {
  module.exports = ZoneDetails
}
