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
        var {title, content} = this.props;

        return <div className="issue_item">
            <div className="issue_item_title">
                <span className="prompt">討論話題：</span>
                <span className="q_text" dangerouslySetInnerHTML={{ __html: title }} />
                <i className="fa fa-comments-o"></i>
                <span className="issue_item_discuss_count">5</span>
            </div>
            <div className="q_text" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    }
}

class Category extends React.Component {
    static contextTypes = { router: React.PropTypes.func }
    componentWillMount() {
        // console.log(this.props.params);

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
        page = Number(page) || 0

        if(!gitbook || !gitbook[page])
            return (<div></div>);

        var {title, content, children} = gitbook[page];
        var {proposal_cht, category_cht} = categoryData[proposalName][category];

        return (
            <div className="Category">
                <img className="Category-icon" 
                     src="https://www.vtaiwan.tw/images/proposer/spec.png" />
                
                <div className="Category-breadcrumbs">
                    <Link className="Category-breadcrumbsLink"
                          to="proposal"
                          params={{proposalName: proposalName}}>{proposal_cht}
                    </Link>
                    &nbsp;&gt;&nbsp;
                    <Link className="Category-breadcrumbsLink"
                          to="category"
                          params={{proposalName: proposalName, category: category}}>{category_cht}
                    </Link>
                </div>
                <div className="Category-title">{ title }</div>
                <div dangerouslySetInnerHTML={{__html:  content }} />
                { (children || []).map((props) => <Issue {...props}/>) }

                { (page > 1) ? <Link className="Category-navigation Category-navigationPre" params={{ proposalName: proposalName, category: category, page: page-1 }} to="categoryPage">
                    <i className="fa fa-chevron-left"></i>
                </Link>
                : (page === 1) ? <Link className="Category-navigation Category-navigationPre" params={{ proposalName: proposalName, category: category }} to="category">
                    <i className="fa fa-chevron-left"></i>
                </Link> : ''
                }
                { (page < (gitbook.length - 1)) ? <Link className="Category-navigation Category-navigationNext" params={{ proposalName: proposalName, category: category, page: page+1 }} to="categoryPage">
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
