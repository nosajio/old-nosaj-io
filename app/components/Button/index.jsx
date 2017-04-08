import React, { PropTypes } from 'react';

import './button.scss';

const Button = (props) => (
  <a className="button" {...props}>{props.children}</a>
);

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
