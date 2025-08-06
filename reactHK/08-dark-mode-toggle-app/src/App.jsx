import { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function clickHandler() {
    setDarkMode((prev) => !prev);
  }

  const appStyle = {
    backgroundColor: darkMode ? "#202020" : "#f1f1f1f1",
    color: darkMode ? "#f1f1f1" : "#202020",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={appStyle}>
      <h1>{darkMode ? "Dark mode is on" : "Dark mode is off"}</h1>
      <button onClick={clickHandler}>
        {darkMode ? "Dark mode off" : "Dark mode on"}
      </button>
    </div>
  );
}

export default App;
