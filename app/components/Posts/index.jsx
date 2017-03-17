import React, { PropTypes } from 'react';

// import './posts.scss';

// Flip the indexing so that tabbing through posts happens in the order they're listed 
const calculateTabIndex = (index, data) => data.length - index - 1;

const returnPostItem = (post, i, navigateToPost, data) => (
  <a 
    tabIndex={calculateTabIndex(i, data)}
    key={i} 
    onClick={() => navigateToPost(post)} 
    className="posts-list__post"
  >{post.title}</a>
);

const Posts = ({ data, className, navigateToPost }) => (
  <section className={`posts-list ${className}`}>
    {data.map((post, i) => returnPostItem(post, i, navigateToPost, data))}
  </section>
);

Posts.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  navigateToPost: PropTypes.func,
};

export default Posts;
