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
  componentWillReceiveProps(nextProps) {
    const proposalList = Object.keys(proposalData).map((k) => proposalData[k])
    const items = Stages.map(({stage, title})=>[{ label: title }].concat(
        proposalList.filter(({stages})=>
            stages[0].category.startsWith(stage)
        ).map(({title_eng, title_cht, proposer_abbr_eng})=>{ return {
            path: '/'+title_eng,
            label: title_cht,
            icon: proposer_abbr_eng + '.png',
            type: 'sub',
        } })
    )).reduce(((a,b)=>a.concat(b)),[]);
    this.props.setNavList(items.concat([
        { path: '/how', label: '如何發言' },
        { path: '/tutorial', label: '使用手冊' },
        { path: '/about', label: '關於' }
    ]))
    nextProps.setNavList = ()=>{}
  }
}

export default Transmit.createContainer(ProposalBoard, {})
