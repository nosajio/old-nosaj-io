import React, { PropTypes } from 'react'

import Nav from '../../components/Nav';

const writing = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  getInitialState () {
    return {
      writing: null,
      transitionTo: null,
    };
  },

  componentWillMount () {
    this
      .getwritingData()
      .then(writing => this.setState({writing}) );
  },

  getwritingData () {
    const writingUrl = '/api/posts';
    const writingReq = fetch(writingUrl);
    return writingReq.then(res => res.json());
  },

  transitionToPost (post) {
    const transitionDuration = 500;
    const nextRoute = `/writing/${post.slug}`;
    this.setState({ transitionTo: post.slug });
    window.setTimeout(() =>
      this.context.router.push({
        pathname: nextRoute,
        state: post
      }), transitionDuration);
  },

  postEl (post, index) {
    const {transitionTo} = this.state;
    const itemStyle = {
      backgroundColor: post.color
    };
    return (
      <li key={index}
        onClick={this.transitionToPost.bind(this, post)}
        className={`
          ${index === 0 ? 'is-latest' : ''}
          ${transitionTo ? 'is-transitioning' : ''}
          writing-list__post`}>
        <article>
          <div
            style={itemStyle}
            className="writing-list__post-cover">
          </div>
          <div className="writing-list__post-title">
            <h1>{post.title}</h1>
            <ul className="writing-list__post-meta meta-list">
              <li className="meta-list__item meta-list__item--date">{post.friendlyDate}</li>
              <li className="meta-list__item meta-list__item--read-time">{post.readingTime} minutes</li>
            </ul>
          </div>
        </article>
      </li>
    )
  },

  render () {
    const {writing, transitionTo} = this.state;
    if (! writing) return null;

    const nextNote = transitionTo ? writing.filter(it => it.slug === transitionTo)[0] : null;
    const style = {};
    if (nextNote) {
      style.background = nextNote.color;
    }

    return (
      <div className="writing-view">
        <Nav className="light" tuck={true}/>
        <main className={`writing-view__content ${transitionTo ? 'is-transitioning' : ''}`}>
          <header className="writing-view__header">
            <h1>writing</h1>
            <p className="writing-view__subhead">I write about design, systems, and the endless persuit of optimisation.</p>
          </header>
          <ol className="writing-list">
            {writing.length ?
              writing.map(this.postEl) :
            (
              <li className="writing-list__blank">My fingers are busy typing at this very moment</li>
            )}
          </ol>
        </main>
        {transitionTo ? (
          <div className="next-item-color" style={style}></div>
        ) : null}
      </div>
    )
  }
})

export default writing
