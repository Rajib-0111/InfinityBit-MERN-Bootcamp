import { useState } from 'react';
import './app.css'

function App() {
  let [counterVal, setCounter] = useState(0);

  const valIncrement = () => {
    counterVal += 1;
    setCounter(counterVal);
  }
  const valDecrement = () => {
    counterVal -= 1;
    setCounter(counterVal);
  }

  const valReset = () => {
    setCounter(0);
  }

  return (
    <div className="counterarea">
      <h2 className='valplace'>Counter Value</h2>
      <span className='counterval'>{counterVal}</span>
      <div className='main-btn-area'>
        <button className='btn' onClick={valIncrement}>Increment ➕</button>
        <button className='btn' onClick={valDecrement}>Decrement ➖</button>
      </div>
      <button className='btn' onClick={valReset}>Reset 🚫</button>
    </div>
  )
}

export default App
