import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import About from './About.jsx'
import Contact from './Contact.jsx'
import NotFound from './NotFound.jsx'

const router = createBrowserRouter([
  {
    // Parent route with Layout
    // Why no path of layout component here? because it's a parent route
    // All child routes will be rendered inside Layout's <Outlet />
    element: <Layout />,
    children: [
      { path: "/" , element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <NotFound /> } // Catch-all route for 404 Not Found
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
