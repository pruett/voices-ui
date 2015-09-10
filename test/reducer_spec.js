import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai'

import reducer from '../src/reducer'

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: fromJS({
        questions: [{
          title: 'Enter questions here...',
          responses: [
            { text: '', correct: true },
            { text: '', correct: false }
          ]
        }]
      })
    }

    const nextState = reducer(initialState, action)
    
    expect(nextState).to.equal(fromJS({
      questions: [{
        title: 'Enter questions here...',
        responses: [
          { text: '', correct: true },
          { text: '', correct: false }
        ]
      }]
    }))

  })

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: {
        questions: [{
          title: 'Enter questions here...',
          responses: [
            { text: '', correct: true },
            { text: '', correct: false }
          ]
        }]
      }
    }

    const nextState = reducer(initialState, action)
    
    expect(nextState).to.equal(fromJS({
      questions: [{
        title: 'Enter questions here...',
        responses: [
          { text: '', correct: true },
          { text: '', correct: false }
        ]
      }]
    }))

  })

  it('handles SET_STATE without initial state', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: {
        questions: [{
          title: 'Enter questions here...',
          responses: [
            { text: '', correct: true },
            { text: '', correct: false }
          ]
        }]
      }
    }

    const nextState = reducer(undefined, action)
    
    expect(nextState).to.equal(fromJS({
      questions: [{
        title: 'Enter questions here...',
        responses: [
          { text: '', correct: true },
          { text: '', correct: false }
        ]
      }]
    }))

  })

})
