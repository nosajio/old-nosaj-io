import React, { PropTypes } from 'react';
import App from '../views/App';
import api from '../services/api-service';

const AppContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState () {
    return {
      // Universal
      freshRender: false, // For telling child components this is the landing view
      updateState: this.updateState,
      currentRoute: '/',
      // Posts
      allPosts: null,
      // Portfolio
      navigateToProject: this.navigateToProject,
      activeProject: null,
    };
  },

  componentWillMount () {
    this.setState({ freshRender: true });
  },

  componentWillReceiveProps (nextProps) {
    this.setState({ freshRender: false });
  },

  componentDidUpdate () {
    const {currentRoute} = this.state;
    const routeChanged = currentRoute !== this.props.location.pathname;
    if (routeChanged) {
      this.setState({ currentRoute: this.props.location.pathname });
    }
  },

  /**
   * Navigate To Project
   * Gracefully transition to the specified project
   *
   * @param {Object} project - Full project object
   */
  navigateToProject (project) {
    const {router} = this.context;
    router.push({
      pathname: `/portfolio/${project.slug}`
    });
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
        try {
          const allPosts = await api.request({ path: 'posts' });
          this.setState({ allPosts });
        } catch (err) {
          console.error(err);
        }
        return;
    }
  },

  render () {
    return React.createElement(App, {...this.state}, this.props.children);
  }
});

export default AppContainer;
