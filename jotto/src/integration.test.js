import { storeFactory } from "./test/testUtils";
import { guessWord } from './actions'

describe('guessWord action dispatcher', () => {
  const secretWord = 'party'
  const unsuccesfulGuess = 'train'
  describe('no guess words', () => {
    let store
    const initialState = { secretWord }
    beforeEach(() => {
      store = storeFactory(initialState)
    })

    test('updates state correctly for unsuccesful guess', () => {
      store.dispatch(guessWord(unsuccesfulGuess))
      const newState = store.getState()
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [{
          guessWord: unsuccesfulGuess,
          letterMatchCount: 3
        }]
      }
      expect(newState).toEqual(expectedState)
    })

    test('updates state correctly for succesful guess', () => {

    })
  })

  describe('no guess words', () => {
    test('updates state correctly for unsuccesful guess', () => {

    })

    test('updates state correctly for succesful guess', () => {

    })
  })
})