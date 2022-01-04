import { useEffect } from 'react';
import { getSecretWord } from './actions';
import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input'

function App() {
  const success = false
  const secretWord = 'party'
  const guessedWords = []

  useEffect(() => {
    getSecretWord()
  }, [])

  return (
    <div data-test='component-app' className="App">
      <h1>Jotto</h1>
      <Congrats success={true} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={[{ guessedWord: "train", letterMatchCount: 3 }]} />
    </div>
  );
}

export default App;
