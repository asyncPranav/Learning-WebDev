import React from 'react'
import {Link, Outlet} from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h1>About Page</h1>

      <ul>
        <li><Link to="team">Team</Link></li>
        <li><Link to="company">Company</Link></li>
      </ul>

      <Outlet /> {/* Nested routes render here */}
    </div>
  );
};

export default About;
