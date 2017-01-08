import React, { PropTypes } from 'react'

const WritingMenu = React.createClass({
  contextTypes: {
    router: PropTypes.object,
  },

  getInitialState () {
    return {
      posts: null,
      active: false,
    }
  },

  componentWillMount () {
    this.getPostsData()
      .then(posts => this.setState({posts}))
  },

  getPostsData () {
    const postsUrl = `/api/posts`;
    const postsReq = fetch(postsUrl);
    return postsReq.then(res => res.json());
  },

  gotoPost (post) {
    this.context.router.push({
      pathname: `/${post.slug}`,
      state: post,
    });
  },

  handleActivate (event) {
    this.setState({active: true})
  },

  listItemEl (post, index) {
    return (
      <li
        key={index}
        className="writing-menu__list-item"
        onClick={this.gotoPost.bind(this, post)}>
        <h3>{post.title}</h3>
        <span>{post.friendlyDate} {post.readingTime} min</span>
      </li>
    )
  },

  render () {
    const {posts, active} = this.state;

    if (! posts) {
      return null;
    }

    return (
      <div className={`writing-menu ${active ? 'is-active' : ''}`} onClick={this.handleActivate}>
        <div className="writing-menu__toggle" onClick={this.handleActivate}>All Posts</div>
        <div className="writing-menu__main">
          <ol className="writing-menu__list">
            {posts.map(this.listItemEl)}
          </ol>
        </div>
      </div>
    )
  }
})

export default WritingMenu;
