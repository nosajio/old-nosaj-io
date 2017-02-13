import React, {PropTypes} from 'react';
import './post.scss'

const Post = ({post}) => (
  <div
    className={`post ${post.slug}`}>
    <article className="post__container">
      <header className="post__header">
        <h1 className="post-title">{post.title}</h1>
        <ul className="post-meta">
          <li className="post-meta__item">{post.friendlyDate}</li>
          <li className="post-meta__item">{post.readingTime} min read</li>
        </ul>
      </header>
      <div className="post__body" dangerouslySetInnerHTML={{__html: post.body}}></div>
    </article>
  </div>
)

export default Post;
