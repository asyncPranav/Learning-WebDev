import { useState, useRef } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const titleRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || amount === "") {
      alert("please fill all details");
      return;
    };
    addExpense({ title, amount: parseFloat(amount), id: Date.now() });
    setTitle("");
    setAmount("");
    titleRef.current.focus();
  };
  return (
    <form className="expenseForm" onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
        placeholder="Enter Title"
      />
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        placeholder="Enter Amount"
      />
      <button type="submit" onClick={handleSubmit}>
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
