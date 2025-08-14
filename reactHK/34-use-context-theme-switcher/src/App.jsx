import { useState } from "react";
import ThemeContext from "./contexts/ThemeContext";
import UserContext from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({ name: "Pranav" });

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  return (
    // { theme, toggleTheme } => { theme: theme, toggleTheme: toggleTheme } --> we are passing an object here
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext value={user}>
        <Navbar />
        <hr />
        <Content />
      </UserContext>
    </ThemeContext.Provider>
  );
}

export default App;
