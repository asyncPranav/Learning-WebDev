import { useState } from "react";

const AdvanceForm = () => {
  const [formData, setFormData] = useState({
    gender: "",
    country: "India",
    agree: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(e)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Advance Form Component : checkbox, radio, select</h2>
      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === "male"}
          // onChange={(e) => setFormData({...formData, gender: e.target.value})}
          onChange={handleChange}
        />
        Male
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === "female"}
          // onChange={(e) => setFormData({...formData, gender: e.target.value})}
          onChange={handleChange}
        />
        Female
      </label>
      <br />
      <br />
      <label>
        Select your country:
        <select
          name="country"
          value={formData.country}
          // onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          onChange={handleChange}
        >
          <option value="USA">USA</option>
          <option value="India">India</option>
          <option value="Japan">Japan</option>
          <option value="Bhutan">Bhutan</option>
          <option value="Australia">Australia</option>
          <option value="Thailand">Thailand</option>
        </select>
      </label>
      <br />
      <br />
      <label>
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          // onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
          onChange={handleChange}
        />
        I agree to the terms and conditions
      </label>
      <br />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AdvanceForm;
