"use strict"
import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import './Proposal.css'

import Proposals from './data/Proposals.json'
import Stage from '../Stage/Stage.jsx'
import LabeledLinks from '../LabeledLinks/LabeledLinks.jsx'

class Proposal extends React.Component {
    componentWillMount() {
        this.props.setQueryParams(this.props.params)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data.stages.length) {
            const {proposalName} = nextProps.params
            const {title_cht, stages} = nextProps.data
            this.props.setNavList([
                { path: '/', label: '首頁', type: 'title' },
                { label: title_cht, type: 'section' },
            ].concat(stages.map(({category, name})=>{ return {
                path: `/${proposalName}/${category}/`,
                label: name,
                icon: category.replace(/\d*$/, '.png'),
                type: 'sub',
            } })))
        }
        if (nextProps.params.proposalName === this.props.params.proposalName) { return }
        this.props.setQueryParams(nextProps)
    }
    render() {
        const { data } = this.props

        var timelineItems = []
        data.stages.map((item, key)=>{
            timelineItems.push(item)
        });

        (data.links || []).map((item, key)=>{
            timelineItems.push(item)
        });
        console.log(timelineItems);
        timelineItems.sort((a, b)=>{
            var dateA = moment(new Date(a.start_date || a.date))
            var dateB = moment(new Date(b.start_date || b.date))
            
            return dateB-dateA
        });


        var stages = timelineItems.map((item, key)=>{
            var content="";
            if(item.start_date){
                var start_date = moment(new Date(item.start_date)).format('YYYY-MM-DD');
                content = (
                    <div className="Proposal-stage">
                        <div className="Proposal-stageDate">{start_date}</div>
                        <Stage data={item}
                               gitbookURL={item.gitbook_url}
                               categoryNum={item.category_num}
                               proposalName={data.title_eng} />
                    </div>
                )

            }else{//
                var date = moment(new Date(item.date)).format('YYYY-MM-DD');
                content = (
                    <div className="Proposal-stage">
                        <div className="Proposal-stageDate">{date}</div>
                        <LabeledLinks data={item} />
                    </div>
                )

            }

           
            return <div key={key}>{content}</div>
        })

        return (

            <div className="Proposal">
                <div className="Proposal-intro">
                    <div className="Proposal-title">{data.prefix_cht}{data.title_cht}</div>
                    <div className="Proposal-proposer">@{data.proposer_abbr_cht}</div>
                </div>
                <div className="Proposal-slides">
                    <iframe className="Proposal-iframe"
                            src={data.slides_embed_url}
                            frameBorder="0" marginWidth="0" marginHeight="0" scrolling="no" allowFullScreen> </iframe>
                </div>
                <div className="Proposal-stages">{stages}</div>
            </div>
        )
    }
}
export default Transmit.createContainer(Proposal, {
    queries: {
        data({proposalName}) {
            if (!proposalName) { return new Promise((cb)=>cb({stages: []})) }
            return new Promise((cb)=>cb(Proposals[proposalName]))
        }
    }
})
