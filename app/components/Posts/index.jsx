import React, { PropTypes } from 'react';
import withPosts from '../../hocs/withPosts';

import './posts.scss';

const returnPostItem = (post, i, navigateToPost) => (
  <a 
    tabIndex={0}
    key={i} 
    onKeyPress={e => e.key === 'Enter' && navigateToPost(post)}
    onClick={() => navigateToPost(post)} 
    className="list-of-posts__post"
  >{post.title}</a>
);

const Posts = ({ allPosts, className, navigateToPost }) => (
  <section className={`list-of-posts ${className}`}>
    {allPosts.map((post, i) => returnPostItem(post, i, navigateToPost))}
  </section>
);

Posts.propTypes = {
  allPosts: PropTypes.array,
  className: PropTypes.string,
  navigateToPost: PropTypes.func,
};

export default withPosts(Posts);
