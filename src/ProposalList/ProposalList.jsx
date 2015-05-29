import React from 'react'
import { Link } from "react-router"
import Transmit from 'react-transmit'
import './ProposalList.css'
import {img, figure} from 'react'

import proposalData from '../Proposal/data/Proposals.json'

class ProposalList extends React.Component {

  render() {
    var listData = Object.keys(proposalData).map((k) => proposalData[k])
    var proposalList = listData
    if (this.props.stage) {
        proposalList = proposalList.filter((item,key) => {
          new RegExp("^" + this.props.stage).test(item.stages[0].category)})
    }
    if (proposalList.length === 0) return <section className="ProposalList"></section>
    proposalList = proposalList.map((item,key)=>{
      return (
          <Link className="ProposalList-item"
                key={key}
                to="proposal"
                params={{proposalName: item.title_eng}}>
              <img className="ProposalList-item-image"
                src={item.slides_image}/>
              <div className="ProposalList-item-info">
                <span className="ProposalList-item-title">
                  {item.title_cht}
                </span>
                <span className="ProposalList-item-proposer">
                  @{item.proposer_abbr_cht}
                </span>
              </div>
          </Link>
      )
    });
    return (
        <section className="ProposalList">
          <h2 className="ProposalList-title">
            <img className="ProposalList-stage-image"
              src={require(`./images/${this.props.stage}.png`)}/>
            {this.props.title || ''}</h2>
          {proposalList}
        </section>
    )
  }
}
export default Transmit.createContainer(ProposalList, {

})


