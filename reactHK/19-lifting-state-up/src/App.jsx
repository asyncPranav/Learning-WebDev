import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  return (
    <>
      <InputA value={text} onChange={setText} />
      <InputB value={text} onChange={setText} />
    </>
  );
}

function InputA({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function InputB({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default App;
