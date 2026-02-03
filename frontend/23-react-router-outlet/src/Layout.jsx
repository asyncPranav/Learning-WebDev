import {Outlet} from 'react-router-dom'
import Navbar from './Navbar.jsx'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Renders the matched child route component here */}
    </div>
  )
}

export default Layout
