import React, { PropTypes } from 'react';
import PostHeader from './PostHeader';
import PostHTML from './PostHTML';

import './post.scss';

const findCurrentPost = (slug, allPosts) => allPosts.filter(p => p.slug === slug)[0];

const Post = ({ routeParams: { slug }, data: { allPosts, isBusy } }) => {
  if (isBusy) {
    return null;
  }
  const post = findCurrentPost(slug, allPosts);
  
  return (
    <main className="post-wrapper">
      <article className="a-post">
        <PostHeader title={post.title} date={post.friendlyDate} />
        <PostHTML body={post.body} />
      </article>
    </main>
  );
};

Post.propTypes = {
  routeParams: PropTypes.object,
  data: PropTypes.shape({
    isBusy: PropTypes.bool.isRequired,
    allPosts: PropTypes.array,
  }),
};

export default Post;
