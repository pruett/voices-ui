import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import storeEnhancer from 'redux-history-transitions'
import { history } from '../src/history'
import reducers from '../reducers'
import remoteActionMiddleware from '../middleware/remote_action_middleware'
import { socket } from '../src/websocket'

let finalCreateStore

if (process.env.NODE_ENV === 'production') {
  finalCreateStore = compose(
    applyMiddleware(
      thunk,
      remoteActionMiddleware(socket),
    ),
    storeEnhancer(history)
  )(createStore)
} else {
  finalCreateStore = compose(
    applyMiddleware(
      thunk,
      remoteActionMiddleware(socket),
      logger()
    ),
    storeEnhancer(history),
    require('redux-devtools').devTools(),
    require('redux-devtools').persistState(
      // Lets you write ?debug_session=<name>
      // in address bar to persist debug sessions
      window.location.href.match(/[?&]debug_session=([^&]+)\b/)
    )
  )(createStore);
}

export default function configureStore(initialState) {
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    })
  }

  return finalCreateStore(reducers, initialState)
}
