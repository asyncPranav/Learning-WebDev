import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Navbar from "./Navbar"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home/>
      </div>
    )
  },
  {
    path: "/about",
    element: (
      <div>
        <Navbar />
        <About />
      </div>
    )
  },
  {
    path: "/contact",
    element: (
      <div>
        <Navbar />
        <Contact/>
      </div>
    )
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
