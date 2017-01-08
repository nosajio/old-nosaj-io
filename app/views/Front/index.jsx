import React, { PropTypes } from 'react'

import './front.scss';

const Front = React.createClass({

  render () {
    return (
      <main className="front-view">
        <header className="front-view__introduction">
          <h1><strong>I'm a multidisciplinary designer and software engineer.</strong> I've built things for MetaBroadcast (BBC, Channel4), William Hill Online, MrSite &amp; BeachFix to name a few.</h1>
        </header>
      </main>
    )
  }
})

export default Front
