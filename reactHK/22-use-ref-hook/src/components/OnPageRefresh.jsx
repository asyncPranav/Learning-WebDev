import React from "react";
import { useRef, useEffect } from "react";

const OnPageRefresh = () => {
  const inputRef = useRef(null); // Step 1: Create a ref box

  useEffect(() => {
    // Step 3: When the component loads, focus the input
    inputRef.current.focus();

  }, []);

  return (
    <div>
      <h2>🔍 Auto-Focus Input</h2>

      {/* Step 2: Connect the ref to the input */}
      <input ref={inputRef} type="text" placeholder="Type here..." />
    </div>
  );
};

export default OnPageRefresh;
