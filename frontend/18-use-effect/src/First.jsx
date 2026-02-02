import { useState, useEffect } from "react";

const First = () => {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log("Run on every render");
  // });


  // useEffect(() => {
  //   console.log("Run only on first render / component mount");
  // }, []);


  // useEffect(() => {
  //   console.log("Run when 'count' changes");
  // }, [count]);


  // Updating document title based on count state
  useEffect(() => {
    document.title = `Count: ${count}`;
    // We can perform any DOM side effects here
    // For example, updating the document title and logging to console
    // Lets see another example rather than just logging
    document.body.style.backgroundColor = count % 2 === 0 ? 'lightblue' : 'lightgreen';
    document.body.style.color = count % 2 === 0 ? 'darkblue' : 'darkgreen';
    
    console.log("Run when 'count' changes");
  }, [count]);


  // We can use multiple useEffect hooks in a single component.
  // We can also perform cleanup in useEffect by returning a function.

  useEffect(() => {
    console.log("Run when 'count' changes with cleanup");
    return () => {
      console.log("Cleanup on component unmount or before next effect run");
    };
  }, [count]);

  return (
    <div>
      <h2>Count : {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
export default First;
