'use strict';
import React from 'react';
import Transmit from 'react-transmit';
import './App.css';

import AppBar from '../AppBar/AppBar.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import {RouteHandler} from 'react-router';

import Nav, {NavList} from './data/Nav';
import categoryData from '../Category/data/Category';

class App extends React.Component {
  static propTypes = { id: React.PropTypes.string }
  static contextTypes = { router: React.PropTypes.func }
  static viewportWidth = 600;

  constructor(props) {
    super(props);

    this.state = {
      showNavBar: true,
      navList: null,
      onClickSticky: false
    };
  }

  handleResize() {
    if (typeof window === 'undefined') {
      return;
    }

    this.state.showNavBar = window.innerWidth <= App.viewportWidth;
    this.handleNavBar();
  }

  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', this.handleResize.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this), false);
  }

  handleNavBar () {
    this.setState({ showNavBar: !this.state.showNavBar });
  }

  setNavList(navList) {
    var prevNavList = this.state.navList

    if (JSON.stringify(navList) === JSON.stringify(prevNavList)) {
      return;
    }

    this.setState({navList, prevNavList})
  }

  render() {
    var {router} = this.context;
    var {proposalName, category} = router.getCurrentParams();
    // var coverImg = require("./images/cover_small.jpg");
    return (
      <div className="App">
        <NavBar nav_list={ this.state.navList }
                handleNavBar={this.handleNavBar.bind(this)}
                activePath={router.getCurrentPath()}
                showNavBar={this.state.showNavBar}/>
        <AppBar handleNavBar={this.handleNavBar.bind(this)} />
        <div class="App-content" className={ this.state.showNavBar ? 'activeNavBar' : ''} >
          <div className="App-wrapper">
            <RouteHandler setNavList={this.setNavList.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default Transmit.createContainer(App, {
  queries: {}
})
