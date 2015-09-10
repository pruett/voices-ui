import React from 'react'

export default React.createClass({
  updateResponseText (id, actions, event) {
    actions.updateResponseText(id, event.target.value)
  },

  removeResponse (id, questionId, actions) {
    actions.removeResponse(id, questionId)
  },

  render() {
    let { response, questionId, actions } = this.props

    return (
      <li>
        <input type="text"
          value={response.get('text')}
          onChange={this.updateResponseText.bind(this, response.get('id'), actions)}
        />

        <button
          onClick={this.removeResponse.bind(this, response.get('id'), questionId, actions)}
          >x
        </button>

      </li>
    )
  }
})
