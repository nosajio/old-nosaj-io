import React, { PropTypes } from 'react'

import debounce from '../../helpers/debounce';
import api from '../../services/api-service';

import InstantMessage from '../../components/InstantMessage';

import './app.scss';

const App = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState () {
    return {
      // Universal
      scrollPosition: 0,
      currentRoute: '/',
      reachedBottomOfPage: false,
      freshRender: false, // For telling child components this is the landing view
      // Message UI
      handleShowMessageUi: this.handleShowMessageUi,
      messageUiShowing: false,
      messageSending: false,
      messageSent: false,
      // Posts
      allPosts: null,
      // Portfolio
      navigateToProject: this.navigateToProject,
    };
  },

  componentWillMount () {
    this.setState({ freshRender: true });
  },

  componentDidMount () {
    if (typeof window === 'undefined') return;
    this.putGaOnPage();
    this.sendEventToGa();
    this.scrollListener(this.updateScrollPosition);
  },

  componentWillReceiveProps (nextProps) {
    this.setState({ freshRender: false });
  },

  componentDidUpdate () {
    const {currentRoute} = this.state;
    const routeChanged = currentRoute !== this.props.location.pathname;
    if (routeChanged) {
      if (typeof window !== 'undefined') {
        this.scrollToTop();
        this.sendEventToGa();
      }
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
   * Update Scroll Position
   * Update any state linked with scroll events
   *
   * @param {Number} pos - scrollTop position
   */
  updateScrollPosition (pos) {
    const windowHeight = window.innerHeight;
    const pageHeight = Math.floor(document.getElementById('Nosaj').getBoundingClientRect().height);
    let scrollPosition = Math.ceil(windowHeight + pos);
    this.setState({
      scrollPosition,
      reachedBottomOfPage: this.state.reachedBottomOfPage ? true : scrollPosition >= (pageHeight - 15),
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

  /**
   * Scroll To the Top
   */
  scrollToTop () {
    window.scroll(0, 0);
  },

  /**
   * Scroll Listener
   * Debounced; set up and manage scroll event listeners
   *
   * @param {Function} cb - callback, fired when scroll updates
   */
  scrollListener (cb=null) {
    (cb ?
      window.addEventListener('scroll', scrollListener) : window.removeEventListener('scroll', scrollListener)
    );
    function scrollListener() {
      // debounce; we don't need absolute precision for this
      debounce(20, () => cb(window.scrollY));
    }
  },

  /**
   * Send Event to Google Analytice
   */
  sendEventToGa () {
    ga('send', 'pageview');
  },

  /**
   * Put Google Analytics onto the page
   */
  putGaOnPage () {
    // Google analytics code from google
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-71692329-1', 'auto');
  },

  render () {
    const sharedState = this.state;
    const {children} = this.props;
    const {messageUiShowing, messageSent, messageSending} = this.state;

    if (! children) {
      return (<div className="not-found">IV—O—IV</div>)
    }

    return (
      <div className={`wrap-me-like-its-christmas ${messageUiShowing ? 'is-locked' : ''}`}>
        {React.cloneElement(children, {data: sharedState, updateState: this.updateState})}
        {messageUiShowing ?
          <InstantMessage
            onMessageChange={this.handleMessageChange}
            onClose={this.handleShowMessageUi.bind(this, false)}
            isSent={messageSent}
            isSending={messageSending}
            onSend={this.handleSendMessage}/>
          : null}
      </div>
    );
  }
})

export default App
