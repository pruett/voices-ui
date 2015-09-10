import React from 'react/addons'
import Question from '../../components/Game/Question'
import { expect } from 'chai'

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = React.addons.TestUtils

describe('Question', () => {
  it('renders a remove button', () => {
    const questions = [{
      title: 'Enter a question...',
      responses: [{text: ''}, {text: ''}]
    }] 
    const component = renderIntoDocument(
      <Question questions={questions} />
    )
    const button = scryRenderedDOMComponentsWithTag(component, 'button') 
    expect(button.getDOMNode().textContent.to.equal('delete me')
  })
})

