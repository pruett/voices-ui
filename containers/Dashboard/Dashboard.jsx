import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions'
import styles from '../../components/Dashboard/styles/Dashboard.css'

class Dashboard extends Component {
  createNewGame = (id, actions) => // eslint-disable-line
    actions.createNewGame(id)

  createSession = (id, actions) => // eslint-disable-line
    actions.createSession(id)

  render () {
    const { nextGameId, games, sessions, actions } = this.props

    return (
      <div className={styles.container}>
        <h2>Dashboard</h2>
        <button onClick={this.createNewGame.bind(this, nextGameId, actions)}>Create Game</button>

        <h3>Your Games</h3>
        <ul>
          {games.toArray().map((game, gindex) => (
            <li key={gindex}>
              <h2>Name: {game.get('title')}</h2>
              <h3>Sessions</h3>
              <button onClick={this.createSession.bind(this, game.get('id'), actions)}>Create New Session</button>

              <ul>
                {game.get('sessionIds').map(i =>
                  sessions.get(i.toString())).map((session, sindex) => (
                    <li key={sindex}>
                      <Link to={`/play/${session.get('id')}`}>play</Link>&nbsp;|&nbsp;
                      <Link to={`/backstage/${session.get('id')}`}>backstage</Link>
                    </li>
                  ))
                }
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

Dashboard.propTypes = {
  nextGameId: React.PropTypes.number.isRequired,
  games: React.PropTypes.object.isRequired,
  sessions: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
}

let nextGameId = (state) =>
  state.get('games')
    ? parseInt(Object.keys(state.get('games').toJS()).sort((a, b) => b > a)[0], 10) + 1
    : 1

function mapStateToProps (state) {
  return {
    nextGameId: nextGameId(state),
    games: state.get('games'),
    sessions: state.get('sessions')
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
