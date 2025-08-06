import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function onButtonPress(){
    setCount(count+1);
  }

  return (
    <div>
      <Button count={count} onClickHandler={onButtonPress}/>
    </div>
  );
}

function Button(props){
  return(
    <button onClick={props.onClickHandler}>Counter {props.count}</button>
  );
}

export default App
