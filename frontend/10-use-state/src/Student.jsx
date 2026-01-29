import { useState } from "react";

const Student = () => {
  const [student, setStudent] = useState({
    name: "Pranav",
    age: 83,
    city: "Berlin",
  });

  const changeCity = () => {
    setStudent({ ...student, city: "Mumbai" });
  };

  return (
    <div>
      <h3>Name : {student.name}</h3>
      <h3>Age : {student.age}</h3>
      <h3>City : {student.city}</h3>
      <button onClick={changeCity}>Change City</button>
    </div>
  );
};

export default Student;
