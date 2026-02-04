import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, deleteExpense }) => {
  if(expenses.length === 0) {
    return <p className="noExpenses">No Expenses Found</p>
  }

  return (
    <div className="expenseList">
      {
        expenses.map((expense) => {
          return <ExpenseItem key={expense.id} expense={expense} deleteExpense={deleteExpense} />
        })
      }
    </div>
  );
};

export default ExpenseList;
