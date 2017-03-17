import React, { PropTypes } from 'react';

const PostHeader = ({ title, date }) => (
  <header className="a-post__header">
    <h1>{title}</h1>
    <ul className="a-post__meta">
      <li className="a-post__meta-date">{date}</li>
    </ul>
  </header>
);

PostHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
}

export default PostHeader
