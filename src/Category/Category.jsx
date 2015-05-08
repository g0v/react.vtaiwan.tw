import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'
import './Category.css'
import './lexicon.css'
import {Link} from 'react-router'

import categoryData from './data/Category'

class Issue extends React.Component {
    render() {
        var {title, content} = this.props
        return <div className="issue_item md-whiteframe-z1">
            <div className="issue_item_title">
                <span className="prompt">討論話題：</span>{{ title }} <i className="fa fa-comments-o"></i><span className="issue_item_discuss_count ng-binding">5</span>
            </div>
            <div className="q_text ng-binding" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    }
}

class Category extends React.Component {
    static contextTypes = { router: React.PropTypes.func }
    componentWillMount() { 
        //console.log(this.props.params);
        
        var {proposalName, category} = this.props.params;
        var metaData = categoryData[proposalName][category];

        this.props.setQueryParams({
            gitbookURL: metaData.gitbook_url,
            categoryNum: metaData.category_num
        }) 
    }
    componentWillReceiveProps(nextProps) {
        var {proposalName, category} = this.props.params;
        var {nextProposalName, nextCategory} = nextProps.params;
        
        if(!proposalName || !nextProposalName) return;
        if((proposalName === nextProposalName) && (category === nextCategory)){
           return;  
        }
        
        var metaData = categoryData[nextProposalName][nextCategory];
        this.props.setQueryParams({ 
           gitbookURL: metaData.gitbook_url,
           categoryNum: metaData.category_num
        })
    }
    render() {
        const {gitbookURL, categoryNum, gitbook, talk, onChange} = this.props;

        var {page, proposalName, category} = this.props.params;
        page = Number(page) || 1

        if(!gitbook || !gitbook[page - 1])
            return (<div></div>);
        
        var {title, content, children} = gitbook[page - 1];
        var {proposal_cht, category_cht} = categoryData[proposalName][category];
        
        return (
            <div>
                <img style={{width: "60px", height: "60px", position: "absolute", right: "10px"}} src="https://www.vtaiwan.tw/images/proposer/spec.png" />
                <div className="q_breadcrumbs">
                    
                    <Link className="q_breadcrumbs_link"
                          to="proposal"
                          params={{proposalName: proposalName}}>{proposal_cht}
                    </Link>
                    &nbsp;&gt;&nbsp;
                    <Link className="q_breadcrumbs_link"
                          to="category"
                          params={{proposalName: proposalName, category: category}}>{category_cht}
                    </Link>
                    
                </div>
                <div className="q_title">{ title }</div>
                <div dangerouslySetInnerHTML={{__html:  content }} />
                { (children || []).map((props) => <Issue {...props}/>) }
                
                { (page > 1) ? <Link className="navigation navigation--pre ng-hide" params={{ proposalName: proposalName, category: category, page: page-1 }} to="categoryPage">
                    <i className="fa fa-chevron-left"></i>
                </Link> : '' }

                { (page < gitbook.length) ? <Link className="navigation navigation--next" params={{ proposalName: proposalName, category: category, page: page+1 }} to="categoryPage">
                    <i className="fa fa-chevron-right"></i>
                </Link> : '' }

            </div>
        )
    }
}
export default Transmit.createContainer(Category, {

    queries: {
        gitbook({gitbookURL}) {
            if (!gitbookURL) return new Promise((cb)=>cb([]))
            return request.get(gitbookURL + "/content.json").then((res) => res.body).catch(()=>[])
        },
        talk({categoryNum}) {
            if (!categoryNum) return new Promise((cb)=>cb([])) 
            return request.get("https://talk.vtaiwan.tw/c/"+categoryNum+"-category.json").then((res) => res.body).catch(()=>[])

        }
    }
})
