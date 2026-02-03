import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navStyle = {
    display: "flex",
    gap: "20px",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
    alignItems: "center"
  };

  // Function to dynamically set active style
  const activeStyle = ({ isActive }) => ({
    color: isActive ? "yellow" : "white",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal"
  });

  return (
    <nav style={navStyle}>
      <NavLink to="/" style={activeStyle}>
        Home
      </NavLink>
      <NavLink to="/about" style={activeStyle}>
        About
      </NavLink>
      <NavLink to="/contact" style={activeStyle}>
        Contact
      </NavLink>
    </nav>
  );
};

export default Navbar;
