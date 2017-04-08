import React, { PropTypes } from 'react';
import Button from '../Button';
import './frontIntro.scss';

const FrontIntro = ({ className }) => (
  <section className={`front-intro ${className}`}>
    <p className="front-intro__text">Hi I'm Jason. I'm a designer and software engineer currently specialising in progressive web apps. I've worked on products for The BBC, MetaBroadcast, William Hill Online, and many others.</p>
    <p className="front-intro__subtext"><Button href="">Get in touch</Button> <span className="front-intro__booking">I'm fully booked until the end of April.</span></p>
  </section>
);

FrontIntro.propTypes = {
  className: PropTypes.string,
}

export default FrontIntro;
