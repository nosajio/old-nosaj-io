import React, { PropTypes } from 'react';

import './isLoading.scss'

const IsLoading = ({ children, loading, done }) => {
  return (
    <div 
      className={`isLoading ${loading ? 'isLoading--loading' : ''} ${done ? 'isLoading--done' : ''}`}>
      {loading ? null : children}
    </div>
  )
}

IsLoading.propTypes = {
  loading: PropTypes.bool,
  done: PropTypes.bool,
  children: PropTypes.node,
};

export default IsLoading;
