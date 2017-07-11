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
loadJS('/node_modules/hyperscript/index.js','hyperscript')
loadJS('/root/scripts/define_factions.js','definefactions')
loadJS('/root/scripts/define_zones.js','definezones')
loadJS('/root/scripts/initializesvg.js','initializesvg')
//js.definefactions = babelize(js.definefactions).code
//js.definezones = babelize(js.definezones).code
//js.initializesvg = babelize(js.initializesvg).code

// Wait for CSS to load
while (!css.page) {}





const app = express()

function serve(path,resp) {
  app.get(path,function(req,res) {
    res.send(resp)
  })
}
function serveHTML(path,resp,locals) {
  app.get(path,function(req,res) {
    res.send(resp(locals))
  })
}

//Serve HTML
serveHTML('/test.html',html.testpage,{
  svg: svg.map,
  hyperscript: js.hyperscript,
  svgpanzoom: js.svgpanzoom,
  svgjs: js.svgjs,
  definefactions: js.definefactions,
  definezones: js.definezones,
  css: css.page,
  factions: factions,
  zones: zones,
})
serveHTML('/flat.html',html.flat,{
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
})

serve('/js/initializesvg.js',js.initializesvg)


app.listen(port,function() {
  console.log(`App running on ${port}`)
})
