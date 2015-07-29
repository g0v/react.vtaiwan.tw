"use strict"

import request from './utils/request'
import React from 'react'
import App from './App/App.jsx'
import Router, {Route} from 'react-router'
import ProposalBoard from './ProposalBoard/ProposalBoard.jsx'
import Proposal from './Proposal/Proposal.jsx'
import Category from './Category/Category.jsx'
import HTML from './HTML/HTML.jsx'

import 'normalize.css/normalize.css'
import './index.css'

const routes = (
  <Route handler={App} path="/">
    <Route name="proposals" path="/"              handler={ProposalBoard} />
    <Route name="about"     path="/about/"        handler={HTML} />
    <Route name="how"       path="/how/"          handler={HTML} />
    <Route name="tutorial"  path="/tutorial/"     handler={HTML} />
    <Route name="proposal"  path="/:proposalName/" handler={Proposal} />
    <Route name="category"  path="/:proposalName/:category/" handler={Category} />
    <Route name="categoryPage"  path="/:proposalName/:category/:page/" handler={Category} />
    <Route name="categoryPagePost"  path="/:proposalName/:category/:page/:postID/" handler={Category} />
  </Route>
);

if(typeof document !== 'undefined') {
  const root = document.getElementById('root');
  Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root/>, root);
  });
}
