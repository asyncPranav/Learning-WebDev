import { useEffect, useState } from "react";

function App() {
  // conditional rendering
  const [counterVisible, setCounterVisible] = useState(true);

  useEffect(function () {
    setInterval(() => {
      setCounterVisible((prev) => !prev);
    }, 5000);
  }, []);

  return (
    <>
      <h1>Timer App</h1>
      <hr />
      {counterVisible ? <Counter /> : null}
      {/* <Counter /> */}
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  // hooking  into lifecycle events of react
  // mounting, re-rendering, unmounting

  // guard our setInterval from re-render (called only once on mount)
  useEffect(function () {
    console.log("on mount");
    let id = setInterval(() => {
      console.log("inside setInterval");

      // you cant use state varibale inside useEffect hook, since you have not passed count as dependency in dependecy array in useEffect array so you cant do it
      // setCount(count + 1);

      // method-01
      // setCount(function (current) {
      //   return current + 1;
      // });

      // method-02 (using arrow function)
      setCount((count) => count + 1);

      
    }, 1000);
    
    // cleanup
    return function () {
      console.log("on un-mount");
      clearInterval(id);
    };
    
  }, []); //dependecy array, cleanup, fetch inside useEffect

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

export default App;
