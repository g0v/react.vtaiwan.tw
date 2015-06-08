"use strict"
import React from 'react'
import { Link } from "react-router"
import moment from 'moment'
import Transmit from 'react-transmit'
import request from '../utils/request'
import './Stage.css'

class Stage extends React.Component {
    static propTypes = { gitbookURL: React.PropTypes.string }
    constructor(props) { super(props)
        this.state = {
            gitbook: null,
            talk: null
        }
    }
    componentWillMount() { this.props.setQueryParams(this.props) }
    componentWillReceiveProps(nextProps) {
         if ( (nextProps.gitbookURL === this.props.gitbookURL) ||
              (nextProps.categoryNum === this.props.categoryNum) ){

            return;
         }

         this.props.setQueryParams({
            gitbookURL: nextProps.gitbookURL,
            categoryNum: nextProps.categoryNum
         })
    }
    render() {
        const {gitbookURL, categoryNum, gitbook, talk, onChange} = this.props;
        const {data} = this.props;

        // gitbook 為 gitbook 的內容
        // 每個 stage 顯示的 preview text 為 gitbook[0].content 底下的 blockquote 部分
        let previewHTML = "";

        if(gitbook[0]){
            previewHTML = gitbook[0].content.split('</blockquote>')[0].split('<blockquote>')[1];
        }

        const start = moment(new Date(data.start_date))
        const end = moment(new Date(data.end_date))
        const now = moment()

        const isDue = (now.unix() > end.unix())
        const style = {width: "100%"}
        let timeLeft = 0
        let progressBarItem = ""
        let leftTimeItem = ""

        if(isDue){
            //如果已經結束，顯示「本階段已結束 x/xx - o/oo」
            leftTimeItem = <div className="Stage-stat">已結束<div className="Stage-statHighlight">{start.format('M/D')} ~ {end.format('M/D')}</div></div>;
        }else{
            //如果此階段還沒截止，計算剩下的天數
            timeLeft = end.from(now, true).toString().replace(/\D.*/, '');

            //計算進度
            const total = end.diff(start)
            const current = now.diff(start)
            const percentage = Math.round(current / total * 100)
            style.width = `${percentage}%`

            //還沒結束才顯示 progress bar
            progressBarItem = (
                <div className="Stage-barBackground">
                    <div className="Stage-startDate">{start.format('MM/DD')}</div>
                    <div className="Stage-endDate">{end.format('MM/DD')}</div>
                    <div className="Stage-barProgress"
                         style={style}></div>
                </div>
            );

            //如果還沒結束，顯示「剩下天數」
            leftTimeItem = <div className="Stage-stat">本階段還有<div className="Stage-statHighlight">{timeLeft} 天</div></div>;
        }

        //計算討論區的 post 數量
        let topicCount = 0
        let postCount = 0
        if(talk && talk.topic_list) {
            const topicArray = talk.topic_list.topics
            topicCount = topicArray.length
            topicArray.forEach((i)=>{
                postCount += i.posts_count
            })
        }
        let icon = require('../NavBar/images/' + data.category.replace(/\d*$/, '.png'))
        return (
            <Link className="Stage"
                  to="category"
                  key={data.category}
                  params={{proposalName: this.props.proposalName, category: data.category}}>
                    <img style={{"float": "right"}} className="NavBar-subItemIcon" src={icon} />
                <div className="Stage-header">
                    <div className="Stage-title">{data.name}</div>
                </div>
                <div className="Stage-content">
                    <div dangerouslySetInnerHTML={{__html: previewHTML}} />
                </div>
                {progressBarItem}
                <div>
                    {leftTimeItem}
                    <div className="Stage-stat">討論話題<div className="Stage-statHighlight">{topicCount}</div></div>
                    <div className="Stage-stat">意見數<div className="Stage-statHighlight">{postCount}</div></div>
                </div>
            </Link>
        )
    }
}

export default Transmit.createContainer(Stage, {
    queries: {
        gitbook({gitbookURL}) {
            if (!gitbookURL) { return new Promise((cb)=>cb([])) }
            return request.get(gitbookURL + "/content.json").then((res) => res).catch(()=>[])
        },
        talk({categoryNum}) {
            if (!categoryNum) { return new Promise((cb)=>cb([])) }
            const url = `https://talk.vtaiwan.tw/c/${categoryNum}-category.json`
            return request.get(url).then((res) => res).catch(()=>[])
        }
    }
})
