import React from 'react';

import './footer.scss';

const Footer = () => (
  <footer className="the-footer">
    <ul className="footer-list">
      <li className="footer-list__item">
        <a href="https://github.com/nosajj" target="_blank">GitHub</a>
      </li>
      <li className="footer-list__item">
        <a href="https://twitter.com/jhwmns" target="_blank">Twitter</a>
      </li>
      <li className="footer-list__item">
        <a href="mailto:Jason Howmans<jason+www@nosaj.io>" target="_blank">Email</a>
      </li>
    </ul>
  </footer>
);

export default Footer;
