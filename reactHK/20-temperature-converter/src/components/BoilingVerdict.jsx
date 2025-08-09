import React from "react";

export default function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <p>💧 Water would boil at this temperature.</p>;
  }
  return <p>💧 Water would not boil.</p>;
}


