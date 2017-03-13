import React, { PropTypes } from 'react';

// import './posts.scss';

const returnPostItem = (post, i) => (
  <article key={i} className="posts-list__post">
    {post.title}
  </article>
);

const Posts = ({ data, className }) => (
  <section className={`posts-list ${className}`}>
    {data.map(returnPostItem)}
  </section>
);

Posts.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
};

export default Posts;
