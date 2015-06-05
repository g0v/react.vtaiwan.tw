#!/usr/bin/env babel-node
"use strict"
if (!parseInt(process.versions.node[0])) {
    throw "Note: This script is incompatible with Node.js 0.*.*"
}

const fs = require('fs')
const Browser = require('zombie')
const child_process = require('child_process')
const paths = process.argv.slice(2)
Browser.localhost('localhost', 3000);

const browser = new Browser({ waitDuration: '10s' })
const path = paths.shift() || '/'
try { fs.mkdirSync("build/" + path) } catch (e) {}
const outputFile = "build/" + path + "/index.html"
fs.writeFileSync(outputFile, `<body>Error: Building ${path} failed!`)

browser.visit(path, ()=>{
    let output = `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8" />
        <title>vTaiwan.tw</title>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
        <link href="/styles.css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        </head>
        <body id='production'>${browser.document.body.innerHTML.replace(
            /<script[^>]*>.*?<\/script>/ig, ''
        )}</body>
        <script src="/bundle.js"></script>
    </html>`
    fs.writeFile(outputFile, output, ()=>{
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
                if (waitFor <= 0) { process.exit() }
            })
        }
        if (!waitFor) { process.exit() }
    })
})
