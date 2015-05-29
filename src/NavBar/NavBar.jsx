import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import {Link} from 'react-router'
import './NavBar.css'

moment.locale(window.navigator.userLanguage || window.navigator.language)

class NavBar extends React.Component {

    render() {
        var NavList = (this.props.nav_list || []).map(( {label, type, icon, path, title}:item, key) => {
            var styleClass = (type === 'title')? 'NavBar-item--title': 'NavBar-item';
            if(type === 'sub') {
                return (
                    <Link key={key} to={path} className="NavBar-subItem">
                        <img className="NavBar-subItemIcon" src={require(`./images/${icon}`)} />
                        <span className="title_cht">{label}</span>
                    </Link>
                );
            }
            return <Link key={key} to={path || '/'} className={styleClass} >{label}</Link>;
        });

        return (
            <div className="NavBar">
                {NavList}
            </div>
        )
    }
}

export default Transmit.createContainer(NavBar, {})
