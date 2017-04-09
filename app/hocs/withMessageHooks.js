import React, { Component } from 'react';
import api from '../services/api-service';

export default (InnerComponent) => (
  class WithMessageHooks extends Component {
    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <InnerComponent 
          sendMessage={this.sendMessage}
          {...this.props}
        />
      );
    }
    
    async sendMessage(theMessage) {
      const { sent } = await api.request({
        method: 'post',
        path: '/messages',
        body: {
          message: theMessage,
        }
      });
      return sent;
    }
  }
)
