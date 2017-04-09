import React, { PropTypes } from 'react';

const PostHTML = ({ body }) => React.createElement('div', { className: 'a-post__body', dangerouslySetInnerHTML: { __html: body} });
PostHTML.propTypes = {
  body: PropTypes.string,
};

export default PostHTML
