import React, { PropTypes } from 'react';
import Logo from '../../components/Logo';
import PostHeader from './PostHeader';
import PostHTML from './PostHTML';

import './post.scss';

const findCurrentPost = (slug, allPosts) => allPosts.filter(p => p.slug === slug)[0];

const Post = ({ routeParams: { slug }, data: { navigateTo, allPosts, isBusy } }) => {
  if (isBusy) {
    return null;
  }
  const post = findCurrentPost(slug, allPosts);
  
  return (
    <div className="post-view">
      <Logo navigateTo={navigateTo} text="nosaj" loading={isBusy} />
      <main className="post-wrapper">
        <article className="a-post">
          <PostHeader title={post.title} date={post.friendlyDate} />
          <PostHTML body={post.body} />
        </article>
      </main>
    </div>
  );
};

Post.propTypes = {
  routeParams: PropTypes.object,
  data: PropTypes.shape({
    isBusy: PropTypes.bool.isRequired,
    allPosts: PropTypes.array,
    navigateTo: PropTypes.func,
  }),
};

export default Post;
