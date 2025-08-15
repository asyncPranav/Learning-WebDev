import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';

export default function Counter() {
  const count = useSelector((state) => state.counter.value); // read from store
  const dispatch = useDispatch(); // send actions to store
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <h3>Redux Toolkit Counter</h3>
      <hr />
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <br /><br />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={() => dispatch(incrementByAmount(amount))}>
        Add Amount
      </button>
    </div>
  );
}
