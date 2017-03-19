import React, { PropTypes } from 'react';
import Logo from '../../components/Logo';
import PostCover from './PostCover';
import PostHeader from './PostHeader';
import PostHTML from './PostHTML';

import './post.scss';

const findCurrentPost = (slug, allPosts) => allPosts.filter(p => p.slug === slug)[0];

const Post = ({ routeParams: { slug }, data: { navigateTo, showoff, allPosts, isBusy, triggerNavDance } }) => {
  if (isBusy) {
    return null;
  }
  const post = findCurrentPost(slug, allPosts);
  const { coverColor, coverImg } = post;
  return (
    <div className="post-view">
      <Logo 
        onNavigate={navigateTo}
        onTrigger={triggerNavDance}
        text="nosaj" 
        showoff={showoff}
        loading={isBusy}
      />
      <main className="post-wrapper">
        {(coverImg || coverColor) && <PostCover coverImg={coverImg} coverColor={coverColor} />}
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
