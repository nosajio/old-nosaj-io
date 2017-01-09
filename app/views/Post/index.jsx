import React, { PropTypes } from 'react'

const Post = (props, context) => {
  const slug = props.params.slug;
  const posts = props.data.allPosts;

  if (! posts) {
    props.updateState('posts');
    return null;
  }

  const post = posts.filter(post => post.slug === slug)[0];

  return (
    <main className="post-view">
      <article className="post-view__body">
        <header className="post-view__header">
          <h1>{post.title}</h1>
        </header>
      </article>
    </main>
  )
}

export default Post
