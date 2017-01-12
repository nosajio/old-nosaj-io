import React, { PropTypes } from 'react'

import debounce from '../../helpers/debounce';
import api from '../../services/api-service';

const App = React.createClass({
  getInitialState () {
    return {
      allPosts: null,
      scrollPosition: 0,
      currentRoute: '/',
      reachedBottomOfPage: false,
      freshRender: false, // <- For telling child components this is the landing view
    };
  },

  componentWillMount () {
    this.setState({ freshRender: true });
  },

  componentDidMount () {
    const windowHeight = window.innerHeight;
    const pageHeight = document.body.getBoundingClientRect().height;
    this.putGaOnPage();
    this.sendEventToGa();
    this.scrollListener(pos => {
      let scrollPosition = windowHeight + pos;
      console.log(scrollPosition);
      this.setState({
        scrollPosition,
        reachedBottomOfPage: this.state.reachedBottomOfPage ? true : scrollPosition >= pageHeight,
      });
    });
  },

  componentWillReceiveProps (nextProps) {
    this.setState({ freshRender: false });
  },

  componentDidUpdate () {
    if (typeof window === 'undefined') {
      return;
    }
    const {currentRoute} = this.state;
    const routeChanged = currentRoute !== this.props.location.pathname;
    if (routeChanged) {
      this.scrollToTop();
      this.sendEventToGa();
      this.setState({ currentRoute: this.props.location.pathname });
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
        const allPosts = await api.request({ path: 'posts' });
        this.handleStorePosts(allPosts);
        return;
    }
  },

  scrollToTop() {
    if (typeof window === 'undefined') {
      return;
    }
    window.scroll(0, 0);
  },

  scrollListener(cb=null) {
    if (typeof window === 'undefined') {
      return;
    }
    if (cb) {
      window.addEventListener('scroll', scrollListener);
    } else {
      window.removeEventListener('scroll', scrollListener);
    }

    function scrollListener(event) {
      // debounce; we don't need absolute precision for this
      debounce(20, () => cb(window.scrollY));
    }
  },

  handleStorePosts(json) {
    this.setState({ allPosts: json });
  },

  sendEventToGa () {
    ga('send', 'pageview');
  },

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

    if (! children) {
      return (<div className="not-found">IV—O—IV</div>)
    }

    return React.cloneElement(children, {data: sharedState, updateState: this.updateState});
  }
})

export default App
