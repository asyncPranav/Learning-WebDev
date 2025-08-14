import React from 'react'
import {NavLink} from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <ul className='navbar'>
        <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink></li>
        <li><NavLink to="contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink></li>
        <li><NavLink to="users" className={({isActive}) => isActive ? 'active' : ''}>Users</NavLink></li>
      </ul>
    </div>
  )
}

export default Navbar
