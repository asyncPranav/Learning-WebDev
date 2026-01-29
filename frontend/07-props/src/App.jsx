import React from 'react'
import User from './components/User'
import Admin from './components/Admin'
import Student from './components/Student'

const App = () => {
  return (
    <div>
      <p><b>User component - using prop object</b></p>
      <User name="John Doe" email="john@example.com" />
      <hr />
      <p><b>Admin component - using destructured props</b></p>
      <Admin name="Jane Smith" age={30} />
      <hr />
      <p><b>Student component - using destructured props with default values</b></p>
      <Student name="Alice" age={20} city="New York" hobbies={["reading", "swimming"]} />
      <Student />
    </div>
  )
}
/* 
  We can pass following types of props to a component:
  1. Primitive types: string, number, boolean
  2. Complex types: array, object, function
  3. JSX elements
  4. Children props
*/

export default App
