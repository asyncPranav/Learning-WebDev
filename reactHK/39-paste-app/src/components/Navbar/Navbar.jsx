import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <b className={styles.logo}>Paste</b>
      <ul className={styles.navMenu}>
        <li><Link className={styles.link} to="/">Home</Link></li>
        <li><Link className={styles.link} to="pastes">Pastes</Link></li>
        <li><Link className={styles.link} to="about">About</Link></li>
        {/* <li><a>Developer</a></li> */}
      </ul>
    </div>
  )
}

export default Navbar
