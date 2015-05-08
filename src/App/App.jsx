import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'
import './App.css'

import AppBar from '../AppBar/AppBar.jsx'
import {RouteHandler} from 'react-router'


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

        return (
            <div className="App">
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




