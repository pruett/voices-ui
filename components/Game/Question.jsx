import React from 'react'

export default React.createClass({
  render () {
    let { question, actions } = this.props
    return (
      <li>
        <h3>{question.get('title')}</h3>
        {this.props.children}
      </li>
    )
  }
})
