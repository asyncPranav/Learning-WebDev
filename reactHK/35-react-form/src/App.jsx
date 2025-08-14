import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const {
    register, // Connects inputs to RHF
    handleSubmit, // Handles validation + triggers onSubmit
    watch, // Lets you watch input values in real time
    formState: { errors, isSubmitting }, // Stores validation errors
  } = useForm();

  // This runs when the form is submitted
  async function onSubmit(data) {
    // Simulate backend request {added this to avoid re-submit}
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Form data : ", data);
  }

  return (
    <div>
      <h1>React Hook Form</h1>
      <hr />
      {/*
        handleSubmit(onSubmit) is provided by react-hook-form.
        It acts as a wrapper around our custom onSubmit function.

        When the form is submitted handleSubmit do :
        1. Prevents the default page refresh
        2. Validates all inputs registered with react-hook-form
        3. If validation passes → calls our onSubmit function
          and passes all collected form data as an object.
            
        You can think of it like:
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = collectAllInputs(); // react-hook-form magic
            onSubmit(formData);
          }}>

        Example:
        If the form has { name: "Alice", email: "alice@example.com" }
        Then inside onSubmit(data) → data = { name: "Alice", email: "alice@example.com" }

      */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name : </label>
          <input
            className={errors.userName ? "inputError" : ""}
            {...register("userName", {
              required: "Name is required",
              minLength: { value: 3, message: "Minimum length is 3" },
              maxLength: { value: 20, message: "Maximum length is 20" },
            })}
          />
          {errors.userName && (
            <p className="errorMessage">{errors.userName.message}</p>
          )}
        </div>
        <br />
        <div>
          <label>Email : </label>
          <input
            className={errors.userEmail ? "inputError" : ""}
            {...register("userEmail", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
          />
          {errors.userEmail && (
            <p className="errorMessage">{errors.userEmail.message}</p>
          )}
        </div>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default App;
