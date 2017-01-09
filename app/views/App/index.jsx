import React, { PropTypes } from 'react'

import api from '../../services/api-service';

const App = React.createClass({
  getInitialState () {
    return {
      allPosts: null,
    };
  },

  async componentWillMount () {
    const allPosts = await api.request({ path: 'posts' });
    this.handleStorePosts(allPosts);
  },


  handleStorePosts(json) {
    this.setState({
      allPosts: json
    });
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

    return React.cloneElement(children, {data: sharedState});
  }
})

export default App
