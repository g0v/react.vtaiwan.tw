import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'
import './AppBar.css'

moment.locale(window.navigator.userLanguage || window.navigator.language)

class AppBar extends React.Component {
    
    render() {
        
        var imgURL = require("./images/AppBar-logo.png");
        return (
            <div className="AppBar">
                <div className="AppBar-siteLogo">
                    <img className="AppBar-siteLogoImg"
                         src={imgURL}/>
                    <div className="AppBar-siteLogoText">vTaiwan</div>
                </div>
            </div>
        )
    }
}

export default Transmit.createContainer(AppBar, {})




