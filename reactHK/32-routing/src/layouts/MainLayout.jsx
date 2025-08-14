import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar /> {/* Always visible */}
      <Outlet /> {/* Renders the component that matches the current URL */}
    </div>
  );
};

export default MainLayout;
