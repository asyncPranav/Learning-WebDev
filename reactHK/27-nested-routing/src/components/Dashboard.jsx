import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h2>📊 Dashboard</h2>
      <nav>
        <Link to="profile" style={{ marginRight: "10px" }}>Profile</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet /> {/* Profile or Settings renders here */}
    </div>
  );
}
