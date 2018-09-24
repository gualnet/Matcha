/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
/* eslint-enable no-unused-vars */

const NavBar = () => {
  return (
    <div id='NavBarWrapper'>

      <nav className='navbar'>
        <div className='navbar-menu is-active'>
          <div className='navbar-start'>
            <li className='navbar-item'><Link to='/'>Home</Link></li>
            <li className='navbar-item'><Link to='/profile'>Profile</Link></li>
            <li className='navbar-item'><Link to='/members'>Members</Link></li>
            <li className='navbar-item'><Link to='/search'>Search</Link></li>
            <li className='navbar-item'><Link to='/message'>Message</Link></li>
          </div>
          <div className='navbar-end'>
            <li className='navbar-item'><Link to='/'>Login</Link></li>
            <li className='navbar-item'><Link to='/'>Logout</Link></li>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default NavBar
