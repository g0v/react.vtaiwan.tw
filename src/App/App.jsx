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
            rev: null,
            showNavBar: false
        }
    }
    componentWillMount() {
        this.props.setQueryParams(this.props)
        if( window.screen.availWidth >= 600) {
            this.setState({ showNavBar: true });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.id == this.props.id) return
        this.props.setQueryParams({ id: nextProps.id })
    }
    handleNavBar () {
        this.setState({ showNavBar: !this.state.showNavBar });
    }
    render() {
        const {id, revs, onChange} = this.props;
        var rev = revs.length ? this.state.rev : null;
        var {router} = this.context;
        var {proposalName, category} = router.getCurrentParams();

        return (
            <div className="App">
                { this.state.showNavBar? <NavBar nav_list={ (proposalName)? Nav[proposalName] : NavList } /> : null }
                <AppBar handleNavBar={this.handleNavBar.bind(this)} />
                <div className={ this.state.showNavBar? "App-content activeNavBar" : "App-content"} >
                    <div className="App-wrapper">
                        <RouteHandler />
                    </div>
                </div>
            </div>
        )
    }
}


const LogURL = 'https://vtaiwan.tw/log'
export default Transmit.createContainer(App, {
    queries: {
        revs({id}) {
            if (!id) return new Promise((cb)=>cb([]))
            return request.get(LogURL + id).then((res) => res.body).catch(()=>[])
        }
    }
})




