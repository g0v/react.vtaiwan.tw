import React from 'react'
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
                <span className="prompt"></span>
                <span className="q_text" dangerouslySetInnerHTML={{ __html: title }} />
                <span className="Issue-titleIcon"><i className="fa fa-comments-o"></i></span>
                <span className="issue_item_discuss_count">{post_count || ''}</span>
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
        if(typeof window !== 'undefined') window.scrollTo(500, 0);

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

    _toggleShowDiscussionWeb (postID, event){

        window.scrollTo(500, 0);

        var discussion = document.getElementsByClassName("Category-discussion");
        discussion.scrollTop;

        if(postID){
           this.props.setQueryParams({
              postID: postID
           })
        }

        if(!this.state.showDiscussion){
            this.setState({
                showDiscussion: true
            });
        }
        this.setState({
            showFullDiscussion: false
        });
    }

     _hideDiscussion(){
        this.setState({
            showDiscussion: false
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
        var {proposalName, category, postID, page} = this.props.params;
        var nextProposalName = nextProps.params.proposalName;
        var nextCategory = nextProps.params.category;
        var nextPage = nextProps.params.page;

        if (nextProps.gitbook.length) {
            const {topic_list} = nextProps.talk || {};
            const {proposal_cht, category_cht} = categoryData[proposalName][category]
            const icon = category.replace(/\d+$/, '') + '.png'
            this.props.setNavList([
                { path: '/'+proposalName+'/', label: proposal_cht, type: 'title' },
            ].concat(nextProps.gitbook.map(({title, children}, pageID)=>
                (pageID === 0)
                    ? [{ path: '/'+proposalName+'/'+category+'/', label: category_cht, icon, type: 'sub' }]
                    : [{ path: '/'+proposalName+'/'+category+'/'+pageID+'/', label: title.replace(/<[^>]*>/g, ''), type: 'section' }].concat((topic_list && topic_list.topics) ? children.map(({title})=>{
                        const label = title.replace(/<[^>]*>/g, '')
                        const {id} = topic_list.topics.filter(
                            ({fancy_title})=>fancy_title === label
                        )[0] || {}
                        let path = '/'+proposalName+'/'+category+'/'+pageID+'/';
                        if (id) { path += (id+'/') }
                        return { path, label, type: 'sub' }
                    }) : []
            )).reduce((a,b)=>a.concat(b))))
        }

        if(!proposalName || !nextProposalName) return;
        if((proposalName === nextProposalName) && (category === nextCategory)  && (page === nextPage) ){
           return;
        }

        //When changing page, always hide the discussion
        this.setState({
            showDiscussion: false
        });

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


        if(talk && talk.topics){
            talk.topics.map((value)=>{
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
        var loadingImg = require("./images/loading.gif");
        var loadingItem = <img className="Category-loadingImg" src={loadingImg} />;

        if(posts){

            if(posts.post_stream){
                postsItem = <Posts data={posts.post_stream.posts}
                               id={posts.id}
                               title={posts.title}
                               handleToggleFullDiscussion={bindToggleFullDiscussion}
                               showFull={showFullDiscussion}/>

                loadingItem = "";

            }else{

                loadingItem = "沒有討論";
            }
        }



        var discussionContentMobile =(
            <div className={discussionClasses}>
                <div className="Category-discussionNav">
                    <div className="Category-discussionNavToggle"
                         onClick={this._toggleShowDiscussion.bind(this, null)}>
                        <i className="fa fa-chevron-left"></i>
                    </div>
                </div>
                {postsItem}

            </div>
        );
        var discussionContentWeb =(
            <div className={discussionClasses}>
                <div className="Category-discussionNavClose"
                     onClick={this._hideDiscussion.bind(this, null)}><i className="fa fa-remove"></i></div>
                {postsItem}
                {loadingItem}
            </div>
        );
        var discussionContent = (window.innerWidth > 600) ? discussionContentWeb : discussionContentMobile;

        // 討論話題列表
        // { (children || []).map((props) => <Issue {...props}/>) }
        var issueClickHandler = (window.innerWidth > 600) ? this._toggleShowDiscussionWeb : this._toggleShowDiscussion;

        var issueItems = (children || []).map((props, key) => {
            return (
                <Issue {...props}
                       clickHandler={issueClickHandler.bind(this, props.id)}
                       key={key}/>
            )
        });


        var categoryListClasses = classNames(
            {
                "Category-categoryList" : true,
                "is-hidden" : showDiscussion
            })
        const icon = require('../NavBar/images/' + category.replace(/\d+$/, '')  + '.png');
        return (
            <div className="Category">


                <div className={categoryListClasses}>
                    <img className="Category-icon" src={icon} />

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
                    <div className="Category-title" dangerouslySetInnerHTML={{__html: title }}></div>
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

                {discussionContent}
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
            
            var result = {};
            var baseURL = "//talk.vtaiwan.tw/c/"+categoryNum+"-category.json";

            return new Promise((resolve, reject)=>{ 

                function getJSON(baseURL,url){

                    request.get(url).then((res)=>{
                        if(!result.topics){
                            result.topics = res.body.topic_list.topics;
                        }else{
                            res.body.topic_list.topics.map((value,key)=>{
                                result.topics.push(value);
                            })
                        }
                        //if there is next page
                        var more_topics_url = res.body.topic_list.more_topics_url;
                        if(more_topics_url){
                            // [example] /c/crowdfunding-ref1/l/latest?category_id=59&page=1 
                            var nextPage = more_topics_url.split("page=")[1];
                            var nextURL = baseURL+"?page="+nextPage;
                            return getJSON(baseURL, nextURL);
                        }else{
                            resolve(result);
                        }
                    });

                }
                getJSON(baseURL,baseURL);

            });

        },
        posts({postID}){
            if (!postID) return new Promise((cb)=>cb([]))
            
            //posts.post_stream.posts
            var result = {};
            var url = "//talk.vtaiwan.tw/t/topic/"+postID+".json";

            return new Promise((resolve, reject)=>{ 
                request.get(url).then((res)=>{
               
                    if(res.status <= 200){
                        var data = res.body;
                      
                        if (data.posts_count <= 20) {
                           resolve(data);
                      
                        }else{
                            for (var i = 2; i <= parseInt(data.posts_count/20)+1; i++) {
                                request.get('https://talk.vtaiwan.tw/t/topic/'+postID+'.json?page=' + i)
                                       .then((response)=>{
                                            var pageData = response.body;
                                            data.post_stream.posts = data.post_stream.posts.concat(pageData.post_stream.posts);
                                            if (data.post_stream.posts.length === data.posts_count) {
                                              data.post_stream.posts.sort(function (a, b) {
                                                return +a.id - +b.id;
                                            });
                                              
                                            resolve(data);
                                        }
                                });
                            }

                        }  
                    }  
                });
            });
        }
    }
})
