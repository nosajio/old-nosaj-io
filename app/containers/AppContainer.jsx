import React, {PropTypes} from 'react';
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
      // Message UI
      handleShowMessageUi: this.handleShowMessageUi,
      handleHideMessageUi: this.handleShowMessageUi.bind(this, false),
      handleMessageChange: this.handleMessageChange,
      handleSendMessage: this.handleSendMessage,
      messageUiShowing: false,
      messageSending: false,
      messageSent: false,
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
   * Handle Show Message UI
   * Set state for showing message UI
   *
   * @param {boolean} open
   */
  handleShowMessageUi (open=true) {
    this.setState({messageUiShowing: open});
  },

  /**
   * handle Message Change
   * For updating the state when the in-progress message contents changes
   *
   * @param {Event} event
   */
  handleMessageChange (event) {
    const messageValue = event.target.value;
    this.setState({ messageValue });
  },

  /**
   * Handle Send Message
   *
   * @return {Promise}
   */
  async handleSendMessage () {
    const {messageValue} = this.state;
    this.setState({messageSending: true});
    try {
      const messageRequest = await api.request({
        path: 'messages',
        method: 'post',
        body: {message: messageValue},
      });
      this.setState({ messageSent: true, messageSending: false });
    } catch (err) {
      console.error(err);
    }
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
    return React.createElement(App, {...this.state}, this.props.children)
  }
});

export default AppContainer;
