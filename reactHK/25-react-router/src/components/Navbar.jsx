import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // whole page reload - using anchor (not good practice)
  /* return (
    <div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/projects">projects</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
  ) */

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/projects">projects</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
