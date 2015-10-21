import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions'

class GameCreate extends React.Component {
  componentWillMount () {
    if (!this.props.location.state ||
      !this.props.location.state.id ||
      this.props.game === undefined
    ) {
      console.log('redirect back to dashboard as you didnt go through the correct path, but for now, just create the game')
        // this.props.actions.createNewGame(this.props.location.state.id)
    }
  }

  updateGameTitle = (id, actions, e) => {
    actions.updateGameTitle(id, e.target.value)
  }

  addQuestion = (id, actions) => {
    actions.addQuestion(id)
  }

  updateQuestionTitle = (id, actions, e) => {
    actions.updateQuestionTitle(id, e.target.value)
  }

  updateResponseText = (id, actions, e) => {
    actions.updateResponseText(id, e.target.value)
  }

  saveGame = (id, actions) => {
    actions.saveGame(id)
  }

  render () {
    let { game, questions, responses, actions } = this.props
    let { id } = this.props.location.state

    return (
      <div>
        <code>
          <b>Note</b>: This is an example of how to create a game; currently there is no add additional question/response buttons, but those are fairly trivial to add; This demo is meant to allow you to create a game, give it a title, define questions/responses and save the game. You should see it on your "Dashboard", to play and edit.
        </code>
        <h1>{game.get('title') ? game.get('title') : '[new game]'}</h1>

        <label htmlFor='gameTitle'>Title</label><br/>
        <input type='text'
               id='gameTitle'
               onChange={this.updateGameTitle.bind(this, id, actions)} />

        <hr/>
        <ul>
          {game.get('questionIds').map(i =>
            questions.get(i.toString())).map((question, qindex) => (
              <li key={question.get('id')}>
                <h2>{question.get('title') ? question.get('title') : '[enter question text]'}</h2>
                <label htmlFor={`question${question.get('id')}`}>Question #{qindex + 1}</label><br/>
                <input type='text'
                       id={`question${question.get('id')}`}
                       onChange={this.updateQuestionTitle.bind(this, question.get('id'), actions)} />
                <ul>
                  {question.get('responseIds').map(i =>
                    responses.get(i.toString())).map((response, rindex) => (
                      <li key={response.get('id')}>
                        <label htmlFor={`response${response.get('id')}`}>Response #{rindex + 1}</label><br/>
                        <input type='radio'
                          checked={response.get('correct')}
                        />
                        <input
                          type='text'
                          id={`response${response.get('id')}`}
                          onChange={this.updateResponseText.bind(this, response.get('id'), actions)}
                        />
                      </li>
                    ))
                  }
                </ul>
                <hr />
              </li>
            ))
          }
        </ul>
        <hr />
        <button onClick={this.saveGame.bind(this, id, actions)}>Save and Exit</button>
      </div>
    )
  }
}

GameCreate.propTypes = {
  location: React.PropTypes.object,
  game: React.PropTypes.object.isRequired,
  questions: React.PropTypes.object.isRequired,
  responses: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    game: state.getIn(['games', ownProps.location.state.id.toString()]),
    questions: state.get('questions'),
    responses: state.get('responses')
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCreate)
