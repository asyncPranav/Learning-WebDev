import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import User from "./components/User";
import NotFound from "./components/NotFound";

import "./App.css"

const Layout = () => (
  <div>
    <Navbar />
    <hr />
    <Outlet /> {/* Child routes render here */}
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "settings", element: <Settings /> },
        ],
      },
      { path: "user/:id", element: <User /> }, // Dynamic route
      { path: "*", element: <NotFound /> }, // Catch-all 404 route
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
