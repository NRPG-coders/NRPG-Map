const express = require('express')
const less = require('less')
const pug = require('pug')
const fs = require('fs')

const port = 3000

//Storage objects for html, css, js, and svg text
let html = {}
let css = {}
let js = {}

let svg
//Load svg
/*fs.readFile(__dirname+'/root/gfx/map.svg',"utf8",function(err,data) {
  if(err) { throw err; }
  svg = data
})

//Load HTML text into objects
function loadHTML(path,name) {
  fs.readFile(__dirname+path,"utf8",function(err,data) {
    console.log('hi;')
    if(err) { throw err; }
    html[name] = pug.render(data, {})
    console.log(html[name])
  })
}


//Load CSS text into objects
function loadCSS(path,name) {
  fs.readFile(__dirname+path,"utf8",function(err,data) {
    if(err) { throw err; }
    less.render(data, function(err,out) {
      if(err) { throw err; }
      css[name] = out
    })
  })
}

//Load JS text into objects
function loadJS(path,name) {
  fs.readFile(__dirname+path,"utf8",function(err,data) {
    if(err) { throw err; }
    js[name] = data
  })
}*/
svg = fs.readFileSync(__dirname+'/root/gfx/map.svg',"utf8")
function loadHTML(path,name) {
  html[name] = pug.compile(fs.readFileSync(__dirname+path,"utf8"))
}
function loadCSS(path,name) {
  less.render(fs.readFileSync(__dirname+path,"utf8"), function(err,out) {
    if(err) { throw err; }
    css[name] = out
  })
}
function loadJS(path,name) {
  js[name] = fs.readFileSync(__dirname+path,"utf8")
}
loadHTML('/root/templates/test.pug','test')
loadHTML('/root/templates/flat.pug','flat')

loadCSS('/root/styles/test.less','test')

loadJS('/node_modules/raphael/raphael.min.js','raphael')
loadJS('/node_modules/svg-pan-zoom/dist/svg-pan-zoom.min.js','svgpanzoom')
loadJS('/node_modules/svg.js/dist/svg.min.js','svgjs')
loadJS('/root/scripts/define_factions.js','definefactions')
loadJS('/root/scripts/define_zones.js','definezones')
loadJS('/root/scripts/initializesvg.js','initializesvg')

const app = express()

function serve(path,resp) {
  app.get(path,function(req,res) {
    res.send(resp)
  })
}
function serveCSS(path,resp) {
  app.get(path,function(req,res) {
    res.format({
      css: res.send(resp)
    })
  })
}
function serveHTML(path,resp,locals) {
  app.get(path,function(req,res) {
    res.send(resp(locals))
  })
}
//Serve SVG
serve('/pic/map.svg',svg)

//Serve HTML
serveHTML('/test.html',html.test,{
  svg: svg,
  css: css.test.css
})
serveHTML('/flat.html',html.flat,{
  svg: svg,
  svgpanzoom: js.svgpanzoom,
  definefactions: js.definefactions,
  definezones: js.definezones,
  svgjs: js.svgjs,
  initializesvg: js.initializesvg,
  css: css.test.css
})

//Serve CSS
serveCSS('/css/test.css',css.test.css)

//Serve JS
serve('/js/raphael.min.js',js.raphael)
serve('/js/svg-pan-zoom.min.js',js.svgpanzoom)
serve('/js/svg.js',js.svgjs)
serve('/js/definefactions.js',js.definefactions)
serve('/js/definezones.js',js.definezones)
serve('/js/initializesvg.js',js.initializesvg)


app.listen(port,function() {
  console.log(`App running on ${port}`)
})
