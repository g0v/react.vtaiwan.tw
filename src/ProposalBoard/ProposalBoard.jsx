import React from 'react'
import {Link} from 'react-router'
import Transmit from 'react-transmit'
import './ProposalBoard.css'
import ProposalList from '../ProposalList/ProposalList.jsx'

class ProposalBoard extends React.Component {
  render () {
    return (
        <div className="ProposalBoard">
          <ProposalList title="討論" stage="init"/>
          <ProposalList title="建議" stage="spec"/>
          <ProposalList title="草案" stage="ref"/>
          <ProposalList title="定案" stage="act"/>
        </div>
    )
  }
}

export default Transmit.createContainer(ProposalBoard, {})
