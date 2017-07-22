const beautify = require('xml-beautifier')
const fs = require('fs')
const args = process.argv.slice(2)
console.log(args)
const srcpath = args&&args[0]||'/root/gfx/plainmap05.svg'
const outpath = args&&args[1]||'/root/gfx/plainmap05.pretty.svg'

let src = fs.readFileSync(__dirname+srcpath,"utf8")
console.log(typeof(src),src.length||0)
fs.writeFile(__dirname+outpath,beautify(src),function(err) {
  if(err) { throw err; }
  console.log('Completed!')
})
