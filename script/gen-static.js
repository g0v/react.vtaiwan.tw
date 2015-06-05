#!/usr/bin/env babel-node
"use strict"
const fs = require('fs')
const Browser = require('zombie')
const child_process = require('child_process')
const paths = process.argv.slice(2)
Browser.localhost('localhost', 3000);
const browser = new Browser()
processNext()
function processNext() {
    const p = paths.shift() || '/'
    if (!p) { process.exit() }
    try { fs.mkdirSync("build/" + p) } catch (e) {}
    const outputFile = "build/" + p + "/index.html"
//    if (fs.existsSync(outputFile)) { process.exit() }
    fs.writeFileSync(outputFile, '<WIP/>')
    browser.visit(p, ()=>{
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
            )}</body>
            <script src="/bundle.js"></script>
          </html>`
    );
    fs.writeFile(outputFile, output, ()=>{
      // console.log(`==>>> ${ outputFile.replace(/\/\/+/g, '/') }`)
      const seen = {}
      let waitFor = 0
      while (/href="#?(\/[^/."][^."]+)"/.test(output)) {
          output = output.replace(/href="(\/[^/."][^."]+)"/, '')
          const p = RegExp.$1
          if (seen[p]) { continue }
          if (fs.existsSync("build/" + p + "/index.html")) { continue }
          seen[p] = true
          waitFor++
          console.log(p)
          const cmd = child_process.spawn("babel-node", ["script/gen-static.js", p])
          cmd.stdout.on('data', (data) => {
              if (data && !/WDS|HMR|DevTools/.test(data)) {
                  console.log(('> ' + data).replace(/\n/g, ''))
              }
          })
          cmd.on('close', () => {
            waitFor--
            console.log(waitFor)
            if (waitFor <= 0) { process.exit() }
          })
      }
      if (!waitFor) { process.exit() }
    })
  })
}
