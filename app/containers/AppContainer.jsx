import React, { PropTypes } from 'react';
import App from '../views/App';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      // Universal
      freshRender: false, // For telling child components this is the landing view
      currentRoute: '/',
      isBusy: false,
      navigateTo: this.navigateTo,
      // Posts
      navigateToPost: this.navigateToPost,
      // Portfolio
      navigateToProject: this.navigateToProject,
      activeProject: null,
    };
  }

  componentWillMount () {
    this.setState({ freshRender: true, currentRoute: this.props.location.pathname });
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
  navigateToProject = (project) => {
    const { router } = this.context;
    router.push({
      pathname: `/portfolio/${project.slug}`
    });
  }
  
  /**
   * Navigate To Post
   *
   * @param {object} post
   */
  navigateToPost = (post) => {
    return this.navigateTo({ pathname: `/r/${post.slug}` });
  }
  
  /**
   * Navigate To
   * General helper for navigating around the website
   * 
   * @param {object} location Location object to be passed to the router
   */
  navigateTo = location => this.context.router.push(location);
}

AppContainer.contextTypes = {
  router: PropTypes.object,
};

AppContainer.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default AppContainer;
