import React, { useState, useRef } from "react";

export default function App() {
  const [stateCount, setStateCount] = useState(0); // normal state counter
  const refCount = useRef(0); // ref counter

  function incrementState() {
    setStateCount(stateCount + 1); // triggers re-render
  }

  function incrementRef() {
    refCount.current += 1; // does NOT trigger re-render
    console.log("Ref value:", refCount.current); // only visible in console
  }

  return (
    <div>
      <h2>State vs Ref Counter</h2>

      <div>
        <h3>State Counter (Re-renders UI)</h3>
        <p>{stateCount}</p>
        <button onClick={incrementState}>Increment State</button>
      </div>

      <br />
      <br />
      <br />
      <br />
      <hr />

      <div>
        <h3>Ref Counter (Doesn't Re-render UI)</h3>
        <p>{refCount.current}</p>
        <button onClick={incrementRef}>Increment Ref</button>
        <p style={{ color: "gray" }}>
          (Value changes internally — see console, UI won't update
          automatically)
        </p>
      </div>
    </div>
  );
}
