import Request from 'immutable-request'
import Url from 'url'
import Promise from 'bluebird'

export default {
  get(url) {
    return new Promise((resolve)=> {
      if (window.localStorage && window.localStorage.getItem(encodeURI(url))) {
        return resolve(JSON.parse(window.localStorage.getItem(encodeURI(url))))
      }
      const {protocol, host, pathname} = Url.parse(url)
      return requestFrom(`${protocol}//${host}`).GET(pathname)
        .then((rv)=>{
          if (window.localStorage) {
            window.localStorage.setItem(encodeURI(url), JSON.stringify(rv))
          }
          return resolve(rv)
        })
    })
  }
}

const domainToRequest = {}

function requestFrom(domain) {
  domainToRequest[domain] = domainToRequest[domain] || new Request.Requester(domain, {
    max: 100, // cache no more than 100 HTTP requests
    maxAge: 60000, // cache expires after 60s
    timeout: 10000, // request timeout after 10000
  })
  return domainToRequest[domain]
}
