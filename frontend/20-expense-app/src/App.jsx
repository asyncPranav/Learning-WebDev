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
        <h2>Expense Tracker App</h2>
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

      {entries.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Amount (Rs)</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.amount}</td>
                <td>{entry.category}</td>
                <td>
                  <button onClick={() => deleteExpense(entry.id)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th colSpan={2}>Total</th>
              <th colSpan={2}>{getTotalExpense()} Rs</th>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
};

export default App;
