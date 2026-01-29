import React from "react";

// Student component using destructured props with default values
const Student = ({ name = "Anonymous", age = 0, city = "unknown", hobbies = ["unknown"] }) => {
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
      <p>Hobbies: {hobbies.join(", ")}</p>
    </div>
  );
};

export default Student;
