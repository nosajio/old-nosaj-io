import React, { PropTypes } from 'react'

const Open = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState () {
    return {
      writing: null,
      transitionTo: null,
      pastClients: {
        'MrSite': 'http://mrsite.com',
        'William Hill Online': 'https://williamhill.com',
        'Mattebox': 'http://mattebox.com',
        'MetaBroadcast (BBC, Channel 4)': 'https://metabroadcast.com',
        'BeachFix': 'http://beachfix.co',
        'TopHat Films': 'http://thetophatfilmswebsite.com',
        'Elixir Productions': 'http://elixirproductions.org'
      }
    }
  },

  componentWillMount () {
    this
      .getwritingData()
      .then(writing => this.setState({writing}) );
  },

  componentDidMount () {
    this.linkPostsStylesheet();
  },

  linkPostsStylesheet () {
    const cssLocation = `/api/posts/css`;
    const linkTag = document.createElement('link');
    linkTag.className = 'temporary-element';
    linkTag.href = cssLocation;
    linkTag.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(linkTag);
  },

  getwritingData () {
    const writingUrl = '/api/posts';
    const writingReq = fetch(writingUrl);
    return writingReq.then(res => res.json());
  },

  transitionToPost (post) {
    const transitionDuration = 500;
    const nextRoute = `/${post.slug}`;
    this.setState({ transitionTo: post.slug });
    window.setTimeout(() =>
      this.context.router.push({
        pathname: nextRoute,
        state: post
      }), transitionDuration);
  },

  _selectTimer: null,
  selectPost (post) {
    if (! post) {
      if (! this._selectTimer) {
        this._selectTimer = setTimeout(() => {
          this.setState({ selectedPost: null });
        }, 200);
      }
    } else {
      this.setState({ selectedPost: post });
      if (this._selectTimer) {
        clearTimeout(this._selectTimer);
        this._selectTimer = null;
      }
    }
  },

  postEl (post, index) {
    const {transitionTo, selectedPost} = this.state;
    let selectedClassName = '';
    const itemStyle = {
      backgroundColor: post.color
    };
    if (selectedPost) {
      selectedClassName = selectedPost.slug === post.slug ? 'is-selected' : '';
    }
    return (
      <li key={index}
        onClick={this.transitionToPost.bind(this, post)}
        onMouseOver={this.selectPost.bind(this, post)}
        onMouseOut={this.selectPost.bind(this, null)}
        className={`
          ${index === 0 ? 'is-latest' : ''}
          ${transitionTo ? 'is-transitioning' : ''}
          ${post.slug}
          ${selectedClassName}
          writing-list__post`}>
        <article>
          <div className="writing-list__post-title">
            <ul className="writing-list__post-meta">
              <li className="writing-list__post-meta-item writing-list__post-meta-item--date">{post.friendlyDate}</li>
              <li className="writing-list__post-meta-item writing-list__post-meta-item--read-time">{post.readingTime} minutes</li>
            </ul>
            <h1>{post.title}</h1>
          </div>
        </article>
      </li>
    )
  },

  splitCharacters (textStr) {
    const characters = textStr.split('');
    return (
      <span className="split-letters">
        {characters.map((char, index) => (<span key={index} className="split-letters__letter">{char}</span>))}
      </span>
    );
  },

  render () {
    const {pastClients, writing, transitionTo, selectedPost} = this.state;
    const nextPost = transitionTo ? writing.filter(it => it.slug === transitionTo)[0] : null;
    const style = {};
    if (nextPost) {
      style.background = nextPost.color;
    }
    const selectedStyle = selectedPost ? `${selectedPost.slug}--is-active` : '';

    function clientLink(it, index) {
      let append = ', ';
      switch (index) {
        case Object.keys(pastClients).length - 1:
          append = ''; break;
        case Object.keys(pastClients).length - 2:
          append = ', and '; break;
      }
      return (
        <span key={index}><a href={pastClients[it]} target="_blank">{it}</a>{append}</span>
      );
    }

    return (
      <main className="open-view">
        <div className="open-view__header">
          <header className="open-view__headline">
            <h1>Designer. <br/>Software Engineer. <br/>London.</h1>
            <p>I've made stuff for {Object.keys(pastClients).map(clientLink)}. I also write about design, technology, and the pursuit of making things.</p>
          </header>
        </div>
        <section
          className={`open-view__posts ${selectedStyle} ${selectedStyle ? 'is-selected' : ''}`}>
          <header className="open-view__posts-header">
            <h2>Writing</h2>
            <span className="open-view__posts-subhead">I write short essays about how to design and make things for the internet without the fluff.</span>
          </header>
          <div className="open-view__posts-body">
            <ol className="writing-list">
              {writing ? writing.map(this.postEl) : null}
            </ol>
            {transitionTo ? (
              <div className="next-item-color" style={style}></div>
            ) : null}
          </div>
        </section>
      </main>
    )
  }
})

export default Open
