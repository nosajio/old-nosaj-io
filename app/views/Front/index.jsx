import React, { PropTypes } from 'react'

import Posts from '../../components/Posts';
import './front.scss';

const Front = React.createClass({
  propTypes: {
    data: React.PropTypes.object // this will be the shared state object
  },

  componentWillMount: function() {
    this.props.updateState('posts');
  },

  render () {
    const {allPosts, freshRender} = this.props.data;

    return (
      <div className={`front-view ${freshRender ? 'animate' : ''}`}>
        <div className="front-view__cover"></div>
        <main className="front-view__main">
          <header className="front-view__introduction">
            <h1>I'm a multidisciplinary designer and software engineer.</h1>
            <p className="subhead">I've built stuff for <a href="https://williamhill.com" target="_blank">William Hill Online</a>, <a href="http://mrsite.com" target="_blank">MrSite</a>, <a href="http://beachfix.co" target="_blank">BeachFix</a>, the BBC (via <a href="https://metabroadcast.com" target="_blank">Meta</a>) and more.</p>
          </header>
          <ul className="front-view__actions">
            <li
              onClick={this.handleSendMessage}
              className="front-view__action">Send me a message <em>I'm accepting work for early 2017</em></li>
          </ul>
          <section className="front-view__posts">
            <header className="front-view__posts-header">
              <h1>Essays</h1>
            </header>
            <Posts posts={allPosts}/>
          </section>
          <footer className="front-view__footer">

          </footer>
        </main>
      </div>
    )
  }
})

export default Front
