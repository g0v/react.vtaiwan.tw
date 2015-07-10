"use strict"
import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import './LabeledLinks.css'

class LabeledLinks extends React.Component {
   
    render() {
        const { data } = this.props
        var linkItems = data.links.map((v,i)=>{
        	var icon = "";
        	switch(v.title){
        		case '共筆':
        			icon = "fa fa-pencil"
        			break
        		case '重播':
        		case '直播':
        			icon = "fa fa-youtube-play"
        			break
        		case 'PDF':
        			icon = "fa fa-file-pdf-o"
        			break

        	}
        	
        	return (
        		<a className="LabeledLinks-item"
        		   href={v.link}
        		   key={i}
        		   target="_blank">
        		   
        		   <i className={icon}></i> 
        		   <span className="LabeledLinks-label">{v.title}</span>
        		</a>
        	)
        })
        var date = moment(new Date(data.date)).format('YYYY-MM-DD');
        return (

            <div className="LabeledLinks">
               <div className="LabeledLinks-date">{date}</div>
               <div className="LabeledLinks-title">{data.title}</div>
               {linkItems}
            </div>
        )
    }
}
export default Transmit.createContainer(LabeledLinks, {
    
})
