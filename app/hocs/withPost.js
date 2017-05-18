import React, { PropTypes } from 'react';
import IsLoading from '../components/IsLoading';
import api from '../services/api-service';

export default (WrappedComponent) => (
  class PostGetter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        post: {
          slug: null,
        },
      };
    }
    
    static propTypes = {
      params: PropTypes.object,
      data: PropTypes.object,
    }
    
    async componentWillMount() {
      const { slug } = this.props.params;
      await this.updateWithPost(slug, this.props);
    }
    
    async componentWillReceiveProps(nextProps) {
      const { slug } = nextProps.params;
      // If the post is the same, don't do anything else
      if (slug === this.state.post.slug) return;
      // Otherwise, continue with updating the state
      await this.updateWithPost(slug, nextProps)
    }
    
    componentWillUpdate(nextProps, nextState) {
      // On update only, scroll to the top of the page
      if (nextState.post.slug === this.state.post.slug) return;
      window.scrollTo(0, 0);
    }
    
    render() {
      const additionalProps = {
        post: this.state.post
      };
      return (
        <IsLoading loading={this.state.post === null} done={this.state.post !== null}>
          <WrappedComponent {...this.props} {...additionalProps} />
        </IsLoading>
      )
    }
    
    async updateWithPost(slug, props) {
      const post = await api.request({
        path: `posts/${slug}`,
      });
      this.setState({ post });
      props.data.setActivePost(post);
    }
  }
);
