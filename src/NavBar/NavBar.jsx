import React from 'react'
import Transmit from 'react-transmit'
import {Link} from 'react-router'
import './NavBar.css'

class NavBar extends React.Component {

    render() {
        var NavList = (this.props.nav_list || []).map(( {label, type, icon, path, title}:item, key) => {
            var styleClass = (type === 'title')? 'NavBar-item--title': 'NavBar-item';
            if(type === 'sub') {
                return (
                    <Link key={key} to={path} className="NavBar-subItem">
                        { icon ? <img className="NavBar-subItemIcon" src={require(`./images/${icon}`)} /> : '' }
                        <span className="title_cht">{label}</span>
                    </Link>
                );
            }
            if(type === 'title'){
                return <Link key={key} to={path || '/'} className={styleClass} >
                <span className="NavBar-backIcon"><i className="fa fa-chevron-left"></i></span> {label}</Link>;
            }
            return <Link key={key} to={path || '/'} className={styleClass} >
                { icon ? <img className="NavBar-subItemIcon" src={require(`./images/${icon}`)} /> : '' }{label}</Link>;
        });

        return (
            <div className="NavBar">
                {NavList}
            </div>
        )
    }
}

export default Transmit.createContainer(NavBar, {})
