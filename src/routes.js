import React from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router'
import history from './history'
import {
  App,
  Dashboard,
  Game,
  GameCreate,
  Participant,
  Backstage,
  NotFound
} from '../containers'

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    // authentication logic using store.getState()

    // here we'll mock user fails auth
    // and redirect them home
    replaceState(null, '/') 
    cb()
  }

  return (
    <Router history={history}>
      <Route path="/" component={App}>
        { /* Home (main) route */ }
        <IndexRoute component={Dashboard}/>

        { /* Routes requiring login */ }
        <Route onEnter={requireLogin}>
          <Route path="restricted" component={Dashboard} />
        </Route>

        { /* Routes */ }
        <Route path="backstage/:id" component={Backstage} />
        <Route path="game/new" component={GameCreate} />
        <Route path="game/edit/:id" component={Game} />
        <Route path="play/:id" component={Participant} />

        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404} />
      </Route>
    </Router>
  )
}
