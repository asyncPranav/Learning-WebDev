import { useState } from "react";
import "./App.css";

function App() {
  const [dark, setDark] = useState(true);

  function toggleTheme() {
    // method-01
    // setDark(dark ? false : true);

    // method-02
    setDark(prev => !prev);
  }

  const theme = dark ? "dark" : "light";

  return (
    <div className={`container ${theme}`}>
      <h1>Theme Switcher App</h1>
      <Button theme={dark} toggle={toggleTheme} />
    </div>
  );
}

function Button({ theme, toggle }) {
  return <button onClick={toggle}>{theme ? "Light ☀️" : "Dark 🌙"}</button>;
}
export default App;
