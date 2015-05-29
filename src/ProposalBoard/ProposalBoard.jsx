import React from 'react'
import {Link} from 'react-router'
import Transmit from 'react-transmit'
import './ProposalBoard.css'
import ProposalList from '../ProposalList/ProposalList.jsx'
import proposalData from '../Proposal/data/Proposals.json'

const Stages = [
    {stage: 'init', title: "討論"},
    {stage: 'spec', title: "建議"},
    {stage: 'ref', title: "草案"},
    {stage: 'act', title: "定案"},
]
class ProposalBoard extends React.Component {
  render () {
    return (
        <div className="ProposalBoard">{
            Stages.map(({stage, title}) => <ProposalList title={title} stage={stage} />)
        }</div>
    )
  }
  componentWillMount() {
    const proposalList = Object.keys(proposalData).map((k) => proposalData[k])
    const items = Stages.map(({stage, title})=>[{ label: title }].concat(
        proposalList.filter(({stages})=>{
            new RegExp("^" + stage).test(stages[0].category)
        }).map(({title_eng, title_cht, proposer_abbr_eng})=>{ return {
            path: '/'+title_eng,
            label: title_cht,
            icon: proposer_abbr_eng + '.png',
            type: 'sub',
        } })
    )).reduce(((a,b)=>a.concat(b)),[]);
    // this.props.setNavList(items.concat([
    //     { path: '/about', label: '關於', type: 'section' },
    //     { path: '/how', label: '如何發言', type: 'sub' },
    //     { path: '/tutorial', label: '使用手冊', type: 'sub' },
    //     { path: '/', type: 'sub'} // dummy
    // ]))
  }
}

export default Transmit.createContainer(ProposalBoard, {})
