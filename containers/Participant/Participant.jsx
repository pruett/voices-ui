import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions'

class Participant extends React.Component {
  vote = (gameId, questionId, responseId, actions) => { //eslint-disable-line
    actions.vote(gameId, questionId, responseId)
  }

  render () {
    let { session, games, questions, responses, actions } = this.props
    let game = games.get(session.get('gameId').toString())

    let gameQuestions =
      game.get('questionIds').toArray().map(i => questions.get(i.toString()))

    return (
      <li style={{border: '1px solid #ccc'}}>
        <h1>Game #{game.get('id')}: {game.get('title')}</h1>
        <code>
          Testing purposes: Open the backstage view in another browser window side-by-side while "playing" (i.e. voting). You'll notice that the backstage view updates without refresh indicating that the websocket connection on the server is live and in sync.
        </code>

        <p>
          <Link to={`/backstage/${session.get('id')}`} target='_blank'>backstage view</Link>
        </p>

        <ul>
          {gameQuestions.map((q, i) =>
            <li key={i}>
              <h2>{q.get('title')}</h2>
              <ul>
                {q.get('responseIds').toArray().map(i => responses.get(i.toString())).map((r, i) =>
                  <li key={i}>
                    <p>{r.get('text')}
                      <span> --- {session.getIn(
                        [
                          'votes',
                          q.get('id').toString(),
                          r.get('id').toString()
                        ]
                        )}
                      </span>
                    </p>
                    <button onClick={this.vote.bind(this, session.get('id'), q.get('id'), r.get('id'), actions)}>vote</button>
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>
      </li>
    )
  }
}

Participant.propTypes = {
  session: React.PropTypes.object.isRequired,
  games: React.PropTypes.object.isRequired,
  questions: React.PropTypes.object.isRequired,
  responses: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    session: state.getIn(['sessions', ownProps.params.id]),
    games: state.get('games'),
    questions: state.get('questions'),
    responses: state.get('responses')
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Participant)
