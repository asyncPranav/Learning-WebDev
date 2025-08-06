import { useState } from "react";
import "./App.css";

// input tracker app
/* function App() {
  const [text, setText] = useState("");
  const [char, setChar] = useState(0);
  const [word, setWord] = useState(0);

  function handleChange(e) {
    setText(e.target.value);
    setChar(text.split("").length);
    setWord(text.split(" ").length);
  }

  return (
    <div>
      <input type="text" onChange={handleChange} placeholder="Enter your text" />
      <br />
      <p>typed : {text || "did not typed anything yet"}</p>
      <p className="info">Total character : {char}</p>
      <p className="info">Total words : {word}</p>
    </div>
  );
} */



/*-------> Mistake in above app

  setChar(text.split("").length); // ❌
  setWord(text.split(" ").length); // ❌

  You're calculating based on previous value of text, not the updated one — because React 
  state updates are asynchronous.

*/



// input tracker app
function App() {
  const [text, setText] = useState("");
  const [char, setChar] = useState(0);
  const [word, setWord] = useState(0);

  function handleChange(e) {
    const newText = e.target.value;
    setText(newText);
    setChar(newText.length);
    setWord(newText.trim === "" ? 0 : newText.trim().split(" ").length);
  }

  return (
    <div>
      <input type="text" onKeyUp={handleChange} placeholder="Enter your text" />
      <br />
      <p>typed : {text || "did not typed anything yet"}</p>
      <p className="info">Total character : {char}</p>
      <p className="info">Total words : {word}</p>
    </div>
  );
}

export default App;
