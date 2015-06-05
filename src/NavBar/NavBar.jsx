import React from 'react'
import Transmit from 'react-transmit'
import {Link} from 'react-router'
import classNames from 'classnames'
import './NavBar.css'

class NavBar extends React.Component {
    _onListItemClicked(){
        //in mobile: click on sidebar item should also close the NavBar
        event.stopPropagation();
        if(window.innerWidth < 600){
            this.props.handleNavBar();
        }
        

    }
    render() {

        

        var NavList = (this.props.nav_list || []).map(( {label, type, icon, path, title}:item, key) => {
            var styleClass = (type === 'title')? 'NavBar-item--title': 'NavBar-item';
            if(type === 'sub') {
                return (
                    <Link key={key} to={path} className="NavBar-subItem" onClick={this._onListItemClicked.bind(this)}>
                        { icon ? <img className="NavBar-subItemIcon" src={require(`./images/${icon}`)} /> : '' }
                        <span className="title_cht">{label}</span>
                    </Link>
                );
            }
            if(type === 'title'){
                return <Link key={key} to={path || '/'} className={styleClass} >
                <span className="NavBar-backIcon"><i className="fa fa-chevron-left"></i></span> {label}</Link>;
            }
            if (path) {
                return <Link key={key} to={path || '/'} className={styleClass} onClick={this._onListItemClicked.bind(this)}>
                { icon ? <img className="NavBar-subItemIcon" src={require(`./images/${icon}`)} /> : '' }{label}</Link>;
            }
            return <a key={key} className={styleClass} style={{cursor: 'default', height: '36px', padding: '6px', background: '#666' }}>
                { icon ? <img className="NavBar-subItemIcon" src={require(`./images/${icon}`)} /> : '' }{label}</a>;
        });

        var mainClasses = classNames({
            "NavBar-main" : true,
            "is-show" : this.props.showNavBar
        })
        var shadowClasses = classNames({
            "NavBar-shadowLayer" : true,
            "is-show" : this.props.showNavBar
        })
       
        return (
            <div className="NavBar">
                <div className={shadowClasses}
                     onClick={this.props.handleNavBar}></div>
                <div className={mainClasses}>
                    {NavList}
                </div>
                
            </div>
        )
    }
}

export default Transmit.createContainer(NavBar, {})
