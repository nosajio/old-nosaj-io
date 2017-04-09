import React, { PropTypes } from 'react';
import Button from '../Button';
import './frontIntro.scss';

const FrontIntro = ({ className, toggleMessageUi }) => (
  <section className={`front-intro ${className}`}>
    <p className="front-intro__text">Hi I'm Jason. I'm a multi-disciplinary designer and software engineer, and I currently work with small teams to build ambitious products. I've worked on projects for The BBC, MetaBroadcast, William Hill Online, and many others.</p>
    <p className="front-intro__subtext"><Button onClick={() => toggleMessageUi(true)}>Get in touch</Button> <span className="front-intro__booking">I'm fully booked until the end of April.</span></p>
  </section>
);

FrontIntro.propTypes = {
  className: PropTypes.string,
  toggleMessageUi: PropTypes.func,
}

export default FrontIntro;
