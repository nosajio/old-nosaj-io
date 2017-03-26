import React, { PropTypes } from 'react';

import './four-oh-four.scss'

const FourOhFour = ({ actions }) => {
  // Send this as a custom event to GA for analysis
  actions.trackEvent('Errors', '404');
  return (
    <section className="four-oh-four">
      <h1>You Broke It</h1>
      <p>Not really but whatever you're looking for, it ain't here.</p>
    </section>
  );
}

FourOhFour.propTypes = {
  actions: PropTypes.object,
}


export default FourOhFour;
