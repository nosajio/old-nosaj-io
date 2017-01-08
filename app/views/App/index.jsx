import React, { PropTypes } from 'react'

const App = React.createClass({
  render () {
    const {children} = this.props;

    if (! children) {
      return (
        <div className="not-found">
          Can't find that. lollololll
        </div>
      )
    }

    return (
      <div>
        {React.cloneElement(children)}
      </div>
    )
  }
})

export default App
