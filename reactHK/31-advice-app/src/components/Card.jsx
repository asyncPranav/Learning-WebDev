import React from "react";
import Button from "./Button"
import Loading from "./Loading";

function Card({ error, advice, fetchAdvice, loading }) {
  return (
    <div className="card">
      {error ? <p>{error}</p> : loading ? <Loading/> : <p><i>{advice}</i></p>}
      <Button handleButton={fetchAdvice} />
    </div>
  );
}

export default Card;
