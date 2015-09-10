import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header'

import 'normalize.css'
import '../../components/App/styles/base.css'

class App extends React.Component {
  render() {
    const { fetching, dispatch } = this.props
    return (
      <div>
        <Header />
        { fetching ? <h1>loading...</h1> : this.props.children }
      </div>
    )
  }
}

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  fetching: React.PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return { fetching: state.get('fetching') }
}

export default connect(mapStateToProps)(App);
