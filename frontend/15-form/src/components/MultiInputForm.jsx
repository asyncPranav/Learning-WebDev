import { useState } from 'react';

// Multi input form controlled component - using single state object
// Manages multiple input fields with a single useState hook
const MultiInputForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  /* 
    - Uses the current value of formData from closure.
    - Works fine most of the time, but can cause issues if updates happen very fast or asynchronously.
    - For example, typing in multiple inputs quickly or if multiple state updates are queued.
  */

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // }


  /* 
    - prev = the latest state value from React.
    - Guarantees you're always updating the most recent state.
    - Safer in cases of rapid successive updates.
    - This is the recommended way when your new state depends on the old state
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => (
      {
        ...prev,
        [name]: value
      }
    ));
    // console.log(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (

    // <form>
    //   <h2>Multi Input Form</h2>
    //   <label>Name : </label>
    //   <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
    //   <br />
    //   <label>Email : </label>
    //   <input type="text" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
    //   <br />
    //   <label>Age : </label>
    //   <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
    //   <br />
    //   <button type="submit" onClick={(e) => { e.preventDefault(); console.log(formData); }}>Submit</button>
    // </form>

    <form>
      <h2>Multi Input Form</h2>
      <label>Name : </label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      <br />
      <label>Email : </label>
      <input type="text" name="email" value={formData.email} onChange={handleChange} />
      <br />
      <label>Age : </label>
      <input type="number" name="age" value={formData.age} onChange={handleChange} />
      <br />
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

export default MultiInputForm;
