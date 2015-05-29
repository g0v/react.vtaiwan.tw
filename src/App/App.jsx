import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'
import './App.css'

import AppBar from '../AppBar/AppBar.jsx'
import NavBar from '../NavBar/NavBar.jsx'
import {RouteHandler} from 'react-router'
import ProposalList from '../ProposalList/ProposalList.jsx'
import Category from '../Category/Category.jsx'

import Nav, {NavList} from './data/Nav'
import categoryData from '../Category/data/Category'

moment.locale(window.navigator.userLanguage || window.navigator.language)

class App extends React.Component {
    static propTypes = { id: React.PropTypes.string }
    static contextTypes = { router: React.PropTypes.func }
    constructor(props) { super(props)
        this.state = {
            showNavBar: false,
            navList: null
        }
    }
    componentWillMount() {
        this.props.setQueryParams(this.props)
        if( window.screen.availWidth >= 600) {
            this.setState({ showNavBar: true });
        }
    }
    componentWillReceiveProps(nextProps) {
    }
    handleNavBar () {
        this.setState({ showNavBar: !this.state.showNavBar });
    }
    render() {
        var {router} = this.context;
        var {proposalName, category} = router.getCurrentParams();
        var nav_list = this.state.navList || ((proposalName)? Nav[proposalName]: NavList);
        if(category) nav_list = Nav[proposalName + '/' + category];

        return (
            <div className="App">
                { this.state.showNavBar? <NavBar nav_list={ nav_list } /> : null }
                <AppBar handleNavBar={this.handleNavBar.bind(this)} />
                <div className={ this.state.showNavBar? "App-content activeNavBar" : "App-content"} >
                    <div className="App-wrapper">
                        <RouteHandler setNavList={(navList)=>{this.setState({navList})}} />
                    </div>
                </div>
            </div>
        )
    }
}


export default Transmit.createContainer(App, {
    queries: {}
})




