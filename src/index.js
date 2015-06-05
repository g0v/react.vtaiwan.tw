import React from 'react'
import Promise from 'bluebird'
import Transmit from "react-transmit";
import App from './App/App.jsx'
import Router, {Route} from 'react-router'
import ProposalBoard from './ProposalBoard/ProposalBoard.jsx'
import Proposal from './Proposal/Proposal.jsx'
import Category from './Category/Category.jsx'

import './normalize.css'
import './index.css'

const routes = (
  <Route handler={App} path="/">
    <Route name="proposals" path="/"              handler={ProposalBoard} />
    <Route name="proposal"  path="/:proposalName/" handler={Proposal} />
    <Route name="category"  path="/:proposalName/:category/" handler={Category} />
    <Route name="categoryPage"  path="/:proposalName/:category/:page/" handler={Category} />
    <Route name="categoryPagePost"  path="/:proposalName/:category/:page/:postID/" handler={Category} />
  </Route>
);

if(typeof document !== 'undefined') {
  var root = document.getElementById('root');

  Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root/>, root);
  });
}
global.Promise = Promise
module.exports = function render(locals, callback) {
  Router.run(routes, locals.path, function(Handler) {
    // callback(null, React.renderToString(<Handler/>));

    Transmit.renderToString(Handler).then(({reactString, reactData})=>{
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
            <body id='production'>
              <div id="root">${reactString}</div>
            </body>
            <script src="/bundle.js"></script>
          </html>`
      );
      callback(null, output);
    }).catch((error)=> {
      console.log(error.stack);
    })

  });
};
