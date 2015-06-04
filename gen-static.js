#!/usr/bin/env babel-node
"use strict"
const fs = require('fs')
const Browser = require('zombie')
const paths = require('./paths')
Browser.localhost('localhost', 3000)
let done = 0
paths.forEach((p) => {
  const browser = new Browser()
  browser.visit('/', ()=>{
    fs.writeFile("build/" + p + "/index.html", browser.document.body.innerHTML, ()=>{
      if (++done == paths.length) { process.exit() }
    })
  })
})
