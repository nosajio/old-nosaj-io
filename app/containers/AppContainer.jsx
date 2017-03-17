import React, { PropTypes } from 'react';
import App from '../views/App';
import api from '../services/api-service';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      // Universal
      freshRender: false, // For telling child components this is the landing view
      updateState: this.updateState,
      currentRoute: '/',
      isBusy: false,
      navigateTo: this.navigateTo,
      showoff: false,
      // Posts
      allPosts: null,
      navigateToPost: this.navigateToPost,
      // Portfolio
      navigateToProject: this.navigateToProject,
      activeProject: null,
    };
  }

  componentWillMount () {
    this.setState({ freshRender: true });
    this.updateState('posts');
    // For fun and to let the user know that the logo will flash when the site is busy
    this.showoffLogoFlashes(1310);
  }

  componentWillReceiveProps () {
    this.setState({ freshRender: false });
  }

  componentDidUpdate () {
    const {currentRoute} = this.state;
    const routeChanged = currentRoute !== this.props.location.pathname;
    if (routeChanged) {
      this.setState({ currentRoute: this.props.location.pathname });
    }
  }

  render () {
    return React.createElement(App, {...this.state}, this.props.children);
  }
  
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
  }
  
  /**
   * Navigate To Post
   * Handle the fetching of post data and then route to the post
   *
   * @param {object} post
   */
  navigateToPost = (post) => {
    const { allPosts } = this.state;
    if (allPosts) {
      return this.navigateTo({ pathname: `/r/${post.slug}` });
    }
    this
      .updateState('posts')
      .then(() => this.navigateTo({ pathname: `/r/${post.slug}` }));
  }
  
  /**
   * Navigate To
   * General helper for navigating around the website
   * 
   * @param {object} location Location object to be passed to the router
   */
  navigateTo = location => this.context.router.push(location);

  /**
   * Update State
   * A minimal implementation of a store / messaging system. This method will
   * be passed to child components to send a message back up for data requests.
   *
   * @param {string} part
   * @param {object} params
   */
  async updateState (part) {
    this.setState({ isBusy: true });
    switch (part) {
      case 'posts':
        try {
          const allPosts = await api.request({ path: 'posts' });
          this.setState({ allPosts, isBusy: false });
        } catch (err) {
          console.error(err);
        }
        return;
    }
  }
  
  showoffLogoFlashes (duration) {
    this.setState({ showoff: true });
    window.setTimeout(() => this.setState({ showoff: false }), duration);
  }
}

AppContainer.contextTypes = {
  router: PropTypes.object,
};

AppContainer.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default AppContainer;
