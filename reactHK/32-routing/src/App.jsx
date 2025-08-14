import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Team from "./components/Team";
import Company from "./components/Company";
import Users from "./components/Users";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";
import MainLayout from "./layouts/MainLayout";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // parent layout
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />, // about parent page
        children: [
          {
            path: "team",
            element: <Team />,
          },
          {
            path: "company",
            element: <Company />,
          },
        ],
      },
      {
        path: "users",
        element: <Users />,
        children: [
          {
            path: ":id",
            element: <UserProfile />,
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
