import React, { PropTypes } from 'react'

import LoadingDots from '../LoadingDots';
import './instantMessage.scss';

let messageValue = '';
let focusTimer = null

const InstantMessage = (props) => {
  const {onMessageChange, onSend, onClose, isSent, isSending} = props;
  const defaultValue = `Psst... If you want me to get back to you, don't forget to leave an email address 😁`;

  const focusTextarea = textarea => {
    if (! textarea) return;
    if (!! focusTimer) {
      clearTimeout(focusTimer);
    }
    focusTimer = setTimeout(() => {
      if (textarea.value === defaultValue) {
        textarea.focus();
        textarea.select();
      }
    }, 900);
  }

  const handleMessageChange = event => {
    messageValue = event.target.value;
    onMessageChange(event);
  };

  const messageValid = (messageValue !== defaultValue) && (messageValue !== '');

  const messageMainUi = (
    <div className="instant-message__main">
      <div
        className="instant-message__close"
        onClick={onClose}>Close this</div>
      <textarea
        className="instant-message__textarea"
        ref={focusTextarea}
        defaultValue={defaultValue}
        onChange={handleMessageChange}></textarea>
      {isSending ? (
        <button className="instant-message__send-btn instant-message__send-btn--sending"><LoadingDots/></button>
      ) : messageValid ? (
          <button className="instant-message__send-btn" onClick={onSend}>Send it</button>
        ) : (
          <button className="instant-message__send-btn">Enter a message...</button>
        )
      }
    </div>
  );

  const messageSentUi = (
    <div className="instant-message__sent">
      <div className="instant-message__emoji">✌️️</div>
      <h1>Your message has made it to my inbox!</h1>
        <div
          className="instant-message__close"
          onClick={onClose}>Close this</div>
    </div>
  );

  return (
    <section className={`instant-message ${isSent ? 'instant-message--sent' : ''} ${messageValid ? '' : 'instant-message--invalid'}`}>
      {isSent ? messageSentUi : messageMainUi}
    </section>
  )
}

export default InstantMessage
