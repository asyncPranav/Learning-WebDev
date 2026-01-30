import { useRef } from "react";

const UncontrolledForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Name : ", nameRef.current.value);
    console.log("Email : ", emailRef.current.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Uncontrolled Form Component</h2>
        <input type="text" ref={nameRef} placeholder="Name" />
        <br />
        <input type="email" ref={emailRef} placeholder="Email" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
