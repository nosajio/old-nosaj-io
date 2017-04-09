import React, { PropTypes } from 'react';
import IsLoading from '../components/IsLoading';
import api from '../services/api-service';

export default (WrappedComponent) => (
  class PostGetter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        post: null,
      };
    }
    
    static propTypes = {
      params: PropTypes.object,
      data: PropTypes.object,
    }
    
    async componentWillMount() {
      const { slug } = this.props.params;
      const post = await api.request(({
        path: `posts/${slug}`,
      }));
      this.setState({ post });
      this.props.data.setActivePost(post);
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
  }
);
