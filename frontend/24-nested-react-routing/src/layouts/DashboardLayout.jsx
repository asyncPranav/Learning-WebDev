import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <NavLink to="/dashboard" end>Home</NavLink>{" | "}
        <NavLink to="/dashboard/profile">Profile</NavLink>{" | "}
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
