import React from 'react'

export default class Question extends React.Component {
  render () {
    let { question } = this.props

    return (
      <li>
        <h3>{question.get('title')}</h3>
        {this.props.children}
      </li>
    )
  }
}

Question.propTypes = {
  question: React.PropTypes.object.isRequired,
  children: React.PropTypes.node.isRequired
}

