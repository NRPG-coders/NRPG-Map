const express = require('express')
const less = require('less')
const pug = require('pug')
const fs = require('fs')
const base64 = require('node-base64-image')
const babel = require('babel-core')

const port = 3000

//Storage objects for html, css, js, and svg text
let html = {}
let css = {}
let js = {}

function loadHTML(path,name) {
  html[name] = pug.compile(fs.readFileSync(__dirname+path,"utf8"))
}
//Load SVG into memory as text
let svg = fs.readFileSync(__dirname+'/root/gfx/map.svg',"utf8")
//Load texture overlay into the svg as base64 encoded text
let texture
base64.encode(__dirname+'/root/gfx/texture.png',{
  string: true,
  local: true
}, function(err,ret) {
  if(err) { throw err; }
  texture = 'data:image/png;base64,'+ret
})

function loadCSS(path,name) {
  less.render(fs.readFileSync(__dirname+path,"utf8"), function(err,out) {
    if(err) { throw err; }
    css[name] = out
  })
}
function babelize(str) {
  return babel.transform(str, {
    presets: ['es2015'],
    comments: false,
  })
}
function loadJS(path,name) {
  js[name] = fs.readFileSync(__dirname+path,"utf8")
}

loadHTML('/root/templates/test.pug','test')
loadHTML('/root/templates/flat.pug','flat')

loadCSS('/root/styles/test.less','test')

loadJS('/node_modules/svg-pan-zoom/dist/svg-pan-zoom.min.js','svgpanzoom')
loadJS('/node_modules/svg.js/dist/svg.min.js','svgjs')
loadJS('/root/scripts/define_factions.js','definefactions')
loadJS('/root/scripts/define_zones.js','definezones')
loadJS('/root/scripts/initializesvg.js','initializesvg')
js.definefactions = babelize(js.definefactions).code
js.definezones = babelize(js.definezones).code
js.initializesvg = babelize(js.initializesvg).code


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
  css: css.test.css,
  dataurl: texture
})
serveHTML('/flat.html',html.flat,{
  svg: svg,
  svgpanzoom: js.svgpanzoom,
  definefactions: js.definefactions,
  definezones: js.definezones,
  svgjs: js.svgjs,
  initializesvg: js.initializesvg,
  css: css.test.css,
  dataurl: texture
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
