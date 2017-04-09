import React, { PropTypes } from 'react';

import './button.scss';

const Button = (props) => {
  const elementType = props.href ? 'a' : 'button';
  return React.createElement(elementType, Object.assign({}, props, { className: `button ${props.className}`}), props.children);
};

Button.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
