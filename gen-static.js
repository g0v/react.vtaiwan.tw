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
    try { fs.mkdirSync("build/" + p) } catch (e) {}
    let output =(
        `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <title>react.vtaiwan.tw</title>
              <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
              <link href="/styles.css" rel="stylesheet">
              <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
            </head>
            <body id='production'>${browser.document.body.innerHTML.replace(
               /<script[^>]*>.*?<\/script>/ig, ''
            ).replace(
               /\/build\//g, '/'
            )}</body>
            <script src="/bundle.js"></script>
          </html>`
    );
    fs.writeFile("build/" + p + "/index.html", output, ()=>{
      if (++done == paths.length) { process.exit() }
    })
  })
})
