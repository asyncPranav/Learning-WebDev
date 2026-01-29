import React from 'react'

const Dashboard = ({handleLogout}) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
