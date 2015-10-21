import { getNextId } from './utils'

export const SET_STATE = 'SET_STATE'
export const ADD_GAME = 'ADD_GAME'
export const UPDATE_GAME_TITLE = 'UPDATE_GAME_TITLE'
export const UPDATE_QUESTION_TITLE = 'UPDATE_QUESTION_TITLE'
export const UPDATE_RESPONSE_TEXT = 'UPDATE_RESPONSE_TEXT'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_RESPONSE = 'ADD_RESPONSE'
export const SAVE_GAME = 'SAVE_GAME'
export const CREATE_SESSION = 'CREATE_SESSION'
export const VOTE = 'VOTE'

export let setState = (state) => ({
  type: SET_STATE,
  state
})

let addGame = (id, questions) => ({
  type: ADD_GAME,
  id,
  questions,
  meta: {
    transition: (state, action) => ({
      path: '/game/new',
      state: { id },
      replace: true
    })
  }
})

export let updateGameTitle = (id, text) => ({
  type: UPDATE_GAME_TITLE,
  id,
  text
})

export let updateQuestionTitle = (id, text) => ({
  type: UPDATE_QUESTION_TITLE,
  id,
  text
})

export let updateResponseText = (id, text) => ({
  type: UPDATE_RESPONSE_TEXT,
  id,
  text
})

let addQuestion = (id, responses) => ({
  type: ADD_QUESTION,
  id,
  responses
})

let addResponse = (id, isCorrect) => ({
  type: ADD_RESPONSE,
  id,
  isCorrect
})

export let createNewGame = (id) => (dispatch, getState) => {
  let nextGameId = id
  let nextQuestionId = getNextId('questions', getState())
  let nextResponseId = getNextId('responses', getState())

  // create two questions - each with 2 responses
  dispatch(addQuestion(nextQuestionId, [nextResponseId + 0, nextResponseId + 1]))
  dispatch(addQuestion(nextQuestionId + 1, [nextResponseId + 2, nextResponseId + 3]))
  dispatch(addResponse(nextResponseId + 0, true))
  dispatch(addResponse(nextResponseId + 1, false))
  dispatch(addResponse(nextResponseId + 2, true))
  dispatch(addResponse(nextResponseId + 3, false))

  // create a new game with those questions/responses
  dispatch(addGame(nextGameId, [nextQuestionId, nextQuestionId + 1]))
}

export let saveGame = () => (dispatch, getState) => {
  dispatch({
    type: SAVE_GAME,
    state: getState(),
    meta: {
      remote: true,
      transition: (state, action) => ({
        path: '/',
        replace: true
      })
    }
  })
}

export let createSession = (id) => ({
  meta: { remote: true },
  type: CREATE_SESSION,
  id
})

export let vote = (sessionId, questionId, responseId) => ({
  meta: { remote: true },
  type: VOTE,
  sessionId,
  questionId,
  responseId
})
