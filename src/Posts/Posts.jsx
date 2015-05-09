import React from 'react'
import moment from 'moment'
import Transmit from 'react-transmit'
import './Posts.css'

moment.locale(window.navigator.userLanguage || window.navigator.language)

class Post extends React.Component {

    render() {
        var {data} = this.props;
        //console.log(data);

        var posts = data.map((p,key)=>{
        // ng-class="{'post_item_last':$last && ((currentDiscussion.posts).length) > 3 && !expand}"
        return (
        
        <div className="post_item">
        	<img className="post_item_img" src={p.avatar_url} />
        	<div className="post_item_info">
          		<div className="post_item_author" >{p.username}</div>
          		<div className="post_item_date" >{p.created_at}</div>
          		<div className="post_item_text" dangerouslySetInnerHTML={{ __html: p.cooked }} />
      		</div>
      	</div>
        )

        });
        return (
        	<div className="Posts">
                {posts}
            </div>

        )
    }
}
export default Transmit.createContainer(Post, {

})



