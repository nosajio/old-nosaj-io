import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Logo from '../Logo';
import Footer from '../Footer';

import './four-oh-four.scss'

const FourOhFour = ({ actions, data: { navigateTo } }) => {
  // Send this as a custom event to GA for analysis
  actions.trackEvent('Errors', '404');
  return (
    <section className="four-oh-four">
      <Logo onNavigate={navigateTo} text="nosaj" />
      <h1 className="four-oh-four__title">DERP <sup>404</sup></h1>
      <p>The thing you're looking for seems to have gone. While you're here, why not <Link to="/">read my posts</Link> or <Link to="/portfolio">check out my portfolio</Link></p>
      <Footer />
    </section>
  );
}

FourOhFour.propTypes = {
  actions: PropTypes.object,
  data: PropTypes.object,
}


export default FourOhFour;
