"use strict"
import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import './ProgressBar.css'

class ProgressBar extends React.Component {
   
    render() {

        let {data} = this.props
        let progressBarItem = ""

        const start = moment(new Date(data.start_date))
        const end = moment(new Date(data.end_date))
        const now = moment()
        const isDue = (now.unix() > end.unix())
        //計算進度
        const total = end.diff(start)
        const current = Math.max(now.diff(start),0)
        const percentage = Math.round(current / total * 100)
        let style = {width: "100%"}
        
        if(!isDue){
            //還沒結束才顯示 progress bar
            style.width = `${percentage}%`
            progressBarItem = (
                <div className="ProgressBar-barBackground">
                    <div className="ProgressBar-startDate">{start.format('MM/DD')}</div>
                    <div className="ProgressBar-endDate">{end.format('MM/DD')}</div>
                    <div className="ProgressBar-barProgress"
                         style={style}></div>
                </div>
            );
        }
        return (

            <div className="ProgressBar">
                {progressBarItem}
            </div>
        )
    }
}
export default Transmit.createContainer(ProgressBar, {
    
})
