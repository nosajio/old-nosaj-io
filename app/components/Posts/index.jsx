import React, { PropTypes } from 'react'

import './posts.scss';

const Posts = (props, context) => {
  const {posts} = props;

  const handleLinkToPost = (slug) => {
    context.router.push(`/read/${slug}`);
  };

  const postEl = (post, index) => {
    return (
    <li
      key={index}
      onClick={handleLinkToPost.bind(null, post.slug)}
      className="posts-list__post">
        <h2 className="post-title">{post.title}</h2>
        <span className="posts-list__meta post-published">{post.friendlyDate}</span>
        <span className="posts-list__meta post-reading-time">{post.readingTime} min read</span>
      </li>
    )
  };

  if (! posts) return null;

  return (
    <div className="posts">
      <ol className="posts-list">
        {posts.map(postEl)}
      </ol>
    </div>
  )
}

Posts.contextTypes = {
  router: PropTypes.object
}

export default Posts
