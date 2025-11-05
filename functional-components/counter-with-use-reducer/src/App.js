import React, { useReducer } from 'react';
import './App.css';

// ۱. حالت اولیه
const initialState = { count: 0 };

// ۲. تابع Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function App() {
  // ۳. استفاده از useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="counter-container">
      <h1>Counter with useReducer</h1>
      <div className="count">Count: {state.count}</div>
      <div className="buttons">
        <button onClick={() => dispatch({ type: 'increment' })}>Plus</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>Minus</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    </div>
  );
}

export default App;