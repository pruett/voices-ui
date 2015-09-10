import { Map, List, fromJS } from 'immutable'
import { getNextId, getRecordListValues } from '../actions/utils'
import {
  SET_STATE,
  ADD_GAME,
  UPDATE_GAME_TITLE,
  UPDATE_QUESTION_TITLE,
  UPDATE_RESPONSE_TEXT,
  ADD_QUESTION,
  ADD_RESPONSE,
} from '../actions'

export default function (state = Map(), action) {
  switch (action.type) {
  case SET_STATE:
    return state.merge(state, action.state)
  case ADD_GAME:
    return state.withMutations(state => {
      state
        .mergeIn(['games'], Map([[ action.id.toString(), Map({ }) ]]))
        .mergeIn(['games', action.id.toString()], [[ 'id', action.id ]])
        .mergeIn(['games', action.id.toString()], [[ 'title', '' ]])
        .mergeIn(['games', action.id.toString()], Map([[ 'questionIds', action.questions ]]))
        .mergeIn(['games', action.id.toString()], Map([[ 'sessionIds', List() ]]))
    })
  case UPDATE_GAME_TITLE:
    return state.setIn(['games', action.id.toString(), 'title'], action.text)
  case UPDATE_QUESTION_TITLE:
    return state.setIn(['questions', action.id.toString(), 'title'], action.text)
  case UPDATE_RESPONSE_TEXT:
    return state.setIn(['responses', action.id.toString(), 'text'], action.text)
  case ADD_QUESTION:
    return state.withMutations(state => {
      state
        .mergeIn(['questions'], Map([[ action.id.toString(), Map({ }) ]]))
        .mergeIn(['questions', action.id.toString()], [[ 'id', action.id ]])
        .mergeIn(['questions', action.id.toString()], [[ 'title', '' ]])
        .mergeIn(['questions', action.id.toString()], [[ 'responseIds', action.responses ]])
    })
  case ADD_RESPONSE:
    return state.withMutations(state => {
      state
        .mergeIn(['responses'], Map([[ action.id.toString(), Map({ }) ]]))
        .mergeIn(['responses', action.id.toString()], [[ 'text', '' ]])
        .mergeIn(['responses', action.id.toString()], [[ 'id', action.id ]])
        .mergeIn(['responses', action.id.toString()], [[ 'correct', action.isCorrect ]])
    })
  default:
    return state
  }
}
