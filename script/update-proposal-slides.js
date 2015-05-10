
import superagent from 'superagent-bluebird-promise'
import fs from 'mz/fs'
import co from 'co'

var proposalDataFile = './src/Proposal/data/Proposals.json'

co(function* () {
  var data = JSON.parse(fs.readFileSync(proposalDataFile))
  yield Object.keys(data).map(function (name) {
    return superagent.get('http://www.slideshare.net/api/oembed/2?format=json&url=' + data[name].slides_url)
      .then(function (res) {
        data[name].slides_image = res.body.slide_image_baseurl.replace(/slide-$/, '-1-638.jpg')
      })
    })
  fs.writeFileSync(proposalDataFile, JSON.stringify(data, null, 2))
}).catch((err) => console.log(err))
