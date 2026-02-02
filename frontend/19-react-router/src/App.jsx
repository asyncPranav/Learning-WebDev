import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import User from "./User";
import NotFound from "./NotFound";
import Products from "./Products";
import Phone from "./Phone";
import Laptop from "./Laptop";

const App = () => {
  return (
    <BrowserRouter>
    <h1>React Router Example</h1>
      {/* Navigation Links : Not recommended because it causes full page reloads */}
      {/* Only component within Route reloads, not the entire page html*/}
      <p>Using anchor tags </p>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <hr />

      {/* Use Link component from react-router-dom for navigation without full page reloads/refreshes */}
      <p>Using Link component</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <hr />

      {/* Use NavLink component from react-router-dom for navigation with active link styling */}
      <p>Using NavLink component</p>
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "red" : "black",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Home
        </NavLink>{" "}
        <NavLink
          to="/about"
          style={({ isActive }) => ({
            color: isActive ? "red" : "black",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          About
        </NavLink>{" "}
        <NavLink
          to="/contact"
          style={({ isActive }) => ({
            color: isActive ? "red" : "black",
            fontWeight: isActive ? "bold" : "normal",
          })}
        >
          Contact
        </NavLink>
      </nav>

      {/* useParams hook to access URL parameters i.e /user/:id or /product/:productId */}
      <p>Using useParams hook for accessing URL parameters</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/user/10">User</Link>
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/:id" element={<User />} />
        
        {/* Nested routes for products */}
        <Route path="/products" element={<Products />}>
          <Route path="phone" element={<Phone />} />
          <Route path="laptop" element={<Laptop />} />
        </Route>

        {/* Route for not found pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
