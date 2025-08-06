import { useState } from 'react'
import './App.css'

function App() {
  // const stateVar = useState(0);
  // const count = stateVar[0];
  // const setCount = stateVar[1];

  const [count, setCount] = useState(0); //hook - uses destructuring

  return (
    <div>
      <Button count={count} setCount={setCount} />
    </div>
  );
}

function Button(props){
  function onButtonPress(){
    props.setCount(props.count + 1);
  }
  return <button onClick={onButtonPress}>Counter {props.count}</button>
}

export default App
