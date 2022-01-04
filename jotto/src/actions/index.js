import axios from 'axios'

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD'
}

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action
 * and (conditionally) CORRECT_GUESS action
 * @param {string} guessWord -Guessed word
 * @returns {function}
 */
export const guessWord = (guessWord) => {
  return function (dispatch, getState) {

  }
}

export const getSecretWord = () => {
  return axios.get('http://localhost:3030').then(response => response.data)
}