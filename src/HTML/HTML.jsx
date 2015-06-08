"use strict"
import React from 'react'
import Transmit from 'react-transmit'
import './HTML.css'

const pages = {
    about: require('./about.html'),
    how: require('./how.html'),
    tutorial: require('./tutorial.html')
}

class Static extends React.Component {
    static contextTypes = { router: React.PropTypes.func }
    componentWillMount() {
        this.props.setNavList([
             { path: '/', label: '首頁', type: 'title' },
             { path: '/about/', label: '關於本站', type: 'section' },
             { path: '/how/', label: '如何發言', type: 'sub' },
             { path: '/tutorial/', label: '使用手冊', type: 'sub' },
        ])
    }
    render() {
        const {router} = this.context
        const path = router.getCurrentPath().replace(/^\/|\/$/g, '')
        return <div dangerouslySetInnerHTML={{__html: pages[path]}}></div>
    }
}

export default Transmit.createContainer(Static, {})
