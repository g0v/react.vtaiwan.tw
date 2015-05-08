import React from 'react'
import { Link } from "react-router"
import moment from 'moment'
import Transmit from 'react-transmit'
import './ProposalList.css'

import listData from './data/ProposalList'

moment.locale(window.navigator.userLanguage || window.navigator.language)

class ProposalList extends React.Component {

    render() {
        
        var proposalList = listData.list.map((item,key)=>{
            return (
                <Link className="ProposalList-item" 
                      key={key}
                      to="proposal"
                      params={{proposalName: item.title_eng}}>{item.title_cht}</Link>
            )

        });
        return (
            <div className="ProposalList">
                 {proposalList}
            </div>
        )
    }
}
export default Transmit.createContainer(ProposalList, {
    
})


