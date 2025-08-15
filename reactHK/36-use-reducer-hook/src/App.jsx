import react from "react";
import { useReducer } from "react";

import "./App.css";

// step-1 : initial state
const initialState = { count: 0 };

// step-2 : reducer function
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state; // if unknown action, return current state
  }
}
function App() {
  // step-3: useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Count : {state.count}</h1>

      {/* step-4 : dispatch action */}
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

export default App;
