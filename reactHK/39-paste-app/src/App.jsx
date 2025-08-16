import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "./layouts/MainLayout";
import About from "./components/About";
import Home from "./components/Home/Home";
import PasteList from "./components/PasteList/PasteList";
import ViewPaste from "./components/ViewPaste/ViewPaste";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // default route for "/"
        element: <Home />,
      },
      {
        path: "pastes",
        element: <PasteList />,
      },
      {
        path: "pastes/:id",
        element: <ViewPaste />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  );
}

export default App;
