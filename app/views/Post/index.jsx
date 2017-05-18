import React, { PropTypes } from 'react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import PostCover from './PostCover';
import PostHeader from './PostHeader';
import PostHTML from './PostHTML';
import NextPost from './NextPost';
import withPost from '../../hocs/withPost';

import './post.scss';

const Post = ({ post, data: { navigateTo, isBusy } }) => {
  if (isBusy) {
    return null;
  }
  const { coverColor, coverImg, nextPost } = post;
  return (
    <div className="a-view post-view">
      <Logo 
        onNavigate={navigateTo}
        loading={isBusy}
      />
      <main>
        {(coverImg || coverColor) && <PostCover coverImg={coverImg} coverColor={coverColor} />}
        <article className="a-post">
          <PostHeader title={post.title} date={post.friendlyDate} />
          <PostHTML body={post.body} />
        </article>
        {nextPost && <NextPost navigateTo={navigateTo} post={nextPost} />}
      </main>
      <Footer />
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  data: PropTypes.shape({
    isBusy: PropTypes.bool.isRequired,
    navigateTo: PropTypes.func,
  }),
};

export default withPost(Post);
