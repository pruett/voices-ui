import React from 'react/addons'
import { connect } from 'react-redux'
import { Map, fromJS } from 'immutable'

const Question = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  render () { 
    return (
      <li style={{background: '#ccc', padding: '1rem', margin: '1rem'}}>
        {this.props.children}
      </li>
    )
  }
})

const Response = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  render() {
    return (
      <li>
        {this.props.children}
      </li>
    )
  }
})

const GAME = {
  title: 'Enter question text...',
  response: fromJS({ text: '', correct: false }) 
}

const Questions = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  createQuestion () {
    let title = GAME.title
    let response = GAME.response

    return fromJS({
      title: title,
      responses: [response.set('correct', true), response]
    })
  },

  getInitialState () {
    return { questions: fromJS([this.createQuestion(), this.createQuestion()]) }
  },

  addQuestion () {
    this.setState(({questions}) => ({
      questions: questions.push(this.createQuestion())
    }))
  },

  handleTitleChange (i, event) {
    let target = event.target
    this.setState(({questions}) => ({
      questions: questions.setIn([i, 'title'], target.value)
    }))
  },

  removeQuestion (i) {
    this.setState(({questions}) => ({
      questions: questions.remove(i)
    }))
  },

  handleMarkCorrect (q_index, r_index) {
    this.setState(({questions}) => ({
      questions: questions.updateIn([q_index, 'responses'], (responses) =>
        responses.map((obj, i) => {
          if ( i === r_index ) {
            return obj.set('correct', true)
          } else {
            return obj.set('correct', false)
          }
        })
      )
    }))
  },

  handleResponseChange (q_index, r_index, event) {
    let target = event.target
    this.setState(({questions}) => ({
      questions: questions.setIn([q_index, 'responses', r_index, 'text'], target.value)
    }))
  },

  removeResponse (q_index, r_index) {
    this.setState(({questions}) => ({
      questions: questions.deleteIn([q_index, 'responses', r_index])
    }))
  },

  addResponse (i) {
    this.setState(({questions}) => ({
      questions: questions.updateIn([i, 'responses'], (responses) =>
        responses.push(GAME.response)
      )
    }))
  },

  render() { 
    return (
      <div>
        <button onClick={this.addQuestion}>Add Question</button>
        <h2>Questions</h2>
        <ol>
          {this.state.questions.map((question,
index) => {
            return (
              <Question key={index}>
                <h3>Question #{index+1}: {question.get('title')}</h3>

                <button
                  onClick={this.removeQuestion.bind(this, index)}
                >delete me</button>

                <input type="text"
                  value={question.get('title')}
                  onChange={this.handleTitleChange.bind(this, index)}
                />

                <ul>
                  {question.get('responses').map((response, i) => {
                    return (
                      <Response key={i}>

                        <input type="radio"
                          checked={response.get('correct')}
                          onChange={this.handleMarkCorrect.bind(this, index, i)}
                        />

                        <input type="text"
                          value={response.get('text')}
                          onChange={this.handleResponseChange.bind(this, index, i)}
                        />

                        <button
                          onClick={this.removeResponse.bind(this, index, i)}
                        >x</button>
                      </Response>
                    )
                  })}
                </ul>

                <button
                  onClick={this.addResponse.bind(this, index)}
                >add response</button>

              </Question>
            )
          })}
        </ol>
        <button>Save game</button>
      </div>
    )
  }

})

function mapStateToProps(state) {
  return {
    questions: state.get('questions')
  }
}

export const QuestionsContainer = connect(mapStateToProps)(Questions)
