import React from 'react'
import User from './components/User'
import Admin from './components/Admin'

const App = () => {
  return (
    <div>
      <p><b>User component - using prop object</b></p>
      <User name="John Doe" email="john@example.com" />
      <hr />
      <p><b>Admin component - using destructured props</b></p>
      <Admin name="Jane Smith" age={30} />
    </div>
  )
}

export default App
