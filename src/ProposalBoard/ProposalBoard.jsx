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
  render () { return (
        <div className="ProposalBoard">
            <br />
            <br />
            <p>在數位化生活的時代，要怎樣利用網路無遠弗屆的特性，創造更多的想像空間？</p>
            <p>我們希望能完整討論相關問題，進而為每項提案徵集工作小組，形成法規草案。</p>
            <p>作為公眾參與政策形成與法令訂定過程透明化的一次實驗，各項議題會分四個階段進行。</p>
        {
            Stages.map(({stage, title}) => <ProposalList title={title} stage={stage} />)
        }</div>
  ) }
  componentWillMount() {
    this.props.setQueryParams({})
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.proposalList) { return; }
    const items = Stages.map(({stage, title})=>[{ label: title }].concat(
        nextProps.proposalList.filter(({stages})=>
            new RegExp("^" + stage).test(stages[0].category)
        ).map(({title_eng, title_cht, proposer_abbr_eng})=>{ return {
            path: '/'+title_eng+'/',
            label: title_cht,
            icon: proposer_abbr_eng + '.png',
            type: 'sub',
        } })
    )).reduce(((a,b)=>a.concat(b)),[]);
    this.props.setNavList(items.concat([
         { path: '/about', label: '關於', type: 'section' },
         { path: '/how', label: '如何發言', type: 'sub' },
         { path: '/tutorial', label: '使用手冊', type: 'sub' },
         { path: '/', type: 'sub'} // dummy
    ]))
  }
}

export default Transmit.createContainer(ProposalBoard, {
    queries: {
        proposalList() {
            return new Promise((cb)=>cb(
                Object.keys(proposalData).map((k) => proposalData[k])
            ))
        }
    }
})
