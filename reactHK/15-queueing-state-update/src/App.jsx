import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// ---> It will not work as expected (increase count only by 1)

/* function App() {
  const [count, setCount] = useState(0)

  function increaseCount(){
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increaseCount}>Increase count by 3</button>
    </div>
  )
} */

/*

  🧠 The Core Idea: How React Updates State

    In React:
    When you call setState() (e.g., setCount(...)), the update doesn’t happen instantly.
    Instead, React schedules it, and may combine (batch) multiple state updates to improve performance.
          
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

    Why this fails:
    - count does not change immediately after calling setCount.
    - All three lines above use the same value of count (let’s say 0), so it ends up only setting it to 1 at the end.

    You might expect the count to go up by 3, right?
    But React will batch(combine) these calls and treat them as:

    setCount(1);
    setCount(1);
    setCount(1);

    Because count was still 0 during all three calls. So you'll only get +1 instead of +3.


  ✅ The Fix: Use the Functional Form

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

    This works correctly because:
    React calls your function one at a time, using the most recent value each time.
    So it becomes:

    prev = 0 → 1
    prev = 1 → 2
    prev = 2 → 3

  🧠 Optional Tip (for deeper understanding):

    Each setCount(prev => prev + 1) gets queued, and React ensures that:

    - The first one uses count = 0,
    - The second one uses count = 1,
    - The third one uses count = 2 → so the final count is 3.

    This only works because you used the functional updater form. If you had used setCount(count + 1), all three would use count = 0 and result in count = 1.

*/

function App() {
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increaseCount}>Increase count by 3</button>
    </div>
  );
}

export default App;

/*

📘 React State Update Explanation for Beginners

  👉 When you call setState (like setCount), React doesn't update the state immediately.
    - Instead, it schedules the update to be applied later.
    - This helps React batch multiple updates together for better performance.


  ❌ Example (can cause incorrect results):

    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
      
    In this case, all three calls use the same 'count' value (the old one), 
    so only 1 is added instead of 3.


  ✅ Correct Way (functional form):

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    Each update here uses the latest updated value ('prev'), 
    so the final count increases properly.


  💡 Use the functional form of setState whenever you're updating based on the previous value.
  This ensures React gives you the most recent state for each update.

*/
