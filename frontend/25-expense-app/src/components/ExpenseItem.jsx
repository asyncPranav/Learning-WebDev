import React from 'react'

const ExpenseItem = ({ expense, deleteExpense }) => {
  return (
    <div className='expenseItem'>
      <span>{expense.title}</span>
      <span>₹{expense.amount}</span>
      <button onClick={() => deleteExpense(expense.id)}>❌</button>
    </div>
  )
}

export default ExpenseItem
