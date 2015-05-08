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


moment.locale(window.navigator.userLanguage || window.navigator.language)

class App extends React.Component {
    static propTypes = { id: React.PropTypes.string }
    constructor(props) { super(props)
        this.state = { rev: null }
    }
    componentWillMount() { this.props.setQueryParams(this.props) }
    componentWillReceiveProps(nextProps) {
        if (nextProps.id == this.props.id) return
        this.props.setQueryParams({ id: nextProps.id })
    }
    render() {
        const {id, revs, onChange} = this.props;
        var rev = revs.length ? this.state.rev : null;
        var data = [
            { path: '/', label: '首頁' },
            { label: '主題'},
            { path: '/how', label: '如何發言' },
            { path: '/tutorial', label: '使用手冊' },
            { path: '/about', label: '關於' }
        ];

        return (
            <div className="App">
                <NavBar nav_list={data} />
                <AppBar />
                <div className="App-content">
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




