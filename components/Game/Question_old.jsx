import React from 'react'

export default React.createClass({

  render () { 
    return (
      <div style={{background: '#ccc', padding: '1rem', margin: '1rem'}}>
        {this.props.children}
      </div>
    )
  }

})
