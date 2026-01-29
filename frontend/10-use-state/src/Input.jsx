import { useState } from "react";

const Input = () => {
  const [value, setValue] = useState("");

  const handleInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleInput} />
      <p>Hello {value || "Guest"}</p>
    </div>
  );
};

export default Input;
