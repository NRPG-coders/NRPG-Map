const express = require('express')
const pug = require('pug')
const fs = require('fs')
const base64 = require('node-base64-image')
const babel = require('babel-core')
const stylus = require('stylus')
const factions = require(__dirname+'/root/scripts/define_factions.js')
const zones = require(__dirname+'/root/scripts/define_zones.js')
const nib = require('nib')

const port = 3000

//Storage objects for html, css, js, and svg text
let html = {}
let css = {}
let js = {}
let svg = {}

//Load HTML into memory as text
function loadHTML(path,name) {
  html[name] = pug.compile(fs.readFileSync(__dirname+path,"utf8"))
}
//Load SVG into memory as text
function loadSVG(path,name) {
  svg[name] = fs.readFileSync(__dirname+path,"utf8")
}

//Load CSS into memory as text
function loadCSS(path,name) {
  stylus(fs.readFileSync(__dirname+path,'utf8'))
    .use(nib())
    .include('nib')
    .include('nib/position')
    .render(function(err,out) {
      if (err) { throw err; }
      css[name] = out
    })
}
//Load javascript into memory as text
function loadJS(path,name) {
  js[name] = fs.readFileSync(__dirname+path,"utf8")
}
//Transforms a string of javascript into using babel-preset-es2015
function babelize(str) {
  return babel.transform(str, {
    presets: ['es2015'],
    comments: false,
  })
}

loadSVG('/root/gfx/map.svg','map')

loadHTML('/root/templates/page.pug','testpage')
loadHTML('/root/templates/page.flat.pug','flat')

loadCSS('/root/styles/page.styl','page')

loadJS('/node_modules/svg-pan-zoom/dist/svg-pan-zoom.min.js','svgpanzoom')
loadJS('/node_modules/svg.js/dist/svg.min.js','svgjs')
loadJS('/root/scripts/define_factions.js','definefactions')
loadJS('/root/scripts/define_zones.js','definezones')
loadJS('/root/scripts/initializesvg.js','initializesvg')
//js.definefactions = babelize(js.definefactions).code
//js.definezones = babelize(js.definezones).code
//js.initializesvg = babelize(js.initializesvg).code

// Wait for CSS to load
while (!css.page) {}


function invertColor(hex,bw) {
  function zeroPadding(str,len) {
    len = len || 2
    return (new Array(len).join('0') + str).slice(-len)
  }
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  let r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16)
  if (bw) {
      // http://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF'
  }
  // invert color components
  r = (255 - r).toString(16)
  g = (255 - g).toString(16)
  b = (255 - b).toString(16)
  // pad each with zeros and return
  return "#" + zeroPadding(r) + zeroPadding(g) + zeroPadding(b)
}


const app = express()
const locals = {
  svg: svg.map,
  hyperscript: js.hyperscript,
  svgpanzoom: js.svgpanzoom,
  svgjs: js.svgjs,
  definefactions: js.definefactions,
  definezones: js.definezones,
  initializesvg: js.initializesvg,
  css: css.page,
  factions: factions,
  zones: zones,
  invertColor: invertColor,
}


function serve(path,resp) {
  app.get(path,function(req,res) {
    res.send(resp)
  })
}
function serveHTML(path,resp) {
  app.get(path,function(req,res) {
    res.send(resp(locals))
  })
}

//Serve HTML
serveHTML('/test.html',html.testpage)
serveHTML('/flat.html',html.flat)

serve('/js/initializesvg.js',js.initializesvg)


app.listen(port,function() {
  console.log(`App running on ${port}`)
})

fs.writeFile(__dirname+'/out.flat.html',html.flat(locals),'utf8',function(err) {
  if (err) { throw err; }
  console.log('out.flat.html has been updated!')
})
