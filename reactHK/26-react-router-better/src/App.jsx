import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Navbar from "./components/Navbar";
import "./App.css";

// Layout with Navbar
function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Home /></Layout>
  },
  {
    path: "/about",
    element: <Layout><About /></Layout>
  },
  {
    path: "/contact",
    element:<Layout><Contact /></Layout>
  },
  {
    path: "/projects",
    element: <Layout><Projects /></Layout>
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
