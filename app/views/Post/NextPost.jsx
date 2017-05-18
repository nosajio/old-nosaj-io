import React, { PropTypes } from 'react';

const NextPost = ({post, navigateTo}) => {
  const navigateToNextPost = slug => navigateTo({pathname: `/r/${slug}`});
  return (
    <section 
      onClick={() => navigateToNextPost(post.slug)}
      style={{backgroundColor: post.coverColor}} 
      className="next-post"
    >
      <header className="next-post__header">
        <h2>Feel like reading something else?</h2>
      </header>
      <div className="next-post__post">
        <h1>{post.title}</h1>
      </div>
    </section>
  );
};

NextPost.propTypes = {
  post: PropTypes.object,
  navigateTo: PropTypes.func,
};

export default NextPost;
