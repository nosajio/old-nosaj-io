import React, { PropTypes } from 'react';

import './frontIntro.scss';

const FrontIntro = ({ className }) => (
  <section className={`front-intro ${className}`}>
    <p className="front-intro__text">Multi-disciplinary designer and maker of software. I've made things for BeachFix, The BBC, MetaBroadcast, MrSite, William Hill Online, and others.</p>
    <p className="front-intro__subtext">If you want to work together, get in touch by sending me an email on jason (at) nosaj (dot) io. I'm currently fully booked until the end of April.</p>
  </section>
);

FrontIntro.propTypes = {
  className: PropTypes.string,
}

export default FrontIntro;
