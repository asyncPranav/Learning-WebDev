import { useState } from "react";

const BasicValidationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError("All fields are required");
    } else {
      setError("");
      console.log("Form submitted : ", { name, email });
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "name") {
  //     setName(value);
  //   } else if (name === "email") {
  //     setEmail(value);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Basic Validation Form Component</h2>
      <label>Name : </label>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        // onChange={handleChange}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Email : </label>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        // onChange={handleChange}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BasicValidationForm;
