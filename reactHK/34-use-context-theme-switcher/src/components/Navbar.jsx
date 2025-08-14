import React, { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import UserContext from '../contexts/UserContext'

const Navbar = () => {
  const {theme, toggleTheme} = useContext(ThemeContext)
  const user = useContext(UserContext);

  return (
    <nav className={`navbar ${theme}`}>
      <h3>Hello {user.name}</h3>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </nav>
  )
}

export default Navbar