/* global __DEVTOOLS__ */
import 'babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Map } from 'immutable'
import { Provider } from 'react-redux'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import { setState } from '../actions'
import configureStore from '../store/configureStore'
import { socket } from './websocket'
import getRoutes from './routes'

const store = configureStore(Map({ fetching: true }))
const rootElement = document.querySelector('main')

socket.on('state', state =>
  store.dispatch(setState(state))
)

ReactDOM.render(
  <Provider store={store}>
    {getRoutes(store)}
  </Provider>, rootElement
)

if (__DEVTOOLS__) {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        {getRoutes(store)}
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    </Provider>, rootElement
  )
}
