import Hackpad from 'hackpad'
import To_markdown from 'to-markdown'
import To_XML from 'xml'

// help: CLIENT_ID=xxx SECRET=yyy babel-node script/gen-an.js [pad_id]
// ex: CLIENT_ID=xxx SECRET=yyy babel-node script/gen-an.js 3RvGJjHbZ3Z
// Get your Client ID and Secret from https://g0v.hackpad.com/ep/account/settings/
const CLIENT_ID = process.env.CLIENT_ID
const SECRET = process.env.SECRET

const client = new Hackpad(CLIENT_ID, SECRET, { site: 'g0v.hackpad.com' })

client.export(process.argv[2], 'latest', 'html', (err, html) => {
  var markdown_content = To_markdown(html)
  var debateSection = []

  var speaker_name = '', speech = []
  markdown_content.split('\n').forEach(function (line, index, arr) {
    var matcher
    if(line.startsWith('#')) {
      debateSection.push({heading: line.split('#')[1].trim() })
    }

    if( line.startsWith('*') ) {
      speech = speech.concat([ { p: line.split('*')[1].trim() + '\n' }])
    }

    if( !line.startsWith('*') && (matcher = line.match(/^(.+)(?::|：)$/))) {
      if(speaker_name !== '' && speech.length > 0) {
        debateSection.push({
          speech: [{_attr: { by: `#${speaker_name}`,
        }}].concat(speech)})
      }
      speaker_name = matcher[1]
      speech = []
    }

    if(index === arr.length -1) {
      debateSection.push({
        speech: [{_attr: { by: `#${speaker_name}`,
      }}].concat(speech)})
    }
  })
  var an = {akomaNtoso: [{ debate: [
    // {meta: [{references: References}]}, // 替TLCPerson 保留
    // {preface: Preface}, // 替文件名稱保留
    {debateBody: debateSection }
  ]}]}
  console.log(To_XML(an))
})