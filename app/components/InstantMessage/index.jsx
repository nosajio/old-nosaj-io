import React, { PropTypes } from 'react'

import './instantMessage.scss';

const InstantMessage = (props) => {
  const {onMessageChange, onSend, onClose} = props;
  const defaultValue = `Psst... If you want me to get back to you, don't forget to leave an email address 😁`;

  const focusTextarea = textarea => {
    if (! textarea) return;
    if (textarea.value === defaultValue) {
      textarea.focus();
      textarea.select();
    }
  }

  return (
    <section className="instant-message">
      <div className="instant-message__main">
        <div
          className="instant-message__close"
          onClick={onClose}>Close this</div>
        <textarea
          className="instant-message__textarea"
          ref={focusTextarea}
          defaultValue={defaultValue}
          onChange={onMessageChange}></textarea>
        <button className="instant-message__send-btn" onClick={onSend}>Send it</button>
      </div>
    </section>
  )
}

export default InstantMessage
