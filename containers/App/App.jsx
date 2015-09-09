import React from 'react';
import { Router, Route, Link } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

import Home from '../../components/Home/Home'
import Dashboard from '../../components/Dashboard/Dashboard'

// import base app styles
import './App.js'

export default React.createClass({
  render() {
    return (
      <div>
        <Router history={createHistory()}>
          <Route path="/" component={Home} />
          <Route path="dashboard" component={Dashboard} />
        </Router>
      </div>
    )
  }
})
