import React, { PropTypes } from 'react'
import WritingMenu from '../../components/WritingMenu';

const Post = React.createClass({
  getInitialState () {
    return {
      post: null,
    };
  },

  componentWillMount () {
    window.scroll(0, 0);
    const {location} = this.props;
    const post = location.state;
    if (post) {
      this.setState({ post });
      return;
    }
    const {slug} = this.props.params;
    this
      .getPostData(slug)
      .then(post => {
        this.setState({ post });
      });
  },

  componentDidMount() {
    const {post} = this.state;
    this.addSyntaxHighlighting();
    if (post) {
      this.linkPostStylesheet(post);
    }
  },

  componentDidUpdate() {
    const {post} = this.state;
    this.addSyntaxHighlighting();
    if (post) {
      this.linkPostStylesheet(post);
    }
  },

  addSyntaxHighlighting() {
    const postHtml = this.state.post.body;
    const highlightLibJs = '//cdn.jsdelivr.net/highlight.js/9.8.0/highlight.min.js';
    const highlightLibCss = '//cdn.jsdelivr.net/highlight.js/9.8.0/styles/agate.min.css';
    const codeTags = !! postHtml.match('<code');
    const hljsAlreadyLoaded = window.hasOwnProperty('hljs');

    if (hljsAlreadyLoaded) {
      // see http://stackoverflow.com/questions/13094541/how-to-reinitialize-highlight-js
      hljs.initHighlighting.called = false;
      return hljs.initHighlighting();
    }

    if (codeTags) {
      const linkTag = document.createElement('link');
      linkTag.href = highlightLibCss;
      linkTag.rel = 'stylesheet';
      document.getElementsByTagName('head')[0].appendChild(linkTag);
      const scriptTag = document.createElement('script');
      scriptTag.src = highlightLibJs;
      document.body.appendChild(scriptTag);
      // Init highlight.js
      scriptTag.onload = () => {
        hljs.initHighlighting();
      }
    }
  },

  linkPostStylesheet ({slug}) {
    const alreadyLinked = !! document.querySelector('[href^="/api/posts/${slug}/css"]');
    if (alreadyLinked) {
      return;
    }
    const cssLocation = `/api/posts/${slug}/css`;
    const linkTag = document.createElement('link');
    linkTag.className = 'temporary-element';
    linkTag.href = cssLocation;
    linkTag.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(linkTag);
  },

  getPostData (slug) {
    const postUrl = `/api/posts/${slug}`;
    const postReq = fetch(postUrl);
    return postReq.then(res => res.json());
  },

  render () {
    const {post} = this.state;
    if (! post) {
      return null;
    }

    return (
      <div
        className={`${post.slug} post-view`}>
        <WritingMenu/>
        <main className="post-view__content">
          <header className={`post-view__header post-header`}>
            <div className="post-view__header-main">
              <h1>{post.title}</h1>
            </div>
            <div className="post-view__header-sub">
              <ul className="post-view__post-meta meta-list">
                <li className="meta-list__item meta-list__item--date">{post.friendlyDate}</li>
                <li className="meta-list__item meta-list__item--read-time">{post.readingTime} minutes</li>
              </ul>
            </div>
          </header>
          <div
            dangerouslySetInnerHTML={{__html: post.body}}
            className="post-view__body post-body">
          </div>
        </main>
        <div className="post-view__hud-bar post-hud">
          <div className="post-view__hud-progress post-progress"></div>
        </div>
      </div>
    )
  }
})

export default Post
