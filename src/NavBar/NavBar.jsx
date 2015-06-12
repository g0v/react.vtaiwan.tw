"use strict"
import React from 'react'
import Transmit from 'react-transmit'
import {Link} from 'react-router'
import classNames from 'classnames'
import './NavBar.css'
import {NavList} from '../App/data/Nav'

class NavBar extends React.Component {
    _onListItemClicked(){
        //in mobile: click on sidebar item should also close the NavBar
        event.stopPropagation();
        if(window.innerWidth < 600){
            this.props.handleNavBar();
        }
    }
    setTitle(section) {
        if (!section) {
            document.title = 'vTaiwan.tw';
            return;
        }
        const activeItem = (this.props.nav_list || []).filter(({type, path}) => type === 'section' || path === `/${section}/`)[0] || {};
        document.title = (activeItem.label ? `${activeItem.label} - ` : '') + 'vTaiwan.tw';
    }
    setOGImageMeta(image) {
        var meta = document.querySelector('meta[property="og:image"]');
        if (meta) {
            meta.setAttribute('content', `https://vtaiwan.tw${image}`);
            return;
        }
        meta = document.createElement('meta');
        meta.setAttribute('content', `https://vtaiwan.tw${image}`);
        meta.setAttribute('property', 'og:image');
        document.head.appendChild(meta);
    }
    setOGImage(section) {
        const sectionInfo = NavList.filter(({icon, path}) => icon && path === `/${section}/`)[0] || {};
        if (!sectionInfo.icon) {
            this.setOGImageMeta(require('../AppBar/images/AppBar-logo.png'));
        } else {
            this.setOGImageMeta(require(`./images/${sectionInfo.icon}`));
        }
    }
    render() {
        const section = this.props.activePath.split('/')[1] || undefined;
        this.setTitle(section);
        this.setOGImage(section);
        const NavList = (this.props.nav_list || []).map(( {label, type, icon, path, title}, key) => {
            const styleClass = (type === 'title') ? 'NavBar-item--title' : 'NavBar-item'
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

        const mainClasses = classNames({
            "NavBar-main": true,
            "is-show": this.props.showNavBar
        })
        const shadowClasses = classNames({
            "NavBar-shadowLayer": true,
            "is-show": this.props.showNavBar
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
