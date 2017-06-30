const beautify = require('xml-beautifier')
const fs = require('fs')

const srcpath = '/root/gfx/plainmap05.svg'
const outpath = '/root/gfx/plainmap05.pretty.svg'

let src = fs.readFileSync(__dirname+srcpath,"utf8")
console.log(typeof(src),src.length||0)
fs.writeFile(__dirname+outpath,beautify(src),function(err) {
  if(err) { throw err; }
  console.log('Completed!')
})
