#!/usr/bin/env babel-node
"use strict"
const fs = require('fs')
const Browser = require('zombie')
const paths = ['/']
Browser.localhost('localhost', 3000);
const seen = {}
processNext()
function processNext() {
    const p = paths.shift()
    if (!p) { process.exit() }
    if (seen[p]) { return processNext() }
    seen[p] = true
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
            ).replace(/href="#/, 'href="#')}</body>
            <script src="/bundle.js"></script>
          </html>`
    );
    const outputFile = "build/" + p + "/index.html"
    fs.writeFile(outputFile, output, ()=>{
      console.log(`==>>> ${ outputFile.replace(/\/\/+/g, '/') }`)
      while (/href="#?(\/[^/."][^."]+)"/.test(output)) {
          output = output.replace(/href="#?(\/[^/."][^."]+)"/, '')
          paths.push(console.log(RegExp.$1))
      }
      processNext()
    })
  })
}
