import React, { Component } from 'react'
import { connect } from 'react-redux'

class Backstage extends Component {
  render () {
    let { session, games, questions, responses } = this.props
    let game = games.get(session.get('gameId').toString())

    let gameQuestions =
      game.get('questionIds').toArray().map(i => questions.get(i.toString()))

    return (
      <li style={{border: '1px solid #ccc'}}>
        <h1>Live Results: {game.get('title')}</h1>

        <ul>
          {gameQuestions.map((q, i) => <li key={i}>
            <h2>{q.get('title')}</h2>
              <ul>
                {q.get('responseIds').toArray().map(i => responses.get(i.toString())).map((r, i) => <li key={i}>
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

Backstage.propTypes = {
  session: React.propTypes.object.isRequired,
  games: React.propTypes.object.isRequired,
  questions: React.propTypes.object.isRequired,
  responses: React.propTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    session: state.getIn(['sessions', ownProps.params.id]),
    games: state.get('games'),
    questions: state.get('questions'),
    responses: state.get('responses')
  }
}

export default connect(mapStateToProps)(Backstage)
