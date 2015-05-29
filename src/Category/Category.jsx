import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import request from 'superagent-bluebird-promise'
import './Category.css'
import './lexicon.css'
import {Link} from 'react-router'
import classNames from 'classnames'
import categoryData from './data/Category'
import Posts from '../Posts/Posts.jsx'

class Issue extends React.Component {
    render() {
        var {title, content, post_count, clickHandler} = this.props;

        return (
        <div className="issue_item"
             onClick={clickHandler}>
            <div className="issue_item_title">
                <span className="prompt">討論話題：</span>
                <span className="q_text" dangerouslySetInnerHTML={{ __html: title }} />
                <span className="Issue-titleIcon"><i className="fa fa-comments-o"></i></span>
                <span className="issue_item_discuss_count">{post_count}</span>
            </div>
            <div className="q_text" dangerouslySetInnerHTML={{ __html: content }} />
        </div>);
    }
}

class Category extends React.Component {
    static contextTypes = { router: React.PropTypes.func }
    
    constructor (props) { super(props)
        this.state = { showDiscussion: !!this.props.params.postID, showFullDiscussion:false }
    }

    _toggleShowDiscussion (postID, event){
        window.scrollTo(500, 0);

        if(postID){
           this.props.setQueryParams({
              postID: postID
           })           
        }
        this.setState({
            showDiscussion: !this.state.showDiscussion,
            showFullDiscussion: false
        });
    }

    _toggleShowFullDiscussion(){
        this.setState({
            showFullDiscussion: !this.state.showFullDiscussion
        })
    }

    componentWillMount() {
        // console.log(this.props.params);

        var {proposalName, category, postID} = this.props.params;
        var metaData = categoryData[proposalName][category];

        this.props.setQueryParams({
            gitbookURL: metaData.gitbook_url,
            categoryNum: metaData.category_num,
            postID: postID
        })
    }
    componentWillReceiveProps(nextProps) {
        var {proposalName, category, postID} = this.props.params;
        var {nextProposalName, nextCategory} = nextProps.params;

        if(!proposalName || !nextProposalName) return;
        if((proposalName === nextProposalName) && (category === nextCategory)){
           return;
        }

        var metaData = categoryData[nextProposalName][nextCategory];
        this.props.setQueryParams({
           gitbookURL: metaData.gitbook_url,
           categoryNum: metaData.category_num,
           postID: postID
        })
    }
    render() {
        const {gitbookURL, categoryNum, gitbook, talk, posts, onChange} = this.props;
        var {page, proposalName, category, postID} = this.props.params;
        page = Number(page) || 0

        if(!gitbook || !gitbook[page])
            return (<div></div>);

        // Get post_coount, topic_id from talk.vtaiwan json
        var titleToPostCount = {}
        if(talk && talk.topic_list){
            
            talk.topic_list.topics.map((value)=>{
                titleToPostCount[value.fancy_title] = { 
                    id: value.id,
                    post_count: value.posts_count 
                };
            })   
        }
        // Add post_count, topic_id data to gitbook data
        var {title, content, children} = gitbook[page];
        if(children){
           children.map((item,key)=>{
               if(titleToPostCount[item.title]){
                  item.post_count = titleToPostCount[item.title].post_count || 0;
                  item.id = titleToPostCount[item.title].id;

               }else{
                  item.post_count = 0;

               }
               
               
           })
        }

        // Used in breadcrumbs
        // 目前的討論主題（遠距教育、群眾募資...等）以及階段（討論、草案、定案...等）
        var {proposal_cht, category_cht} = categoryData[proposalName][category];


        // 某一個討論話題的討論 posts
        var {showDiscussion} = this.state;
        var discussionClasses = classNames(
            {
                "Category-discussion" : true,
                "is-show" : showDiscussion
            })

        var postsItem = "";
        var bindToggleFullDiscussion = this._toggleShowFullDiscussion.bind(this,null);
        var showFullDiscussion = this.state.showFullDiscussion;
        if(posts && posts.post_stream){
            //console.log(posts)
            postsItem = <Posts data={posts.post_stream.posts} 
                               id={posts.id} 
                               title={posts.title}
                               handleToggleFullDiscussion={bindToggleFullDiscussion}
                               showFull={showFullDiscussion}/>
            
        }

        var bindToggleDiscussion = this._toggleShowDiscussion.bind(this, null);
        var discussionContent =(
            <div className={discussionClasses}>
                <div className="Category-discussionNav">
                    <div className="Category-discussionNavToggle"
                         onClick={bindToggleDiscussion}>
                        <i className="fa fa-chevron-left"></i>
                    </div>
                </div>
                {postsItem}
            </div>
        );

        // 討論話題列表
        // { (children || []).map((props) => <Issue {...props}/>) }
        var issueItems = (children || []).map((props, key) => {
            
            var bindToggleDiscussion = this._toggleShowDiscussion.bind(this, props.id);
            return (
                <Issue {...props} 
                       clickHandler={bindToggleDiscussion}
                       key={key}/>
            )
        });

       
        var categoryListClasses = classNames(
            {
                "Category-categoryList" : true,
                "is-hidden" : showDiscussion
            })
       
        return (
            <div className="Category">
                {discussionContent}
                
                <div className={categoryListClasses}>
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
                    {issueItems}
    
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
            </div>);
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
            return request.get("//talk.vtaiwan.tw/c/"+categoryNum+"-category.json").then((res) => res.body).catch(()=>[])

        },
        posts({postID}){
            if (!postID) return new Promise((cb)=>cb([]))
            return request.get("//talk.vtaiwan.tw/t/topic/"+postID+".json").then((res) => res.body).catch(()=>[])
        }
    }
})
