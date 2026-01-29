import React from 'react'

const Login = ({handleLogin}) => {
  return (
    <div>
      <h3>Please Login !!</h3>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
