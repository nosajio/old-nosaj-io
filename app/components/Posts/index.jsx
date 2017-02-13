import React, { PropTypes } from 'react'
import Post from '../Post';

import './posts.scss';

const Posts = (props, context) => {
  const {posts} = props;

  if (! posts) return null;

  return (
    <div className="posts">
      <ol className="posts-list">
        {posts.map((post, i) => <Post key={i} post={post}/>)}
      </ol>
    </div>
  )
}

Posts.contextTypes = {
  router: PropTypes.object
}

export default Posts
