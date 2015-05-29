import React from 'react'
import App from './App/App.jsx'
import request from 'superagent-bluebird-promise'
import Router, {Route} from 'react-router'
import ProposalBoard from './ProposalBoard/ProposalBoard.jsx'
import Proposal from './Proposal/Proposal.jsx'
import Category from './Category/Category.jsx'

import './normalize.css'
import './index.css'

var scripts = document.getElementsByTagName("script");
var src = scripts[scripts.length - 1].getAttribute("src");
window.__webpack_public_path__ = src.substr(0, src.lastIndexOf("/") + 1);


const routes = (
  <Route handler={App} path="/">
    <Route name="proposals" path="/"              handler={ProposalBoard} />
    <Route name="proposal"  path="/:proposalName" handler={Proposal} />
    <Route name="category"  path="/:proposalName/:category" handler={Category} />
    <Route name="categoryPage"  path="/:proposalName/:category/:page" handler={Category} />
    <Route name="categoryPagePost"  path="/:proposalName/:category/:page/:postID" handler={Category} />
  </Route>
);

var root = document.getElementById('root');
Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, root);
});
