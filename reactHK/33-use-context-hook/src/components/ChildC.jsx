import React, { useContext } from 'react'
import { UserContext } from '../App'

const ChildC = () => {
const user = useContext(UserContext);
  return (
    <div>
      Hello from child C
      <br />
      User name from child C - {user.name}
    </div>
  )
}

export default ChildC
