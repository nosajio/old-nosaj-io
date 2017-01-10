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

  componentDidMount () {
    this.putGaOnPage();
    this.sendEventToGa();
  },

  componentWillReceiveProps (nextProps) {
    this.setState({ freshRender: false });
  },

  componentDidUpdate () {
    this.sendEventToGa();
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
