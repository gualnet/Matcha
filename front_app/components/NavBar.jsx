/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
/* eslint-enable no-unused-vars */

const NavBar = () => {
  return (
    <div className='NavBar'>
      <p>
        NavBar
      </p>
      <ul>
        <li> <Link to='/'> Home </Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/members'>Members</Link></li>
        <li><Link to='/search'>Search</Link></li>
        <li><Link to='/message'>Message</Link></li>
      </ul>
    </div>
  )
}

export default NavBar
