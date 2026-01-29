import { useState } from "react";
import Student from "./Student";
import Input from "./Input";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Counter count={count} setCount={setCount} />
    </div>
  );
};

const Counter = ({ count, setCount }) => {
  // function increment() {
  //   setCount(count + 1);
  // }

  // const increment = () => {
  //   return setCount(count + 1)
  // }

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}><b>Increment</b></button>
      <button onClick={decrement}><b>Decrement</b></button>
      <button onClick={reset}><b>Reset</b></button>
      <br />
      <br />
      <hr />
      <Student />
      <br />
      <br />
      <hr />
      <Input />
    </div>
  );
};

export default App;
