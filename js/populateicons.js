"use strict";!function(t){document.getElementById("TheMap");var e=document.createElementNS("http://www.w3.org/2000/svg","g");e.id="Icons",e.setAttribute("data-name","Icon collection"),e.setAttribute("externalResourcesRequired","true"),Icons.forEach(function(t){if(t&&t.x&&t.y&&t.width&&t.height&&t.url){var r=document.createElementNS("http://www.w3.org/2000/svg","image");r.setAttribute("x",t.x),r.setAttribute("y",t.y),r.setAttribute("width",t.width),r.setAttribute("height",t.height),r.setAttribute("href",t.url),r.setAttribute("externalResourcesRequired","true"),e.appendChild(r)}}),document.getElementById("TheMap").appendChild(e)}();