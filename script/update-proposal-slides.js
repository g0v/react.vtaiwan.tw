
import superagent from 'superagent'
import fs from 'mz/fs'
import co from 'co'

var proposalDataFile = './src/Proposal/data/Proposals.json'
var data = JSON.parse(fs.readFileSync(proposalDataFile))

co(function* () {
  yield Object.keys(data).map((name) => new Promise(function (resolve, reject) {
    superagent.get('http://www.slideshare.net/api/oembed/2?format=json&url=' + data[name].slides_url)
      .end(function (err, res) {
        data[name].slides_image = res.body.slide_image_baseurl.replace(/slide-$/, '-1-638.jpg')
        resolve(true)
      })
  }))
  fs.writeFileSync(proposalDataFile, JSON.stringify(data, null, 2))
}).catch((err) => console.log(err))
