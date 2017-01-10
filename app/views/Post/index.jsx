import React, { PropTypes } from 'react'

import './post.scss';

const Post = (props, context) => {
  const slug = props.params.slug;
  const posts = props.data.allPosts;

  if (! posts) {
    props.updateState('posts');
    return null;
  }

  const post = posts.filter(post => post.slug === slug)[0];

  return (
    <main
      className={`post-view ${post.slug}`}>
      <link rel="stylesheet" href={`/api/posts/${post.slug}/css`}></link>
      <article className="post-view__container">
        <header className="post-view__header">
          <h1 className="post-title">{post.title}</h1>
          <ul className="post-meta">
            <li className="post-meta__item">{post.friendlyDate}</li>
            <li className="post-meta__item">{post.readingTime} min read</li>
          </ul>
        </header>
        <div className="post-view__body" dangerouslySetInnerHTML={{__html: post.body}}></div>
      </article>
    </main>
  )
}

export default Post
