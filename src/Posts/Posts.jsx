"use strict"
import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import classNames from 'classnames'
import './Posts.css'

class Post extends React.Component {
    render() {
        const {data, id, title, handleToggleFullDiscussion, showFull} = this.props
        const posts = data.map((p, key)=>{
            // ng-class="{'post_item_last':$last && ((currentDiscussion.posts).length) > 3 && !expand}"
            const date = moment(p.created_at).format('YYYY-MM-DD')
            const expandButton = (!showFull && data.length > 3 && !key) ? (
                <div className="post_item_intermediate"
                    onClick={handleToggleFullDiscussion}>
                    <div className="post_item_intermediate_circle">
                        { data.length - 2 }
                    </div>
                </div>
            ) : "";

            if (!showFull && data.length > 3 && (key >= 1 && key !== data.length - 1)) { return '' }

            const postClasses = classNames({
                "post_item": true,
                "post_item_first": !showFull && data.length > 3 && key === 0,
                "post_item_last": !showFull && data.length > 3 && key === (data.length - 1)
            });

            /* Handle User Avatar Image url */
            //https://talk.vtaiwan.tw//user_avatar/talk.vtaiwan.tw/vtaiwan/90/44.png
            ///p.avatar_template: user_avatar/talk.vtaiwan.tw/ifulita/{size}/57.png
            const avatar_template = p.avatar_template.replace('{size}', 90);
            const avatarURL = "//talk.vtaiwan.tw//" + avatar_template;
            const __html = p.cooked.replace(
                /href="\/(?!\/)/g,
                'target="_blank" href="https://talk.vtaiwan.tw/'
            )

            return <div className={postClasses} key={key}>
                <img className="post_item_img" src={avatarURL} />
                <div className="post_item_info">
                    <div className="post_item_author">{p.username}</div>
                    <div className="post_item_date">{date}</div>
                    <div className="post_item_text" dangerouslySetInnerHTML={{ __html }} />
                </div>
                {expandButton}
            </div>
        })
        const talkURL = `https://talk.vtaiwan.tw/t/topic/${id}`
        return <div className="Posts">
            <div className="Posts-title">
                <span className="prompt" />{title}
                <span className="Posts-titleIcon">
                    <i className="fa fa-comments-o" />
                </span>
                {data.length}
            </div>
            {posts}
            <a className="mobile-only"
                href={talkURL}
                target="_blank">
                <div className="toggle_reply_button">
                    <i className="fa fa-reply" />
                </div>
            </a>

            <a className="Posts-joinTalkButton"
                href={talkURL}
                target="_blank">我要留言</a>
        </div>
    }
}
export default Transmit.createContainer(Post, {})
