import React, { PropTypes } from 'react'

import './loadingDots.scss';

const LoadingDots = (props) => {
  return (
    <span className="loading-dots">
      <span className="loading-dots__dot dot--1"></span>
      <span className="loading-dots__dot dot--2"></span>
      <span className="loading-dots__dot dot--3"></span>
    </span>
  )
}

export default LoadingDots
