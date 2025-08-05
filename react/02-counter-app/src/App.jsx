import { useState } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
  let [count, setCount] = useState(0);

  function incrementCount() {
    // setCount((count += 1));
    setCount(count + 1);
  }
  function decrementCount() {
    // setCount((count -= 1));
    setCount(count - 1);
  }
  function resetCount() {
    // setCount((count = 0));
    setCount(0);
  }

  return (
    <div>
      <h1>Counter App</h1>
      <p>Count : {count}</p>

      <div className="buttons">
        {/* <button onClick={incrementCount}>➕ Increment</button>
        <button onClick={decrementCount}>➖ Decrement</button>
        <button onClick={resetCount}>®️ Reset</button> */}

        <Button title="➕ Increment" func={incrementCount} />
        <Button title="➖ Decrement" func={decrementCount} />
        <Button title="®️ Reset" func={resetCount} />
      </div>
    </div>
  );
}

/* function Button(props) {
  return <button onClick={props.func}>{props.title}</button>;
} */

export default App;
