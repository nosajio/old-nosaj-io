import React, { PropTypes } from 'react'

const Nosaj = React.createClass({

  componentDidMount () {
    this.putGaOnPage();
    this.sendEventToGa();
  },

  componentDidUpdate () {
    this.sendEventToGa();
  },

  componentWillUpdate (nextProps, nextState) {
    this.removeTempElements();
  },

  removeTempElements () {
    const tmpElements = document.querySelectorAll('.temporary-element');
    if (tmpElements.length) {
      tmpElements.forEach(el => {
        let parent = el.parentNode;
        if (parent) {
          parent.removeChild(el);
        }
      });
    }
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
    const {children, location} = this.props;
    const key = (location.pathname.replace('/', '') === '') ?
      'open' :
      location.pathname.replace('/', '');

    return (
      <div className="nosaj-wrapper" key={key}>
        {React.cloneElement(children)}
      </div>
    )
  }
})

export default Nosaj
