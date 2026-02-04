import { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

const App = () => {
  // const [expenses, setExpenses] = useState([
  //   ...(JSON.parse(localStorage.getItem("expenses")) || []),
  // ]);

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const totalExpense = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="appContainer">
      <h1>Expense Tracker App</h1>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
      {
        expenses.length > 0 && <h3 className="total">Total Expense : ₹{totalExpense()}</h3>
      }
    </div>
  );
};

export default App;
