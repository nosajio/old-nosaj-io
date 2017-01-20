import React, { PropTypes } from 'react'

import './portfolio.scss';

const Portfolio = React.createClass({
  propTypes: {
    data: React.PropTypes.object // this will be the shared state object
  },

  render () {
    return (
      <div className="portfolio">
        <main className="portfolio__body">
          
        </main>
      </div>
    )
  }
})

export default Portfolio
