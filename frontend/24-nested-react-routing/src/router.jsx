import { createBrowserRouter, redirect } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { fetchUser } from "./api/fetchUser";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"), // ← direct redirect
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile />, loader: fetchUser },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "*", element: <NotFound /> }, // global 404
]);

export default router;
