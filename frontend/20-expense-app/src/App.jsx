import { useState } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    id: "",
  });
  const [entries, setEntries] = useState([]);

  // Add expense
  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries((prev) => [
      ...prev,
      { ...formData, amount: Number(formData.amount), id: Date.now() },
    ]);

    setFormData({ amount: "", category: "" });
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Total expense
  const getTotalExpense = () => {
    const total = entries.reduce((sum, expense) => sum + expense.amount, 0);
    return total;
  };

  // Delete expense
  const deleteExpense = (idToDelete) => {
    const updatedEntries = entries.filter(
      (expense) => idToDelete !== expense.id,
    );
    setEntries(updatedEntries);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Expense Tracker App 💸</h2>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="shopping">Shopping</option>
          <option value="entertainment">Entertainment</option>
          <option value="utilities">Utilities</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="travel">Travel</option>
          <option value="groceries">Groceries</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Add</button>
      </form>
      <ul>
        {entries.map((expense, index) => (
          <li key={expense.id}>
            <div className="wrapper">
              <div>{index + 1}.</div>
              <div>{expense.amount} rs</div>
              <div>{expense.category}</div>
            </div>
            <button onClick={() => deleteExpense(expense.id)}>❌</button>
          </li>
        ))}
        {entries.length > 0 && (
          <div className="total">
            <span>Total</span>
            <span>:</span>
            <span>{getTotalExpense()} rs</span>
          </div>
        )}
      </ul>
    </>
  );
};

export default App;
