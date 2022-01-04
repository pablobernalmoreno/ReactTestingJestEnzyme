import './App.css';
import { useState } from 'react';

function App() {

  const [count, setCount] = useState(0)
  const [error, setError] = useState(false)

  const increment = () => {
    setError(false)
    setCount(count + 1)
  }

  const decrement = () => {
    if (count <= 0) {
      setError(true)
    }
    else {
      setCount(count - 1)
    }
  }

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">The counter is currently&nbsp;
        <span data-test="count">{count}</span>
      </h1>
      {error && <h2 data-test="error-message" style={{ color: "red" }}>Counter cant go below zero</h2>}
      <button data-test="increment-button" onClick={increment}>Increment counter</button>
      <button data-test="decrement-button" onClick={decrement}>Decrement counter</button>
    </div>
  );
}

export default App;
