import { useState } from "react";

function App() {
  const [isLiked, setIsLiked] = useState(true);
  function clickHandler() {
    setIsLiked((isLiked) => !isLiked);
  }
  return (
    <>
    <h1>{isLiked ? " You Liked It 👍" : "You Dislike It 👎"}</h1>
      <button onClick={clickHandler}>{isLiked ? "Dislike" : "Like"}</button>
    </>
  );
}

export default App;
