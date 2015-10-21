import React from 'react'
import { connect } from 'react-redux'
import '../../components/App/styles/base.css'
import Header from '../../components/Header/Header'
import 'normalize.css'

class App extends React.Component {
  render () {
    const { fetching } = this.props

    return (
      <div>
        <Header />
        { fetching ? <h1>loading...</h1> : this.props.children }
      </div>
    )
  }
}

App.propTypes = {
  fetching: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node.isRequired
}

function mapStateToProps (state) {
  return { fetching: state.get('fetching') }
}

export default connect(mapStateToProps)(App)
