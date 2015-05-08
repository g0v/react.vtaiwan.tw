import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import './Category.css'

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
    render() {
        var data = categoryData["crowdfunding-spec"]
        var { router } = this.context
        var base = router.getCurrentPath().replace(/\/\d+$/, '')
        var page = Number(router.getCurrentParams().page) || 1
        var {title, content, children} = data[page - 1]
        var proposal = title.replace(/：.*/, '')
        return (
            <div className="Category">
                <div id="content--proposal">
                    <div id="focus-discussion">
                        <div className="q_content">
<div className="wrapper">
<div className="q_breadcrumbs"><span className="q_breadcrumbs_link" ng-click="go('proposals', true)">主題</span> &gt; <span className="q_breadcrumbs_link ng-binding" ng-click="go(currentProposal.title_eng, true)">{{ proposal }}</span></div>
<div className="q_title">{{ title }}</div>
<div className="focusDiscussion_title ng-binding"><span className="prompt">討論話題：</span></div>
<a className="mobile-only" href="https://talk.vtaiwan.tw/t/topic/" target="_blank"></a>
<div className="l_center"><a style={{background: "#3F9F9B"}} href="https://talk.vtaiwan.tw/t/topic/" target="_blank" ng-show="focusDiscussion" className="about_item_button md-whiteframe-z1 ng-hide">展開所有話題</a></div>
</div>
</div>
</div>
</div>
<div className="wrapper" ng-show="!focusDiscussion">
<div className="q_content" id="q_content">
    <img style={{width: "60px", height: "60px", position: "absolute", right: "10px"}} src="https://www.vtaiwan.tw/images/proposer/spec.png" />
<div className="q_breadcrumbs"><span className="q_breadcrumbs_link" ng-click="go('proposals', true)">主題</span>&nbsp;&gt;&nbsp;<span className="q_breadcrumbs_link ng-binding" ng-click="go(currentProposal.title_eng, true)">
{{ proposal
 }}
</span></div>
<div className="q_title">{{ title }}</div>
<div className="ng-binding" dangerouslySetInnerHTML={{ __html: content }} />
{ (children || []).map((props) => <Issue {...props} />) }
{ (page > 1) ? <div className="navigation navigation--pre ng-hide" onClick={() => router.transitionTo( base + '/' + String(page - 1) )}>
    <i className="fa fa-chevron-left"></i>
</div> : '' }
{ (page < data.length) ? <div className="navigation navigation--next" onClick={() => router.transitionTo( base + '/' + String(page + 1) )}>
    <i className="fa fa-chevron-right"></i>
</div> : '' }
</div>
</div>
</div>
        )
    }
}
export default Transmit.createContainer(Category, {
})
