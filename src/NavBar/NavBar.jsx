import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import './NavBar.css'

moment.locale(window.navigator.userLanguage || window.navigator.language)

class NavBar extends React.Component {

    render() {
        var NavList = this.props.nav_list.map(( {label}:item) => {
            return (<a className="NavBar-item">{label}</a>);
        });

        return (
            <div className="NavBar">
                {NavList}
            </div>
        )
    }
}

export default Transmit.createContainer(NavBar, {})
