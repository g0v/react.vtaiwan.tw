import React from 'react'
import App from './App'
import request from 'superagent-bluebird-promise'

var scripts = document.getElementsByTagName("script");
var src = scripts[scripts.length - 1].getAttribute("src");
window.__webpack_public_path__ = src.substr(0, src.lastIndexOf("/") + 1);

var root = document.getElementById('root');
function load (id) {
    history.replaceState(null, null, '?'+encodeURIComponent(id))
    React.render( <App id={id} onChange={(e) => load(e.target.value)} />, root );
}
if (/^\?([-\w]+)$/.test(location.search)) {
    load(location.search.slice(1))
}
else {
    load('')
}
