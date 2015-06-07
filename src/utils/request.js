"use strict"
import Request from 'immutable-request'
import Url from 'url'
import Promise from 'bluebird'

if ((typeof window !== 'undefined') && !(window.Promise)) {
    window.Promise = Promise
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

export default {
    get(url) { return new Promise((resolve)=> {
        if ((typeof window !== 'undefined')) {
            const item = window.localStorage.getItem(encodeURI(url))
            if (item) { return resolve(JSON.parse(item)) }
        }
        const {protocol, host, pathname} = Url.parse(url)
        return requestFrom(`${protocol}//${host}`).GET(pathname).then((rv)=>{
            if ((typeof window !== 'undefined')) {
                window.localStorage.setItem(encodeURI(url), JSON.stringify(rv))
            }
            return resolve(rv)
        })
    }) }
}
