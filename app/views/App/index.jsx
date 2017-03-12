import React, { PropTypes } from 'react'
import debounce from '../../helpers/debounce';
import InstantMessage from '../../components/InstantMessage';

import './app.scss';

const App = React.createClass({
  getInitialState () {
    return {
      scrollPosition: 0,
      reachedBottomOfPage: false,
    };
  },

  componentDidMount () {
    if (typeof window === 'undefined') return;
    this.putGaOnPage();
    this.sendEventToGa();
    this.scrollListener(this.updateScrollPosition);
  },

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentRoute !== this.props.currentRoute
      && typeof window !== 'undefined') {
      this.sendEventToGa();
    }
  },

  render () {
    const {reachedBottomOfPage} = this.state;
    const sharedState = this.props;
    const {
      children,
      handleMessageChange,
      handleHideMessageUi,
      handleSendMessage,
      messageUiShowing,
      messageSent,
      messageSending,
    } = this.props;

    if (! children) {
      return (<div className="not-found">IV—O—IV</div>)
    }

    return (
      <div className={`wrap-everything ${messageUiShowing ? 'is-locked' : ''}`}>
        {React.cloneElement(children, {data: {...sharedState, reachedBottomOfPage}, updateState: this.props.updateState})}
        {messageUiShowing ?
          <InstantMessage
            onMessageChange={handleMessageChange}
            onClose={handleHideMessageUi}
            isSent={messageSent}
            isSending={messageSending}
            onSend={handleSendMessage}/>
          : null}
      </div>
    );
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
  }
})

export default App
