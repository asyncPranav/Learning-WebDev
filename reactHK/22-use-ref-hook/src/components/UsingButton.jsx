import React from "react";
import { useRef } from "react";

const UsingButton = () => {
  const inputRef = useRef(null);

  function focusNow() {
    inputRef.current.focus();
  }

  return (
    <div>
      <h2>🔍 Click to Focus</h2>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={focusNow}>Focus the input</button>
    </div>
  );
};

export default UsingButton;
