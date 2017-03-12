import React, { PropTypes } from 'react'

import Footer from '../../components/Footer';
import Posts from '../../components/Posts';
import './front.scss';

const Front = React.createClass({
  propTypes: {
    data: React.PropTypes.object // this will be the shared state object
  },

  componentWillMount () {
    this.props.updateState('posts');
  },

  render () {
    const {
      allPosts,
      freshRender,
      reachedBottomOfPage,
      handleShowMessageUi
    } = this.props.data;

    return (
      <div className={`front-view ${freshRender ? 'animate' : ''}`}>
        
      </div>
    )
  }
})

export default Front
