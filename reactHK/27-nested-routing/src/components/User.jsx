import React from "react";
import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();

  return (
    <div>
      <h2>User Details</h2>
      <p>User ID from URL: <strong>{id}</strong></p>
    </div>
  );
}
