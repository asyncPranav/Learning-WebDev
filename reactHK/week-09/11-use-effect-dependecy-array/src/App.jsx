import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div>
      <Counter count1={count1} count2={count2} />
      <br />
      <button onClick={() => setCount1(count1 + 1)}>Increase Counter1</button>
      <button onClick={() => setCount2(count2 - 1)}>Decrease Counter2</button>
    </div>
  );
}

function Counter({ count1, count2 }) {
  useEffect(() => {
    console.log("mount");

    return () => {
      console.log("unmount");
    };
  }, []);

  useEffect(() => {
    console.log("counter-1 has been changed");

    return () => {
      console.log("cleanup inside second useEffect")
    }
  }, [count1]);

  // useEffect(() => {
  //   console.log("both counter has been changed");
  // }, [count1, count2]);

  return (
    <div>
      Counter1 : {count1} <br />
      Counter2 : {count2} <br />
    </div>
  );
}

export default App;
