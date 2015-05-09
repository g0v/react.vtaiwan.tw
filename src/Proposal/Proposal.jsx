import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import './Proposal.css'

import Proposals from './data/Proposals.json'
import Stage from '../Stage/Stage.jsx'
moment.locale(window.navigator.userLanguage || window.navigator.language)

class Proposal extends React.Component {

    render() {

        var data = Proposals[this.props.params.proposalName];
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
                            src={data.slides_url}
                            frameBorder="0" marginWidth="0" marginHeight="0" scrolling="no" allowFullScreen> </iframe>
                </div>
                <div className="Proposal-stages">{stages}</div>
            </div>
        )
    }
}
export default Transmit.createContainer(Proposal, {

})


