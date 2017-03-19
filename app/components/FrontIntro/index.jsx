import React, { PropTypes } from 'react';

import './frontIntro.scss';

const FrontIntro = ({ className }) => (
  <section className={`front-intro ${className}`}>
    <p className="front-intro__text">Multi-disciplinary designer and engineer. I've made software for BeachFix, The BBC, MetaBroadcast, MrSite, William Hill Online, and many others.</p>
    <p className="front-intro__subtext"><b>To get in touch</b>, send me an email on jason (at) nosaj (dot) io. <span className="front-intro__booking">(I'm currently fully booked until the end of April.)</span></p>
  </section>
);

FrontIntro.propTypes = {
  className: PropTypes.string,
}

export default FrontIntro;
