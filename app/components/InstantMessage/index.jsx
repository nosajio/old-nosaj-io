import React, { PropTypes } from 'react'

import './instantMessage.scss';

const InstantMessage = (props) => {
  const {onMessageChange, onClose} = props;
  const defaultValue = `Psst... If you want me to get back to you, don't forget to leave an email address 😁`;

  return (
    <section className="instant-message">
      <div className="instant-message__main">
        <div
          className="instant-message__close"
          onClick={onClose}>Close this</div>
        <textarea
          className="instant-message__textarea"
          defaultValue={defaultValue}
          onChange={onMessageChange}></textarea>
        <button className="instant-message__send-btn">Send it</button>
      </div>
    </section>
  )
}

export default InstantMessage
