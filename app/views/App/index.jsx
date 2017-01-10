import React, { PropTypes } from 'react'

import api from '../../services/api-service';

const App = React.createClass({
  getInitialState () {
    return {
      allPosts: null,
      freshRender: false, // <- For telling child components this is the landing view
    };
  },

  componentWillMount () {
    this.setState({ freshRender: true });
  },

  componentWillReceiveProps (nextProps) {
    this.setState({ freshRender: false });
  },

  /**
   * Update State
   * A minimal implementation of a store / messaging system. This method will
   * be passed to child components to send a message back up for data requests.
   *
   * @param {string} part
   * @param {object} params
   */
  async updateState (part, params) {
    switch (part) {
      case 'posts':
        const allPosts = await api.request({ path: 'posts' });
        this.handleStorePosts(allPosts);
        return;
    }
  },

  handleStorePosts(json) {
    this.setState({ allPosts: json });
  },

  render () {
    const sharedState = this.state;
    const {children} = this.props;

    if (! children) {
      return (
        <div className="not-found">
          IV 0 IV
        </div>
      )
    }

    return React.cloneElement(children, {data: sharedState, updateState: this.updateState});
  }
})

export default App
