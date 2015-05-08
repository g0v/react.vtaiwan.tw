import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'
import {Link} from 'react-router'
import './AppBar.css'

moment.locale(window.navigator.userLanguage || window.navigator.language)

class AppBar extends React.Component {

    render() {

        var imgURL = require("./images/AppBar-logo.png");
        return (
            <div className="AppBar">
                <div className="AppBar-navCtrl" onClick={this.props.handleNavBar}>
                    <span className="fa-stack">
                        <i className="fa fa-circle fa-stack-2x" />
                        <i className="fa fa-bars fa-stack-1x fa-inverse" />
                    </span>
                </div>
                <Link to="/">
                    <div className="AppBar-siteLogo">
                        <img className="AppBar-siteLogoImg"
                             src={imgURL}/>
                        <div className="AppBar-siteLogoText">vTaiwan</div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Transmit.createContainer(AppBar, {})




