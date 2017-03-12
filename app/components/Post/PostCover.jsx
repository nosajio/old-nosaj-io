import React, { PropTypes } from 'react';

import './post-cover.scss';

const handleGoToPost = (slug, router) => router.push({ pathname: `/r/${slug}` });

const PostCover = ({ title, slug }, { router }) => (
  <header onClick={() => handleGoToPost(slug, router)} className="post-cover">
    <h1>{title}</h1>
  </header>
);

PostCover.PropTypes = {
  title: PropTypes.string,
  slug: PropTypes.string,
};

PostCover.contextTypes = {
  router: PropTypes.object,
};

export default PostCover;
