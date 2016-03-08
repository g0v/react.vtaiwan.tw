"use strict"
import React from 'react'
import { Link } from "react-router"
import Transmit from 'react-transmit'
import './ProposalList.css'
import {img, figure} from 'react'

import proposalData from '../Proposal/data/Proposals.json'

const stageIntro = {
    "collect": [
        "當部會對特定議題未有具體政策，或議題的權責上不明確，屬跨部會議題時，我們會先透過此階段，徵詢民間意見。",
        "而後，我們會彙整相關意見，再由部會正式提出討論案。",
    ],
    "init": [
        "本階段的目標為：廣徵意見，凝聚出「要討論的問題」。",
        "不是一開始就給法規草案討論，而是「提出問題」來討論。",
        "例如：很多新創事業想透過群眾募資平台來進行投資，現行制度卻不見能滿足這些新創事業，那會有什麼問題，以及該怎麼規範呢？"
    ],
    "spec": [
        "在前一個「討論」階段中，積極參與討論者與提案方相關人員將組成「工作組」。",
        "工作組負責在本階段中，經由聚會討論，寫出建議規格書。"
    ],
    "ref": [
        "在本階段中，工作組會定期聚會，逐條協作出草案版本。",
        "工作組聚會採全程逐字稿及錄影直播方式進行。",
        "聚會時，討論者提出修正意見及建議事項規格書。",
        "提案方必須於每次聚會七天後，針對建議事項提出回應，並更新草案。"
    ],
    "act": [
        "在工作組開始進行討論一個月後，提案方決定是否繼續提出多次修正版草案。",
        "若是，則繼續聚會。若已收斂成定案，則由編輯群作為本階段（定案）的內容公佈。",
        "工作組的討論區持續保留，以追蹤定案送交立法院或頒佈後的執行狀況。"
    ]
}

class ProposalList extends React.Component {
    render() {
        let proposalList = Object.keys(proposalData).map((k) => proposalData[k])
        
        if (this.props.stage) {
            proposalList = proposalList.filter((item, key) =>
              new RegExp("^" + this.props.stage).test(item.stages[0].category))
        }
        if (!proposalList.length) { return <section className="ProposalList" /> }
        

       
        proposalList = proposalList.map((item, key)=>
            <Link to="proposal" key={key}
                params={{proposalName: item.title_eng}}
                className="ProposalList-item"
                onClick={(e) => {
                // TODO: Stage 0, during the survey period, e.g.:
                if (item.title_eng === 'eliquor') {
                    e.stopPropagation();
                    location.href = '/eliquor/';
                }
                }}>
                <div className="ProposalList-item-outer">
                <div className="ProposalList-item-inner">
                <div className="ProposalList-item-innermost">
                <img className="ProposalList-item-image"
                    src={item.slides_image} /></div></div></div>
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
       
        return <section className="ProposalList">
            <h2 className="ProposalList-title">
                <img className="ProposalList-stage-image"
                    src={require(`./images/${this.props.stage}.png`)} />
                {this.props.title || ''}
            </h2>
            <div className="ProposalList-sectionIntro">
                <ul>{stageIntro[this.props.stage].map((value, k)=>
                    <li key={k}>{value}</li>
                )}</ul>
            </div>
            {proposalList}
        </section>
    }
}
export default Transmit.createContainer(ProposalList, {})
