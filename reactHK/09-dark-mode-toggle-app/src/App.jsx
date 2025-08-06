import { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function clickHandler() {
    setDarkMode((prev) => !prev);
  }

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      <h1>{darkMode ? "Dark mode is on" : "Dark mode is off"}</h1>
      <button onClick={clickHandler}>
        {darkMode ? "Off 🌙" : "On ☀️"}
      </button>
    </div>
  );
}

export default App;
