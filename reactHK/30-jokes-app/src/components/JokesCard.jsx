import React from "react";

function JokeCard({ setup, punchline }) {
  return (
    <div className="joke-card">
      <p className="setup">{setup}</p>
      <p className="punchline">{punchline}</p>
    </div>
  );
}

export default JokeCard;
