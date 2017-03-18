import React, { PropTypes } from 'react';

import './logo.scss';

const splitLetters = (letters) => 
  letters.split('').map((l, i)  => (
    <span key={i} className={`logo-letter logo-letter--${l}`}>{l}</span>
  ));

const Logo = ({ text, loading, showoff, navigateTo }) => {
  const handleNavigatetoHome = () => navigateTo ? navigateTo({ pathname: '/' }) : null;
  return (
    <a 
      className={`logo ${(loading || showoff)  && 'logo--app-is-busy'}`}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleNavigatetoHome() }
      onClick={handleNavigatetoHome}
      >
      <h1>{splitLetters(text)}</h1>
    </a>
  );
}

Logo.propTypes = {
  text: PropTypes.string,
  loading: PropTypes.bool,
  showoff: PropTypes.bool, // this will just make the logo flash a couple of times for a bit of fun
  navigateTo: PropTypes.func,
}

export default Logo;
