import React, { PropTypes } from 'react'

import './front.scss';

class Front extends React.Component {

  componentWillMount () {
    this.props.updateState('posts');
  }

  render () {
    const {
      allPosts,
      freshRender,
      reachedBottomOfPage
    } = this.props.data;

    return (
      <div className={`front-view ${freshRender ? 'animate' : ''}`}>
        
      </div>
    )
  }
}

Front.propTypes = {
  data: PropTypes.object, // this will be the shared state object
  updateState: PropTypes.func,
};

export default Front
