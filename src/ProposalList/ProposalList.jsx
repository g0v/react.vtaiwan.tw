import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import './ProposalList.css'

import proposalListData from './data/ProposalList'


import Proposal from '../Proposal/Proposal.jsx'

moment.locale(window.navigator.userLanguage || window.navigator.language)

class ProposalList extends React.Component {

    render() {
        var data = proposalListData["crowdfunding"];
        var proposal = "";
        if(data){
            proposal = <Proposal data={data}/>
        }
        return (
            <div className="ProposalList">
                {proposal}
            </div>
        )
    }
}
export default Transmit.createContainer(ProposalList, {
    
})


