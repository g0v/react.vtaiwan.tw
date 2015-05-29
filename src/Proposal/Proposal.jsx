import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import './Proposal.css'

import Proposals from './data/Proposals.json'
import Stage from '../Stage/Stage.jsx'
moment.locale(window.navigator.userLanguage || window.navigator.language)

class Proposal extends React.Component {
    componentWillMount() {
        this.props.setQueryParams(this.props.params)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data.stages.length) {
            const {proposalName} = nextProps.params
            const {title_cht, stages} = nextProps.data
            this.props.setNavList([
                { path: '/', label: '首頁' },
                { path: '/'+proposalName, label: title_cht, type: 'title' },
            ].concat(stages.map(({category, name})=>{ return {
                path: '/'+proposalName+'/'+category,
                label: name,
                icon: category.replace(/\d+$/,'')+'.png',
                type: 'sub',
            } })))
            nextProps.setNavList = ()=>{}
        }
        if (nextProps.params.proposalName == this.props.params.proposalName) return
        this.props.setQueryParams(nextProps)
    }
    render() {
        const {data} = this.props

        var stages = data.stages.map((item, key)=>{
            var start_date = moment(new Date(item.start_date)).format('YYYY-MM-DD');
            return (
                <div className="Proposal-stage"
                     key={key}>
                    <div className="Proposal-stageDate">{start_date}</div>
                    <Stage data={item}
                           gitbookURL={item.gitbook_url}
                           categoryNum={item.category_num}
                           proposalName={data.title_eng} />
                </div>
            )
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
            if (!proposalName) return new Promise((cb)=>cb({stages:[]}))
            return new Promise((cb)=>cb(Proposals[proposalName]))
        }
    }
})


