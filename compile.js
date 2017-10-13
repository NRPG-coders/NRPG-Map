const fs = require('fs')
const base64 = require('node-base64-image')
const babel = require('babel-core')
const stylus = require('stylus')
const nib = require('nib')
const pd = require('pretty-data').pd
const uglifyjs = require('uglify-js').minify
const path = require('path')

const port = 3000

//Storage objects for css, js, and svg text
let css = {}
let js = {}
let svg = {}

//Load SVG into memory as text
function loadSVG(path,name) {
  svg[name] = pd.xmlmin(fs.readFileSync(__dirname+path,"utf8"))
}
//Load CSS into memory as text
function loadCSS(path,name) {
  stylus(fs.readFileSync(__dirname+path,'utf8'))
    .use(nib())
    .render(function(err,out) {
      if (err) { throw err; }
      css[name] = pd.cssmin(out)
    })
}
//Transforms a string of javascript using babel-preset-es2015
function babelize(str) {
  return babel.transform(str, {
    presets: ['es2015'],
    comments: false,
  })
}
//Load javascript into memory as text
function loadJS(path,name) {
  js[name] = uglifyjs(babelize(fs.readFileSync(__dirname+path,"utf8")).code).code
}


loadSVG('/src/pictures/map.svg','map')

loadCSS('/src/stylus/page.styl','page')

loadJS('/src/javascript/define_factions.js','definefactions')
loadJS('/src/javascript/define_zones.js','definezones')
loadJS('/src/javascript/initializesvg.js','initializesvg')
loadJS('/src/javascript/invertcolor.js','invertcolor')

// Wait for CSS to load
while (!css.page) {}



function write(folder, name, contents) {
  fs.writeFile('./dist/'+folder+'/'+name, contents, (err) => {
    if (err) { throw err; }
  })
}
let writejs = (name, contents) => { write('js', name, contents) }


(function(root) {
  fs.readdirSync(root).forEach( name => {
    let sub = path.join(root, name)
    if (fs.statSync(sub).isDirectory()) {
      fs.readdirSync(sub).forEach( file => {
        if (file !== '.gitignore') {
          fs.unlinkSync(path.join(sub, file))
        }
      })
    }
  })
})('./dist')

//*
write('css', 'main.css', css.page)
write('gfx', 'map.svg', svg.map)
writejs('factions.js', js.definefactions)
writejs('zones.js', js.definezones)
writejs('initializesvg.js', js.initializesvg)
writejs('invertcolor.js', js.invertcolor)
//*/