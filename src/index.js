import React from 'react'
import App from './App/App.jsx'
import request from 'superagent-bluebird-promise'
import Router, {Route} from 'react-router'
import ProposalList from './ProposalList/ProposalList.jsx'
import Proposal from './Proposal/Proposal.jsx'

import './normalize.css'
import './index.css'

var scripts = document.getElementsByTagName("script");
var src = scripts[scripts.length - 1].getAttribute("src");
window.__webpack_public_path__ = src.substr(0, src.lastIndexOf("/") + 1);


const routes = (
  <Route handler={App} path="/">
    	<Route name="proposals" path="/"              handler={ProposalList} />
    	<Route name="proposal"  path="/:proposalName" handler={Proposal} />
  </Route>
);

var root = document.getElementById('root');
Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, root);
});
