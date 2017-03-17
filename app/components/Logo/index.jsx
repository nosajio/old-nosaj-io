import React, { PropTypes } from 'react';

import './logo.scss';

const splitLetters = (letters) => 
  letters.split('').map((l, i)  => (
    <span key={i} className={`logo-letter logo-letter--${l}`}>{l}</span>
  ));

const Logo = ({ text, loading }) => (
  <div className={`logo ${loading && 'logo--app-is-busy'}`}>
    <h1>{splitLetters(text)}</h1>
  </div>
);

Logo.propTypes = {
  text: PropTypes.string,
  loading: PropTypes.bool,
}

export default Logo;
