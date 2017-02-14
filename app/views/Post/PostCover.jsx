import React, { PropTypes } from 'react';

const styleFromProps = (img, color) => ({
  backgroundColor: color || 'transparent',
  backgroundImage: img ? `url(${img})` : 'none',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
});

const PostCover = ({ coverImg, coverColor }) => (
  <div className="a-post__cover" style={styleFromProps(coverImg, coverColor)}></div>
);

PostCover.propTypes = {
  coverImg: PropTypes.string,
  coverColor: PropTypes.string,
}

export default PostCover;
