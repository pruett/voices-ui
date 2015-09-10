import React from 'react'
import Customize from './Customize'
import { QuestionsContainer } from './Questions'

export default React.createClass({
render() { 
  return (
    <div>
      <h1>Create New Game</h1>
      <Customize />
      <QuestionsContainer />
    </div>
  )
}
})
