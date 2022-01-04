import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import { findByTestAttribute } from './test/testUtils'

/**
 * Create wrapper with specified initial conditions
 * then submit a guessed word for 'train'
 * @function
 * 
 * @param {object} state - Initial conditions
 * @returns {Wrapper} - Enzyme wrapper of mounted App component
 */

const setup = (state = {}) => {
  const wrapper = mount(<App />)

  const inputBox = findByTestAttribute(wrapper, 'input-box')
  inputBox.simulate('change', { target: { value: 'train' } })

  const submitButton = findByTestAttribute(wrapper, 'submit-button')
  submitButton.simulate('click', { preventDefault() { } })

  return wrapper
}

describe.skip('no words guessed', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: []
    })
  })

  test('creates GuessedWords table with one row', () => {
    const guessedWordRows = findByTestAttribute(wrapper, 'guessed-word')
    expect(guessedWordRows).toHaveLength(1)
  })
})

describe.skip('some words guessed', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }]
    })
  })

  test('adds row to guessedWords table', () => {
    const guessedWordNodes = findByTestAttribute(wrapper, 'guessed-word')
    expect(guessedWordNodes).toHaveLength(2)
  })
})

describe.skip('guess secret word', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }]
    })
    const inputBox = findByTestAttribute(wrapper, 'input-box')
    const mockEvent = { target: { value: 'party' } }
    inputBox.simulate('change', mockEvent)

    const submitButton = findByTestAttribute(wrapper, 'submit-button')
    submitButton.simulate('click', { preventDefault() { } })
  })

  test('adds row to guessedWords table', () => {
    const guessedWordNodes = findByTestAttribute(wrapper, 'guessed-word')
    expect(guessedWordNodes).toHaveLength(3)
  })

  test('displays congrats component', () => {
    const congrats = findByTestAttribute(wrapper, 'component-congrats')
    expect(congrats.text().length).toBeGreaterThan(0)
  })

  test('does not display input component contents', () => {
    const inputBox = findByTestAttribute(wrapper, 'input-box')
    expect(inputBox.exists()).toBe(false)

    const submitButton = findByTestAttribute(wrapper, 'submit-button')
    expect(submitButton.exists()).toBe(false)
  })
})