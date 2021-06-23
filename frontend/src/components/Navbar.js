import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="links">
        <Link to="/" >Home</Link>
        <Link to="/profile" >Profile</Link>
        <Link to="/bathmap" >Create bath</Link>
        <Link to="/register" >Register</Link>
      </div>
    </nav>
  )
}

export default Navbar