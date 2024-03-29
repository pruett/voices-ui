import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Question from '../../components/Game/Question'
import Response from '../../components/Game/Response'
import * as actionCreators from '../../actions'

const RenderSurveyQuestions = ({ questions, responses, actions }) => (
  <ul>
    {questions.map((question, qindex) => (
      <Question key={qindex} question={question} actions={actions}>
        <ul>
          {question.get('responseIds').toArray().map(i => responses.get(i.toString())).map((response, rindex) => (
            <Response key={rindex} response={response} questionId={qindex} actions={actions} />
          ))}
        </ul>
      </Question>
    ))}
  </ul>
)

class Game extends React.Component {
  render () {
    let { game, questions, responses, actions } = this.props

    return (
      <div>
        <RenderSurveyQuestions
          questions={
            game.get('questionIds').toArray().map(i => questions.get(i.toString()))
          }
          responses={responses}
          actions={actions}
        />
        <button>Save</button>
      </div>
    )
  }
}

Game.propTypes = {
  game: React.PropTypes.object.isRequired,
  questions: React.PropTypes.object.isRequired,
  responses: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    game: state.getIn(['games', ownProps.params.id.toString()]),
    questions: state.get('questions'),
    responses: state.get('responses')
  }
}

function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
