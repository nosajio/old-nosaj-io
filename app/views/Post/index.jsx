import React, { PropTypes } from 'react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import Head from '../../components/Head';
import PostCover from './PostCover';
import PostHeader from './PostHeader';
import PostHTML from './PostHTML';
import withPost from '../../hocs/withPost';

import './post.scss';

const Post = ({ post, data: { navigateTo, isBusy } }) => {
  if (isBusy) {
    return null;
  }
  const { coverColor, coverImg } = post;
  return (
    <div className="a-view post-view">
      <Head>
        {/* OpenGraph */}
        <meta name="og:url" property="og:url" content={`https://nosaj.io/r/${post.slug}`} />
        <meta name="og:type" property="og:type" content="article" />
        <meta name="og:title" property="og:title" content={post.title} />
        <meta name="og:description" property="og:description" content="" />
        <meta name="og:image" property="og:image" content={coverImg ? coverImg : 'http://a.nosaj.io/og-nosaj.png'} />
      </Head>
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
