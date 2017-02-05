import React, { PropTypes } from 'react'

import Footer from '../../components/Footer';
import Posts from '../../components/Posts';
import './front.scss';

const Front = React.createClass({
  propTypes: {
    data: React.PropTypes.object // this will be the shared state object
  },

  componentWillMount () {
    this.props.updateState('posts');
  },

  render () {
    const {
      allPosts,
      freshRender,
      reachedBottomOfPage,
      handleShowMessageUi
    } = this.props.data;

    return (
      <div className={`front-view ${freshRender ? 'animate' : ''}`}>
        <div className="front-view__cover"></div>
        <main className="front-view__main">
          <header className="front-view__introduction">
            <h1>I'm a multidisciplinary designer and software engineer.</h1>
            <p className="subhead">I've built stuff for <a href="https://williamhill.com" target="_blank">William Hill Online</a>, <a href="http://mrsite.com" target="_blank">MrSite</a>, <a href="http://beachfix.co" target="_blank">BeachFix</a>, the BBC (via <a href="https://metabroadcast.com" target="_blank">Meta</a>) and many others.</p>
          </header>
          <section className="front-view__actions">
            <header className="front-view__header">
              <h1>Contact</h1>
            </header>
            <ul className="front-view__actions-list">
              <li className="front-view__action">
                <span className="action-btn" onClick={handleShowMessageUi}>Tell me about your project <em>I'm accepting work for April 2017</em></span>
                <small className="action-note">or email me on jason (at) nosaj (dot) io</small>
              </li>
            </ul>
          </section>
          <section className="front-view__posts">
            <header className="front-view__header">
              <h1>Essays</h1>
            </header>
            <Posts posts={allPosts}/>
          </section>
          <Footer inView={reachedBottomOfPage}/>
        </main>
      </div>
    )
  }
})

export default Front
